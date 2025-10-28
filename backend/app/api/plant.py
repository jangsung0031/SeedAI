from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict, Any
import asyncio
from concurrent.futures import ThreadPoolExecutor

from app.models.schemas import PlantAnalysisResponse
from app.services import classify_plant, generate_care_guide, generate_growth_prediction

router = APIRouter()

# 스레드 풀 생성 (CPU 바운드 작업용)
executor = ThreadPoolExecutor(max_workers=3)


@router.post("/analyze", response_model=PlantAnalysisResponse)
async def analyze_plant(file: UploadFile = File(...)) -> PlantAnalysisResponse:
    """
    식물 이미지를 분석하여 종 식별, 관리법, 성장 예측을 제공합니다.
    
    Args:
        file: 업로드된 식물 이미지 파일
        
    Returns:
        PlantAnalysisResponse: 식물 분석 종합 결과
    """
    try:
        # 이미지 파일 검증
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="이미지 파일만 업로드 가능합니다."
            )
        
        # 파일 크기 제한 (10MB)
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail="파일 크기는 10MB 이하여야 합니다."
            )
        
        # 1단계: 식물 종 식별
        loop = asyncio.get_event_loop()
        identification = await loop.run_in_executor(
            executor,
            classify_plant,
            contents
        )
        
        if identification.confidence < 0.1:
            return PlantAnalysisResponse(
                identification=identification,
                care_guide=None,
                growth_prediction=None,
                success=False,
                message="식물을 식별할 수 없습니다. 더 명확한 이미지를 업로드해주세요."
            )
        
        # 2단계 & 3단계: 관리법 생성 및 성장 예측 (병렬 처리)
        care_guide_task = loop.run_in_executor(
            executor,
            generate_care_guide,
            identification.plant_name
        )
        
        growth_prediction_task = loop.run_in_executor(
            executor,
            generate_growth_prediction,
            identification.plant_name
        )
        
        # 두 작업이 모두 완료될 때까지 대기
        care_guide, growth_prediction = await asyncio.gather(
            care_guide_task,
            growth_prediction_task
        )
        
        # 종합 결과 반환
        return PlantAnalysisResponse(
            identification=identification,
            care_guide=care_guide,
            growth_prediction=growth_prediction,
            success=True,
            message=f"{identification.plant_name} 분석이 완료되었습니다."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"식물 분석 오류: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"식물 분석 중 오류가 발생했습니다: {str(e)}"
        )


@router.get("/test")
async def test_endpoint() -> Dict[str, str]:
    """
    API 테스트 엔드포인트
    
    Returns:
        Dict[str, str]: 테스트 메시지
    """
    return {
        "message": "식물 분석 API가 정상 작동 중입니다.",
        "endpoint": "/api/plant/analyze"
    }


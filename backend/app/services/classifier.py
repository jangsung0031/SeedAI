from io import BytesIO
from PIL import Image
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from app.config import settings
from app.models.schemas import PlantIdentification

# 전역 변수로 모델 캐싱
_classifier_model = None
_processor = None


def load_classifier():
    """식물 분류 모델을 로드합니다 (처음 한 번만 로드)"""
    global _classifier_model, _processor
    
    if _classifier_model is None:
        print(f"모델 로딩 중: {settings.plant_classifier_model}")
        try:
            _processor = AutoImageProcessor.from_pretrained(
                settings.plant_classifier_model,
                cache_dir=settings.cache_dir,
                token=settings.huggingface_token
            )
            _classifier_model = AutoModelForImageClassification.from_pretrained(
                settings.plant_classifier_model,
                cache_dir=settings.cache_dir,
                token=settings.huggingface_token
            )
            # GPU가 있으면 사용
            if torch.cuda.is_available():
                _classifier_model = _classifier_model.cuda()
            _classifier_model.eval()
            print("모델 로딩 완료!")
        except Exception as e:
            print(f"모델 로딩 실패: {e}")
            raise
    
    return _processor, _classifier_model


def classify_plant(image: bytes) -> PlantIdentification:
    """
    Transformers 라이브러리를 직접 사용하여 식물 종을 식별합니다.
    
    Args:
        image: 식물 이미지 바이트
        
    Returns:
        PlantIdentification: 식물 식별 결과
    """
    try:
        # 이미지 전처리
        img = Image.open(BytesIO(image))
        
        # RGB로 변환
        if img.mode != "RGB":
            img = img.convert("RGB")
        
        # 모델 로드
        processor, model = load_classifier()
        
        # 이미지 전처리 및 추론
        inputs = processor(images=img, return_tensors="pt")
        
        # GPU로 이동 (사용 가능한 경우)
        if torch.cuda.is_available():
            inputs = {k: v.cuda() for k, v in inputs.items()}
        
        # 추론 실행
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
        
        # 결과 파싱
        # Softmax를 적용하여 확률로 변환
        probabilities = torch.nn.functional.softmax(logits, dim=-1)
        top_probs, top_indices = torch.topk(probabilities[0], k=3)
        
        # 결과 추출
        results = []
        for prob, idx in zip(top_probs, top_indices):
            label = model.config.id2label.get(int(idx), f"Class {idx}")
            results.append({
                "label": label,
                "score": float(prob)
            })
        
        if results:
            top_result = results[0]
            plant_name = format_plant_name(top_result["label"])
            confidence = top_result["score"]
            common_names = [format_plant_name(r["label"]) for r in results[:3]]
            
            return PlantIdentification(
                plant_name=plant_name,
                scientific_name=None,
                confidence=confidence,
                common_names=common_names
            )
        else:
            return get_default_identification()
            
    except Exception as e:
        print(f"식물 분류 오류: {e}")
        return get_default_identification()


def format_plant_name(label: str) -> str:
    """레이블을 읽기 좋은 식물 이름으로 변환합니다."""
    # 언더스코어나 하이픈을 공백으로 변환
    name = label.replace("_", " ").replace("-", " ")
    # 각 단어의 첫 글자를 대문자로
    name = " ".join(word.capitalize() for word in name.split())
    return name


def get_default_identification() -> PlantIdentification:
    """기본 식별 결과를 반환합니다."""
    return PlantIdentification(
        plant_name="식물 (분석 중)",
        confidence=0.5,
        common_names=["일반 식물", "관엽 식물", "화초"]
    )


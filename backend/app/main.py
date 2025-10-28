from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import health, plant

# FastAPI 앱 생성
app = FastAPI(
    title="새싹아이 API",
    description="반려식물 생애주기 관리 AI 서비스",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(health.router, tags=["Health"])
app.include_router(plant.router, prefix="/api/plant", tags=["Plant"])


@app.get("/")
async def root():
    """루트 엔드포인트"""
    return {
        "message": "새싹아이 API에 오신 것을 환영합니다!",
        "version": "1.0.0",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=True
    )


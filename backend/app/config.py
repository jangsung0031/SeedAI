from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    """애플리케이션 설정"""
    
    # API 설정
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # CORS 설정
    cors_origins: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Hugging Face 모델 설정
    plant_classifier_model: str = "google/vit-base-patch16-224"  # 공개 모델로 변경
    text_generation_model: str = "gpt2"  # 경량 공개 모델
    image_generation_model: str = "stabilityai/sd-turbo"
    
    # 선택적 Hugging Face 토큰 (rate limit 완화용)
    huggingface_token: Optional[str] = None
    
    # 캐시 디렉토리
    cache_dir: str = "./model_cache"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()


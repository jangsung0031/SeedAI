# 🌱 새싹아이 (Plant AI)

반려식물의 생애주기 관리 AI 서비스

## 📝 프로젝트 소개

새싹아이는 AI 기술을 활용하여 반려식물을 효과적으로 관리할 수 있도록 돕는 웹 애플리케이션입니다. 식물 사진만 업로드하면 AI가 자동으로 식물을 식별하고, 맞춤형 관리 가이드와 성장 예측을 제공합니다.

## ✨ 주요 기능

### 1. 식물 종 식별 (Image Classification)
- **Transformers 라이브러리를 직접 사용**하여 식물 종 식별
- Google의 Vision Transformer (ViT) 모델 활용
- 업로드된 이미지를 분석하여 식물 종을 정확하게 식별
- 신뢰도 점수와 함께 상위 3개 결과 제공

### 2. 맞춤형 관리 가이드
- 식별된 식물에 맞는 상세한 관리법 제공
  - 물주기 빈도 및 방법
  - 햇빛 요구사항
  - 적정 온도 및 습도
  - 비료 사용법
  - 토양 정보
  - 실용적인 관리 팁 3가지

### 3. 성장 예측 타임라인
- 4단계 성장 타임라인 제공
  - 현재
  - 1개월 후
  - 3개월 후
  - 6개월 후
- 각 단계별 상세 설명

## 🛠 기술 스택

### 백엔드
- **Python 3.11**
- **FastAPI**: 고성능 비동기 웹 프레임워크
- **Uvicorn**: ASGI 서버
- **Transformers**: Hugging Face의 딥러닝 모델 라이브러리
- **PyTorch**: 딥러닝 프레임워크
- **Pillow**: 이미지 처리
- **Pydantic**: 데이터 유효성 검증

### 프론트엔드
- **React 18**: UI 라이브러리
- **Vite**: 빌드 도구
- **React Router**: 라우팅
- **Axios**: HTTP 클라이언트
- **TailwindCSS**: 스타일링
- **React Icons**: 아이콘

### AI 모델 (로컬 실행)
- **식물 식별**: google/vit-base-patch16-224 (Vision Transformer)
- **관리 가이드**: 규칙 기반 시스템
- **성장 예측**: 설명 기반 타임라인

## 📦 설치 및 실행

### 사전 요구사항
- Python 3.11 이상
- Node.js 18 이상
- (권장) 8GB 이상의 RAM
- (선택) GPU (CUDA 지원 시 더 빠른 추론)

### 백엔드 설정

1. 백엔드 디렉토리로 이동
```bash
cd backend
```

2. 가상환경 생성 및 활성화
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate  # Windows
```

3. 의존성 설치
```bash
pip install -r requirements.txt
```

**참고**: PyTorch 설치 시 시스템에 맞는 버전을 설치하세요.
- CPU 버전: `pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu`
- GPU 버전: [PyTorch 공식 사이트](https://pytorch.org/get-started/locally/)에서 확인

4. 환경변수 설정 (선택사항)
```bash
# .env.example을 참고하여 .env 파일 생성 (필수 아님)
cp .env.example .env
```

**.env 파일 설정**:
- API 토큰이 **필요 없습니다**! 모델이 자동으로 다운로드됩니다.
- Hugging Face 토큰은 선택사항 (rate limit 완화 목적)

5. 서버 실행
```bash
uvicorn app.main:app --reload --port 8000
```

**첫 실행 시**: 모델 다운로드에 시간이 걸립니다 (약 300MB).
모델은 `model_cache/` 디렉토리에 저장되며, 이후에는 재사용됩니다.

백엔드 서버가 `http://localhost:8000`에서 실행됩니다.

### 프론트엔드 설정

1. 프론트엔드 디렉토리로 이동
```bash
cd frontend
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

프론트엔드가 `http://localhost:5173`에서 실행됩니다.

## 🚀 사용 방법

1. 웹 브라우저에서 `http://localhost:5173` 접속
2. "지금 시작하기" 버튼 클릭
3. 식물 사진 업로드 (드래그 앤 드롭 또는 파일 선택)
4. "분석 시작하기" 버튼 클릭
5. AI 분석 결과 확인
   - 식물 종 정보
   - 상세 관리 가이드
   - 성장 예측 타임라인

## 📁 프로젝트 구조

```
plant-ai-web/
├── backend/                    # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py            # 앱 진입점
│   │   ├── config.py          # 설정 관리
│   │   ├── api/               # API 엔드포인트
│   │   │   ├── plant.py       # 식물 분석 API
│   │   │   └── health.py      # 헬스체크
│   │   ├── models/            # 데이터 모델
│   │   │   └── schemas.py     # Pydantic 스키마
│   │   └── services/          # 비즈니스 로직
│   │       ├── classifier.py  # 식물 식별 (Transformers)
│   │       ├── guide.py       # 관리법 생성
│   │       └── growth.py      # 성장 예측
│   ├── requirements.txt       # Python 의존성
│   └── .env.example          # 환경변수 예시
│
├── frontend/                   # React 프론트엔드
│   ├── src/
│   │   ├── main.jsx           # 진입점
│   │   ├── App.jsx            # 메인 앱
│   │   ├── pages/             # 페이지 컴포넌트
│   │   ├── components/        # 재사용 컴포넌트
│   │   ├── services/          # API 서비스
│   │   └── styles/            # 스타일
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔧 API 엔드포인트

### `POST /api/plant/analyze`
식물 이미지를 분석합니다.

**요청:**
- Content-Type: `multipart/form-data`
- Body: `file` (이미지 파일)

**응답:**
```json
{
  "identification": {
    "plant_name": "Monstera Deliciosa",
    "scientific_name": null,
    "confidence": 0.95,
    "common_names": ["Monstera", "Swiss Cheese Plant", "Split Leaf"]
  },
  "care_guide": {
    "watering": "주 1-2회 물주기...",
    "sunlight": "밝은 간접광...",
    "temperature": "18-24°C...",
    "humidity": "중간 습도...",
    "fertilizer": "월 1회 액체비료...",
    "soil": "배수가 잘 되는 흙...",
    "tips": ["팁1", "팁2", "팁3"]
  },
  "growth_prediction": {
    "stages": [
      {
        "stage": "current",
        "timeframe": "현재",
        "image_url": null,
        "description": "초기 단계 설명..."
      }
    ]
  },
  "success": true,
  "message": "분석이 완료되었습니다."
}
```

### `GET /health`
서버 상태를 확인합니다.

**응답:**
```json
{
  "status": "healthy",
  "message": "새싹아이 API가 정상 작동 중입니다."
}
```

### `GET /docs`
FastAPI 자동 생성 문서 (Swagger UI)

## 🔄 주요 변경 사항 (v2.0)

### ✅ API 토큰 불필요
- **이전**: Hugging Face API 토큰 필수
- **현재**: 토큰 없이 바로 사용 가능
- Transformers 라이브러리를 직접 import하여 로컬에서 모델 실행

### ✅ 로컬 모델 실행
- 모델이 `model_cache/` 디렉토리에 자동 다운로드
- 첫 실행 후에는 캐시된 모델 재사용
- 인터넷 연결 필요 (첫 다운로드 시에만)

### ✅ 개선된 성능
- 모델을 메모리에 캐싱하여 빠른 추론
- GPU 자동 감지 및 사용
- 효율적인 배치 처리

### ✅ 의존성 추가
```
transformers==4.36.2
torch==2.1.2
torchvision==0.16.2
huggingface-hub==0.20.2
diffusers==0.25.0
accelerate==0.25.0
```

## ⚙️ 설정 옵션

### 모델 변경
`backend/app/config.py`에서 모델을 변경할 수 있습니다:

```python
class Settings(BaseSettings):
    plant_classifier_model: str = "google/vit-base-patch16-224"
    text_generation_model: str = "gpt2"
    image_generation_model: str = "stabilityai/sd-turbo"
```

### 캐시 디렉토리
모델은 기본적으로 `./model_cache`에 저장됩니다.
`.env` 파일에서 변경 가능:

```
CACHE_DIR=./custom_cache_path
```

## 🐛 문제 해결

### 모델 다운로드 실패
```bash
# 수동으로 모델 다운로드
python -c "from transformers import AutoModel; AutoModel.from_pretrained('google/vit-base-patch16-224')"
```

### 메모리 부족
- CPU 사용 시 최소 8GB RAM 권장
- 메모리가 부족한 경우 더 작은 모델 사용
- 또는 API 방식으로 되돌리기

### GPU 사용 오류
```bash
# CPU 버전 PyTorch 재설치
pip uninstall torch torchvision
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

### 첫 실행이 느림
- 정상입니다! 모델 다운로드 중입니다 (약 300MB)
- 이후 실행은 빠릅니다

## 📊 시스템 요구사항

### 최소 사양
- CPU: 2코어 이상
- RAM: 8GB
- 디스크: 2GB (모델 캐시용)
- Python: 3.11+

### 권장 사양
- CPU: 4코어 이상
- RAM: 16GB
- GPU: CUDA 지원 (추론 속도 향상)
- 디스크: 5GB

## 🤝 기여

이 프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요!

## 📄 라이선스

이 프로젝트는 개인 학습 및 연구 목적으로 제작되었습니다.

## 🙏 감사의 말

- [Hugging Face](https://huggingface.co/)의 훌륭한 Transformers 라이브러리
- [Google Research](https://github.com/google-research)의 Vision Transformer 모델
- 오픈소스 커뮤니티의 모든 기여자들

## 📞 문의

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.

---

**새싹아이**와 함께 반려식물을 더 건강하게 키워보세요! 🌿

**v2.0 업데이트**: 이제 API 토큰 없이도 바로 사용할 수 있습니다! 🎉

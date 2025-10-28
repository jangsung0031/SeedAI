import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import PlantInfo from '../components/PlantInfo';
import CareGuide from '../components/CareGuide';
import GrowthPreview from '../components/GrowthPreview';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisResult = location.state?.analysisResult;

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            분석 결과가 없습니다.
          </p>
          <button
            onClick={() => navigate('/analyze')}
            className="btn-primary"
          >
            분석 시작하기
          </button>
        </div>
      </div>
    );
  }

  const { identification, care_guide, growth_prediction, message } = analysisResult;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/analyze')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <FiArrowLeft className="mr-2" size={20} />
              <span>다시 분석</span>
            </button>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              <h1 className="text-xl font-bold text-gray-800">새싹아이</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <FiHome className="mr-2" size={20} />
              <span>홈</span>
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 성공 메시지 */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              분석 완료!
            </h2>
            <p className="text-gray-600">{message}</p>
          </div>

          {/* 결과 섹션들 */}
          <div className="space-y-8">
            {/* 식물 정보 */}
            {identification && <PlantInfo identification={identification} />}

            {/* 관리 가이드 */}
            {care_guide && <CareGuide careGuide={care_guide} />}

            {/* 성장 예측 */}
            {growth_prediction && (
              <GrowthPreview growthPrediction={growth_prediction} />
            )}
          </div>

          {/* 액션 버튼들 */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/analyze')}
              className="btn-primary"
            >
              다른 식물 분석하기
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <p className="text-center text-gray-600">
          © 2025 새싹아이. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Result;


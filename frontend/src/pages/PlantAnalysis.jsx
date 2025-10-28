import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import ImageUpload from '../components/ImageUpload';
import Loading from '../components/Loading';
import { analyzePlant } from '../services/api';

const PlantAnalysis = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('식물 사진을 먼저 업로드해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzePlant(selectedImage);
      
      if (result.success) {
        // 결과 페이지로 이동하면서 데이터 전달
        navigate('/result', { state: { analysisResult: result } });
      } else {
        setError(result.message || '식물 분석에 실패했습니다.');
      }
    } catch (err) {
      console.error('분석 오류:', err);
      setError(
        err.response?.data?.detail ||
          '식물 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loading message="식물을 분석하고 있습니다" />}

      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <FiArrowLeft className="mr-2" size={20} />
              <span>홈으로</span>
            </button>
            <div className="flex items-center ml-auto">
              <span className="text-2xl mr-2">🌱</span>
              <h1 className="text-xl font-bold text-gray-800">새싹아이</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              식물 분석
            </h2>
            <p className="text-gray-600">
              식물 사진을 업로드하면 AI가 분석하여 종 식별, 관리법, 성장 예측을
              제공합니다.
            </p>
          </div>

          {/* 이미지 업로드 영역 */}
          <div className="mb-8">
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
            />
          </div>

          {/* 오류 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 분석 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!selectedImage || loading}
              className={`btn-primary text-lg inline-flex items-center ${
                !selectedImage || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <FiCheckCircle className="mr-2" size={24} />
              분석 시작하기
            </button>
          </div>

          {/* 안내 정보 */}
          <div className="mt-12 p-6 bg-primary-50 rounded-xl border border-primary-200">
            <h3 className="font-semibold text-gray-800 mb-3">📸 촬영 팁</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 식물 전체 또는 잎이 잘 보이도록 촬영해주세요</li>
              <li>• 밝은 곳에서 찍으면 더 정확한 분석이 가능합니다</li>
              <li>• 흐릿하지 않은 선명한 사진을 사용해주세요</li>
              <li>• 배경이 단순할수록 식별 정확도가 높아집니다</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlantAnalysis;


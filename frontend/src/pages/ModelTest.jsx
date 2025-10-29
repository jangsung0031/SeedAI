import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import ImageUpload from '../components/ImageUpload';
import CameraCapture from '../components/CameraCapture';
import Loading from '../components/Loading';
import { comparePlantModels, analyzePlantAuto } from '../services/api';

const ModelTest = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [autoResult, setAutoResult] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setError(null);
    setComparisonResult(null);
    setAutoResult(null);
  };

  const handleCameraCapture = (file) => {
    setSelectedImage(file);
    setError(null);
    setComparisonResult(null);
    setAutoResult(null);
  };

  const handleCompare = async () => {
    if (!selectedImage) {
      setError('식물 사진을 먼저 업로드해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setComparisonResult(null);
    setAutoResult(null);

    try {
      const result = await comparePlantModels(selectedImage);
      
      if (result.success) {
        setComparisonResult(result);
      } else {
        setError(result.message || '모델 비교에 실패했습니다.');
      }
    } catch (err) {
      console.error('비교 오류:', err);
      setError(
        err.response?.data?.detail ||
          '모델 비교 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAutoSelect = async () => {
    if (!selectedImage) {
      setError('식물 사진을 먼저 업로드해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setComparisonResult(null);
    setAutoResult(null);

    try {
      const result = await analyzePlantAuto(selectedImage);
      
      if (result.success) {
        setAutoResult(result);
      } else {
        setError(result.message || '식물 분석에 실패했습니다.');
      }
    } catch (err) {
      console.error('자동 선택 오류:', err);
      setError(
        err.response?.data?.detail ||
          '식물 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.7) return 'text-green-600';
    if (confidence >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBgColor = (confidence) => {
    if (confidence >= 0.7) return 'bg-green-500';
    if (confidence >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loading message="두 모델로 식물을 분석하고 있습니다" />}

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
              <span className="text-2xl mr-2">🧪</span>
              <h1 className="text-xl font-bold text-gray-800">모델 테스트</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              AI 모델 비교 테스트
            </h2>
            <p className="text-gray-600">
              두 가지 AI 모델로 식물을 분석하고 결과를 비교합니다
            </p>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                <strong>모델 1:</strong> Google ViT (ImageNet)
              </div>
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <strong>모델 2:</strong> PlantRecog (299 Flowers)
              </div>
            </div>
          </div>

          {/* 이미지 업로드 및 카메라 영역 */}
          <div className="mb-8 space-y-6">
            {/* 파일 업로드 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📁 파일에서 선택
              </h3>
              <ImageUpload
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
              />
            </div>

            {/* 카메라 촬영 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📷 카메라로 촬영
              </h3>
              <CameraCapture onCapture={handleCameraCapture} />
            </div>
          </div>

          {/* 오류 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 버튼들 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={handleAutoSelect}
              disabled={!selectedImage || loading}
              className={`btn-primary text-lg inline-flex items-center ${
                !selectedImage || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              ⚡ 자동 선택 분석 (권장)
            </button>
            <button
              onClick={handleCompare}
              disabled={!selectedImage || loading}
              className={`btn-secondary text-lg inline-flex items-center ${
                !selectedImage || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <FiRefreshCw className="mr-2" size={24} />
              두 모델 비교
            </button>
          </div>

          {/* 자동 선택 결과 */}
          {autoResult && (
            <div className="mb-8">
              <div className="card border-2 border-primary-300 bg-primary-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    ⚡ 자동 선택 결과
                  </h3>
                  <span className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold">
                    최적 모델 선택됨
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      식별된 식물
                    </label>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {autoResult.identification.plant_name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">
                      신뢰도
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${getConfidenceBgColor(
                          autoResult.identification.confidence
                        )}`}
                        style={{
                          width: `${
                            autoResult.identification.confidence * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p
                      className={`text-right text-xl font-bold mt-2 ${getConfidenceColor(
                        autoResult.identification.confidence
                      )}`}
                    >
                      {(autoResult.identification.confidence * 100).toFixed(1)}%
                    </p>
                  </div>

                  {autoResult.identification.common_names &&
                    autoResult.identification.common_names.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-2 block">
                          다른 가능성
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {autoResult.identification.common_names.map(
                            (name, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary-200 text-primary-800 rounded-full text-sm font-medium"
                              >
                                {name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">
                      💡 {autoResult.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 비교 결과 */}
          {comparisonResult && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* 모델 1: Google ViT */}
              <div className="card border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {comparisonResult.models.vit.name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    모델 1
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      식별된 식물
                    </label>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {comparisonResult.models.vit.result.plant_name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">
                      신뢰도
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getConfidenceBgColor(
                          comparisonResult.models.vit.result.confidence
                        )}`}
                        style={{
                          width: `${
                            comparisonResult.models.vit.result.confidence * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p
                      className={`text-right text-lg font-semibold mt-1 ${getConfidenceColor(
                        comparisonResult.models.vit.result.confidence
                      )}`}
                    >
                      {(
                        comparisonResult.models.vit.result.confidence * 100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>

                  {comparisonResult.models.vit.result.common_names &&
                    comparisonResult.models.vit.result.common_names.length >
                      0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-2 block">
                          다른 가능성
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {comparisonResult.models.vit.result.common_names.map(
                            (name, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* 모델 2: PlantRecog */}
              <div className="card border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {comparisonResult.models.plantrecog.name}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    모델 2
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      식별된 식물
                    </label>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {comparisonResult.models.plantrecog.result.plant_name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">
                      신뢰도
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getConfidenceBgColor(
                          comparisonResult.models.plantrecog.result.confidence
                        )}`}
                        style={{
                          width: `${
                            comparisonResult.models.plantrecog.result
                              .confidence * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p
                      className={`text-right text-lg font-semibold mt-1 ${getConfidenceColor(
                        comparisonResult.models.plantrecog.result.confidence
                      )}`}
                    >
                      {(
                        comparisonResult.models.plantrecog.result.confidence *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>

                  {comparisonResult.models.plantrecog.result.common_names &&
                    comparisonResult.models.plantrecog.result.common_names
                      .length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-2 block">
                          다른 가능성
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {comparisonResult.models.plantrecog.result.common_names.map(
                            (name, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                              >
                                {name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* 안내 정보 */}
          <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              💡 테스트 가이드
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • <strong>Google ViT:</strong> 20종의 식물을 인식하는 전문 모델
              </li>
              <li>
                • <strong>PlantRecog:</strong> 299종의 꽃을 인식할 수 있는
                식물 전문 모델
              </li>
              <li>
                • <strong>자동 선택:</strong> 모델1이 50% 이상이면 모델1 우선,
                미만이면 모델2 선택
              </li>
              <li>
                • <strong>카메라 촬영:</strong> 📱 모바일에서 후면 카메라로
                바로 촬영 가능
              </li>
              <li>
                • 모든 결과는 한국어로 자동 번역됩니다
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModelTest;


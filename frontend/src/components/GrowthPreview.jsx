import { FiClock } from 'react-icons/fi';

const GrowthPreview = ({ growthPrediction }) => {
  if (!growthPrediction || !growthPrediction.stages) return null;

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <FiClock className="text-primary-500 mr-3" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">성장 예측</h2>
      </div>

      <div className="relative">
        {/* 타임라인 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {growthPrediction.stages.map((stage, index) => (
            <div key={index} className="relative">
              {/* 타임라인 연결선 (마지막 항목 제외) */}
              {index < growthPrediction.stages.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-200 z-0"></div>
              )}

              <div className="relative z-10">
                {/* 단계 표시 */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                  <span className="ml-2 font-semibold text-gray-800">
                    {stage.timeframe}
                  </span>
                </div>

                {/* 이미지 또는 플레이스홀더 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 shadow-sm">
                  {stage.image_url ? (
                    <img
                      src={stage.image_url}
                      alt={`${stage.timeframe} 성장 모습`}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🌱</div>
                        <p className="text-sm text-primary-700 font-medium">
                          {stage.timeframe}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 설명 */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <p className="text-sm text-primary-800">
            <strong>참고:</strong> 실제 성장 속도는 환경, 관리 방법에 따라 달라질 수 있습니다.
            정기적인 관리를 통해 건강한 성장을 도와주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrowthPreview;


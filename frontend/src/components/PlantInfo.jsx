import { FiCheckCircle } from 'react-icons/fi';

const PlantInfo = ({ identification }) => {
  if (!identification) return null;

  const confidencePercentage = (identification.confidence * 100).toFixed(1);

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">식물 정보</h2>
        <FiCheckCircle className="text-primary-500" size={32} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">식물 종명</label>
          <p className="text-xl font-semibold text-gray-900 mt-1">
            {identification.plant_name}
          </p>
        </div>

        {identification.scientific_name && (
          <div>
            <label className="text-sm font-medium text-gray-500">학명</label>
            <p className="text-lg text-gray-700 italic mt-1">
              {identification.scientific_name}
            </p>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            식별 신뢰도
          </label>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {confidencePercentage}%
          </p>
        </div>

        {identification.common_names && identification.common_names.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-500 mb-2 block">
              다른 가능성
            </label>
            <div className="flex flex-wrap gap-2">
              {identification.common_names.slice(0, 3).map((name, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantInfo;


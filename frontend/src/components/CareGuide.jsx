import {
  FiDroplet,
  FiSun,
  FiThermometer,
  FiWind,
  FiPackage,
  FiLayers,
  FiCheckCircle,
} from 'react-icons/fi';

const CareGuide = ({ careGuide }) => {
  if (!careGuide) return null;

  const careItems = [
    {
      icon: <FiDroplet className="text-blue-500" size={28} />,
      label: '물주기',
      content: careGuide.watering,
    },
    {
      icon: <FiSun className="text-yellow-500" size={28} />,
      label: '햇빛',
      content: careGuide.sunlight,
    },
    {
      icon: <FiThermometer className="text-red-500" size={28} />,
      label: '온도',
      content: careGuide.temperature,
    },
    {
      icon: <FiWind className="text-cyan-500" size={28} />,
      label: '습도',
      content: careGuide.humidity,
    },
    {
      icon: <FiPackage className="text-green-500" size={28} />,
      label: '비료',
      content: careGuide.fertilizer,
    },
    {
      icon: <FiLayers className="text-orange-500" size={28} />,
      label: '토양',
      content: careGuide.soil,
    },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">관리 가이드</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {careItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            <div className="flex-shrink-0 mt-1">{item.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      {careGuide.tips && careGuide.tips.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <FiCheckCircle className="text-primary-500 mr-2" size={20} />
            관리 팁
          </h3>
          <ul className="space-y-2">
            {careGuide.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2 mt-1">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareGuide;


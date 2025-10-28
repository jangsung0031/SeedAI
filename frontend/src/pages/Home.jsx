import { useNavigate } from 'react-router-dom';
import { FiCamera, FiBook, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiCamera className="text-primary-500" size={40} />,
      title: '식물 식별',
      description: 'AI가 사진으로 식물 종을 정확하게 식별합니다.',
    },
    {
      icon: <FiBook className="text-primary-500" size={40} />,
      title: '맞춤 관리법',
      description: '식물별 맞춤 관리 가이드를 제공합니다.',
    },
    {
      icon: <FiTrendingUp className="text-primary-500" size={40} />,
      title: '성장 예측',
      description: '시간에 따른 식물의 성장 과정을 예측합니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50">
      {/* 헤더 */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🌱</span>
          <h1 className="text-2xl font-bold text-gray-800">새싹아이</h1>
        </div>
      </header>

      {/* 메인 섹션 */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            반려식물의
            <span className="text-primary-600"> 완벽한 성장</span>을
            <br />
            AI와 함께
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            사진 한 장으로 식물을 식별하고, 맞춤 관리법과 성장 예측을 받아보세요.
            당신의 반려식물이 건강하게 자랄 수 있도록 도와드립니다.
          </p>

          <button
            onClick={() => navigate('/analyze')}
            className="btn-primary text-lg inline-flex items-center group"
          >
            지금 시작하기
            <FiArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={24}
            />
          </button>
        </div>

        {/* 기능 소개 */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 사용 방법 */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            간단한 3단계
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-lg mb-2">사진 업로드</h4>
              <p className="text-gray-600">식물 사진을 찍어서 업로드하세요</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-lg mb-2">AI 분석</h4>
              <p className="text-gray-600">AI가 식물을 식별하고 분석합니다</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-lg mb-2">결과 확인</h4>
              <p className="text-gray-600">관리법과 성장 예측을 확인하세요</p>
            </div>
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

export default Home;


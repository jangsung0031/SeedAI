const Loading = ({ message = '분석 중...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-sm mx-4 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {message}
        </h3>
        <p className="text-gray-600 text-sm">
          잠시만 기다려주세요...
        </p>
      </div>
    </div>
  );
};

export default Loading;


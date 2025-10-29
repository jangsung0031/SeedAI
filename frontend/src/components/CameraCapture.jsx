import { useState, useRef } from 'react';
import { FiCamera, FiX, FiRefreshCw } from 'react-icons/fi';

const CameraCapture = ({ onCapture }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const openCamera = async () => {
    try {
      // HTTPS 체크 (localhost 제외)
      const isSecureContext = window.isSecureContext;
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      
      if (!isSecureContext && !isLocalhost) {
        const isLocalNetwork = /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(
          window.location.hostname
        );
        
        if (!isLocalNetwork) {
          alert(
            '⚠️ 카메라는 보안 연결(HTTPS)에서만 사용할 수 있습니다.\n\n' +
            '💡 해결 방법:\n' +
            '1. 같은 Wi-Fi에 연결된 모바일에서 접속하세요\n' +
            '2. PC에서는 localhost로 접속하세요'
          );
          return;
        }
      }

      // 카메라 스트림 요청
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // 모바일 후면 카메라 우선
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      // 스트림 저장
      streamRef.current = stream;
      
      // UI 먼저 표시 (video 태그가 DOM에 마운트되도록)
      setIsCameraOpen(true);
      
      // video 태그가 렌더링될 때까지 대기
      setTimeout(() => {
        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          
          // 비디오 재생 시작
          videoRef.current.play().catch((playError) => {
            console.warn('비디오 자동 재생 실패:', playError);
          });
        }
      }, 100);
      
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      
      let errorMessage = '카메라에 접근할 수 없습니다.\n\n';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += '📱 카메라 권한을 허용해주세요.\n\n' +
                       '설정 > 사이트 설정 > 카메라에서 권한을 확인하세요.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += '📷 카메라를 찾을 수 없습니다.\n\n' +
                       '기기에 카메라가 연결되어 있는지 확인하세요.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += '⚠️ 카메라가 다른 앱에서 사용 중입니다.\n\n' +
                       '다른 앱을 종료한 후 다시 시도하세요.';
      } else {
        errorMessage += '💡 해결 방법:\n' +
                       '1. 같은 Wi-Fi 네트워크에 연결되어 있는지 확인\n' +
                       '2. 브라우저 설정에서 카메라 권한 확인\n' +
                       '3. 페이지를 새로고침 후 다시 시도';
      }
      
      alert(errorMessage);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', {
          type: 'image/jpeg',
        });
        
        // 미리보기 이미지 생성
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        
        // 부모 컴포넌트로 파일 전달
        onCapture(file);
        
        // 카메라 종료
        closeCamera();
      }, 'image/jpeg', 0.95);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    openCamera();
  };

  return (
    <div className="camera-capture">
      {!isCameraOpen && !capturedImage && (
        <button
          onClick={openCamera}
          className="btn-primary inline-flex items-center"
        >
          <FiCamera className="mr-2" size={20} />
          📷 카메라로 촬영
        </button>
      )}

      {isCameraOpen && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* 카메라 프리뷰 */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* 상단 닫기 버튼 */}
            <button
              onClick={closeCamera}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition"
            >
              <FiX size={24} className="text-gray-800" />
            </button>

            {/* 안내 텍스트 */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">
              <p className="text-sm">식물을 화면 중앙에 맞춰주세요</p>
            </div>
          </div>

          {/* 하단 촬영 버튼 */}
          <div className="bg-black py-8 flex justify-center items-center" style={{ minHeight: '120px' }}>
            <button
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 active:border-green-500 transition-all"
              style={{ 
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                position: 'relative',
                zIndex: 10
              }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <FiCamera size={32} className="text-gray-700" />
              </div>
            </button>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="mt-4">
          <div className="relative inline-block">
            <img
              src={capturedImage}
              alt="촬영된 사진"
              className="max-w-full h-auto rounded-lg border-2 border-primary-300"
            />
            <button
              onClick={retakePhoto}
              className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition"
            >
              <FiRefreshCw size={20} className="text-gray-800" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            📸 사진이 촬영되었습니다. 다시 촬영하려면 🔄 버튼을 누르세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;



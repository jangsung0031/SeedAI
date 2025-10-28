import { useState, useRef } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const ImageUpload = ({ onImageSelect, selectedImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      onImageSelect(file);
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="선택된 식물"
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
          <button
            onClick={removeImage}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition duration-200 ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <FiUpload className="mx-auto text-primary-500 mb-4" size={64} />
          <p className="text-xl font-semibold text-gray-700 mb-2">
            식물 사진을 업로드하세요
          </p>
          <p className="text-gray-500">
            드래그 앤 드롭 또는 클릭하여 파일 선택
          </p>
          <p className="text-sm text-gray-400 mt-2">
            JPG, PNG, GIF (최대 10MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;


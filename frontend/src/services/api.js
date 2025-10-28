import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 식물 이미지를 분석합니다.
 * @param {File} imageFile - 분석할 식물 이미지 파일
 * @returns {Promise} 분석 결과
 */
export const analyzePlant = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/api/plant/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('식물 분석 오류:', error);
    throw error;
  }
};

/**
 * 헬스체크 API 호출
 * @returns {Promise} 헬스체크 결과
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('헬스체크 오류:', error);
    throw error;
  }
};

export default api;


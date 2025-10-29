import axios from 'axios';

// PC와 모바일 모두 작동: 현재 접속한 호스트의 8000 포트 사용
const API_BASE_URL = `http://${window.location.hostname}:8000`;

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
 * 자동 모델 선택으로 식물 이미지를 분석합니다.
 * @param {File} imageFile - 분석할 식물 이미지 파일
 * @returns {Promise} 분석 결과
 */
export const analyzePlantAuto = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/api/plant/analyze-auto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('식물 분석 오류 (자동 선택):', error);
    throw error;
  }
};

/**
 * PlantRecog 모델로 식물 이미지를 분석합니다.
 * @param {File} imageFile - 분석할 식물 이미지 파일
 * @returns {Promise} 분석 결과
 */
export const analyzePlantV2 = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/api/plant/analyze-v2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('식물 분석 오류 (PlantRecog):', error);
    throw error;
  }
};

/**
 * 두 모델(ViT + PlantRecog)의 결과를 비교합니다.
 * @param {File} imageFile - 분석할 식물 이미지 파일
 * @returns {Promise} 두 모델의 비교 결과
 */
export const comparePlantModels = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/api/plant/compare', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('모델 비교 오류:', error);
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


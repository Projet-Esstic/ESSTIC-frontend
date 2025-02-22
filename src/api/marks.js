import apiClient from './client';

export const marksAPI = {
  // Get all marks
  fetchMarks() {
    return apiClient.get('/marks');
  },

  // Save a mark
  saveMark({ candidateId, subjectId, mark }) {
    return apiClient.post('/marks', { candidateId, subjectId, mark });
  }
};

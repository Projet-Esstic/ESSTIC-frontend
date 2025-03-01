import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';
const ENTRANCE_EXAM_API = `${API_URL}/entranceExams`;

export const examService = {
  // Get all entrance exams
  async getEntranceExams() {
    const response = await axios.get(ENTRANCE_EXAM_API);
    return response.data;
  },
  
  // Get a single entrance exam by ID
  async getEntranceExam(id) {
    const response = await axios.get(`${ENTRANCE_EXAM_API}/${id}`);
    return response.data;
  },

  // Create a new entrance exam
  async createEntranceExam(examData) {
    const response = await axios.post(ENTRANCE_EXAM_API, examData);
    return response.data;
  },

  // Update an existing entrance exam
  async updateEntranceExam(id, examData) {
    const response = await axios.put(`${ENTRANCE_EXAM_API}/${id}`, examData);
    return response.data;
  },

  // Delete an entrance exam
  async deleteEntranceExam(id) {
    const response = await axios.delete(`${ENTRANCE_EXAM_API}/${id}`);
    return response.data;
  }
};

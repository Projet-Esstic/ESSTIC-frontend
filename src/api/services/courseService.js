import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';
const COURSES_API = `${API_URL}/courses`;

export const courseService = {
  // Get all courses
  async getAllCourses() {
    const response = await axios.get(COURSES_API);
    return response.data;
  },

  // Get a single course by ID
  async getCourse(id) {
    const response = await axios.get(`${COURSES_API}/${id}`);
    return response.data;
  },

  // Create a new course
  async createCourse(courseData) {
    const response = await axios.post(COURSES_API, courseData);
    return response.data;
  },

  // Update an existing course
  async updateCourse(id, courseData) {
    const response = await axios.put(`${COURSES_API}/${id}`, courseData);
    return response.data;
  },

  // Delete a course
  async deleteCourse(id) {
    const response = await axios.delete(`${COURSES_API}/${id}`);
    return response.data;
  }
};

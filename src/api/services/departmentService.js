import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';
const DEPARTMENTS_API = `${API_URL}/departments`;

export const departmentService = {
  // Get all departments
  async getAllDepartments() {
    const response = await axios.get(DEPARTMENTS_API);
    return response.data;
  },

  // Get a single department by ID
  async getDepartment(id) {
    const response = await axios.get(`${DEPARTMENTS_API}/${id}`);
    return response.data;
  },

  // Create a new department
  async createDepartment(departmentData) {
    const response = await axios.post(DEPARTMENTS_API, departmentData);
    return response.data;
  },

  // Update an existing department
  async updateDepartment(id, departmentData) {
    const response = await axios.put(`${DEPARTMENTS_API}/${id}`, departmentData);
    return response.data;
  },

  // Delete a department
  async deleteDepartment(id) {
    const response = await axios.delete(`${DEPARTMENTS_API}/${id}`);
    return response.data;
  }
};

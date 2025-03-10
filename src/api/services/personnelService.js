import axios from '../client'; // Assuming axios instance is already set up
import { ENDPOINTS } from '../config'; // Assuming API endpoint constants are in a config file

export const personnelService = {
  // Fetch all personnel (Admin only)
  async getAllPersonnel() {
    try {
      const response = await axios.get(ENDPOINTS.PERSONNEL);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch personnel');
    }
  },

  // Fetch a single personnel by ID
  async getPersonnel(id) {
    try {
      const response = await axios.get(`${ENDPOINTS.PERSONNEL}/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch personnel');
    }
  },

  // Register a new personnel (Admin only)
  async registerPersonnel(personnelData) {
    try {
      const response = await axios.post(ENDPOINTS.PERSONNEL_REGISTER, personnelData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register personnel');
    }
  },

  // Update personnel details (Admin only)
  async updatePersonnel(id, updatedData) {
    try {
      const response = await axios.put(`${ENDPOINTS.PERSONNEL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update personnel');
    }
  },

  // Submit documents for a personnel
  async submitDocuments(id, documentData) {
    try {
      const response = await axios.post(`${ENDPOINTS.PERSONNEL}/${id}/submit-documents`, documentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit documents');
    }
  },

  // Get specific document for a personnel
  async getDocument(id, documentType) {
    try {
      const response = await axios.get(`${ENDPOINTS.PERSONNEL}/${id}/document/${documentType}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch document');
    }
  },
};

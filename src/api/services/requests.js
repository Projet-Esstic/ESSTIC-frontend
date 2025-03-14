import axios from 'axios';
import { ENDPOINTS } from '../config'; // Assuming API endpoint constants are in a config file

// Define the base URL for the API
// Function to submit an absence request
export const submitAbsenceRequest = async (absenceData) => {
  try {
    const response = await axios.post(`${ENDPOINTS.ABSENCE_REQUESTS}`, absenceData);
    return response.data;
  } catch (error) {
    console.error('Error submitting absence request:', error);
    throw error;
  }
};
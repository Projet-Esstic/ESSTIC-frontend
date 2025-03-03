import axios from '@/api/axios'
import { ENDPOINTS } from '@/api/endpoints'

export const marksService = {
  async getMarks() {
    try {
      const response = await axios.get(ENDPOINTS.MARKS)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error fetching marks:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch marks')
    }
  },

  async updateMarks(updates) {
    try {
      const response = await axios.post(ENDPOINTS.UPDATE_MARKS, { updates })
      return response.data.data || response.data
    } catch (error) {
      console.error('Error updating marks:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to update marks')
    }
  },

  async getCandidateMarks(candidateId) {
    try {
      const response = await axios.get(ENDPOINTS.CANDIDATE_MARKS(candidateId))
      return response.data.data || response.data
    } catch (error) {
      console.error('Error fetching candidate marks:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch candidate marks')
    }
  }
}

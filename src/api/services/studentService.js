import axios from 'axios'

export const studentService = {
  async createStudents(students) {
    try {
      console.log('Creating students:', students)
      const response = await axios.post('http://localhost:5000/api/students/add', students)
      console.log('API Response:', response)
      return response.data
    } catch (error) {
      console.error('Error in createStudents:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to create students')
    }
  }
} 
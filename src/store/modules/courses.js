import axios from 'axios'

const state = {
  courses: [],
  loading: false,
  error: null
}

const mutations = {
  setCourses(state, courses) {
    state.courses = courses || [] // Ensure we always set an array
  },
  setLoading(state, status) {
    state.loading = status
  },
  setError(state, error) {
    state.error = error
  },
  addCourse(state, course) {
    state.courses.push(course)
  },
  updateCourse(state, updatedCourse) {
    const index = state.courses.findIndex(course => course._id === updatedCourse._id)
    if (index !== -1) {
      state.courses[index] = updatedCourse
    }
  },
  deleteCourse(state, courseId) {
    state.courses = state.courses.filter(course => course._id !== courseId)
  }
}

const actions = {
  async fetchCourses({ commit }) {
    try {
      commit('setLoading', true)
      commit('setError', null)
      const response = await axios.get('/api/courses')
      commit('setCourses', response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
      commit('setError', error.message)
      commit('setCourses', []) // Set empty array on error
    } finally {
      commit('setLoading', false)
    }
  },

  async createCourse({ commit }, courseData) {
    try {
      commit('setLoading', true)
      commit('setError', null)
      const response = await axios.post('/api/courses', courseData)
      commit('addCourse', response.data)
      return response.data
    } catch (error) {
      console.error('Error creating course:', error)
      commit('setError', error.message)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  async updateCourse({ commit }, { id, courseData }) {
    try {
      commit('setLoading', true)
      commit('setError', null)
      const response = await axios.put(`/api/courses/${id}`, courseData)
      commit('updateCourse', response.data)
      return response.data
    } catch (error) {
      console.error('Error updating course:', error)
      commit('setError', error.message)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },

  async deleteCourse({ commit }, id) {
    try {
      commit('setLoading', true)
      commit('setError', null)
      await axios.delete(`/api/courses/${id}`)
      commit('deleteCourse', id)
    } catch (error) {
      console.error('Error deleting course:', error)
      commit('setError', error.message)
      throw error
    } finally {
      commit('setLoading', false)
    }
  }
}

const getters = {
  getAllCourses: state => state.courses,
  getLoading: state => state.loading,
  getError: state => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

import { courseService } from '../../api/services'

const state = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null
}

const getters = {
  getAllCourses: state => state.courses,
  getSelectedCourse: state => state.selectedCourse,
  isLoading: state => state.loading,
  getError: state => state.error
}

const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses
  },
  ADD_COURSE(state, course) {
    state.courses.push(course)
  },
  UPDATE_COURSE(state, updatedCourse) {
    const index = state.courses.findIndex(course => course.id === updatedCourse.id)
    if (index !== -1) {
      state.courses.splice(index, 1, updatedCourse)
    }
  },
  DELETE_COURSE(state, courseId) {
    state.courses = state.courses.filter(course => course.id !== courseId)
  },
  SET_SELECTED_COURSE(state, course) {
    state.selectedCourse = course
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchCourses({ commit }) {
    try {
      commit('SET_LOADING', true)
      const courses = await courseService.getAllCourses()
      commit('SET_COURSES', courses)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createCourse({ commit }, courseData) {
    try {
      commit('SET_LOADING', true)
      const course = await courseService.createCourse(courseData)
      commit('ADD_COURSE', course)
      commit('SET_ERROR', null)
      return course
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateCourse({ commit }, { id, courseData }) {
    try {
      commit('SET_LOADING', true)
      const course = await courseService.updateCourse(id, courseData)
      commit('UPDATE_COURSE', course)
      commit('SET_ERROR', null)
      return course
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteCourse({ commit }, id) {
    try {
      commit('SET_LOADING', true)
      await courseService.deleteCourse(id)
      commit('DELETE_COURSE', id)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  selectCourse({ commit }, course) {
    commit('SET_SELECTED_COURSE', course)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

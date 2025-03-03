import { marksService } from '@/api/services'

const state = {
  loading: false,
  error: null,
  marks: []
}

const getters = {
  isLoading: state => state.loading,
  getError: state => state.error,
  getMarks: state => state.marks,
  getMarksByCourse: state => courseId => {
    return state.marks.filter(mark => mark.courseId === courseId)
  },
  getMarksByCandidate: state => candidateId => {
    return state.marks.filter(mark => mark.candidateId === candidateId)
  }
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_MARKS(state, marks) {
    state.marks = marks
  },
  UPDATE_MARK(state, { candidateId, courseId, mark }) {
    const index = state.marks.findIndex(
      m => m.candidateId === candidateId && m.courseId === courseId
    )
    if (index !== -1) {
      state.marks[index] = { ...state.marks[index], ...mark }
    } else {
      state.marks.push({ candidateId, courseId, ...mark })
    }
  }
}

const actions = {
  async fetchMarks({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const marks = await marksService.getMarks()
      commit('SET_MARKS', marks)
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateMarks({ commit }, updates) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const results = await marksService.updateMarks(updates)
      results.forEach(result => {
        commit('UPDATE_MARK', result)
      })
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

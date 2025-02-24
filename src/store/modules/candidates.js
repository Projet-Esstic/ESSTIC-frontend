import { candidates as dummyCandidates } from '@/api/dummy-data'

// Initial state
const state = {
  candidates: [],
  loading: false,
  error: null
}

// Getters
const getters = {
  getAllCandidates: state => state.candidates,
  getCandidateById: state => id => state.candidates.find(c => c.id === id),
  getCandidatesByField: state => fieldId => state.candidates.filter(c => c.fieldId === fieldId),
  getCandidatesByStatus: state => status => state.candidates.filter(c => c.status === status),
  isLoading: state => state.loading,
  getError: state => state.error
}

// Actions
const actions = {
  async fetchCandidates({ commit }) {
    commit('SET_LOADING', true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      commit('SET_CANDIDATES', dummyCandidates)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateCandidateStatus({ commit }, { candidateId, status }) {
    commit('SET_LOADING', true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      commit('UPDATE_CANDIDATE_STATUS', { candidateId, status })
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async addCandidate({ commit }, candidateData) {
    commit('SET_LOADING', true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      const newCandidate = {
        id: Date.now(),
        ...candidateData,
        registrationNumber: `EE2024${String(state.candidates.length + 1).padStart(3, '0')}`,
        registrationDate: new Date().toISOString()
      }
      commit('ADD_CANDIDATE', newCandidate)
      commit('SET_ERROR', null)
      return newCandidate
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

// Mutations
const mutations = {
  SET_CANDIDATES(state, candidates) {
    state.candidates = candidates
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  UPDATE_CANDIDATE_STATUS(state, { candidateId, status }) {
    const candidate = state.candidates.find(c => c.id === candidateId)
    if (candidate) {
      candidate.status = status
    }
  },
  ADD_CANDIDATE(state, candidate) {
    state.candidates.push(candidate)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import { candidateService } from '@/api/services'

// Initial state
const state = {
  candidates: [],
  loading: false,
  error: null,
  uploadProgress: {
    transcript: 0,
    diploma: 0,
    cv: 0
  }
}

// Getters
const getters = {
  getAllCandidates: state => state.candidates,
  getCandidateById: state => id => state.candidates.find(c => c.id === id),
  getCandidatesByField: state => fieldId => state.candidates.filter(c => c.fieldId === fieldId),
  getCandidatesByStatus: state => status => state.candidates.filter(c => c.status === status),
  isLoading: state => state.loading,
  getError: state => state.error,
  getUploadProgress: state => documentType => state.uploadProgress[documentType]
}

// Actions
const actions = {
  async fetchCandidates({ commit }) {
    commit('SET_LOADING', true)
    try {
      const candidates = await candidateService.getAllCandidates()
      commit('SET_CANDIDATES', candidates)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateCandidateStatus({ commit }, { id, applicationStatus }) {
    commit('SET_LOADING', true)
    try {
      const updatedCandidate = await candidateService.updateCandidateStatus(id, { applicationStatus })
      commit('UPDATE_CANDIDATE_STATUS', { candidateId: id, status: updatedCandidate.applicationStatus })
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async addCandidate({ commit, state }, candidateData) {
    commit('SET_LOADING', true)
    try {
      // Add registration number to the form data
      const formDataWithRegNumber = {
        ...candidateData,
        registrationNumber: `EE2024${String(state.candidates.length + 1).padStart(3, '0')}`,
        registrationDate: new Date().toISOString()
      }
      
      const newCandidate = await candidateService.createCandidate(formDataWithRegNumber)
      commit('ADD_CANDIDATE', newCandidate)
      commit('SET_ERROR', null)
      return newCandidate
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateCandidateMarks({ commit }, { candidateId, courseId, mark }) {
    try {
      const response = await candidateService.updateCandidateMarks(candidateId, courseId, mark)
      commit('UPDATE_CANDIDATE_MARKS', { candidateId, courseId, mark })
      return response
    } catch (error) {
      console.error('Error updating candidate marks:', error)
      throw error
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
  },
  SET_UPLOAD_PROGRESS(state, { documentType, progress }) {
    state.uploadProgress[documentType] = progress
  },
  UPDATE_CANDIDATE_MARKS(state, { candidateId, courseId, mark }) {
    const candidate = state.candidates.find(c => c.id === candidateId)
    if (!candidate) return

    const existingMarkIndex = candidate.Marks?.findIndex(m => m.courseId.toString() === courseId)
    if (existingMarkIndex !== -1) {
      // Update existing mark
      const oldMark = candidate.Marks[existingMarkIndex].mark.currentMark
      candidate.Marks[existingMarkIndex].mark.currentMark = mark.currentMark
      
      // Add to modification history
      candidate.Marks[existingMarkIndex].mark.modified.push({
        preMark: oldMark,
        modMark: mark.currentMark,
        modifiedBy: {
          name: mark.modifiedBy.name,
          userId: mark.modifiedBy.userId
        },
        dateModified: new Date()
      })
    } else {
      // Add new mark
      if (!candidate.Marks) candidate.Marks = []
      candidate.Marks.push({
        courseId,
        mark: {
          currentMark: mark.currentMark,
          modified: [{
            preMark: 0,
            modMark: mark.currentMark,
            modifiedBy: {
              name: mark.modifiedBy.name,
              userId: mark.modifiedBy.userId
            },
            dateModified: new Date()
          }]
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

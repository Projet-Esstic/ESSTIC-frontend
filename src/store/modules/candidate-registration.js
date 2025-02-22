import { candidateService, fieldService, fileService } from '@/api/services'

export default {
  namespaced: true,
  state: {
    formSteps: {
      civilStatus: {
        profileImage: null  // Store the profile image URL
      },
      education: {},
      professional: {},
      extraActivities: {},
      diversInfo: {},
      review: {}
    },
    currentStep: 1,
    totalSteps: 6,
    candidates: [],
    fields: [],
    selectedCandidate: null,
    loading: false,
    error: null,
    uploadProgress: 0
  },

  getters: {
    getAllCandidates: state => state.candidates,
    getCurrentCandidate: state => state.selectedCandidate,
    getCandidateById: state => id => state.candidates.find(c => c.id === id),
    getFormData: state => step => state.formSteps[step] || {},
    getCurrentStep: state => state.currentStep,
    getTotalSteps: state => state.totalSteps,
    getFields: state => state.fields,
    getLoading: state => state.loading,
    getError: state => state.error,
    getUploadProgress: state => state.uploadProgress,
    getProfileImage: state => state.formSteps.civilStatus.profileImage,
    isStepComplete: state => step => {
      const stepData = state.formSteps[step]
      return stepData && Object.keys(stepData).length > 0
    }
  },

  mutations: {
    SET_FORM_DATA(state, { step, data }) {
      state.formSteps[step] = { ...state.formSteps[step], ...data }
    },
    SET_CURRENT_STEP(state, step) {
      state.currentStep = step
    },
    SET_SELECTED_CANDIDATE(state, candidate) {
      state.selectedCandidate = candidate
    },
    SET_CANDIDATES(state, candidates) {
      state.candidates = candidates
    },
    SET_FIELDS(state, fields) {
      state.fields = fields
    },
    SET_PROFILE_IMAGE(state, imageUrl) {
      state.formSteps.civilStatus = {
        ...state.formSteps.civilStatus,
        profileImage: imageUrl
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_UPLOAD_PROGRESS(state, progress) {
      state.uploadProgress = progress
    },
    RESET_FORM(state) {
      state.formSteps = {
        civilStatus: {
          profileImage: null
        },
        education: {},
        professional: {},
        extraActivities: {},
        diversInfo: {},
        review: {}
      }
      state.currentStep = 1
      state.uploadProgress = 0
    }
  },

  actions: {
    async initialize({ commit }) {
      commit('SET_LOADING', true)
      try {
        const [candidates, fields] = await Promise.all([
          candidateService.getAllCandidates(),
          fieldService.getAllFields()
        ])
        commit('SET_CANDIDATES', candidates)
        commit('SET_FIELDS', fields)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async uploadProfileImage({ commit }, file) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        // Upload progress simulation
        const progressInterval = setInterval(() => {
          const currentProgress = Math.min(95, Math.random() * 100)
          commit('SET_UPLOAD_PROGRESS', currentProgress)
        }, 200)
        
        // Upload file
        const imageUrl = await fileService.uploadFile(file)
        
        // Clear progress interval
        clearInterval(progressInterval)
        commit('SET_UPLOAD_PROGRESS', 100)
        
        // Set the profile image
        commit('SET_PROFILE_IMAGE', imageUrl)
        
        // Reset states after a delay
        setTimeout(() => {
          commit('SET_UPLOAD_PROGRESS', 0)
          commit('SET_LOADING', false)
        }, 500)
        
        return imageUrl
      } catch (error) {
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
        commit('SET_UPLOAD_PROGRESS', 0)
        throw error
      }
    },

    async deleteProfileImage({ commit, state }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        const currentImage = state.formSteps.civilStatus.profileImage
        if (currentImage) {
          await fileService.deleteFile(currentImage)
        }
        
        commit('SET_PROFILE_IMAGE', null)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
        throw error
      }
    },

    async saveStepData({ commit }, { step, data }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        
        // Save step data
        commit('SET_FORM_DATA', { step, data })
        
        return true
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    nextStep({ commit, state }) {
      if (state.currentStep < state.totalSteps) {
        commit('SET_CURRENT_STEP', state.currentStep + 1)
      }
    },

    previousStep({ commit, state }) {
      if (state.currentStep > 1) {
        commit('SET_CURRENT_STEP', state.currentStep - 1)
      }
    },

    async selectCandidate({ commit, state }, candidate) {
      commit('SET_LOADING', true)
      try {
        const fullCandidate = await candidateService.getCandidateById(candidate.id)
        commit('SET_SELECTED_CANDIDATE', fullCandidate)
        // Pre-fill form with candidate data
        Object.entries(fullCandidate).forEach(([key, value]) => {
          if (Object.keys(state.formSteps).includes(key)) {
            commit('SET_FORM_DATA', { step: key, data: value })
          }
        })
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async submitForm({ commit, state }) {
      commit('SET_LOADING', true)
      try {
        // Combine all form steps data
        const formData = {
          civilStatus: state.formSteps.civilStatus,
          education: state.formSteps.education,
          professional: state.formSteps.professional,
          extraActivities: state.formSteps.extraActivities,
          diversInfo: state.formSteps.diversInfo
        }
        
        let result
        if (state.selectedCandidate) {
          // Update existing candidate
          result = await candidateService.updateCandidate(state.selectedCandidate.id, formData)
        } else {
          // Create new candidate
          result = await candidateService.createCandidate(formData)
        }
        
        // Reset the form
        commit('RESET_FORM')
        commit('SET_ERROR', null)
        
        return { success: true, data: result }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
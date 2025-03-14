import { candidateService, fieldService } from '@/api/services'

export default {
  namespaced: true,
  state: {
    formSteps: {
      civilStatus: {
        profilePicture: null,
        selectedEntranceExam: null,
        email: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        lieuDeNaissance: '',
        gender: '',
        situationDeFamille: '',
        phoneNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: 'Cameroon'
        },
        examCenter: '',
        boitePostale: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        fieldOfStudy: '',
        documents: {
          transcript: null,
          diploma: null,
          cv: null,
          other: null
        },
        referencesFamilales: {
          nom_pere: '',
          nom_mere: ''
        },
        addressParents: ''
      },
      education: {},
      professional: {},
      extraActivities: {},
      diversInfo: {},
      review: {},
      payment: {
        paymentMethod: '',
        amount: '',
        paymentDate: '',
        transactionId: '',
        phoneNumber: '',
        receiptFile: null,
        status: 'pending'
      }
    },
    currentStep: 1,
    totalSteps: 7,
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
    getProfileImage: state => state.formSteps.civilStatus.profilePicture,
    isStepComplete: state => step => {
      const stepData = state.formSteps[step]
      return stepData && Object.keys(stepData).length > 0
    }
  },

  mutations: {
    UPDATE_EXAM_ID(state, examId) {
      state.formSteps.civilStatus.selectedEntranceExam = examId
    },
    UPDATE_FIELD_OF_STUDY(state, fieldId) {
      state.formSteps.civilStatus.fieldOfStudy = fieldId
    },
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
          profilePicture: null,
          selectedEntranceExam: null,
          email: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          lieuDeNaissance: '',
          gender: '',
          situationDeFamille: '',
          phoneNumber: '',
          address: {
            street: '',
            city: '',
            state: '',
            country: 'Cameroon'
          },
          examCenter: '',
          boitePostale: '',
          emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
          },
          fieldOfStudy: '',
          documents: {
            transcript: null,
            diploma: null,
            cv: null,
            other: null
          },
          referencesFamilales: {
            nom_pere: '',
            nom_mere: ''
          },
          addressParents: ''
        },
        education: {},
        professional: {},
        extraActivities: {},
        diversInfo: {},
        review: {},
        payment: {
          paymentMethod: '',
          amount: '',
          paymentDate: '',
          transactionId: '',
          phoneNumber: '',
          receiptFile: null,
          status: 'pending'
        }
      }
      state.currentStep = 1
      state.uploadProgress = 0
    },
    RESET_PAYMENT(state) {
      state.formSteps.payment = {
        paymentMethod: '',
        amount: '',
        paymentDate: '',
        transactionId: '',
        phoneNumber: '',
        receiptFile: null,
        status: 'pending'
      }
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

    // Update the action name to match what's being called
    updateStepData({ commit }, { step, data }) {
      commit('SET_FORM_DATA', { step, data })
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

    async selectCandidate({ commit }, candidate) {
      commit('SET_LOADING', true)
      try {
        const fullCandidate = await candidateService.getCandidateById(candidate.id)
        commit('SET_SELECTED_CANDIDATE', fullCandidate)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // async submitApplication({ commit}, formData) {
    //   commit('SET_LOADING', true)
    //   commit('SET_ERROR', null)
      
    //   try {
    //     // Get all form data
    //     const candidateData = JSON.parse(formData.get('candidateData'))

    //     // Create FormData for backend
    //     const backendFormData = new FormData()

    //     // Add all files
    //     if (formData.has('profilePicture')) {
    //       backendFormData.append('profilePicture', formData.get('profilePicture'))
    //     }
    //     if (formData.has('bankReceipt')) {
    //       backendFormData.append('bankReceipt', formData.get('bankReceipt'))
    //     }

    //     // Add all candidate data
    //     backendFormData.append('candidateData', JSON.stringify({
    //       personalInfo: candidateData.personalInfo,
    //       education: candidateData.education,
    //       professional: candidateData.professional,
    //       extraActivities: candidateData.extraActivities,
    //       diversInfo: candidateData.diversInfo,
    //       payment: candidateData.payment
    //     }))

    //     // Create the candidate using the candidateService
    //     const response = await candidateService.createCandidate(backendFormData)
        
    //     // Return the created candidate
    //     return response
    //   } catch (error) {
    //     commit('SET_ERROR', error.message)
    //     throw error
    //   } finally {
    //     commit('SET_LOADING', false)
    //   }
    // }
  }
}

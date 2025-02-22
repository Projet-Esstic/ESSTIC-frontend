export default {
  state: {
    formSteps: {
      civilStatus: {},        // État civil
      education: {},          // Études et diplômes
      professional: {},       // Activités professionnelles
      extraActivities: {},    // Autres activités
      diversInfo: {},         // Renseignements divers
      review: {}             // Récapitulatif
    },
    currentStep: 1,
    totalSteps: 6
  },
  mutations: {
    setFormData(state, { step, data }) {
      state.formSteps[step] = { ...state.formSteps[step], ...data }
    },
    setCurrentStep(state, step) {
      state.currentStep = step
    }
  },
  actions: {
    saveStepData({ commit }, { step, data }) {
      commit('setFormData', { step, data })
    },
    nextStep({ commit, state }) {
      commit('setCurrentStep', state.currentStep + 1)
    },
    previousStep({ commit, state }) {
      commit('setCurrentStep', state.currentStep - 1)
    }
  }
}
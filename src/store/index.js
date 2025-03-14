import { createStore } from 'vuex'
import { Theme } from '../utils/Theme'
import entranceExam from './modules/entrance-exam'
import candidates from './modules/candidates'
import candidateRegistration from './modules/candidate-registration'
import courses from './modules/courses'
import axios from '../api/client.js'
import { ENDPOINTS } from '../api/config.js'
export default createStore({
  state: {
    theme: localStorage.getItem('theme') || Theme.THEMES.LIGHT,
    themeClasses: Theme.getThemeClasses(false),
    candidateRegistration: {
      currentStep: 1,
      totalSteps: 6,
      completedSteps: [],
      formData: {}
    }
  },
  getters: {
    isDarkMode: state => state.theme === Theme.THEMES.DARK,
    getThemeClasses: state => state.themeClasses,
    getTextStyle: () => style => Theme.applyTextStyle(style),
    getSpacing: () => size => Theme.getSpacing(size),
    getPermissions: state => state.permissions,
    hasPermission: state => permission => state.permissions.includes(permission)
  
  },
  mutations: {
    toggleTheme(state) {
      state.theme = state.theme === Theme.THEMES.LIGHT ? Theme.THEMES.DARK : Theme.THEMES.LIGHT
      localStorage.setItem('theme', state.theme)
      
      // Update document class for dark mode
      if (state.theme === Theme.THEMES.DARK) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Update theme classes
      state.themeClasses = Theme.getThemeClasses(state.theme === Theme.THEMES.DARK)
    },
    setTheme(state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
      
      // Update document class for dark mode
      if (theme === Theme.THEMES.DARK) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Update theme classes
      state.themeClasses = Theme.getThemeClasses(theme === Theme.THEMES.DARK)
    },
    setCurrentStep(state, step) {
      console.log('Setting current step:', step)
      state.candidateRegistration.currentStep = step
    },
    completeStep(state, stepNumber) {
      console.log('Completing step:', stepNumber)
      // Initialize if undefined
      if (!state.candidateRegistration.completedSteps) {
        state.candidateRegistration.completedSteps = []
      }
      
      // Add step to completed steps if not already there
      if (!state.candidateRegistration.completedSteps.includes(stepNumber)) {
        state.candidateRegistration.completedSteps.push(stepNumber)
        state.candidateRegistration.completedSteps.sort((a, b) => a - b)
        console.log('Updated completed steps:', state.candidateRegistration.completedSteps)
      }
    },
    uncompleteStep(state, stepNumber) {
      console.log('Uncompleting step:', stepNumber)
      if (!state.candidateRegistration.completedSteps) {
        state.candidateRegistration.completedSteps = []
        return
      }
      state.candidateRegistration.completedSteps = state.candidateRegistration.completedSteps.filter(step => step !== stepNumber)
      console.log('Updated completed steps:', state.candidateRegistration.completedSteps)
    },
    resetStepCompletion(state) {
      state.candidateRegistration.completedSteps = []
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
      localStorage.setItem('permissions', JSON.stringify(permissions)) // Store in localStorage for persistence
    }
  },
  actions: {
    initializeTheme({ commit, state }) {
      // Set initial theme on app load
      commit('setTheme', state.theme)
    },
    async fetchPermissions({ commit }) {
      try {
        const response = await axios(ENDPOINTS.ROLES_PERMISSION) // Replace with actual API endpoint
        const data = await response.json()
        commit('setPermissions', data.permissions)
      } catch (error) {
        console.error('Failed to fetch permissions:', error)
      }
    }
  },
  modules: {
    entranceExam,
    candidates,
    candidateRegistration,
    courses
  }
})
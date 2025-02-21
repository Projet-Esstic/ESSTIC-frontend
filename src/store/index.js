import { createStore } from 'vuex'
import { Theme } from '../utils/Theme'
import entranceExam from './modules/entrance-exam'

export default createStore({
  modules: {
    entranceExam
  },
  state: {
    theme: localStorage.getItem('theme') || Theme.THEMES.LIGHT,
    themeClasses: Theme.getThemeClasses(false)
  },
  getters: {
    isDarkMode: state => state.theme === Theme.THEMES.DARK,
    getThemeClasses: state => state.themeClasses,
    getTextStyle: () => style => Theme.applyTextStyle(style),
    getSpacing: () => size => Theme.getSpacing(size)
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
    }
  },
  actions: {
    initializeTheme({ commit, state }) {
      // Set initial theme on app load
      commit('setTheme', state.theme)
    }
  }
})

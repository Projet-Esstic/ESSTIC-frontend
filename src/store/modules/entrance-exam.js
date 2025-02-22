import { 
  candidateService, 
  marksService, 
  subjectService, 
  fieldService,
  examService 
} from '@/api/services'

// State
const state = {
  academicYear: null,
  examSessions: [],
  subjects: [],
  candidates: [],
  marks: {},
  fields: [],
  loading: false,
  error: null,
  selectedSession: null,
  selectedField: null
}

// Getters
const getters = {
  getCurrentSession: state => state.selectedSession,
  getSubjects: state => state.subjects,
  getCandidates: state => state.candidates,
  getFields: state => state.fields,
  getMarks: state => state.marks,
  getLoading: state => state.loading,
  getError: state => state.error,
  
  getMarksBySubject: state => (subjectId) => {
    const result = {}
    Object.entries(state.marks).forEach(([candidateId, marks]) => {
      if (marks[subjectId] !== undefined) {
        result[candidateId] = marks[subjectId]
      }
    })
    return result
  },

  getMarksByCandidateAndSubject: state => (candidateId, subjectId) => {
    return state.marks[candidateId]?.[subjectId] || 0
  },

  getSubjectById: state => (subjectId) => {
    return state.subjects.find(subject => subject.id === subjectId)
  },

  getCandidatesByField: state => (fieldId) => {
    if (!fieldId) return state.candidates
    return state.candidates.filter(candidate => candidate.fieldId === fieldId)
  },

  getClassAverageBySubject: state => (subjectId, candidates) => {
    const marks = state.marks
    const validCandidates = candidates.filter(c => marks[c.id]?.[subjectId] !== undefined)
    if (validCandidates.length === 0) return 0
    
    const total = validCandidates.reduce((sum, candidate) => {
      return sum + (marks[candidate.id][subjectId] || 0)
    }, 0)
    
    return total / validCandidates.length
  },

  getWeightedAverageBySubject: state => (candidateId) => {
    const candidate = state.candidates.find(c => c.id === candidateId)
    if (!candidate || !state.marks[candidateId]) return 0

    let totalWeightedMarks = 0
    let totalCoefficients = 0

    state.subjects.forEach(subject => {
      const mark = state.marks[candidateId][subject.id] || 0
      totalWeightedMarks += mark * subject.coefficient
      totalCoefficients += subject.coefficient
    })

    return totalCoefficients > 0 ? totalWeightedMarks / totalCoefficients : 0
  }
}

// Mutations
const mutations = {
  SET_ACADEMIC_YEAR(state, year) {
    state.academicYear = year
  },
  SET_EXAM_SESSIONS(state, sessions) {
    state.examSessions = sessions
  },
  SET_SELECTED_SESSION(state, session) {
    state.selectedSession = session
  },
  SET_SELECTED_FIELD(state, field) {
    state.selectedField = field
  },
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects
  },
  SET_CANDIDATES(state, candidates) {
    state.candidates = candidates
  },
  SET_FIELDS(state, fields) {
    state.fields = fields
  },
  SET_MARKS(state, marks) {
    state.marks = marks
  },
  UPDATE_MARK(state, { candidateId, subjectId, mark }) {
    if (!state.marks[candidateId]) {
      state.marks[candidateId] = {}
    }
    state.marks[candidateId][subjectId] = mark
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

// Actions
const actions = {
  async initialize({ commit }) {
    commit('SET_LOADING', true)
    try {
      const [currentYear, fields, subjects] = await Promise.all([
        examService.getCurrentAcademicYear(),
        fieldService.getAllFields(),
        subjectService.getAllSubjects()
      ])
      
      commit('SET_ACADEMIC_YEAR', currentYear)
      commit('SET_FIELDS', fields)
      commit('SET_SUBJECTS', subjects)
      
      if (currentYear) {
        const sessions = await examService.getExamSessions(currentYear.id)
        commit('SET_EXAM_SESSIONS', sessions)
        const activeSession = sessions.find(s => s.isActive)
        if (activeSession) {
          commit('SET_SELECTED_SESSION', activeSession)
        }
      }
      
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchCandidates({ commit, state }) {
    commit('SET_LOADING', true)
    try {
      let candidates
      if (state.selectedField) {
        candidates = await candidateService.getCandidatesByField(state.selectedField.id)
      } else {
        candidates = await candidateService.getAllCandidates()
      }
      commit('SET_CANDIDATES', candidates)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchMarks({ commit }) {
    commit('SET_LOADING', true)
    try {
      const marks = await marksService.getAllMarks()
      commit('SET_MARKS', marks)
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateMark({ commit }, { candidateId, subjectId, mark }) {
    commit('SET_LOADING', true)
    try {
      await marksService.updateCandidateMarks(candidateId, subjectId, mark)
      commit('UPDATE_MARK', { candidateId, subjectId, mark })
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async setSelectedField({ commit, dispatch }, field) {
    commit('SET_SELECTED_FIELD', field)
    await dispatch('fetchCandidates')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

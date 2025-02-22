//import { marksAPI } from '@/api/marks';

// Dummy data for testing
const dummyData = {
  candidates: [
    {
      id: 1,
      registrationNumber: 'REG001',
      name: 'John Doe',
      fieldId: 1
    },
    {
      id: 2,
      registrationNumber: 'REG002',
      name: 'Jane Smith',
      fieldId: 2
    },
    {
      id: 3,
      registrationNumber: 'REG003',
      name: 'Alice Johnson',
      fieldId: 1
    }
  ],
  subjects: [
    { id: 1, name: 'Mathematics', coefficient: 4 },
    { id: 2, name: 'Physics', coefficient: 3 },
    { id: 3, name: 'English', coefficient: 2 }
  ],
  // Initial marks data
  marks: {
    1: { // candidateId
      1: 15, // subjectId: mark
      2: 14,
      3: 16
    },
    2: {
      1: 17,
      2: 15,
      3: 18
    },
    3: {
      1: 16,
      2: 13,
      3: 17
    }
  }
};

// State
const state = {
  exams: [],
  subjects: dummyData.subjects,
  candidates: dummyData.candidates,
  marks: dummyData.marks,
  fields: [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Network' },
    { id: 3, name: 'Security' },
    { id: 4, name: 'Artificial Intelligence' }
  ],
  loading: false,
  error: null
}

// Getters
const getters = {
  getExams: state => state.exams,
  getSubjects: state => state.subjects,
  getCandidates: state => state.candidates,
  getFields: state => state.fields,
  getMarks: state => state.marks,
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
  getClassAverageBySubject: (state, getters) => (subjectId, candidates) => {
    const marks = getters.getMarksBySubject(subjectId)
    const validCandidates = candidates.filter(c => marks[c.id] !== undefined)
    if (validCandidates.length === 0) return 0
    
    const total = validCandidates.reduce((sum, candidate) => {
      return sum + (marks[candidate.id] || 0)
    }, 0)
    
    return total / validCandidates.length
  },
  getWeightedAverageBySubject: (state, getters) => (subjectId, candidates) => {
    const subject = getters.getSubjectById(subjectId)
    if (!subject) return 0
    
    const average = getters.getClassAverageBySubject(subjectId, candidates)
    return average * subject.coefficient
  }
}

// Mutations
const mutations = {
  addExam(state, exam) {
    state.exams.push(exam);
  },
  deleteExam(state, examId) {
    state.exams = state.exams.filter(exam => exam.id !== examId);
  },
  updateExam(state, updatedExam) {
    const index = state.exams.findIndex(exam => exam.id === updatedExam.id);
    if (index !== -1) {
      state.exams[index] = updatedExam;
    }
  },
  updateFields(state, fields) {
    state.fields = fields;
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
  async fetchMarks({ commit }) {
    try {
      commit('SET_LOADING', true)
      // When backend is ready, uncomment this:
      // const response = await marksAPI.fetchMarks()
      // commit('SET_MARKS', response.data)
      
      // For now, use dummy data
      commit('SET_MARKS', dummyData.marks)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async saveMarks({ commit }, payload) {
    try {
      commit('SET_LOADING', true)
      // When backend is ready, uncomment this:
      // await marksAPI.saveMark(payload)
      
      // For now, just update the state
      commit('UPDATE_MARK', payload)
    } catch (error) {
      commit('SET_ERROR', error.message)
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

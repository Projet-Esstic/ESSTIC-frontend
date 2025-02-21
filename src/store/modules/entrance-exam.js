export default {
  namespaced: true,
  state: {
    courses: [],
    fields: [
      { id: 1, name: 'Software Engineering' },
      { id: 2, name: 'Network' },
      { id: 3, name: 'Security' },
      { id: 4, name: 'Artificial Intelligence' }
    ]
  },
  mutations: {
    updateCourses(state, courses) {
      state.courses = courses;
    },
    updateFields(state, fields) {
      state.fields = fields;
    }
  },
  getters: {
    getFieldById: (state) => (id) => {
      return state.fields.find(field => field.id === id);
    }
  }
};

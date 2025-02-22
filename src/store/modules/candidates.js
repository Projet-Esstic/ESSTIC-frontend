const state = {
  candidates: [
    {
      id: 1,
      name: 'John Doe',
      fieldId: 1,
      status: 'validated',
      registrationNumber: 'EE2024001',
      registrationDate: new Date('2024-02-20').toISOString()
    },
    {
      id: 2,
      name: 'Jane Smith',
      fieldId: 1,
      status: 'validated',
      registrationNumber: 'EE2024002',
      registrationDate: new Date('2024-02-19').toISOString()
    },
    {
      id: 3,
      name: 'Alice Johnson',
      fieldId: 1,
      status: 'pending',
      registrationNumber: 'EE2024003',
      registrationDate: new Date('2024-02-21').toISOString()
    },
    {
      id: 4,
      name: 'Bob Wilson',
      fieldId: 2,
      status: 'validated',
      registrationNumber: 'EE2024004',
      registrationDate: new Date('2024-02-18').toISOString()
    },
    {
      id: 5,
      name: 'Carol Martinez',
      fieldId: 2,
      status: 'validated',
      registrationNumber: 'EE2024005',
      registrationDate: new Date('2024-02-19').toISOString()
    },
    {
      id: 6,
      name: 'David Brown',
      fieldId: 2,
      status: 'rejected',
      registrationNumber: 'EE2024006',
      registrationDate: new Date('2024-02-20').toISOString()
    },
    {
      id: 7,
      name: 'Eva Garcia',
      fieldId: 3,
      status: 'validated',
      registrationNumber: 'EE2024007',
      registrationDate: new Date('2024-02-17').toISOString()
    },
    {
      id: 8,
      name: 'Frank Lee',
      fieldId: 3,
      status: 'validated',
      registrationNumber: 'EE2024008',
      registrationDate: new Date('2024-02-18').toISOString()
    },
    {
      id: 9,
      name: 'Grace Taylor',
      fieldId: 3,
      status: 'validated',
      registrationNumber: 'EE2024009',
      registrationDate: new Date('2024-02-19').toISOString()
    },
    {
      id: 10,
      name: 'Henry Wilson',
      fieldId: 1,
      status: 'validated',
      registrationNumber: 'EE2024010',
      registrationDate: new Date('2024-02-20').toISOString()
    }
  ]
};

const mutations = {
  updateCandidate(state, updatedCandidate) {
    const index = state.candidates.findIndex(c => c.id === updatedCandidate.id);
    if (index !== -1) {
      state.candidates[index] = { ...updatedCandidate };
    }
  },
  
  updateCandidateStatus(state, { candidateId, status }) {
    const index = state.candidates.findIndex(c => c.id === candidateId);
    if (index !== -1) {
      state.candidates[index] = {
        ...state.candidates[index],
        status
      };
    }
  }
};

const getters = {
  getCandidates: (state) => state.candidates,
  
  getCandidatesByField: (state) => (fieldId) => {
    return state.candidates.filter(c => c.fieldId === fieldId);
  },
  
  getCandidatesByStatus: (state) => (status) => {
    return state.candidates.filter(c => c.status === status);
  },
  
  getPendingCandidates: (state) => {
    return state.candidates.filter(c => c.status === 'pending');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};

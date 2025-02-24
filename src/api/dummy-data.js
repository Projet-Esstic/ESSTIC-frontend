// Dummy data for development and testing

// Fields of study
export const fields = [
  { id: 1, name: 'Journalisme' },
  { id: 2, name: 'Communication des Organisations' },
  { id: 3, name: 'Publicité' },
  { id: 4, name: 'Relations Publiques' }
]

// Courses/Subjects
export const courses = [
  {
    id: 1,
    name: 'Mathematics',
    code: 'MATH101',
    duration: 120,
    totalMarks: 20,
    coefficients: {
      1: 4, // Journalisme
      2: 3, // Communication des Organisations
      3: 3, // Publicité
      4: 3  // Relations Publiques
    },
    createdAt: '2025-02-22T08:00:00Z',
    updatedAt: '2025-02-22T08:00:00Z'
  },
  {
    id: 2,
    name: 'French',
    code: 'FRE101',
    duration: 180,
    totalMarks: 20,
    coefficients: {
      1: 5, // Journalisme
      2: 5, // Communication des Organisations
      3: 4, // Publicité
      4: 4  // Relations Publiques
    },
    createdAt: '2025-02-22T08:00:00Z',
    updatedAt: '2025-02-22T08:00:00Z'
  },
  {
    id: 3,
    name: 'English',
    code: 'ENG101',
    duration: 120,
    totalMarks: 20,
    coefficients: {
      1: 4, // Journalisme
      2: 4, // Communication des Organisations
      3: 3, // Publicité
      4: 4  // Relations Publiques
    },
    createdAt: '2025-02-22T08:00:00Z',
    updatedAt: '2025-02-22T08:00:00Z'
  }
]

// Candidates
export const candidates = [
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

// Marks
export const marks = [
  {
    candidateId: 1,
    subjectId: 1,
    mark: 15
  },
  {
    candidateId: 1,
    subjectId: 2,
    mark: 17
  },
  {
    candidateId: 1,
    subjectId: 3,
    mark: 16
  },
  {
    candidateId: 2,
    subjectId: 1,
    mark: 16
  },
  {
    candidateId: 2,
    subjectId: 2,
    mark: 18
  },
  {
    candidateId: 2,
    subjectId: 3,
    mark: 15
  },
  {
    candidateId: 3,
    subjectId: 1,
    mark: 14
  },
  {
    candidateId: 3,
    subjectId: 2,
    mark: 16
  },
  {
    candidateId: 4,
    subjectId: 1,
    mark: 17
  },
  {
    candidateId: 5,
    subjectId: 1,
    mark: 15.5
  }
]

// Academic Years
export const academicYears = [
  {
    id: 1,
    year: '2024-2025',
    isCurrent: true
  },
  {
    id: 2,
    year: '2023-2024',
    isCurrent: false
  }
]

// Exam Sessions
export const examSessions = [
  {
    id: 1,
    academicYearId: 1,
    name: 'First Session',
    startDate: '2025-06-01',
    endDate: '2025-06-15'
  },
  {
    id: 2,
    academicYearId: 1,
    name: 'Second Session',
    startDate: '2025-09-01',
    endDate: '2025-09-15'
  }
]

// Exam Centers
export const examCenters = [
  {
    id: 1,
    name: 'Yaoundé Center',
    location: 'Yaoundé',
    capacity: 500
  },
  {
    id: 2,
    name: 'Douala Center',
    location: 'Douala',
    capacity: 400
  }
]

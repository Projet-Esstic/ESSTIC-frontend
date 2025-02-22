export const mockSubjects = [
  {
    id: 'INF101',
    name: 'Introduction à l\'Informatique',
    code: 'INF101',
    credits: 4,
    description: 'Introduction aux concepts fondamentaux de l\'informatique',
    semester: 1,
    coefficients: {
      cc: 0.4,    // Contrôle Continu
      tp: 0.2,    // Travaux Pratiques
      exam: 0.4   // Examen Final
    },
    prerequisites: [],
    objectives: [
      'Comprendre les concepts de base de l\'informatique',
      'Maîtriser les fondamentaux de la programmation',
      'Apprendre la logique algorithmique'
    ],
    department: 'Informatique'
  },
  {
    id: 'COM201',
    name: 'Communication et Médias',
    code: 'COM201',
    credits: 3,
    description: 'Théories et pratiques de la communication médiatique',
    semester: 1,
    coefficients: {
      cc: 0.3,
      tp: 0.3,
      exam: 0.4
    },
    prerequisites: [],
    objectives: [
      'Comprendre les théories de la communication',
      'Analyser les médias modernes',
      'Développer des compétences en communication'
    ],
    department: 'Communication'
  },
  {
    id: 'JRN301',
    name: 'Journalisme Digital',
    code: 'JRN301',
    credits: 5,
    description: 'Techniques et pratiques du journalisme à l\'ère numérique',
    semester: 1,
    coefficients: {
      cc: 0.3,
      tp: 0.4,
      exam: 0.3
    },
    prerequisites: ['COM201'],
    objectives: [
      'Maîtriser les outils du journalisme numérique',
      'Produire du contenu multimédia',
      'Comprendre l\'écosystème des médias en ligne'
    ],
    department: 'Journalisme'
  },
  {
    id: 'PRD401',
    name: 'Production Audiovisuelle',
    code: 'PRD401',
    credits: 6,
    description: 'Techniques de production audiovisuelle et multimédia',
    semester: 1,
    coefficients: {
      cc: 0.2,
      tp: 0.5,
      exam: 0.3
    },
    prerequisites: ['COM201'],
    objectives: [
      'Maîtriser les équipements audiovisuels',
      'Réaliser des productions multimédia',
      'Développer une vision créative'
    ],
    department: 'Production'
  }
]

// Sample marks data structure
export const mockMarks = {
  // Student ID as key
  'STD001': {
    'INF101': {
      cc: 15.5,
      tp: 17.0,
      exam: 14.5,
      final: 15.4  // (15.5 * 0.4) + (17.0 * 0.2) + (14.5 * 0.4)
    },
    'COM201': {
      cc: 16.0,
      tp: 15.5,
      exam: 14.0,
      final: 15.0
    },
    'JRN301': {
      cc: 13.5,
      tp: 16.0,
      exam: 15.0,
      final: 14.9
    },
    'PRD401': {
      cc: 14.0,
      tp: 17.5,
      exam: 15.5,
      final: 16.0
    }
  }
}

// Helper function to calculate final grade
export const calculateFinalGrade = (marks, subject) => {
  const subjectInfo = mockSubjects.find(s => s.id === subject)
  if (!subjectInfo || !marks) return 0

  const { cc, tp, exam } = marks
  const coefficients = subjectInfo.coefficients

  return (
    (cc * coefficients.cc) +
    (tp * coefficients.tp) +
    (exam * coefficients.exam)
  ).toFixed(1)
}

// Helper function to get subject info
export const getSubjectInfo = (subjectId) => {
  return mockSubjects.find(s => s.id === subjectId)
}

// Helper function to get student marks
export const getStudentMarks = (studentId) => {
  return mockMarks[studentId] || {}
}

// Helper function to get student subject grade
export const getStudentSubjectGrade = (studentId, subjectId) => {
  const studentMarks = mockMarks[studentId]
  if (!studentMarks || !studentMarks[subjectId]) return null
  return studentMarks[subjectId].final
}

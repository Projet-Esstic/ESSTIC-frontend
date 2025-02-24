// Dummy data for the entire application

// Fields/Departments
export const fields = [
  { id: 1, name: 'Journalisme', code: 'JOU' },
  { id: 2, name: 'Communication des Organisations', code: 'CO' },
  { id: 3, name: 'Publicité', code: 'PUB' },
  { id: 4, name: 'Communication pour le Développement', code: 'CPD' }
]

// Subjects for entrance exam
export const subjects = [
  { 
    id: 1, 
    name: 'Culture Générale', 
    coefficient: 4,
    totalPoints: 20
  },
  { 
    id: 2, 
    name: 'Français', 
    coefficient: 3,
    totalPoints: 20
  },
  { 
    id: 3, 
    name: 'Anglais', 
    coefficient: 3,
    totalPoints: 20
  },
  { 
    id: 4, 
    name: 'Actualité', 
    coefficient: 2,
    totalPoints: 20
  }
]

// Candidates
export const candidates = [
  {
    id: 1,
    registrationNumber: 'ESS2025001',
    name: 'Kamga Jean',
    fieldId: 1,
    civilStatus: {
      dateOfBirth: '1995-05-15',
      placeOfBirth: 'Yaoundé',
      gender: 'M',
      address: 'Yaoundé, Cameroun',
      phone: '+237 655123456',
      email: 'jean.kamga@email.com'
    },
    education: {
      lastDiploma: 'Licence en Communication',
      university: 'Université de Yaoundé II',
      year: 2024
    }
  },
  {
    id: 2,
    registrationNumber: 'ESS2025002',
    name: 'Nkomo Sophie',
    fieldId: 2,
    civilStatus: {
      dateOfBirth: '1997-08-23',
      placeOfBirth: 'Douala',
      gender: 'F',
      address: 'Douala, Cameroun',
      phone: '+237 699887766',
      email: 'sophie.nkomo@email.com'
    },
    education: {
      lastDiploma: 'Licence en Journalisme',
      university: 'Université de Douala',
      year: 2024
    }
  }
]

// Marks for entrance exam
export const marks = {
  1: { // Candidate ID 1
    1: 15, // Subject ID 1 (Culture Générale)
    2: 14, // Subject ID 2 (Français)
    3: 16, // Subject ID 3 (Anglais)
    4: 13  // Subject ID 4 (Actualité)
  },
  2: { // Candidate ID 2
    1: 17,
    2: 15,
    3: 14,
    4: 16
  }
}

// Academic Years
export const academicYears = [
  { id: 1, year: '2024-2025', isCurrent: true },
  { id: 2, year: '2023-2024', isCurrent: false }
]

// Exam Sessions
export const examSessions = [
  { 
    id: 1, 
    academicYearId: 1,
    name: 'Session Normale',
    startDate: '2024-09-01',
    endDate: '2024-09-05',
    isActive: true
  },
  { 
    id: 2, 
    academicYearId: 1,
    name: 'Session de Rattrapage',
    startDate: '2024-09-15',
    endDate: '2024-09-20',
    isActive: false
  }
]

// Exam Centers
export const examCenters = [
  { id: 1, name: 'Yaoundé', capacity: 500 },
  { id: 2, name: 'Douala', capacity: 300 },
  { id: 3, name: 'Bafoussam', capacity: 200 }
]

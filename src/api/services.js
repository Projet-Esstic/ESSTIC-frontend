import { 
  candidates, 
  marks, 
  subjects, 
  fields, 
  academicYears,
  examSessions,
  examCenters 
} from './dummy-data'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to simulate API errors
const simulateError = (probability = 0.1) => {
  if (Math.random() < probability) {
    throw new Error('Simulated API error')
  }
}

// Simulate file storage
const fileStorage = new Map()

export const candidateService = {
  // Get all candidates
  async getAllCandidates() {
    await delay(500)
    simulateError()
    return candidates
  },

  // Get candidate by ID
  async getCandidateById(id) {
    await delay(300)
    simulateError()
    const candidate = candidates.find(c => c.id === id)
    if (!candidate) throw new Error('Candidate not found')
    return candidate
  },

  // Get candidates by field
  async getCandidatesByField(fieldId) {
    await delay(500)
    simulateError()
    return candidates.filter(c => c.fieldId === fieldId)
  },

  // Create new candidate
  async createCandidate(candidateData) {
    await delay(800)
    simulateError()
    const newId = Math.max(...candidates.map(c => c.id)) + 1
    const newCandidate = {
      id: newId,
      registrationNumber: `ESS2025${String(newId).padStart(3, '0')}`,
      ...candidateData
    }
    candidates.push(newCandidate)
    return newCandidate
  },

  // Update candidate
  async updateCandidate(id, candidateData) {
    await delay(600)
    simulateError()
    const index = candidates.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Candidate not found')
    candidates[index] = { ...candidates[index], ...candidateData }
    return candidates[index]
  }
}

export const marksService = {
  // Get marks for a candidate
  async getCandidateMarks(candidateId) {
    await delay(300)
    simulateError()
    return marks[candidateId] || {}
  },

  // Get marks for all candidates
  async getAllMarks() {
    await delay(500)
    simulateError()
    return marks
  },

  // Update marks for a candidate
  async updateCandidateMarks(candidateId, subjectId, mark) {
    await delay(400)
    simulateError()
    if (!marks[candidateId]) marks[candidateId] = {}
    marks[candidateId][subjectId] = mark
    return marks[candidateId]
  },

  // Calculate average for a candidate
  async calculateAverage(candidateId) {
    await delay(300)
    simulateError()
    const candidateMarks = marks[candidateId]
    if (!candidateMarks) return 0

    let totalWeightedMarks = 0
    let totalCoefficients = 0

    subjects.forEach(subject => {
      if (candidateMarks[subject.id]) {
        totalWeightedMarks += candidateMarks[subject.id] * subject.coefficient
        totalCoefficients += subject.coefficient
      }
    })

    return totalCoefficients > 0 ? totalWeightedMarks / totalCoefficients : 0
  }
}

export const subjectService = {
  // Get all subjects
  async getAllSubjects() {
    await delay(300)
    simulateError()
    return subjects
  },

  // Get subject by ID
  async getSubjectById(id) {
    await delay(200)
    simulateError()
    const subject = subjects.find(s => s.id === id)
    if (!subject) throw new Error('Subject not found')
    return subject
  }
}

export const fieldService = {
  // Get all fields
  async getAllFields() {
    await delay(300)
    simulateError()
    return fields
  },

  // Get field by ID
  async getFieldById(id) {
    await delay(200)
    simulateError()
    const field = fields.find(f => f.id === id)
    if (!field) throw new Error('Field not found')
    return field
  }
}

export const examService = {
  // Get all academic years
  async getAcademicYears() {
    await delay(300)
    simulateError()
    return academicYears
  },

  // Get current academic year
  async getCurrentAcademicYear() {
    await delay(200)
    simulateError()
    return academicYears.find(y => y.isCurrent)
  },

  // Get exam sessions
  async getExamSessions(academicYearId) {
    await delay(400)
    simulateError()
    return examSessions.filter(s => s.academicYearId === academicYearId)
  },

  // Get exam centers
  async getExamCenters() {
    await delay(300)
    simulateError()
    return examCenters
  }
}

export const fileService = {
  // Upload file
  async uploadFile(file) {
    await delay(1000) // Simulate upload time
    simulateError()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      
      reader.onload = () => {
        const fileId = Date.now().toString()
        const fileUrl = reader.result // Store as base64
        fileStorage.set(fileId, fileUrl)
        resolve(fileUrl)
      }
      
      reader.onerror = reject
    })
  },

  // Get file info
  async getFileInfo(fileUrl) {
    await delay(300)
    simulateError()
    return { url: fileUrl }
  },

  // Delete file
  async deleteFile(fileUrl) {
    await delay(500)
    simulateError()
    for (const [key, value] of fileStorage.entries()) {
      if (value === fileUrl) {
        fileStorage.delete(key)
        break
      }
    }
    return true
  }
}

import { 
  candidates, 
  marks, 
  fields, 
  academicYears,
  examSessions,
  examCenters,
  courses 
} from './dummy-data'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to simulate API errors
const simulateError = (probability = 0.1) => {
  if (Math.random() < probability) {
    throw new Error('Simulated API error')
  }
}

// Helper function to validate course data
const validateCourseData = (courseData) => {
  const errors = []
  
  if (!courseData.name || courseData.name.trim().length === 0) {
    errors.push('Course name is required')
  }
  
  if (!courseData.code || courseData.code.trim().length === 0) {
    errors.push('Course code is required')
  }
  
  if (!courseData.duration || courseData.duration < 30) {
    errors.push('Duration must be at least 30 minutes')
  }
  
  if (!courseData.totalMarks || courseData.totalMarks <= 0) {
    errors.push('Total marks must be greater than 0')
  }
  
  if (!courseData.coefficients || Object.keys(courseData.coefficients).length === 0) {
    errors.push('At least one field coefficient is required')
  }
  
  return errors
}

// Simulate file storage
const fileStorage = new Map()

export const courseService = {
  // Get all courses
  async getAllCourses() {
    await delay(500)
    try {
      simulateError(0.1)
      return courses
    } catch (error) {
      throw new Error('Failed to fetch courses: ' + error.message)
    }
  },

  // Get course by ID
  async getCourseById(id) {
    await delay(300)
    simulateError()
    const course = courses.find(c => c.id === id)
    if (!course) throw new Error('Course not found')
    return course
  },

  // Create new course
  async createCourse(courseData) {
    await delay(800)
    try {
      const validationErrors = validateCourseData(courseData)
      if (validationErrors.length > 0) {
        throw new Error('Validation failed: ' + validationErrors.join(', '))
      }

      simulateError(0.1)
      const newCourse = {
        id: Date.now(),
        ...courseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      courses.push(newCourse)
      return newCourse
    } catch (error) {
      throw new Error('Failed to create course: ' + error.message)
    }
  },

  // Update course
  async updateCourse(id, courseData) {
    await delay(500)
    try {
      const validationErrors = validateCourseData(courseData)
      if (validationErrors.length > 0) {
        throw new Error('Validation failed: ' + validationErrors.join(', '))
      }

      simulateError(0.1)
      const index = courses.findIndex(c => c.id === id)
      if (index === -1) throw new Error('Course not found')
      
      const updatedCourse = {
        ...courses[index],
        ...courseData,
        updatedAt: new Date().toISOString()
      }
      courses[index] = updatedCourse
      return updatedCourse
    } catch (error) {
      throw new Error('Failed to update course: ' + error.message)
    }
  },

  // Delete course
  async deleteCourse(id) {
    await delay(500)
    simulateError()
    const index = courses.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Course not found')
    courses.splice(index, 1)
    return { success: true }
  }
}

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
    const newCandidate = {
      id: Date.now(),
      ...candidateData,
      status: 'active'
    }
    candidates.push(newCandidate)
    return newCandidate
  },

  // Update candidate
  async updateCandidate(id, candidateData) {
    await delay(500)
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
    await delay(500)
    simulateError()
    return marks.filter(m => m.candidateId === candidateId)
  },

  // Get marks for all candidates
  async getAllMarks() {
    await delay(500)
    simulateError()
    return marks
  },

  // Update marks for a candidate
  async updateCandidateMarks(candidateId, subjectId, mark) {
    await delay(500)
    simulateError()
    const index = marks.findIndex(m => m.candidateId === candidateId && m.subjectId === subjectId)
    if (index !== -1) {
      marks[index].mark = mark
    } else {
      marks.push({ candidateId, subjectId, mark })
    }
    return { success: true }
  },

  // Calculate average for a candidate
  async calculateAverage(candidateId) {
    await delay(500)
    simulateError()
    const candidateMarks = marks.filter(m => m.candidateId === candidateId)
    if (candidateMarks.length === 0) return 0

    const total = candidateMarks.reduce((sum, mark) => {
      const subject = courses.find(s => s.id === mark.subjectId)
      if (!subject) return sum
      const candidate = candidates.find(c => c.id === candidateId)
      if (!candidate) return sum
      const coefficient = subject.coefficients[candidate.fieldId] || 1
      return sum + (mark.mark * coefficient)
    }, 0)

    const totalCoefficients = candidateMarks.reduce((sum, mark) => {
      const subject = courses.find(s => s.id === mark.subjectId)
      if (!subject) return sum
      const candidate = candidates.find(c => c.id === candidateId)
      if (!candidate) return sum
      return sum + (subject.coefficients[candidate.fieldId] || 1)
    }, 0)

    return totalCoefficients > 0 ? total / totalCoefficients : 0
  }
}

export const subjectService = {
  // Get all subjects
  async getAllSubjects() {
    await delay(300)
    simulateError()
    return courses
  },

  // Get subject by ID
  async getSubjectById(id) {
    await delay(200)
    simulateError()
    const course = courses.find(c => c.id === id)
    if (!course) throw new Error('Subject not found')
    return course
  }
}

export const fieldService = {
  // Get all fields
  async getAllFields() {
    await delay(500)
    simulateError()
    return fields
  },

  // Get field by ID
  async getFieldById(id) {
    await delay(300)
    simulateError()
    const field = fields.find(f => f.id === id)
    if (!field) throw new Error('Field not found')
    return field
  }
}

export const examService = {
  // Get all academic years
  async getAcademicYears() {
    await delay(500)
    simulateError()
    return academicYears
  },

  // Get current academic year
  async getCurrentAcademicYear() {
    await delay(300)
    simulateError()
    return academicYears.find(year => year.isCurrent)
  },

  // Get exam sessions
  async getExamSessions(academicYearId) {
    await delay(500)
    simulateError()
    return examSessions.filter(session => session.academicYearId === academicYearId)
  },

  // Get exam centers
  async getExamCenters() {
    await delay(500)
    simulateError()
    return examCenters
  }
}

export const fileService = {
  // Upload file
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          await delay(1000)
          simulateError()
          const fileUrl = `file-${Date.now()}`
          fileStorage.set(fileUrl, {
            content: reader.result,
            name: file.name,
            type: file.type,
            size: file.size
          })
          resolve({ fileUrl })
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('File read error'))
      reader.readAsDataURL(file)
    })
  },

  // Get file info
  async getFileInfo(fileUrl) {
    await delay(300)
    simulateError()
    const fileInfo = fileStorage.get(fileUrl)
    if (!fileInfo) throw new Error('File not found')
    return fileInfo
  },

  // Delete file
  async deleteFile(fileUrl) {
    await delay(500)
    simulateError()
    if (!fileStorage.has(fileUrl)) {
      throw new Error('File not found')
    }
    fileStorage.delete(fileUrl)
    return { success: true }
  }
}

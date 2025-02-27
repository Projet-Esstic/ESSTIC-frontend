/* eslint-disable no-unused-vars */
import axios from 'axios'
import { ENDPOINTS } from './config'

// Configure axios to send credentials
axios.defaults.withCredentials = true

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

// Helper function to transform frontend data to backend format
const transformCandidateData = (formData) => {
    console.log('Transforming data:', formData)
    const transformedData = {
        // User related data
        user: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            phoneNumber: formData.phoneNumber,
            profilePicture: formData.profilePicture,
            address: formData.address,
            emergencyContact: formData.emergencyContact
        },

        // Candidate specific data
        selectedEntranceExam: formData.selectedEntranceExam,
        fieldOfStudy: formData.fieldOfStudy,
        examCenter: formData.examCenter,
        documents: formData.documents,
        
        // Additional data
        lieuDeNaissance: formData.lieuDeNaissance,
        situationDeFamille: formData.situationDeFamille,
        boitePostale: formData.boitePostale,
        referencesFamilales: formData.referencesFamilales,
        addressParents: formData.addressParents
    }
    
    console.log('Transformed data:', transformedData)
    return transformedData
};

export const courseService = {
  // Get all courses
  async getAllCourses() {
    const response = await axios.get(ENDPOINTS.COURSES)
    return response.data
  },

  // Get course by ID
  async getCourseById(id) {
    const response = await axios.get(ENDPOINTS.COURSE_BY_ID(id))
    return response.data
  },

  // Create new course
  async createCourse(courseData) {
    const validationErrors = validateCourseData(courseData)
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`)
    }

    const response = await axios.post(ENDPOINTS.COURSES, courseData)
    return response.data
  },

  // Update course
  async updateCourse(id, courseData) {
    const validationErrors = validateCourseData(courseData)
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`)
    }

    const response = await axios.put(ENDPOINTS.COURSE_BY_ID(id), courseData)
    return response.data
  },

  // Delete course
  async deleteCourse(id) {
    await axios.delete(ENDPOINTS.COURSE_BY_ID(id))
  }
}

export const candidateService = {
  // Get all candidates
  async getAllCandidates() {
    const response = await axios.get(ENDPOINTS.CANDIDATES)
    return response.data
  },

  // Get candidate by ID
  async getCandidateById(id) {
    const response = await axios.get(ENDPOINTS.CANDIDATE_BY_ID(id))
    return response.data
  },

  // Get candidates by field
  async getCandidatesByField(fieldId) {
    const response = await axios.get(ENDPOINTS.CANDIDATES_BY_FIELD(fieldId))
    return response.data
  },

  // Create new candidate with documents
  async createCandidate(formData) {
    try {
        const transformedData = transformCandidateData(formData);
        const data = new FormData();
        
        // Add transformed data as JSON
        data.append('formData', JSON.stringify(transformedData));
        
        // Handle document uploads
        if (formData.profileImageFile) {
            data.append('profile', formData.profileImageFile);
        }

        // Handle other documents
        const documentTypes = ['resume', 'transcript', 'recommendation', 'portfolio', 'other'];
        documentTypes.forEach(type => {
            if (formData.documents?.[type]) {
                data.append(type, formData.documents[type]);
            }
        });

        const response = await axios.post(ENDPOINTS.CANDIDATES, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // You can emit this progress to your store if needed
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating candidate:', error);
        throw error;
    }
  },

  // Update candidate with documents
  async updateCandidate(id, formData) {
    try {
        const transformedData = transformCandidateData(formData);
        const data = new FormData();
        
        data.append('formData', JSON.stringify(transformedData));
        
        // Handle document updates
        if (formData.profileImageFile) {
            data.append('profile', formData.profileImageFile);
        }

        const documentTypes = ['resume', 'transcript', 'recommendation', 'portfolio', 'other'];
        documentTypes.forEach(type => {
            if (formData.documents?.[type]) {
                data.append(type, formData.documents[type]);
            }
        });

        const response = await axios.put(ENDPOINTS.CANDIDATE_BY_ID(id), data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating candidate:', error);
        throw error;
    }
  }
}

export const marksService = {
  // Get marks for a candidate
  async getCandidateMarks(candidateId) {
    const response = await axios.get(ENDPOINTS.MARKS_BY_CANDIDATE(candidateId))
    return response.data
  },

  // Get marks for all candidates
  async getAllMarks() {
    const response = await axios.get(ENDPOINTS.MARKS)
    return response.data
  },

  // Update marks for a candidate
  async updateCandidateMarks(candidateId, subjectId, mark) {
    const response = await axios.put(ENDPOINTS.MARKS_BY_CANDIDATE(candidateId), {
      subjectId,
      mark
    })
    return response.data
  },

  // Calculate average for a candidate
  async calculateAverage(candidateId) {
    const response = await axios.get(`${ENDPOINTS.MARKS_BY_CANDIDATE(candidateId)}/average`)
    return response.data
  }
}

export const subjectService = {
  // Get all subjects
  async getAllSubjects() {
    const response = await axios.get(ENDPOINTS.COURSES)
    return response.data
  },

  // Get subject by ID
  async getSubjectById(id) {
    const response = await axios.get(ENDPOINTS.COURSE_BY_ID(id))
    return response.data
  }
}

export const fieldService = {
  // Get all fields
  async getAllFields() {
    const response = await axios.get(ENDPOINTS.FIELDS)
    return response.data
  },

  // Get field by ID
  async getFieldById(id) {
    const response = await axios.get(ENDPOINTS.FIELD_BY_ID(id))
    return response.data
  }
}

export const examService = {
  // Get all academic years
  async getAcademicYears() {
    const response = await axios.get(ENDPOINTS.ACADEMIC_YEARS)
    return response.data
  },

  // Get current academic year
  async getCurrentAcademicYear() {
    const response = await axios.get(ENDPOINTS.CURRENT_ACADEMIC_YEAR)
    return response.data
  },

  // Get exam sessions
  async getExamSessions(academicYearId) {
    const response = await axios.get(ENDPOINTS.EXAM_SESSIONS(academicYearId))
    return response.data
  },

  // Get exam centers
  async getExamCenters() {
    const response = await axios.get(ENDPOINTS.EXAM_CENTERS)
    return response.data
  }
}

export const fileService = {
  // Upload file
  async uploadFile(file) {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await axios.post(ENDPOINTS.FILE_UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Get file info
  async getFileInfo(fileId) {
    const response = await axios.get(ENDPOINTS.FILE_INFO(fileId))
    return response.data
  },

  // Delete file
  async deleteFile(fileId) {
    await axios.delete(ENDPOINTS.FILE_INFO(fileId))
  }
}

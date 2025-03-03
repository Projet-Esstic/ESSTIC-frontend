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
    try {
      console.log('Calling getAllCourses API');
      const response = await axios.get(ENDPOINTS.COURSES);
      console.log('API Response:', response);
      const courses = response.data.data || response.data;
      console.log('Processed courses data:', courses);
      return courses;
    } catch (error) {
      console.error('Error in getAllCourses:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get all courses');
    }
  },

  // Get course by ID
  async getCourseById(id) {
    try {
      console.log('Calling getCourseById API');
      const response = await axios.get(ENDPOINTS.COURSE_BY_ID(id));
      console.log('API Response:', response);
      const course = response.data.data || response.data;
      console.log('Processed course data:', course);
      return course;
    } catch (error) {
      console.error('Error in getCourseById:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get course by ID');
    }
  },

  // Create new course
  async createCourse(courseData) {
    try {
      console.log('Calling createCourse API');
      const validationErrors = validateCourseData(courseData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      const response = await axios.post(ENDPOINTS.COURSES, courseData);
      console.log('API Response:', response);
      const course = response.data.data || response.data;
      console.log('Processed course data:', course);
      return course;
    } catch (error) {
      console.error('Error in createCourse:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to create course');
    }
  },

  // Update course
  async updateCourse(id, courseData) {
    try {
      console.log('Calling updateCourse API');
      const validationErrors = validateCourseData(courseData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      const response = await axios.put(ENDPOINTS.COURSE_BY_ID(id), courseData);
      console.log('API Response:', response);
      const course = response.data.data || response.data;
      console.log('Processed course data:', course);
      return course;
    } catch (error) {
      console.error('Error in updateCourse:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update course');
    }
  },

  // Delete course
  async deleteCourse(id) {
    try {
      console.log('Calling deleteCourse API');
      await axios.delete(ENDPOINTS.COURSE_BY_ID(id));
      console.log('API Response:', 'Course deleted successfully');
    } catch (error) {
      console.error('Error in deleteCourse:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to delete course');
    }
  }
}

export const candidateService = {
  // Get all candidates
  async getAllCandidates() {
    try {
      console.log('Calling getAllCandidates API');
      const response = await axios.get(ENDPOINTS.CANDIDATES);
      console.log('API Response:', response);
      const candidates = response.data.data || response.data;
      console.log('Processed candidates data:', candidates);
      return candidates;
    } catch (error) {
      console.error('Error in getAllCandidates:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get all candidates');
    }
  },

  // Get candidate by ID
  async getCandidateById(id) {
    try {
      console.log('Calling getCandidateById API');
      const response = await axios.get(ENDPOINTS.CANDIDATE_BY_ID(id));
      console.log('API Response:', response);
      const candidate = response.data.data || response.data;
      console.log('Processed candidate data:', candidate);
      return candidate;
    } catch (error) {
      console.error('Error in getCandidateById:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get candidate by ID');
    }
  },

  // Get candidates by field
  async getCandidatesByField(fieldId) {
    try {
      console.log('Calling getCandidatesByField API');
      const response = await axios.get(ENDPOINTS.CANDIDATES_BY_FIELD(fieldId));
      console.log('API Response:', response);
      const candidates = response.data.data || response.data;
      console.log('Processed candidates data:', candidates);
      return candidates;
    } catch (error) {
      console.error('Error in getCandidatesByField:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get candidates by field');
    }
  },

  // Create new candidate with documents
  async createCandidate(formData) {
    try {
      console.log('Calling createCandidate API');
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

      const response = await axios.post('http://localhost:5000/api/candidates/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // You can emit this progress to your store if needed
        }
      });

      console.log('API Response:', response);
      const candidate = response.data.data || response.data;
      console.log('Processed candidate data:', candidate);
      return candidate;
    } catch (error) {
      console.error('Error in createCandidate:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to create candidate');
    }
  },

  // Update candidate status
  async updateCandidateStatus(id, { applicationStatus }) {
    try {
      console.log('Updating candidate status:', { id, applicationStatus });
      const updateData = {
        applicationStatus,
        highSchool: {
          schoolName: '',
          yearCompleted: null,
          majorSubjects: []
        },
        university: {
          universityName: '',
          degree: '',
          yearCompleted: null
        },
        professionalExperience: [],
        extraActivities: [],
        internationalExposure: []
      };
      console.log('Sending update data:', updateData);
      const response = await axios.put(ENDPOINTS.CANDIDATE_BY_ID(id), updateData);
      console.log('API Response:', response);
      const candidate = response.data.data || response.data;
      console.log('Updated candidate data:', candidate);
      return candidate;
    } catch (error) {
      console.error('Error in updateCandidateStatus:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update candidate status');
    }
  },

  // Update candidate with documents
  async updateCandidate(id, formData) {
    try {
      console.log('Calling updateCandidate API');
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

      console.log('API Response:', response);
      const candidate = response.data.data || response.data;
      console.log('Processed candidate data:', candidate);
      return candidate;
    } catch (error) {
      console.error('Error in updateCandidate:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update candidate');
    }
  },

  async updateCandidateMarks(candidateId, courseId, mark) {
    try {
      const response = await axios.put(`${ENDPOINTS.CANDIDATE_BY_ID(candidateId)}/marks/${courseId}`, mark)
      return response.data
    } catch (error) {
      console.error('Error updating candidate marks:', error)
      throw new Error(error.response?.data?.message || 'Failed to update candidate marks')
    }
  },

  async updateCandidateResult(candidateId, resultData) {
    try {
      const response = await axios.put(`${ENDPOINTS.CANDIDATE_BY_ID(candidateId)}/result`, resultData)
      return response.data
    } catch (error) {
      console.error('Error updating candidate result:', error)
      throw new Error(error.response?.data?.message || 'Failed to update candidate result')
    }
  }
}

export const marksService = {
  // Get marks for a candidate
  async getCandidateMarks(candidateId) {
    try {
      console.log('Calling getCandidateMarks API');
      const response = await axios.get(ENDPOINTS.MARKS_BY_CANDIDATE(candidateId));
      console.log('API Response:', response);
      const marks = response.data.data || response.data;
      console.log('Processed marks data:', marks);
      return marks;
    } catch (error) {
      console.error('Error in getCandidateMarks:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get candidate marks');
    }
  },

  // Get marks for all candidates
  async getAllMarks() {
    try {
      console.log('Calling getAllMarks API');
      const response = await axios.get(ENDPOINTS.MARKS);
      console.log('API Response:', response);
      const marks = response.data.data || response.data;
      console.log('Processed marks data:', marks);
      return marks;
    } catch (error) {
      console.error('Error in getAllMarks:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get all marks');
    }
  },

  // Update marks for a candidate
  async updateCandidateMarks(candidateId, subjectId, mark) {
    try {
      console.log('Calling updateCandidateMarks API');
      const response = await axios.put(ENDPOINTS.MARKS_BY_CANDIDATE(candidateId), {
        subjectId,
        mark
      });
      console.log('API Response:', response);
      const marks = response.data.data || response.data;
      console.log('Processed marks data:', marks);
      return marks;
    } catch (error) {
      console.error('Error in updateCandidateMarks:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update candidate marks');
    }
  },

  // Calculate average for a candidate
  async calculateAverage(candidateId) {
    try {
      console.log('Calling calculateAverage API');
      const response = await axios.get(`${ENDPOINTS.MARKS_BY_CANDIDATE(candidateId)}/average`);
      console.log('API Response:', response);
      const average = response.data.data || response.data;
      console.log('Processed average data:', average);
      return average;
    } catch (error) {
      console.error('Error in calculateAverage:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to calculate average');
    }
  }
}

export const subjectService = {
  // Get all subjects
  async getAllSubjects() {
    try {
      console.log('Calling getAllSubjects API');
      const response = await axios.get(ENDPOINTS.COURSES);
      console.log('API Response:', response);
      const subjects = response.data.data || response.data;
      console.log('Processed subjects data:', subjects);
      return subjects;
    } catch (error) {
      console.error('Error in getAllSubjects:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get all subjects');
    }
  },

  // Get subject by ID
  async getSubjectById(id) {
    try {
      console.log('Calling getSubjectById API');
      const response = await axios.get(ENDPOINTS.COURSE_BY_ID(id));
      console.log('API Response:', response);
      const subject = response.data.data || response.data;
      console.log('Processed subject data:', subject);
      return subject;
    } catch (error) {
      console.error('Error in getSubjectById:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get subject by ID');
    }
  }
}

export const fieldService = {
  // Get all fields
  async getAllFields() {
    try {
      console.log('Calling getAllFields API');
      const response = await axios.get(ENDPOINTS.FIELDS);
      console.log('API Response:', response);
      const fields = response.data.data || response.data;
      console.log('Processed fields data:', fields);
      return fields;
    } catch (error) {
      console.error('Error in getAllFields:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get all fields');
    }
  },

  // Get field by ID
  async getFieldById(id) {
    try {
      console.log('Calling getFieldById API');
      const response = await axios.get(ENDPOINTS.FIELD_BY_ID(id));
      console.log('API Response:', response);
      const field = response.data.data || response.data;
      console.log('Processed field data:', field);
      return field;
    } catch (error) {
      console.error('Error in getFieldById:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get field by ID');
    }
  }
}

export const examService = {
  // Get all academic years
  async getAcademicYears() {
    try {
      const response = await axios.get(ENDPOINTS.ACADEMIC_YEARS)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in getAcademicYears:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to get academic years')
    }
  },

  // Get current academic year
  async getCurrentAcademicYear() {
    try {
      const response = await axios.get(ENDPOINTS.CURRENT_ACADEMIC_YEAR)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in getCurrentAcademicYear:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to get current academic year')
    }
  },

  // Create new academic year
  async createAcademicYear(data) {
    try {
      const response = await axios.post(ENDPOINTS.ACADEMIC_YEARS, data)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in createAcademicYear:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to create academic year')
    }
  },

  // Update academic year
  async updateAcademicYear(id, data) {
    try {
      const response = await axios.put(`${ENDPOINTS.ACADEMIC_YEARS}/${id}`, data)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in updateAcademicYear:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to update academic year')
    }
  },

  // Delete academic year
  async deleteAcademicYear(id) {
    try {
      const response = await axios.delete(`${ENDPOINTS.ACADEMIC_YEARS}/${id}`)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in deleteAcademicYear:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to delete academic year')
    }
  },

  // Get exam sessions
  async getExamSessions(academicYearId) {
    try {
      const response = await axios.get(ENDPOINTS.EXAM_SESSIONS(academicYearId))
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in getExamSessions:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to get exam sessions')
    }
  },

  // Get exam centers
  async getExamCenters() {
    try {
      const response = await axios.get(ENDPOINTS.EXAM_CENTERS)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error in getExamCenters:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to get exam centers')
    }
  }
}

export const fileService = {
  // Upload file
  async uploadFile(file) {
    try {
      console.log('Calling uploadFile API');
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await axios.post(ENDPOINTS.FILE_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('API Response:', response);
      const fileData = response.data.data || response.data;
      console.log('Processed file data:', fileData);
      return fileData;
    } catch (error) {
      console.error('Error in uploadFile:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to upload file');
    }
  },

  // Get file info
  async getFileInfo(fileId) {
    try {
      console.log('Calling getFileInfo API');
      const response = await axios.get(ENDPOINTS.FILE_INFO(fileId));
      console.log('API Response:', response);
      const fileInfo = response.data.data || response.data;
      console.log('Processed file info:', fileInfo);
      return fileInfo;
    } catch (error) {
      console.error('Error in getFileInfo:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to get file info');
    }
  },

  // Delete file
  async deleteFile(fileId) {
    try {
      console.log('Calling deleteFile API');
      await axios.delete(ENDPOINTS.FILE_INFO(fileId));
      console.log('API Response:', 'File deleted successfully');
    } catch (error) {
      console.error('Error in deleteFile:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to delete file');
    }
  }
}

const submitPayment = async (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input data');
    }

    // Construct form data object
    const formDataObj = {
      email: data.civilStatus.email,
      password: 'defaultPassword123', // Replace with actual password input
      firstName: data.civilStatus.firstName,
      lastName: data.civilStatus.lastName,
      dateOfBirth: data.civilStatus.dateOfBirth,
      gender: data.civilStatus.gender,
      phoneNumber: data.civilStatus.phoneNumber,
      address: data.civilStatus.address,
      emergencyContact: data.civilStatus.emergencyContact,
      examId: data.civilStatus.selectedEntranceExam,
      highSchool: data.education.highSchool,
      university: data.education.university,
      professionalExperience: data.professional.professionalExperience,
      extraActivities: data.extraActivities.activities,
      internationalExposure: [],
      fieldOfStudy: data.civilStatus.fieldOfStudy,
      payment: data.paymentData,
    };

    // Create FormData
    const formData = new FormData();
    
    // Important: stringify the object and append as 'formData'
    console.log('Appending formData:', JSON.stringify(formDataObj));
    formData.append('formData', JSON.stringify(formDataObj));

    // Handle files
    const files = {
      profileImage: data.civilStatus.documents.profilePicture,
      transcript: data.education.documents.transcript,
      diploma: data.education.documents.diploma,
      cv: data.education.documents.cv,
      other: data.education.documents.other,
      receipt: data.paymentData.receiptFile,
    };

    Object.entries(files).forEach(([key, file]) => {
      if (file instanceof File) {
        console.log(`Appending file: ${key}`, file.name, file.size);
        formData.append(key, file);
      } else {
        console.log(`Skipping ${key}: not a File object`, file);
      }
    });

    // Log FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
    }

    // Send request
    const response = await axios.post(
      'http://localhost:5000/api/candidates/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      }
    );

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in submitPayment:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const paymentService = {
  submitPayment
}

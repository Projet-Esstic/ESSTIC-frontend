// API configuration
export const API_URL = 'http://localhost:5000/api'
// process.env.VUE_APP_API_URL ||
// API endpoints
export const ENDPOINTS = {
  // Absence Requests
  ABSENCE_REQUESTS: `${API_URL}/absence-requests`,
  // Candidates
  CANDIDATES: `${API_URL}/candidates`,
  CANDIDATE_BY_ID: (id) => `${API_URL}/candidates/${id}`,
  CANDIDATES_BY_FIELD: (fieldId) => `${API_URL}/candidates/field/${fieldId}`,
  
  // Courses
  COURSES: `${API_URL}/courses`,
  COURSE_BY_ID: (id) => `${API_URL}/courses/${id}`,
  
  // Marks
  MARKS: `${API_URL}/marks`,
  MARKS_BY_CANDIDATE: (candidateId) => `${API_URL}/marks/candidate/${candidateId}`,
  
  // Fields
  FIELDS: `${API_URL}/fields`,
  FIELD_BY_ID: (id) => `${API_URL}/fields/${id}`,
  
  // Academic
  ACADEMIC_YEARS: `${API_URL}/academic-years`,
  CURRENT_ACADEMIC_YEAR: `${API_URL}/academic-years/current`,
  EXAM_SESSIONS: (yearId) => `${API_URL}/exam-sessions/${yearId}`,
  EXAM_CENTERS: `${API_URL}/exam-centers`,
  
  // Files
  FILES: `${API_URL}/files`,
  FILE_INFO: (fileId) => `${API_URL}/files/${fileId}`,
  FILE_UPLOAD: `${API_URL}/files/upload`,

  // Auth
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,

  PERSONNEL: `${API_URL}/personnel`,
  PERSONNEL_REGISTER: `${API_URL}/personnel/register`,

  DEPARTMENT: `${API_URL}/departments`,
}

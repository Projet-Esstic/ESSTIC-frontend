
// Calculate grade based on score
const calculateGrade = (score) => {
  if (score >= 16) return 'A';
  if (score >= 14) return 'B+';
  if (score >= 12) return 'B';
  if (score >= 10) return 'C';
  if (score >= 8) return 'D';
  return 'F';
};

// Calculate average score from multiple subjects
const calculateAverageScore = (scores) => {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return (sum / scores.length).toFixed(2);
};

// Calculate GPA based on grades
const calculateGPA = (grades) => {
  const gradePoints = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };

  if (!grades || grades.length === 0) return 0;
  
  const totalPoints = grades.reduce((acc, grade) => acc + gradePoints[grade], 0);
  return (totalPoints / grades.length).toFixed(2);
};

// Calculate final result (Pass/Fail)
const calculateResult = (averageScore) => {
  return averageScore >= 10 ? 'PASS' : 'FAIL';
};

// Generate complete student assessment
const generateStudentAssessment = (studentScores) => {
  const averageScore = calculateAverageScore(studentScores);
  const grade = calculateGrade(averageScore);
  const gpa = calculateGPA([grade]);
  const result = calculateResult(averageScore);

  return {
    averageScore,
    grade,
    gpa,
    result
  };
};

export {
  calculateGrade,
  calculateAverageScore,
  calculateGPA,
  calculateResult,
  generateStudentAssessment
};

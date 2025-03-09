<template>
  <h1 class="text-2xl font-bold mb-3">
    Student Grade Management System
  </h1>
  <div class="p-6">
    
    <!-- Filters Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
       
      <div>
        <label class="block text-sm font-medium mb-1">Department</label>
        <select v-model="selectedDepartment" class="w-full p-2 border rounded-md shadow-sm">
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Class</label>
        <select v-model="selectedClass" class="w-full p-2 border rounded-md shadow-sm">
          <option value="">All Classes</option>
          <option v-for="classOption in classes" :key="classOption" :value="classOption">{{ classOption }}</option>
        </select>
      </div>
     
      <div>
  <label class="block text-sm font-medium mb-1">Subject</label>
  <select v-model="selectedSubject" class="w-full p-2 border rounded-md shadow-sm">
    <option value="">All Subjects</option>
    <option v-for="subject in filteredSubjects" :key="subject.id" :value="subject.id">
      {{ subject.name }}
    </option>
  </select>
</div>
    </div>
    
    <!-- Excel-like Table -->
    <div class="overflow-x-auto shadow-md rounded-lg">
      <table class="min-w-full divide-y divide-blue-200 border border-blue-200">
        <thead class="bg-blue-100 dark:bg-blue-800">
          <tr>
            <th class="sticky left-0 z-10 bg-blue-100 dark:bg-blue-800 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-blue-200">
              Student Name
            </th>
            
            <template v-if="selectedSubject">
              <!-- Single Subject View -->
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200" colspan="3">
                {{ getSubjectName(selectedSubject) }} - CA
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200" colspan="3">
                {{ getSubjectName(selectedSubject) }} - SN
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200" colspan="3">
                {{ getSubjectName(selectedSubject) }} - RESIT
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Final Grade
              </th>
            </template>
            
            <template v-else>
              <!-- All Subjects View -->
              <template v-for="subject in subjects" :key="subject.id">
                <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200" colspan="3">
                  {{ subject.name }}
                </th>
              </template>
            </template>
          </tr>
          
          <tr>
            <th class="sticky left-0 z-10 bg-blue-50 dark:bg-blue-700 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-blue-200">
              &nbsp;
            </th>
            
            <template v-if="selectedSubject">
              <!-- Single Subject Detailed View -->
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Mark</th>
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Out of</th>
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200 bg-blue-50 dark:bg-blue-700">%</th>
              
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Mark</th>
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Out of</th>
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200 bg-blue-50 dark:bg-blue-700">%</th>
              
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Mark</th>
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Out of</th>
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200 bg-blue-50 dark:bg-blue-700">%</th>
              
              <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">Letter</th>
            </template>
            
            <template v-else>
              <!-- All Subjects Summary View -->
              <template v-for="subject in subjects" :key="subject.id">
                <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">CA</th>
                <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider bg-blue-50 dark:bg-blue-700">SN</th>
                <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider border-r border-blue-200 bg-blue-50 dark:bg-blue-700">Grade</th>
              </template>
            </template>
          </tr>
        </thead>
        
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-blue-200">
          <tr v-for="(student, index) in filteredStudents" :key="student.id" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900'">
            <td class="sticky left-0 z-10 px-6 py-3 whitespace-nowrap border-r border-blue-200 font-medium" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900'">
              {{ student.firstName }} {{ student.lastName }}
            </td>
            
            <template v-if="selectedSubject">
              <!-- Detailed View for Selected Subject -->
              <!-- CA Marks -->
              <td class="px-2 py-2 whitespace-nowrap text-center">
                <input 
                  v-model="getStudentSubjectMarks(student, selectedSubject).CA.mark" 
                  type="number" 
                  min="0" 
                  :max="getStudentSubjectMarks(student, selectedSubject).CA.outOf" 
                  class="w-16 p-1 border border-blue-300 rounded text-center focus:ring-blue-500 focus:border-blue-500"
                  @change="calculatePercentage(student, selectedSubject, 'CA')"
                >
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center">
                <input 
                  v-model="getStudentSubjectMarks(student, selectedSubject).CA.outOf" 
                  type="number" 
                  min="1" 
                  class="w-16 p-1 border border-blue-300 rounded text-center focus:ring-blue-500 focus:border-blue-500"
                  @change="calculatePercentage(student, selectedSubject, 'CA')"
                >
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center border-r border-blue-200">
                {{ getStudentSubjectMarks(student, selectedSubject).CA.percentage.toFixed(1) }}%
              </td>
              
              <!-- SN Marks -->
              <td class="px-2 py-2 whitespace-nowrap text-center">
                <input 
                  v-model="getStudentSubjectMarks(student, selectedSubject).SN.mark" 
                  type="number" 
                  min="0" 
                  :max="getStudentSubjectMarks(student, selectedSubject).SN.outOf" 
                  class="w-16 p-1 border border-blue-300 rounded text-center focus:ring-blue-500 focus:border-blue-500"
                  @change="calculatePercentage(student, selectedSubject, 'SN')"
                >
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center">
                <input 
                  v-model="getStudentSubjectMarks(student, selectedSubject).SN.outOf" 
                  type="number" 
                  min="1" 
                  class="w-16 p-1 border border-blue-300 rounded text-center focus:ring-blue-500 focus:border-blue-500"
                  @change="calculatePercentage(student, selectedSubject, 'SN')"
                >
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center border-r border-blue-200">
                {{ getStudentSubjectMarks(student, selectedSubject).SN.percentage.toFixed(1) }}%
              </td>
              
              <!-- RESIT Marks -->
              <td class="px-2 py-2 whitespace-nowrap text-center">
                <input 
                  v-model="getStudentSubjectMarks(student, selectedSubject).RESIT.mark" 
                  type="number" 
                  min="0" 
                  :max="getStudentSubjectMarks(student, selectedSubject).RESIT.outOf" 
                  class="w-16 p-1 border border-blue-300 rounded text-center focus:ring-blue-500 focus:border-blue-500"
                  @change="calculatePercentage(student, selectedSubject, 'RESIT')"
                >
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center">
                <input 
                  v-model="getStudentSubjectMarks(student, selectedSubject).RESIT.outOf" 
                  type="number" 
                  min="1" 
                  class="w-16 p-1 border border-blue-300 rounded text-center focus:ring-blue-500 focus:border-blue-500"
                  @change="calculatePercentage(student, selectedSubject, 'RESIT')"
                >
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-center border-r border-blue-200">
                {{ getStudentSubjectMarks(student, selectedSubject).RESIT.percentage.toFixed(1) }}%
              </td>
              
              <!-- Final Grade -->
              <td class="px-2 py-2 whitespace-nowrap text-center font-medium" :class="gradeColorClass(getStudentSubjectMarks(student, selectedSubject).finalGrade)">
                {{ getStudentSubjectMarks(student, selectedSubject).finalGrade }}
              </td>
            </template>
            
            <template v-else>
              <!-- Summary View for All Subjects -->
              <template v-for="subject in subjects" :key="subject.id">
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  {{ getStudentSubjectMarks(student, subject.id).CA.percentage.toFixed(1) }}%
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-center">
                  {{ getStudentSubjectMarks(student, subject.id).SN.percentage.toFixed(1) }}%
                </td>
                <td class="px-2 py-2 whitespace-nowrap text-center border-r border-blue-200 font-medium" :class="gradeColorClass(getStudentSubjectMarks(student, subject.id).finalGrade)">
                  {{ getStudentSubjectMarks(student, subject.id).finalGrade }}
                </td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Actions -->
    <div class="mt-6 flex justify-end space-x-4">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="saveGrades">
        Save Grades
      </button>
      <button class="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="exportToExcel">
        Export to Excel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentGradeManagement',
  data() {
   return {
    selectedClass: '',
    selectedDepartment: '',
    selectedSubject: '',

    // Sample data
    classes: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
    departments: ['Computer Science', 'Engineering', 'Business', 'Communication'],
    
    // Map departments to their subjects
    departmentSubjects: {
      'Computer Science': ['math', 'compsec', 'prog', 'netw', 'db', 'ai', 'webdev', 'stats'],
      'Engineering': ['math', 'compsec', 'prog', 'netw', 'db', 'ai'],
      'Business': ['stats', 'comm'],
      'Communication': ['comm', 'webdev']
    },

    // All subjects
    subjects: [
      { id: 'math', name: 'Mathematics' },
      { id: 'compsec', name: 'Computer Security' },
      { id: 'prog', name: 'Programming' },
      { id: 'netw', name: 'Networking' },
      { id: 'db', name: 'Database Systems' },
      { id: 'ai', name: 'Artificial Intelligence' },
      { id: 'webdev', name: 'Web Development' },
      { id: 'stats', name: 'Statistics' },
      { id: 'comm', name: 'Communication Skills' }
    ],
      students: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          class: 'Level 1',
          department: 'Computer Science',
          subjects: {
            math: {
              CA: { mark: 15, outOf: 20, percentage: 75 },
              SN: { mark: 35, outOf: 50, percentage: 70 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B+'
            },
            compsec: {
              CA: { mark: 18, outOf: 20, percentage: 90 },
              SN: { mark: 42, outOf: 50, percentage: 84 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A-'
            },
            prog: {
              CA: { mark: 19, outOf: 20, percentage: 95 },
              SN: { mark: 48, outOf: 50, percentage: 96 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A+'
            },
            netw: {
              CA: { mark: 14, outOf: 20, percentage: 70 },
              SN: { mark: 38, outOf: 50, percentage: 76 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B'
            },
            db: {
              CA: { mark: 16, outOf: 20, percentage: 80 },
              SN: { mark: 40, outOf: 50, percentage: 80 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B+'
            },
            ai: {
              CA: { mark: 13, outOf: 20, percentage: 65 },
              SN: { mark: 32, outOf: 50, percentage: 64 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C+'
            },
            webdev: {
              CA: { mark: 17, outOf: 20, percentage: 85 },
              SN: { mark: 43, outOf: 50, percentage: 86 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A-'
            },
            stats: {
              CA: { mark: 12, outOf: 20, percentage: 60 },
              SN: { mark: 30, outOf: 50, percentage: 60 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C'
            },
            comm: {
              CA: { mark: 16, outOf: 20, percentage: 80 },
              SN: { mark: 41, outOf: 50, percentage: 82 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B+'
            }
          }
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          class: 'Level 1',
          department: 'Computer Science',
          subjects: {
            math: {
              CA: { mark: 18, outOf: 20, percentage: 90 },
              SN: { mark: 45, outOf: 50, percentage: 90 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A'
            },
            compsec: {
              CA: { mark: 14, outOf: 20, percentage: 70 },
              SN: { mark: 38, outOf: 50, percentage: 76 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B'
            },
            prog: {
              CA: { mark: 17, outOf: 20, percentage: 85 },
              SN: { mark: 42, outOf: 50, percentage: 84 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A-'
            },
            netw: {
              CA: { mark: 16, outOf: 20, percentage: 80 },
              SN: { mark: 40, outOf: 50, percentage: 80 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B+'
            },
            db: {
              CA: { mark: 19, outOf: 20, percentage: 95 },
              SN: { mark: 48, outOf: 50, percentage: 96 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A+'
            },
            ai: {
              CA: { mark: 15, outOf: 20, percentage: 75 },
              SN: { mark: 37, outOf: 50, percentage: 74 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B'
            },
            webdev: {
              CA: { mark: 18, outOf: 20, percentage: 90 },
              SN: { mark: 45, outOf: 50, percentage: 90 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A'
            },
            stats: {
              CA: { mark: 14, outOf: 20, percentage: 70 },
              SN: { mark: 36, outOf: 50, percentage: 72 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B-'
            },
            comm: {
              CA: { mark: 17, outOf: 20, percentage: 85 },
              SN: { mark: 44, outOf: 50, percentage: 88 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'A-'
            }
          }
        },
        {
          id: 3,
          firstName: 'Robert',
          lastName: 'Johnson',
          class: 'Level 2',
          department: 'Engineering',
          subjects: {
            math: {
              CA: { mark: 12, outOf: 20, percentage: 60 },
              SN: { mark: 30, outOf: 50, percentage: 60 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C'
            },
            compsec: {
              CA: { mark: 10, outOf: 20, percentage: 50 },
              SN: { mark: 24, outOf: 50, percentage: 48 },
              RESIT: { mark: 62, outOf: 100, percentage: 62 },
              finalGrade: 'C'
            },
            prog: {
              CA: { mark: 13, outOf: 20, percentage: 65 },
              SN: { mark: 33, outOf: 50, percentage: 66 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C+'
            },
            netw: {
              CA: { mark: 11, outOf: 20, percentage: 55 },
              SN: { mark: 28, outOf: 50, percentage: 56 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C-'
            },
            db: {
              CA: { mark: 9, outOf: 20, percentage: 45 },
              SN: { mark: 22, outOf: 50, percentage: 44 },
              RESIT: { mark: 55, outOf: 100, percentage: 55 },
              finalGrade: 'C-'
            },
            ai: {
              CA: { mark: 12, outOf: 20, percentage: 60 },
              SN: { mark: 30, outOf: 50, percentage: 60 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C'
            },
            webdev: {
              CA: { mark: 14, outOf: 20, percentage: 70 },
              SN: { mark: 35, outOf: 50, percentage: 70 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'B-'
            },
            stats: {
              CA: { mark: 11, outOf: 20, percentage: 55 },
              SN: { mark: 27, outOf: 50, percentage: 54 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C-'
            },
            comm: {
              CA: { mark: 13, outOf: 20, percentage: 65 },
              SN: { mark: 32, outOf: 50, percentage: 64 },
              RESIT: { mark: 0, outOf: 100, percentage: 0 },
              finalGrade: 'C+'
            }
          }
        }
      ]
    };
  },
computed: {
  filteredStudents() {
    return this.students.filter(student => {
      let matchesClass = true;
      let matchesDepartment = true;

      if (this.selectedClass) {
        matchesClass = student.class === this.selectedClass;
      }

      if (this.selectedDepartment) {
        matchesDepartment = student.department === this.selectedDepartment;
      }

      return matchesClass && matchesDepartment;
    });
  },

  // Filter subjects based on the selected department
  filteredSubjects() {
    if (!this.selectedDepartment) {
      return this.subjects; // Return all subjects if no department is selected
    }

    // Get the subject IDs for the selected department
    const subjectIds = this.departmentSubjects[this.selectedDepartment];

    // Filter the subjects array based on the subject IDs
    return this.subjects.filter(subject => subjectIds.includes(subject.id));
  }
},
watch: {
  selectedDepartment() {
    // Reset the selected subject when the department changes
    this.selectedSubject = '';
  }
},
  methods: {
    getSubjectName(subjectId) {
      const subject = this.subjects.find(s => s.id === subjectId);
      return subject ? subject.name : subjectId;
    },
    
    getStudentSubjectMarks(student, subjectId) {
      // Initialize subject data if it doesn't exist
      if (!student.subjects[subjectId]) {
        student.subjects[subjectId] = {
          CA: { mark: 0, outOf: 20, percentage: 0 },
          SN: { mark: 0, outOf: 50, percentage: 0 },
          RESIT: { mark: 0, outOf: 100, percentage: 0 },
          finalGrade: 'F'
        };
      }
      
      return student.subjects[subjectId];
    },
    
    calculatePercentage(student, subjectId, examType) {
      const subjectData = this.getStudentSubjectMarks(student, subjectId);
      
      const markValue = parseFloat(subjectData[examType].mark) || 0;
      const outOfValue = parseFloat(subjectData[examType].outOf) || 1;
      
      // Calculate percentage
      subjectData[examType].percentage = (markValue / outOfValue) * 100;
      
      // Update final grade
      this.updateFinalGrade(student, subjectId);
    },
    
    updateFinalGrade(student, subjectId) {
      const subjectData = this.getStudentSubjectMarks(student, subjectId);
      
      // Calculate weighted average based on CA (30%) and SN (70%) or RESIT if applicable
      let finalPercentage;
      
      // If student has a RESIT mark, use it instead of CA and SN
      if (subjectData.RESIT.mark > 0) {
        finalPercentage = subjectData.RESIT.percentage;
      } else {
        finalPercentage = (subjectData.CA.percentage * 0.3) + (subjectData.SN.percentage * 0.7);
      }
      
      // Assign letter grade based on percentage
      let grade;
      if (finalPercentage >= 95) grade = 'A+';
      else if (finalPercentage >= 90) grade = 'A';
      else if (finalPercentage >= 85) grade = 'A-';
      else if (finalPercentage >= 80) grade = 'B+';
      else if (finalPercentage >= 75) grade = 'B';
      else if (finalPercentage >= 70) grade = 'B-';
      else if (finalPercentage >= 65) grade = 'C+';
      else if (finalPercentage >= 60) grade = 'C';
      else if (finalPercentage >= 55) grade = 'C-';
      else if (finalPercentage >= 50) grade = 'D';
      else grade = 'F';
      
      subjectData.finalGrade = grade;
    },
    
    gradeColorClass(grade) {
      if (grade === 'A+' || grade === 'A' || grade === 'A-') return 'text-green-600';
      if (grade === 'B+' || grade === 'B' || grade === 'B-') return 'text-blue-600';
      if (grade === 'C+' || grade === 'C' || grade === 'C-') return 'text-yellow-600';
      if (grade === 'D') return 'text-orange-600';
      return 'text-red-600';
    },
    
    saveGrades() {
      // In a real application, this would send data to the server
      alert('Grades saved successfully!');
    },
    
    exportToExcel() {
      // In a real application, this would generate and download an Excel file
      alert('Exporting to Excel...');
    }
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
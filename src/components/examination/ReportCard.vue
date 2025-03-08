
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Student Report Card</h2>
        <p class="text-gray-600 dark:text-gray-400">Generate and print student grade reports</p>
      </div>
      <button 
        @click="generateReport"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <i class="material-icons">print</i>
        Generate Report
      </button>
    </div>

    <!-- Student Selection -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
          <select 
            v-model="selectedField"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Field</option>
            <option v-for="field in fields" :key="field.id" :value="field.id">
              {{ field.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student</label>
          <select 
            v-model="selectedStudent"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Student</option>
            <option v-for="student in filteredStudents" :key="student.id" :value="student">
              {{ student.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Report Preview -->
    <div v-if="selectedStudent" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="mb-6 text-center">
        <h3 class="text-xl font-semibold">Academic Report Card</h3>
        <p class="text-gray-600">{{ selectedStudent.name }}</p>
        <p class="text-gray-600">Registration No: {{ selectedStudent.registrationNumber }}</p>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score (/20)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coefficient</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weighted Score</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="subject in studentSubjects" :key="subject.id">
            <td class="px-6 py-4">{{ subject.name }}</td>
            <td class="px-6 py-4">{{ getStudentMark(subject.id) }}</td>
            <td class="px-6 py-4">{{ calculateGrade(getStudentMark(subject.id)) }}</td>
            <td class="px-6 py-4">{{ subject.coefficients[selectedField] }}</td>
            <td class="px-6 py-4">{{ calculateWeightedScore(subject) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="font-semibold">
            <td class="px-6 py-4" colspan="2">Final Results</td>
            <td class="px-6 py-4">GPA: {{ calculateGPA() }}</td>
            <td class="px-6 py-4">Average: {{ calculateAverage() }}/20</td>
            <td class="px-6 py-4">{{ calculateResult(calculateAverage()) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { calculateGrade, calculateGPA, calculateResult } from '@/utils/gradeCalculations'

export default {
  name: 'ReportCard',
  
  props: {
    fields: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const selectedField = ref('')
    const selectedStudent = ref(null)

    const filteredStudents = computed(() => {
      if (!selectedField.value) return []
      return store.getters['entranceExam/getCandidates'].filter(
        s => s.fieldId === selectedField.value
      )
    })

    const studentSubjects = computed(() => {
      if (!selectedField.value) return []
      return store.getters['courses/getAllCourses'].filter(
        course => course.coefficients[selectedField.value]
      )
    })

    const getStudentMark = (subjectId) => {
      if (!selectedStudent.value) return 0
      return store.getters['entranceExam/getCandidateMarkForSubject']({
        candidateId: selectedStudent.value.id,
        subjectId
      }) || 0
    }

    const calculateWeightedScore = (subject) => {
      const mark = getStudentMark(subject.id)
      const coeff = subject.coefficients[selectedField.value] || 0
      return (mark * coeff).toFixed(2)
    }

    const calculateAverage = () => {
      if (!studentSubjects.value.length) return 0
      let totalWeighted = 0
      let totalCoeff = 0
      
      studentSubjects.value.forEach(subject => {
        const mark = getStudentMark(subject.id)
        const coeff = subject.coefficients[selectedField.value] || 0
        totalWeighted += mark * coeff
        totalCoeff += coeff
      })

      return totalCoeff ? (totalWeighted / totalCoeff).toFixed(2) : 0
    }

    const generateReport = () => {
      const doc = new jsPDF()
      
      // Header
      doc.setFontSize(18)
      doc.text('Academic Report Card', 105, 20, { align: 'center' })
      
      // Student Info
      doc.setFontSize(12)
      doc.text(`Student: ${selectedStudent.value.name}`, 20, 40)
      doc.text(`Registration No: ${selectedStudent.value.registrationNumber}`, 20, 50)
      doc.text(`Field: ${props.fields.find(f => f.id === selectedField.value).name}`, 20, 60)
      
      // Grades Table
      const tableData = studentSubjects.value.map(subject => [
        subject.name,
        getStudentMark(subject.id),
        calculateGrade(getStudentMark(subject.id)),
        subject.coefficients[selectedField.value],
        calculateWeightedScore(subject)
      ])

      doc.autoTable({
        startY: 70,
        head: [['Subject', 'Score', 'Grade', 'Coefficient', 'Weighted Score']],
        body: tableData,
        foot: [[
          'Final Results',
          `Average: ${calculateAverage()}/20`,
          `GPA: ${calculateGPA()}`,
          '',
          calculateResult(calculateAverage())
        ]],
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }
      })

      doc.save(`report-card-${selectedStudent.value.registrationNumber}.pdf`)
    }

    return {
      selectedField,
      selectedStudent,
      filteredStudents,
      studentSubjects,
      getStudentMark,
      calculateGrade,
      calculateWeightedScore,
      calculateAverage,
      calculateGPA,
      calculateResult,
      generateReport
    }
  }
}
</script>

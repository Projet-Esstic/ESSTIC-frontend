
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Grade Calculator</h2>
        <p class="text-gray-600 dark:text-gray-400">Calculate and manage combined student grades</p>
      </div>
      <button 
        @click="calculateAllGrades"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :disabled="loading"
      >
        {{ loading ? 'Calculating...' : 'Calculate All Grades' }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2 text-gray-600">Loading...</span>
    </div>

    <!-- Filters and Controls -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
          <select 
            v-model="selectedField"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Fields</option>
            <option v-for="field in fields" :key="field.id" :value="field.id">
              {{ field.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or registration number"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-blue-900 dark:text-blue-100">Total Students</h3>
          <p class="text-2xl font-bold text-blue-600 dark:text-blue-300">{{ totalStudents }}</p>
        </div>
        <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-green-900 dark:text-green-100">Overall Average</h3>
          <p class="text-2xl font-bold text-green-600 dark:text-green-300">{{ overallAverage.toFixed(2) }}</p>
        </div>
        <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-purple-900 dark:text-purple-100">Highest Grade</h3>
          <p class="text-2xl font-bold text-purple-600 dark:text-purple-300">{{ highestGrade.toFixed(2) }}</p>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-yellow-900 dark:text-yellow-100">Pass Rate</h3>
          <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{{ passRate }}%</p>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Score</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Average</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ student.registrationNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ student.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ getFieldName(student.fieldId) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ calculateTotalScore(student).toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ calculateAverage(student).toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ getStudentRank(student) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(student)">
                {{ getStatus(student) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'GradeCalculator',
  
  props: {
    fields: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const selectedField = ref('')
    const searchQuery = ref('')
    const loading = ref(false)

    const allStudents = computed(() => store.getters['entranceExam/getCandidates'])
    const subjects = computed(() => store.getters['courses/getAllCourses'])

    const filteredStudents = computed(() => {
      let filtered = allStudents.value

      if (selectedField.value) {
        filtered = filtered.filter(s => s.fieldId === selectedField.value)
      }

      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(query) ||
          s.registrationNumber.toLowerCase().includes(query)
        )
      }

      return filtered.sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a))
    })

    const totalStudents = computed(() => filteredStudents.value.length)
    
    const overallAverage = computed(() => {
      if (!filteredStudents.value.length) return 0
      const total = filteredStudents.value.reduce((sum, student) => {
        return sum + calculateAverage(student)
      }, 0)
      return total / filteredStudents.value.length
    })

    const highestGrade = computed(() => {
      if (!filteredStudents.value.length) return 0
      return Math.max(...filteredStudents.value.map(student => calculateAverage(student)))
    })

    const passRate = computed(() => {
      if (!filteredStudents.value.length) return 0
      const passed = filteredStudents.value.filter(student => 
        calculateAverage(student) >= 10
      ).length
      return ((passed / filteredStudents.value.length) * 100).toFixed(1)
    })

    const calculateTotalScore = (student) => {
      return subjects.value.reduce((total, subject) => {
        const mark = store.getters['entranceExam/getCandidateMarkForSubject']({
          candidateId: student.id,
          subjectId: subject.id
        }) || 0
        const coefficient = subject.coefficients[student.fieldId] || 0
        return total + (mark * coefficient)
      }, 0)
    }

    const calculateAverage = (student) => {
      const totalCoefficients = subjects.value.reduce((sum, subject) => {
        return sum + (subject.coefficients[student.fieldId] || 0)
      }, 0)
      return totalCoefficients ? calculateTotalScore(student) / totalCoefficients : 0
    }

    const getStudentRank = (student) => {
      const scores = filteredStudents.value.map(s => ({
        id: s.id,
        score: calculateTotalScore(s)
      }))
      scores.sort((a, b) => b.score - a.score)
      const rank = scores.findIndex(s => s.id === student.id) + 1
      return `${rank}/${scores.length}`
    }

    const getStatus = (student) => {
      const average = calculateAverage(student)
      if (average >= 14) return 'Excellent'
      if (average >= 12) return 'Good'
      if (average >= 10) return 'Pass'
      return 'Fail'
    }

    const getStatusClass = (student) => {
      const average = calculateAverage(student)
      const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
      if (average >= 14) return `${baseClasses} bg-green-100 text-green-800`
      if (average >= 12) return `${baseClasses} bg-blue-100 text-blue-800`
      if (average >= 10) return `${baseClasses} bg-yellow-100 text-yellow-800`
      return `${baseClasses} bg-red-100 text-red-800`
    }

    const getFieldName = (fieldId) => {
      const field = props.fields.find(f => f.id === fieldId)
      return field ? field.name : 'Unknown'
    }

    const calculateAllGrades = async () => {
      try {
        loading.value = true
        // Implement grade calculation logic here
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error('Failed to calculate grades:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      selectedField,
      searchQuery,
      loading,
      filteredStudents,
      totalStudents,
      overallAverage,
      highestGrade,
      passRate,
      calculateTotalScore,
      calculateAverage,
      getStudentRank,
      getStatus,
      getStatusClass,
      getFieldName,
      calculateAllGrades
    }
  }
}
</script>

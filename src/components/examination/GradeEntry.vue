<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Grade Entry</h2>
        <p class="text-gray-600 dark:text-gray-400">Enter and manage student grades</p>
      </div>
      <button 
        @click="saveAllMarks"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : 'Save All Changes' }}
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
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <select 
            v-model="selectedSubject"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Subject</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject">
              {{ subject.name }} ({{ getCoefficientsDisplay(subject) }})
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
          <h3 class="text-lg font-medium text-green-900 dark:text-green-100">Class Average</h3>
          <p class="text-2xl font-bold text-green-600 dark:text-green-300">{{ classAverage.toFixed(2) }}</p>
        </div>
        <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-purple-900 dark:text-purple-100">Weighted Average</h3>
          <p class="text-2xl font-bold text-purple-600 dark:text-purple-300">{{ weightedAverage.toFixed(2) }}</p>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-yellow-900 dark:text-yellow-100">Pass Rate</h3>
          <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{{ passRate }}%</p>
        </div>
      </div>
    </div>

    <!-- Grades Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mark (/20)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Final Mark</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
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
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <input 
                type="number" 
                :value="getStudentMark(student)"
                min="0"
                max="20"
                step="0.25"
                @input="updateMarkLocally(student, $event.target.valueAsNumber)"
                class="w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :disabled="!selectedSubject"
              >
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ calculateWeightedMark(student).toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div class="flex items-center gap-2">
                <button 
                  @click="saveStudentMark(student)"
                  class="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                  :disabled="!selectedSubject || !hasUnsavedChanges(student)"
                  title="Save"
                >
                  <i class="material-icons">save</i>
                </button>
                <button 
                  @click="resetMark(student)"
                  class="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400"
                  :disabled="!selectedSubject || !hasUnsavedChanges(student)"
                  title="Reset"
                >
                  <i class="material-icons">undo</i>
                </button>
                <button 
                  @click="deleteMark(student)"
                  class="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  :disabled="!selectedSubject"
                  title="Delete"
                >
                  <i class="material-icons">delete</i>
                </button>
              </div>
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
  name: 'GradeEntry',
  
  props: {
    fields: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const selectedField = ref('')
    const selectedSubject = ref(null)
    const searchQuery = ref('')
    const loading = ref(false)
    const unsavedMarks = ref({})

    const subjects = computed(() => store.getters['courses/getAllCourses'])
    const allStudents = computed(() => store.getters['entranceExam/getCandidates'])

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

      return filtered
    })

    const totalStudents = computed(() => filteredStudents.value.length)
    
    const classAverage = computed(() => {
      if (!selectedSubject.value || !filteredStudents.value.length) return 0
      const totalMarks = filteredStudents.value.reduce((sum, student) => {
        return sum + getStudentMark(student)
      }, 0)
      return totalMarks / filteredStudents.value.length
    })

    const weightedAverage = computed(() => {
      if (!selectedSubject.value || !filteredStudents.value.length) return 0
      const totalWeightedMarks = filteredStudents.value.reduce((sum, student) => {
        return sum + calculateWeightedMark(student)
      }, 0)
      return totalWeightedMarks / filteredStudents.value.length
    })

    const passRate = computed(() => {
      if (!filteredStudents.value.length) return 0
      const passed = filteredStudents.value.filter(student => 
        calculateWeightedMark(student) >= 10
      ).length
      return ((passed / filteredStudents.value.length) * 100).toFixed(1)
    })

    const getStudentMark = (student) => {
      if (!selectedSubject.value) return 0
      
      const unsavedKey = `${student.id}-${selectedSubject.value.id}`
      if (unsavedKey in unsavedMarks.value) {
        return unsavedMarks.value[unsavedKey]
      }

      return store.getters['entranceExam/getCandidateMarkForSubject']({
        candidateId: student.id,
        subjectId: selectedSubject.value.id
      }) || 0
    }

    const calculateWeightedMark = (student) => {
      if (!selectedSubject.value) return 0
      const mark = getStudentMark(student)
      const coefficient = selectedSubject.value.coefficients[student.fieldId] || 0
      return mark * coefficient
    }

    const updateMarkLocally = (student, mark) => {
      if (!selectedSubject.value) return
      
      if (isNaN(mark) || mark < 0) mark = 0
      if (mark > 20) mark = 20

      const key = `${student.id}-${selectedSubject.value.id}`
      unsavedMarks.value[key] = mark
    }

    const hasUnsavedChanges = (student) => {
      if (!selectedSubject.value) return false
      const key = `${student.id}-${selectedSubject.value.id}`
      return key in unsavedMarks.value
    }

    const saveStudentMark = async (student) => {
      if (!selectedSubject.value) return

      try {
        loading.value = true
        const key = `${student.id}-${selectedSubject.value.id}`
        const mark = unsavedMarks.value[key]
        
        await store.dispatch('entranceExam/updateMark', {
          candidateId: student.id,
          subjectId: selectedSubject.value.id,
          mark
        })
        
        delete unsavedMarks.value[key]
      } catch (error) {
        console.error('Failed to save mark:', error)
      } finally {
        loading.value = false
      }
    }

    const resetMark = (student) => {
      if (!selectedSubject.value) return
      const key = `${student.id}-${selectedSubject.value.id}`
      delete unsavedMarks.value[key]
    }

    const saveAllMarks = async () => {
      if (!selectedSubject.value) return

      try {
        loading.value = true
        for (const [key, mark] of Object.entries(unsavedMarks.value)) {
          const [studentId, subjectId] = key.split('-').map(Number)
          await store.dispatch('entranceExam/updateMark', {
            candidateId: studentId,
            subjectId,
            mark
          })
        }
        unsavedMarks.value = {}
      } catch (error) {
        console.error('Failed to save marks:', error)
      } finally {
        loading.value = false
      }
    }

    const getFieldName = (fieldId) => {
      const field = props.fields.find(f => f.id === fieldId)
      return field ? field.name : 'Unknown'
    }

    const getCoefficientsDisplay = (subject) => {
      if (!subject.coefficients) return 'No coefficients'
      const selectedFieldCoeff = selectedField.value ? subject.coefficients[selectedField.value] : null
      if (selectedFieldCoeff !== null) {
        return `Coefficient: ${selectedFieldCoeff}`
      }
      const coeffs = Object.values(subject.coefficients)
      const min = Math.min(...coeffs)
      const max = Math.max(...coeffs)
      return min === max ? `Coefficient: ${min}` : `Coefficients: ${min}-${max}`
    }

    return {
      selectedField,
      selectedSubject,
      searchQuery,
      loading,
      subjects,
      filteredStudents,
      totalStudents,
      classAverage,
      weightedAverage,
      passRate,
      getFieldName,
      getStudentMark,
      calculateWeightedMark,
      updateMarkLocally,
      saveAllMarks,
      getCoefficientsDisplay,
      hasUnsavedChanges,
      saveStudentMark,
      resetMark
    }
  }
}
</script>

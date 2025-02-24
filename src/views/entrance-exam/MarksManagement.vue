<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Marks Management</h2>
        <p class="text-gray-600 dark:text-gray-400">Enter marks by subject and field of study</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2 text-gray-600 dark:text-gray-400">Loading...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Error loading data</h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
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
            <option value="">Select a subject</option>
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
    </div>

    <!-- Selected Subject Info -->
    <div v-if="selectedSubject" class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-blue-900 dark:text-blue-100">
            {{ selectedSubject.name }}
          </h3>
          <div class="mt-2 space-y-1">
            <p class="text-sm text-blue-700 dark:text-blue-300" v-for="field in fields" :key="field.id">
              {{ field.name }}: Coefficient {{ selectedSubject.coefficients[field.id] || 0 }}
            </p>
          </div>
        </div>
        <div class="text-right space-y-2">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Class Average: {{ classAverage.toFixed(2) }}
          </p>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Final Average: {{ weightedAverage.toFixed(2) }}
          </p>
          <button 
            @click="saveAllMarks"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
            :disabled="!hasUnsavedChanges"
          >
            <span class="flex items-center">
              <i class="material-icons mr-2">save</i>
              Save All Marks
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Marks Table -->
    <div v-if="selectedSubject" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mark (/20)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Final Mark</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="candidate in filteredCandidates" :key="candidate.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ candidate.registrationNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ candidate.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ getFieldName(candidate.fieldId) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <input 
                type="number" 
                :value="getCandidateMark(candidate)"
                min="0"
                max="20"
                step="0.25"
                @input="updateMarkLocally(candidate, $event.target.valueAsNumber)"
                class="w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ calculateWeightedMark(candidate).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Subject Selected Message -->
    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      Please select a subject to enter marks
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MarksManagement',

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
    const selectedSubject = ref(null)
    const unsavedMarks = ref({}) // Store unsaved changes

    // Load initial data
    onMounted(async () => {
      await Promise.all([
        store.dispatch('courses/fetchCourses'),
        store.dispatch('entranceExam/fetchMarks')
      ])
    })

    // Get data from store
    const subjects = computed(() => store.getters['courses/getAllCourses'])
    const allCandidates = computed(() => store.getters['entranceExam/getCandidates'])
    const loading = computed(() => 
      store.getters['courses/isLoading'] || 
      store.getters['entranceExam/isLoading']
    )
    const error = computed(() => 
      store.getters['courses/getError'] || 
      store.getters['entranceExam/getError']
    )

    const hasUnsavedChanges = computed(() => {
      return Object.keys(unsavedMarks.value).length > 0
    })

    const filteredCandidates = computed(() => {
      let filtered = allCandidates.value

      // Filter by field if selected
      if (selectedField.value) {
        filtered = filtered.filter(c => c.fieldId === selectedField.value)
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(query) ||
          c.registrationNumber.toLowerCase().includes(query)
        )
      }

      return filtered
    })

    const getCandidateMark = (candidate) => {
      if (!selectedSubject.value) return 0
      
      // Check unsaved marks first
      const unsavedKey = `${candidate.id}-${selectedSubject.value.id}`
      if (unsavedKey in unsavedMarks.value) {
        return unsavedMarks.value[unsavedKey]
      }

      // Then check saved marks
      const mark = store.getters['entranceExam/getCandidateMarkForSubject']({
        candidateId: candidate.id,
        subjectId: selectedSubject.value.id
      })
      return mark || 0
    }

    const calculateWeightedMark = (candidate) => {
      if (!selectedSubject.value) return 0
      const mark = getCandidateMark(candidate)
      const coefficient = selectedSubject.value.coefficients[candidate.fieldId] || 0
      return mark * coefficient
    }

    const classAverage = computed(() => {
      if (!selectedSubject.value || !filteredCandidates.value.length) return 0
      const totalMarks = filteredCandidates.value.reduce((sum, candidate) => {
        return sum + getCandidateMark(candidate)
      }, 0)
      return totalMarks / filteredCandidates.value.length
    })

    const weightedAverage = computed(() => {
      if (!selectedSubject.value || !filteredCandidates.value.length) return 0
      const totalWeightedMarks = filteredCandidates.value.reduce((sum, candidate) => {
        return sum + calculateWeightedMark(candidate)
      }, 0)
      return totalWeightedMarks / filteredCandidates.value.length
    })

    const updateMarkLocally = (candidate, mark) => {
      if (!selectedSubject.value) return
      
      // Validate mark
      if (isNaN(mark) || mark < 0) mark = 0
      if (mark > 20) mark = 20

      const key = `${candidate.id}-${selectedSubject.value.id}`
      unsavedMarks.value[key] = mark
    }

    const saveAllMarks = async () => {
      if (!selectedSubject.value) return

      try {
        // Save all unsaved marks
        for (const [key, mark] of Object.entries(unsavedMarks.value)) {
          const [candidateId, subjectId] = key.split('-').map(Number)
          await store.dispatch('entranceExam/updateMark', {
            candidateId,
            subjectId,
            mark
          })
        }
        
        // Clear unsaved marks
        unsavedMarks.value = {}
      } catch (error) {
        console.error('Failed to save marks:', error)
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
      searchQuery,
      selectedSubject,
      subjects,
      filteredCandidates,
      classAverage,
      weightedAverage,
      hasUnsavedChanges,
      loading,
      error,
      getFieldName,
      getCandidateMark,
      calculateWeightedMark,
      updateMarkLocally,
      saveAllMarks,
      getCoefficientsDisplay
    }
  }
}
</script>

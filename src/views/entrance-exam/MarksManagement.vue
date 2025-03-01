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
            <option 
              v-for="subject in subjects" 
              :key="subject._id" 
              :value="subject"
              :disabled="!subject.isActive || !subject.isEntranceExam"
            >
              {{ subject.courseCode }} - {{ subject.courseName }}
              <template v-if="subject.department?.length">
                ({{ getCoefficientsDisplay(subject) }})
              </template>
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
import { courseService } from '@/api/services'

export default {
  name: 'MarksManagement',

  setup() {
    const store = useStore()
    const selectedField = ref('')
    const searchQuery = ref('')
    const selectedSubject = ref(null)
    const unsavedMarks = ref({})
    const courses = ref([])
    const coursesLoading = ref(false)
    const coursesError = ref(null)

    // Load initial data
    onMounted(async () => {
      await Promise.all([
        store.dispatch('candidates/fetchCandidates'),
        fetchCourses()
      ])
    })

    const fetchCourses = async () => {
      coursesLoading.value = true
      coursesError.value = null
      try {
        const response = await courseService.getAllCourses()
        courses.value = response
      } catch (err) {
        coursesError.value = err.message || 'Failed to fetch courses'
        console.error('Error fetching courses:', err)
      } finally {
        coursesLoading.value = false
      }
    }

    // Get data from store
    const subjects = computed(() => courses.value || [])
    const allCandidates = computed(() => store.getters['candidates/getAllCandidates'] || [])
    const loading = computed(() => 
      store.getters['candidates/isLoading'] || 
      coursesLoading.value
    )
    const error = computed(() => 
      store.getters['candidates/getError'] || 
      coursesError.value
    )

    const hasUnsavedChanges = computed(() => {
      return Object.keys(unsavedMarks.value).length > 0
    })

    const filteredCandidates = computed(() => {
      if (!allCandidates.value) return []
      
      let filtered = allCandidates.value.filter(c => c?.applicationStatus === 'registered')

      if (selectedField.value) {
        filtered = filtered.filter(c => c?.fieldOfStudy === selectedField.value)
      }

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(c => {
          const userName = c?.user?.name || ''
          const regNumber = c?.registrationNumber || ''
          return userName.toLowerCase().includes(query) || 
                 regNumber.toLowerCase().includes(query)
        })
      }

      return filtered || []
    })

    const getCoefficientsDisplay = (subject) => {
      if (!subject?.department?.length) return 'No departments'
      return subject.department
        .map(dept => dept?.name || dept?.departmentName)
        .filter(Boolean)
        .join(', ')
    }

    const getDepartmentForCandidate = (candidate) => {
      if (!selectedSubject.value?.department?.length || !candidate?.fieldOfStudy) return null
      return selectedSubject.value.department.find(
        dept => dept?._id?.toString() === candidate.fieldOfStudy?.toString()
      )
    }

    const getCandidateMark = (candidate) => {
      if (!candidate?._id || !selectedSubject.value?._id) return 0

      // Check unsaved changes first
      const key = `${candidate._id}-${selectedSubject.value._id}`
      if (key in unsavedMarks.value) {
        return unsavedMarks.value[key]
      }

      // Then check existing marks
      const mark = candidate.Marks?.find(m => 
        m?.courseId?.toString() === selectedSubject.value._id?.toString()
      )
      return mark?.mark?.currentMark || 0
    }

    const updateMarkLocally = (candidate, newMark) => {
      if (!candidate?._id || !selectedSubject.value?._id) return
      if (isNaN(newMark) || newMark < 0 || newMark > 20) return
      
      const key = `${candidate._id}-${selectedSubject.value._id}`
      unsavedMarks.value[key] = newMark
    }

    const calculateWeightedMark = (candidate) => {
      if (!candidate) return 0
      const mark = getCandidateMark(candidate)
      const department = getDepartmentForCandidate(candidate)
      const coefficient = department?.coefficient || 1
      return mark * coefficient
    }

    const classAverage = computed(() => {
      if (!filteredCandidates.value?.length) return 0
      const sum = filteredCandidates.value.reduce((acc, candidate) => 
        acc + getCandidateMark(candidate), 0)
      return sum / filteredCandidates.value.length
    })

    const weightedAverage = computed(() => {
      if (!filteredCandidates.value?.length) return 0
      const sum = filteredCandidates.value.reduce((acc, candidate) => 
        acc + calculateWeightedMark(candidate), 0)
      return sum / filteredCandidates.value.length
    })

    const saveAllMarks = async () => {
      const currentUser = store.getters['auth/getCurrentUser']
      if (!currentUser?._id) {
        console.error('No current user found')
        return
      }

      try {
        // Save each mark individually to maintain proper history
        for (const [key, newMark] of Object.entries(unsavedMarks.value)) {
          const [candidateId, courseId] = key.split('-')
          if (!candidateId || !courseId) continue

          await store.dispatch('candidates/updateCandidateMarks', {
            candidateId,
            courseId,
            mark: {
              currentMark: newMark,
              modifiedBy: {
                name: currentUser.name,
                userId: currentUser._id
              }
            }
          })
        }
        
        unsavedMarks.value = {} // Clear unsaved changes after successful save
      } catch (error) {
        console.error('Failed to save marks:', error)
      }
    }

    const getFieldName = (fieldId) => {
      if (!selectedSubject.value?.department?.length || !fieldId) return 'Unknown Field'
      const dept = selectedSubject.value.department.find(d => 
        d?._id?.toString() === fieldId?.toString()
      )
      return dept?.name || dept?.departmentName || 'Unknown Field'
    }

    return {
      selectedField,
      searchQuery,
      selectedSubject,
      subjects,
      filteredCandidates,
      loading,
      error,
      getCoefficientsDisplay,
      getCandidateMark,
      updateMarkLocally,
      calculateWeightedMark,
      classAverage,
      weightedAverage,
      saveAllMarks,
      getFieldName,
      hasUnsavedChanges
    }
  }
}
</script>

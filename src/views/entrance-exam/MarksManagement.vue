<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Marks Management</h2>
        <p class="text-gray-600 dark:text-gray-400">Enter marks by subject and field of study</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
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
            <option v-for="subject in subjects" :key="subject.id" :value="subject">
              {{ subject.name }} (Coefficient: {{ subject.coefficient }})
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
          <p class="text-blue-700 dark:text-blue-300">
            Coefficient: {{ selectedSubject.coefficient }}
          </p>
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
import { ref, computed } from 'vue'
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

    // Load marks data
    store.dispatch('entranceExam/fetchMarks')

    // Get data from store
    const subjects = computed(() => store.getters['entranceExam/getSubjects'])
    const allCandidates = computed(() => store.getters['entranceExam/getCandidates'])

    const hasUnsavedChanges = computed(() => {
      return Object.keys(unsavedMarks.value).length > 0
    })

    const filteredCandidates = computed(() => {
      return allCandidates.value.filter(candidate => {
        const matchesField = !selectedField.value || candidate.fieldId === selectedField.value
        const matchesSearch = !searchQuery.value || 
          candidate.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          candidate.registrationNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
        return matchesField && matchesSearch
      })
    })

    const classAverage = computed(() => {
      if (!selectedSubject.value || filteredCandidates.value.length === 0) return 0
      return store.getters['entranceExam/getClassAverageBySubject'](
        selectedSubject.value.id,
        filteredCandidates.value
      )
    })

    const weightedAverage = computed(() => {
      if (!selectedSubject.value || filteredCandidates.value.length === 0) return 0
      return store.getters['entranceExam/getWeightedAverageBySubject'](
        selectedSubject.value.id,
        filteredCandidates.value
      )
    })

    const getFieldName = (fieldId) => {
      const field = props.fields.find(f => f.id === fieldId)
      return field ? field.name : ''
    }

    const getCandidateMark = (candidate) => {
      // Return unsaved mark if it exists, otherwise get from store
      if (unsavedMarks.value[candidate.id] !== undefined) {
        return unsavedMarks.value[candidate.id]
      }
      return store.getters['entranceExam/getMarksByCandidateAndSubject'](
        candidate.id,
        selectedSubject.value?.id
      )
    }

    const calculateWeightedMark = (candidate) => {
      if (!selectedSubject.value) return 0
      const mark = getCandidateMark(candidate)
      return mark * selectedSubject.value.coefficient
    }

    const updateMarkLocally = (candidate, mark) => {
      if (!selectedSubject.value) return
      
      // Ensure mark is between 0 and 20
      mark = Math.min(Math.max(mark, 0), 20)
      
      // Store the mark locally
      unsavedMarks.value[candidate.id] = mark
    }

    const saveAllMarks = async () => {
      if (!selectedSubject.value || !hasUnsavedChanges.value) return

      try {
        // Save all unsaved marks
        for (const [candidateId, mark] of Object.entries(unsavedMarks.value)) {
          await store.dispatch('entranceExam/saveMarks', {
            candidateId: parseInt(candidateId),
            subjectId: selectedSubject.value.id,
            mark
          })
        }
        // Clear unsaved marks after successful save
        unsavedMarks.value = {}
      } catch (error) {
        console.error('Error saving marks:', error)
      }
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
      getFieldName,
      getCandidateMark,
      calculateWeightedMark,
      updateMarkLocally,
      saveAllMarks
    }
  }
}
</script>

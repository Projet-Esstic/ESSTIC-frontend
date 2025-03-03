<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Entrance Exam Results</h2>
      <div class="flex gap-2">
        <button 
          @click="updateSelectedResults('passed')"
          :disabled="!selectedCandidates.length"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="material-icons text-sm">check_circle</i>
          Mark as Passed
        </button>
        <button 
          @click="updateSelectedResults('failed')"
          :disabled="!selectedCandidates.length"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="material-icons text-sm">cancel</i>
          Mark as Failed
        </button>
      </div>
    </div>

    <!-- Results Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="text-gray-600 dark:text-gray-300">Loading results...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-600 dark:text-red-400">{{ error }}</div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!candidates.length" class="p-8 text-center">
        <div class="text-gray-600 dark:text-gray-400">No candidates found.</div>
      </div>

      <!-- Data Table -->
      <div v-else>
        <!-- Filters -->
        <div class="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700 grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
            <select 
              v-model="selectedField"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Fields</option>
              <option v-for="field in fields" :key="field._id" :value="field._id">
                {{ field.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Result Status</label>
            <select 
              v-model="selectedStatus"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
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

        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left">
                <input 
                  type="checkbox" 
                  :checked="selectAll" 
                  @change="toggleSelectAll"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration No.</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field of Study</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Average Mark</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="candidate in filteredCandidates" :key="candidate._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4">
                <input 
                  type="checkbox" 
                  v-model="selectedCandidates"
                  :value="candidate._id"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ candidate.registrationNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ candidate.user?.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ getFieldName(candidate.fieldOfStudy) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ calculateAverageMark(candidate).toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  {
                    'bg-green-100 text-green-800': candidate.examResult === 'passed',
                    'bg-red-100 text-red-800': candidate.examResult === 'failed',
                    'bg-gray-100 text-gray-800': !candidate.examResult || candidate.examResult === 'pending'
                  }
                ]">
                  {{ candidate.examResult ? candidate.examResult.charAt(0).toUpperCase() + candidate.examResult.slice(1) : 'Pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="updateCandidateResult(candidate._id, 'passed')"
                    class="text-green-600 hover:text-green-900"
                    title="Mark as Passed"
                  >
                    <i class="material-icons">check_circle</i>
                  </button>
                  <button 
                    @click="updateCandidateResult(candidate._id, 'failed')"
                    class="text-red-600 hover:text-red-900"
                    title="Mark as Failed"
                  >
                    <i class="material-icons">cancel</i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
//import { useStore } from 'vuex'
import { candidateService } from '@/api/services'

export default {
  name: 'ExamResults',
  
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  setup(props) {
   // const store = useStore()
    const loading = ref(false)
    const error = ref(null)
    const candidates = ref([])
    const selectedField = ref('')
    const selectedStatus = ref('')
    const searchQuery = ref('')
    const selectedCandidates = ref([])

    const filteredCandidates = computed(() => {
      if (!candidates.value) return []
      
      let filtered = candidates.value

      if (selectedField.value) {
        filtered = filtered.filter(c => c?.fieldOfStudy === selectedField.value)
      }

      if (selectedStatus.value) {
        filtered = filtered.filter(c => c?.examResult === selectedStatus.value)
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

      return filtered
    })

    const selectAll = computed({
      get: () => {
        return filteredCandidates.value.length > 0 && 
               selectedCandidates.value.length === filteredCandidates.value.length
      },
      set: (value) => {
        selectedCandidates.value = value 
          ? filteredCandidates.value.map(c => c._id)
          : []
      }
    })

    const loadCandidates = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await candidateService.getAllCandidates()
        candidates.value = response
      } catch (err) {
        error.value = err.message || 'Failed to load candidates'
        console.error('Failed to load candidates:', err)
      } finally {
        loading.value = false
      }
    }

    const calculateAverageMark = (candidate) => {
      if (!candidate?.Marks?.length) return 0
      const sum = candidate.Marks.reduce((acc, mark) => acc + (mark?.mark?.currentMark || 0), 0)
      return sum / candidate.Marks.length
    }

    const getFieldName = (fieldId) => {
      if (!fieldId) return 'Unknown Field'
      const field = props.fields.find(f => f._id === fieldId)
      return field?.name || 'Unknown Field'
    }

    const updateCandidateResult = async (candidateId, result) => {
      try {
        await candidateService.updateCandidateResult(candidateId, { examResult: result })
        await loadCandidates() // Reload to get updated data
      } catch (err) {
        console.error('Failed to update result:', err)
        error.value = err.message || 'Failed to update result'
      }
    }

    const updateSelectedResults = async (result) => {
      try {
        await Promise.all(
          selectedCandidates.value.map(id => 
            candidateService.updateCandidateResult(id, { examResult: result })
          )
        )
        selectedCandidates.value = [] // Clear selection
        await loadCandidates() // Reload to get updated data
      } catch (err) {
        console.error('Failed to update results:', err)
        error.value = err.message || 'Failed to update results'
      }
    }

    const toggleSelectAll = (event) => {
      selectAll.value = event.target.checked
    }

    onMounted(() => {
      loadCandidates()
    })

    return {
      loading,
      error,
      candidates,
      selectedField,
      selectedStatus,
      searchQuery,
      selectedCandidates,
     // fields: computed(() => props.fields),
      filteredCandidates,
      selectAll,
      calculateAverageMark,
      getFieldName,
      updateCandidateResult,
      updateSelectedResults,
      toggleSelectAll
    }
  }
}
</script>

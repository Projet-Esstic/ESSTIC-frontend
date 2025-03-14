<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Student Enrollment</h2>
      <div class="flex gap-2">
        <button 
          @click="enrollSelected"
          :disabled="!selectedCandidates.length"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="material-icons text-sm">how_to_reg</i>
          Enroll Selected
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
          <select 
            v-model="selectedDepartment"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept._id" :value="dept._id">
              {{ dept.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
          <select 
            v-model="selectedYear"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Years</option>
            <option v-for="year in academicYears" :key="year" :value="year">
              {{ year }}
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

    <!-- Results Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="text-gray-600 dark:text-gray-300">Loading candidates...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-600 dark:text-red-400">{{ error }}</div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredCandidates.length" class="p-8 text-center">
        <div class="text-gray-600 dark:text-gray-400">No candidates found for enrollment.</div>
      </div>

      <!-- Data Table -->
      <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Academic Year</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Average Mark</th>
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
              {{ getDepartmentName(candidate.fieldOfStudy) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ candidate.academicYear }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ calculateAverageMark(candidate).toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button 
                @click="enrollCandidate(candidate._id)"
                class="text-green-600 hover:text-green-900"
                title="Enroll Student"
              >
                <i class="material-icons">how_to_reg</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
// import { useStore } from 'vuex'
import { studentService } from '@/api/services/index'
import { 
  candidateService, 
   
} from '@/api/services'

export default {
  name: 'EnrollmentList',
  
  props: {
    departments: {
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
    const selectedDepartment = ref('')
    const selectedYear = ref('')
    const searchQuery = ref('')
    const selectedCandidates = ref([])

    // Get unique academic years from candidates
    const academicYears = computed(() => {
      const years = new Set(candidates.value.map(c => c.academicYear).filter(Boolean))
      return Array.from(years).sort().reverse()
    })

    const filteredCandidates = computed(() => {
      if (!candidates.value) return []
      
      let filtered = candidates.value.filter(c => c.examResult === 'passed' && !c.isEnrolled)

      if (selectedDepartment.value) {
        filtered = filtered.filter(c => c.fieldOfStudy === selectedDepartment.value)
      }

      if (selectedYear.value) {
        filtered = filtered.filter(c => c.academicYear === selectedYear.value)
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

    const getDepartmentName = (departmentId) => {
      if (!departmentId) return 'Unknown Department'
      const department = props.departments.find(d => d._id === departmentId)
      return department?.name || 'Unknown Department'
    }

    const enrollCandidate = async (candidateId) => {
      try {
        await studentService.enrollCandidate(candidateId)
        await loadCandidates() // Reload to get updated data
      } catch (err) {
        console.error('Failed to enroll candidate:', err)
        error.value = err.message || 'Failed to enroll candidate'
      }
    }

    const enrollSelected = async () => {
      try {
        await Promise.all(
          selectedCandidates.value.map(id => studentService.enrollCandidate(id))
        )
        selectedCandidates.value = [] // Clear selection
        await loadCandidates() // Reload to get updated data
      } catch (err) {
        console.error('Failed to enroll candidates:', err)
        error.value = err.message || 'Failed to enroll candidates'
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
      selectedDepartment,
      selectedYear,
      searchQuery,
      selectedCandidates,
      academicYears,
      filteredCandidates,
      selectAll,
      calculateAverageMark,
      getDepartmentName,
      enrollCandidate,
      enrollSelected,
      toggleSelectAll
    }
  }
}
</script>

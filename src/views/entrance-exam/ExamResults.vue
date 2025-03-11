<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Entrance Exam Results</h2>
      <button 
        @click="publishResults"
        :disabled="!selectedCandidates.length"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i class="material-icons text-sm">publish</i>
        Publish Selected Results
      </button>
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
        <div class="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700 grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
            <select 
              v-model="selectedField"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Departments</option>
              <option 
                v-for="department in departments" 
                :key="department._id" 
                :value="department._id"
              >
                {{ department.name }}
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Average Mark</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="candidate in filteredCandidates" :key="candidate._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4">
                <input 
                  type="checkbox" 
                  v-model="selectedCandidates"
                  :value="candidate._id"
                  :disabled="!candidate.applicationStatus === 'registered'"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ generateRegistrationNumber(candidate._id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : 'N/A' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-300">
                  {{ candidate.user?.email || 'N/A' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ getFieldName(candidate.fieldOfStudy) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ calculateAverageMark(candidate).toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  {
                    'bg-green-100 text-green-800': candidate.applicationStatus === 'registered',
                    'bg-yellow-100 text-yellow-800': candidate.applicationStatus === 'pending',
                    'bg-red-100 text-red-800': candidate.applicationStatus === 'rejected'
                  }
                ]">
                  {{ candidate.applicationStatus }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
  candidateService, 
  courseService, 
  departmentService,
   
} from '@/api/services'
import { io } from 'socket.io-client'
import { useToast } from 'vue-toast-notification'
import{studentService} from '@/api/services/index.js'

export default {
  name: 'ExamResults',
  
  setup() {
    const toast = useToast()
    const loading = ref(false)
    const error = ref(null)
    const candidates = ref([])
    const departments = ref([])
    const selectedField = ref('')
    const searchQuery = ref('')
    const selectedCandidates = ref([])
    const socket = ref(null)
    const courses = ref([])

    // Load departments
    const loadDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments()
        departments.value = response
      } catch (err) {
        console.error('Failed to load departments:', err)
      }
    }

    // Load courses
    const loadCourses = async () => {
      try {
        const response = await courseService.getAllCourses()
        courses.value = response
      } catch (err) {
        console.error('Failed to load courses:', err)
      }
    }

    // Load candidates with socket updates
    const loadCandidates = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await candidateService.getAllCandidates();
        candidates.value = response
      } catch (err) {
        error.value = err.message || 'Failed to load candidates'
        console.error('Failed to load candidates:', err)
      } finally {
        loading.value = false
      }
    }

    // Setup socket connection
    onMounted(() => {
      socket.value = io(process.env.VUE_APP_SOCKET_ENDPOINT)
      
      socket.value.on('candidateUpdated', (updatedCandidate) => {
        const index = candidates.value.findIndex(c => c._id === updatedCandidate._id)
        if (index !== -1) {
          candidates.value[index] = updatedCandidate
        }
      })

      socket.value.on('candidateAdded', (newCandidate) => {
        candidates.value.push(newCandidate)
      })

      socket.value.on('candidateDeleted', (deletedId) => {
        candidates.value = candidates.value.filter(c => c._id !== deletedId)
      })

      // Load all data
      loadDepartments()
      loadCourses()
      loadCandidates()
    })

    // Cleanup socket on unmount
    onBeforeUnmount(() => {
      if (socket.value) {
        socket.value.disconnect()
      }
    })

    const getFieldName = (fieldId) => {
      if (!fieldId) return 'Unknown Field'
      const dept = departments.value.find(d => d._id === fieldId)
      return dept ? dept.name : 'Unknown Field'
    }

    const filteredCandidates = computed(() => {
      if (!candidates.value) return []
      
      let filtered = candidates.value.filter(candidate => {
        // First check for registered status
        if (candidate.applicationStatus !== 'registered') return false;
        
        // Then apply department filter
        const matchesDepartment = selectedField.value 
          ? candidate.fieldOfStudy === selectedField.value 
          : true;

        // Finally apply search filter
        if (!searchQuery.value) return matchesDepartment;
        
        const query = searchQuery.value.toLowerCase();
        const userName = `${candidate.user?.firstName} ${candidate.user?.lastName}`.toLowerCase();
        const regNumber = candidate.registrationNumber?.toLowerCase() || '';
        
        return matchesDepartment && (userName.includes(query) || regNumber.includes(query));
      });

      return filtered;
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

    const calculateAverageMark = (candidate) => {
      if (!candidate?.Marks?.length) return 0;
      
      let totalWeightedMarks = 0;
      let totalCoefficients = 0;

      candidate.Marks.forEach(mark => {
        const course = courses.value.find(c => c._id === mark.courseId);
        if (course) {
          const deptCoefficient = course.department.find(
            dept => dept.departmentInfo === candidate.fieldOfStudy
          );
          const coefficient = deptCoefficient ? deptCoefficient.coefficient : 1;
          totalWeightedMarks += mark.mark.currentMark * coefficient;
          totalCoefficients += coefficient;
        }
      });

      return totalCoefficients > 0 ? totalWeightedMarks / totalCoefficients : 0;
    };

    const publishResults = async () => {
      try {
        const selectedStudents = candidates.value
          .filter(c => selectedCandidates.value.includes(c._id))
          .map(candidate => ({
            user: candidate.user._id,
            candidate: candidate._id,
            academicInfo: [{
              level: "level_1",
              department: candidate.fieldOfStudy,
              academicYears: []
            }]
          }));

        if (selectedStudents.length === 0) {
          toast.error('No candidates selected');
          return;
        }

        await studentService.createStudents(selectedStudents);
        toast.success('Students successfully published!');
        selectedCandidates.value = [];
        await loadCandidates();

      } catch (err) {
        console.error('Failed to publish results:', err);
        toast.error(err.message || 'Failed to publish results');
        error.value = err.message || 'Failed to publish results';
      }
    };

    const toggleSelectAll = (event) => {
      selectAll.value = event.target.checked
    }

    const generateRegistrationNumber = (id) => {
      if (!id) return 'N/A';
      
      // Take the last 6 characters of the ID and convert to uppercase
      const shortId = id.slice(-6).toUpperCase();
      
      // Get the current year
      const year = new Date().getFullYear();
      
      // Combine into format: YEAR/HEX
      return `${year}/${shortId}`;
    };

    return {
      loading,
      error,
      candidates,
      departments,
      selectedField,
      searchQuery,
      selectedCandidates,
      filteredCandidates,
      selectAll,
      calculateAverageMark,
      getFieldName,
      publishResults,
      toggleSelectAll,
      courses,
      generateRegistrationNumber,
      toast
    }
  }
}
</script>

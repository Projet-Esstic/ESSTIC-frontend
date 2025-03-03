<template>
  <div class="space-y-6">
   
    
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Create New Entrance Exam</h2>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
      >
        <i class="material-icons">add</i>
        Create Exam
      </button>
    </div>

    <!-- Exams List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="text-gray-600 dark:text-gray-300">Loading exams...</p>
        </div>
      </div>

      <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-600 dark:text-red-400">{{ error }}</div>
      </div>

      <div v-else-if="!exams.length" class="p-8 text-center">
        <div class="text-gray-600 dark:text-gray-400">No entrance exams found.</div>
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exam Code</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration Period</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exam Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="exam in exams" :key="exam._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ exam.examCode }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ exam.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="[
                'px-2 py-1 text-xs rounded-full',
                {
                  'bg-green-100 text-green-800': exam.status === 'active',
                  'bg-yellow-100 text-yellow-800': exam.status === 'upcoming',
                  'bg-gray-100 text-gray-800': exam.status === 'completed',
                  'bg-blue-100 text-blue-800': exam.status === 'in_progress'
                }
              ]">
                {{ exam.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ formatDate(exam.startDate) }} - {{ formatDate(exam.endDate) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ formatDate(exam.examDate) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div class="flex items-center gap-2">
                <button 
                  @click="editExam(exam)"
                  class="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                  title="Edit"
                >
                  <i class="material-icons">edit</i>
                </button>
                <button 
                  @click="deleteExam(exam)"
                  class="text-red-600 hover:text-red-900 dark:hover:text-red-400"
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

    <!-- Create/Edit Modal -->
    <Modal v-model="showModal" :title="examForm._id ? 'Edit Entrance Exam' : 'Create New Entrance Exam'">
      <div v-if="formLoading" class="flex justify-center items-center min-h-[200px]">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="text-gray-600 dark:text-gray-300">Loading form data...</p>
        </div>
      </div>

      <div v-else-if="formError" class="p-8 text-center">
        <div class="text-red-600 dark:text-red-400">{{ formError }}</div>
      </div>

      <form v-else @submit.prevent="saveExam" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Code</label>
            <input 
              v-model="examForm.examCode"
              type="text"
              required
              placeholder="e.g. STEM2025"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
            <input 
              v-model="examForm.academicYear"
              type="text"
              required
              placeholder="e.g. 2025-2026"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Name</label>
          <input 
            v-model="examForm.name"
            type="text"
            required
            placeholder="e.g. STEM Departments Joint Entrance Test"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea 
            v-model="examForm.description"
            rows="3"
            required
            placeholder="Enter exam description"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input 
              v-model="examForm.startDate"
              type="datetime-local"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input 
              v-model="examForm.endDate"
              type="datetime-local"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Date</label>
          <input 
            v-model="examForm.examDate"
            type="datetime-local"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Departments</label>
          <div class="relative">
            <select 
              v-model="examForm.department"
              multiple
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option 
                v-for="dept in departments" 
                :key="dept._id" 
                :value="dept._id"
                class="py-2"
              >
                {{ dept.name }} ({{ dept.code }})
              </option>
            </select>
            <p class="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple departments</p>
            <div v-if="examForm.department.length > 0" class="mt-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Departments:</h4>
              <ul class="mt-1 space-y-1">
                <li 
                  v-for="deptId in examForm.department" 
                  :key="deptId"
                  class="text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ departments.find(d => d._id === deptId)?.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
          <select 
            v-model="examForm.courses[0].courseId"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a course</option>
            <option 
              v-for="course in courses" 
              :key="course._id" 
              :value="course._id"
            >
              {{ course.courseName }} ({{ course.courseCode }})
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button 
            type="button" 
            @click="showModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="loading || formLoading"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            {{ loading ? 'Saving...' : 'Save Exam' }}
          </button>
        </div>
      </form>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="showDeleteModal" title="Confirm Delete">
      <div class="p-6">
        <p class="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this entrance exam? This action cannot be undone.</p>
        <div class="flex justify-end gap-4">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
          <button 
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Modal from '@/components/Modal.vue'
import { examService, courseService, departmentService } from '@/api/services/index'

export default {
  name: 'EntranceExamManagement',
  components: {
    Modal
  },
  setup() {
    const showModal = ref(false)
    const showDeleteModal = ref(false)
    const loading = ref(false)
    const error = ref(null)
    const formLoading = ref(false)
    const formError = ref(null)
    const exams = ref([])
    const departments = ref([])
    const courses = ref([])
    const examToDelete = ref(null)

    // Form state
    const examForm = ref({
      examCode: '',
      name: '',
      description: '',
      department: [],
      academicYear: '',
      courses: [{ courseId: '' }],
      examDate: '',
      startDate: '',
      endDate: '',
      createdBy: ''
    })

    // Methods
    const loadDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments()
        departments.value = response
      } catch (err) {
        console.error('Failed to load departments:', err)
        formError.value = 'Failed to load departments'
      }
    }

    const loadCourses = async () => {
      try {
        const response = await courseService.getAllCourses()
        courses.value = response.filter(course => course.isEntranceExam)
      } catch (err) {
        console.error('Failed to load courses:', err)
        formError.value = 'Failed to load courses'
      }
    }

    const loadExams = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await examService.getEntranceExams()
        exams.value = response.map(exam => ({
          ...exam,
          status: determineStatus(exam)
        }))
      } catch (err) {
        error.value = err.message || 'Failed to load exams'
        console.error('Failed to load exams:', err)
      } finally {
        loading.value = false
      }
    }

    const determineStatus = (exam) => {
      const now = new Date()
      const startDate = new Date(exam.startDate)
      const endDate = new Date(exam.endDate)
      const examDate = new Date(exam.examDate)

      if (now < startDate) return 'upcoming'
      if (now >= startDate && now <= endDate) return 'active'
      if (now > examDate) return 'completed'
      return 'in_progress'
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    const openCreateModal = async () => {
      examForm.value = {
        examCode: '',
        name: '',
        description: '',
        department: [],
        academicYear: '',
        courses: [{ courseId: '' }],
        examDate: '',
        startDate: '',
        endDate: '',
        createdBy: ''
      }
      showModal.value = true
      formLoading.value = true
      formError.value = null
      try {
        await Promise.all([loadDepartments(), loadCourses()])
      } catch (err) {
        console.error('Failed to load form data:', err)
      } finally {
        formLoading.value = false
      }
    }

    const editExam = async (exam) => {
      examForm.value = { ...exam }
      showModal.value = true
      formLoading.value = true
      formError.value = null
      try {
        await Promise.all([loadDepartments(), loadCourses()])
      } catch (err) {
        console.error('Failed to load form data:', err)
      } finally {
        formLoading.value = false
      }
    }

    const deleteExam = (exam) => {
      examToDelete.value = exam
      showDeleteModal.value = true
    }

    const confirmDelete = async () => {
      if (examToDelete.value) {
        loading.value = true
        error.value = null
        try {
          await examService.deleteEntranceExam(examToDelete.value._id)
          await loadExams()
          showDeleteModal.value = false
          examToDelete.value = null
        } catch (err) {
          error.value = err.message || 'Failed to delete exam'
          console.error('Failed to delete exam:', err)
        } finally {
          loading.value = false
        }
      }
    }

    const saveExam = async () => {
      loading.value = true
      error.value = null
      try {
        if (examForm.value._id) {
          await examService.updateEntranceExam(examForm.value._id, examForm.value)
        } else {
          await examService.createEntranceExam(examForm.value)
        }
        await loadExams()
        showModal.value = false
      } catch (err) {
        error.value = err.message || 'Failed to save exam'
        console.error('Failed to save exam:', err)
      } finally {
        loading.value = false
      }
    }

    // Load data when component mounts
    onMounted(() => {
      loadExams()
    })

    return {
      exams,
      departments,
      courses,
      loading,
      error,
      formLoading,
      formError,
      showModal,
      showDeleteModal,
      examForm,
      formatDate,
      openCreateModal,
      editExam,
      deleteExam,
      confirmDelete,
      saveExam
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
      <p class="text-red-600 dark:text-red-200">{{ error }}</p>
    </div>

    <!-- Content -->
    <div v-else>
      <EntranceExamNav />
      
      <!-- Course List and Add Button -->
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Course Management</h2>
        <button 
          @click="openCreateModal"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <i class="material-icons">add</i>
          Add Course
        </button>
      </div>

      <!-- Course Table -->
      <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course Code</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Coefficient</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="course in courses" :key="course._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ course.courseCode }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ course.courseName }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {{ course.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ course.coefficient }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="editCourse(course)"
                    class="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                    title="Edit"
                  >
                    <i class="material-icons">edit</i>
                  </button>
                  <button 
                    @click="deleteCourse(course)"
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
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" @click="showModal = false"></div>

        <!-- Modal panel -->
        <div class="relative inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-2xl sm:p-6 modal-padding">
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              @click="showModal = false"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span class="sr-only">Close</span>
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                {{ courseForm._id ? 'Edit Course' : 'Add New Course' }}
              </h3>

              <div class="mt-6 space-y-4">
                <!-- Course Code -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Course Code</label>
                  <input 
                    v-model="courseForm.courseCode"
                    type="text"
                    required
                    placeholder="Enter course code"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                </div>

                <!-- Course Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Course Name</label>
                  <input 
                    v-model="courseForm.courseName"
                    type="text"
                    required
                    placeholder="Enter course name"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    v-model="courseForm.description"
                    rows="3"
                    placeholder="Enter course description"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>

                <!-- Coefficient -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Coefficient</label>
                  <input 
                    v-model.number="courseForm.coefficient"
                    type="number"
                    min="1"
                    required
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-3 mt-6 sm:flex-row sm:justify-end">
                <button
                  @click="showModal = false"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  @click="saveCourse"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {{ courseForm._id ? 'Update' : 'Create' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" @click="showDeleteModal = false"></div>

        <!-- Modal panel -->
        <div class="relative inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-2xl sm:p-6 modal-padding">
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              @click="showDeleteModal = false"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span class="sr-only">Close</span>
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Confirm Delete
              </h3>

              <div class="mt-6 space-y-4">
                <p class="text-sm text-gray-600">Are you sure you want to delete this course? This action cannot be undone.</p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-3 mt-6 sm:flex-row sm:justify-end">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import EntranceExamNav from '@/components/EntranceExamNav.vue'
import { courseService } from '@/api/services'

export default {
  name: 'CourseManagement',
  components: {
    EntranceExamNav
  },
  setup() {
    const showModal = ref(false)
    const showDeleteModal = ref(false)
    const courseToDelete = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const courses = ref([])

    // Form state
    const courseForm = ref({
      _id: '',
      courseCode: '',
      courseName: '',
      description: '',
      coefficient: 1
    })

    // Methods
    const fetchCourses = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await courseService.getAllCourses()
        courses.value = response
      } catch (err) {
        error.value = err.message || 'Failed to fetch courses'
        console.error('Error fetching courses:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchCourses()
    })

    const openCreateModal = () => {
      courseForm.value = {
        _id: '',
        courseCode: '',
        courseName: '',
        description: '',
        coefficient: 1
      }
      showModal.value = true
    }

    const editCourse = (course) => {
      courseForm.value = { ...course }
      showModal.value = true
    }

    const deleteCourse = (course) => {
      courseToDelete.value = course
      showDeleteModal.value = true
    }

    const confirmDelete = async () => {
      if (courseToDelete.value) {
        loading.value = true
        error.value = null
        try {
          await courseService.deleteCourse(courseToDelete.value._id)
          await fetchCourses() // Refresh the list
          showDeleteModal.value = false
          courseToDelete.value = null
        } catch (err) {
          error.value = err.message || 'Failed to delete course'
          console.error('Error deleting course:', err)
        } finally {
          loading.value = false
        }
      }
    }

    const saveCourse = async () => {
      loading.value = true
      error.value = null
      try {
        if (courseForm.value._id) {
          await courseService.updateCourse(courseForm.value._id, courseForm.value)
        } else {
          await courseService.createCourse(courseForm.value)
        }
        await fetchCourses() // Refresh the list
        showModal.value = false
      } catch (err) {
        error.value = err.message || 'Failed to save course'
        console.error('Error saving course:', err)
      } finally {
        loading.value = false
      }
    }

    return {
      courses,
      loading,
      error,
      showModal,
      showDeleteModal,
      courseForm,
      courseToDelete,
      openCreateModal,
      editCourse,
      deleteCourse,
      confirmDelete,
      saveCourse
    }
  }
}
</script>

<style scoped>
/* Fade transition for modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Slide transition for modal content */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Custom scrollbar for modal */
.modal-content {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #EDF2F7;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 4px;
  border: 2px solid #EDF2F7;
}

/* Input focus styles */
.form-input:focus {
  @apply ring-2 ring-blue-500 border-blue-500;
  outline: none;
}

/* Responsive padding adjustments */
@media (max-width: 640px) {
  .modal-padding {
    padding: 1rem;
  }
}

@media (min-width: 641px) {
  .modal-padding {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) {
  .modal-padding {
    padding: 2rem;
  }
}

.form-switch {
  appearance: none;
  position: relative;
  background-color: #d1d5db; /* gray-300 */
  border-radius: 9999px;
  width: 2.75rem; /* w-11 */
  height: 1.5rem; /* h-6 */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.form-switch::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem; /* Roughly half the width minus padding */
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
}

.form-switch:checked {
  background-color: #2563eb; /* blue-600 */
}

.form-switch:checked::before {
  transform: translateX(1.25rem);
}
</style>
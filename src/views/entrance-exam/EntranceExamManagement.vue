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
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Academic Year</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration Period</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exam Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="exam in exams" :key="exam.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ exam.academicYear }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="[
                'px-2 py-1 text-xs rounded-full',
                {
                  'bg-green-100 text-green-800': exam.status === 'active',
                  'bg-yellow-100 text-yellow-800': exam.status === 'upcoming',
                  'bg-gray-100 text-gray-800': exam.status === 'completed'
                }
              ]">
                {{ exam.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ formatDate(exam.registrationStart) }} - {{ formatDate(exam.registrationEnd) }}
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
    <Modal v-model="showModal" :title="isEditing ? 'Edit Entrance Exam' : 'Create New Entrance Exam'">
      <form @submit.prevent="saveExam" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
          <input 
            v-model="examForm.academicYear"
            type="text"
            required
            placeholder="e.g. 2024-2025"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Registration Start</label>
            <input 
              v-model="examForm.registrationStart"
              type="date"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Registration End</label>
            <input 
              v-model="examForm.registrationEnd"
              type="date"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Date</label>
          <input 
            v-model="examForm.examDate"
            type="date"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select 
            v-model="examForm.status"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea 
            v-model="examForm.description"
            rows="3"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter exam description..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-4 mt-6">
          <button 
            type="button"
            @click="showModal = false"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {{ isEditing ? 'Update' : 'Create' }}
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Modal from '@/components/Modal.vue'

export default {
  name: 'EntranceExamManagement',
  
  components: {
    Modal
  },

  setup() {
    const store = useStore()

    // State
    const showModal = ref(false)
    const showDeleteModal = ref(false)
    const isEditing = ref(false)
    const examToDelete = ref(null)
    const examForm = ref({
      academicYear: '',
      registrationStart: '',
      registrationEnd: '',
      examDate: '',
      status: 'upcoming',
      description: ''
    })

    // Computed
    const exams = computed(() => store.state.entranceExam.exams)

    // Methods
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    const openCreateModal = () => {
      isEditing.value = false
      examForm.value = {
        academicYear: '',
        registrationStart: '',
        registrationEnd: '',
        examDate: '',
        status: 'upcoming',
        description: ''
      }
      showModal.value = true
    }

    const editExam = (exam) => {
      isEditing.value = true
      examForm.value = { ...exam }
      showModal.value = true
    }

    const deleteExam = (exam) => {
      examToDelete.value = exam
      showDeleteModal.value = true
    }

    const confirmDelete = () => {
      if (examToDelete.value) {
        store.commit('entranceExam/deleteExam', examToDelete.value.id)
        showDeleteModal.value = false
        examToDelete.value = null
      }
    }

    const saveExam = () => {
      if (isEditing.value) {
        store.commit('entranceExam/updateExam', examForm.value)
      } else {
        store.commit('entranceExam/addExam', examForm.value)
      }
      showModal.value = false
    }

    return {
      exams,
      showModal,
      showDeleteModal,
      isEditing,
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

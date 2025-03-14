<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Exam Scheduler</h2>
        <p class="text-gray-600 dark:text-gray-400">Manage examination schedules</p>
      </div>
      <button 
        @click="addNewExam"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add New Exam
      </button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="text-left p-3">Subject</th>
              <th class="text-left p-3">Date</th>
              <th class="text-left p-3">Time</th>
              <th class="text-left p-3">Duration</th>
              <th class="text-left p-3">Participants</th>
              <th class="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exam in examData.examSchedule" :key="exam.id" class="border-b dark:border-gray-700">
              <td class="p-3">{{ getSubjectName(exam.subject) }}</td>
              <td class="p-3">{{ exam.date }}</td>
              <td class="p-3">{{ formatTime(exam.time) }}</td>
              <td class="p-3">{{ exam.duration }} min</td>
              <td class="p-3">{{ exam.participants }}</td>
              <td class="p-3 text-right">
                <button 
                  @click="editExam(exam)"
                  class="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 mr-2"
                >
                  <i class="material-icons text-sm">edit</i>
                </button>
                <button 
                  @click="deleteExam(exam)"
                  class="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                >
                  <i class="material-icons text-sm">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Exam Modal -->
    <Modal v-model="showModal" :title="isEditing ? 'Edit Exam' : 'Add New Exam'" maxWidth="md">
      <form @submit.prevent="saveExam" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <select 
            v-model="examForm.subject"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a subject</option>
            <option v-for="subject in mockSubjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <input 
              v-model="examForm.date"
              type="date"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
            <input 
              v-model="examForm.time"
              type="time"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
            <input 
              v-model="examForm.duration"
              type="number"
              required
              min="30"
              step="30"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Participants</label>
            <input 
              v-model="examForm.participants"
              type="number"
              min="1"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <textarea 
            v-model="examForm.notes"
            rows="3"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            {{ isEditing ? 'Update' : 'Add' }} Exam
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Modal from '@/components/Modal.vue'
import { mockSubjects } from '@/data/mockSubjects'
import { examData } from '@/store/dummy-data/examination-data'

export default {
  name: 'ExamScheduler',
  
  components: {
    Modal
  },

  setup() {
    const store = useStore()
    const showModal = ref(false)
    const isEditing = ref(false)
    
    const examForm = ref({
      subject: '',
      date: '',
      time: '',
      duration: 120,
      participants: null,
      notes: ''
    })

    const addNewExam = () => {
      isEditing.value = false
      examForm.value = {
        subject: '',
        date: '',
        time: '',
        duration: 120,
        participants: null,
        notes: ''
      }
      showModal.value = true
    }

    const editExam = (exam) => {
      isEditing.value = true
      examForm.value = { ...exam }
      showModal.value = true
    }

    const deleteExam = (exam) => {
      if (confirm('Are you sure you want to delete this exam?')) {
        store.commit('exams/deleteExam', exam.id)
      }
    }

    const saveExam = () => {
      if (isEditing.value) {
        store.commit('exams/updateExam', examForm.value)
      } else {
        store.commit('exams/addExam', examForm.value)
      }
      showModal.value = false
    }

    const getSubjectName = (subjectId) => {
      const subject = mockSubjects.find(s => s.id === subjectId)
      return subject ? subject.name : ''
    }

    const formatTime = (time) => {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    return {
      showModal,
      isEditing,
      examForm,
      examData,
      editExam,
      deleteExam,
      saveExam,
      mockSubjects,
      addNewExam,
      getSubjectName,
      formatTime
    }
  }
}
</script>

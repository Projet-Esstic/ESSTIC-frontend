<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Exam Calendar</h2>
        <p class="text-gray-600 dark:text-gray-400">Manage examination schedules and dates</p>
      </div>
      <div class="flex gap-4">
        <button @click="previousMonth" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <i class="material-icons">chevron_left</i>
        </button>
        <span class="text-lg font-medium">{{ currentMonthYear }}</span>
        <button @click="nextMonth" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    </div>

    <!-- Calendar View -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="grid grid-cols-7 gap-2 mb-4">
        <div v-for="day in weekDays" :key="day" class="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="date in calendarDates"
          :key="date.day"
          :class="[
            'p-2 border rounded-lg min-h-[100px] transition-all duration-200',
            date.isToday ? 'bg-blue-50 dark:bg-blue-900 ring-2 ring-blue-500' : '',
            date.hasExam ? 'border-blue-500 hover:shadow-lg' : 'border-gray-200 dark:border-gray-700',
            date.isPast ? 'opacity-70' : '',
            !date.day ? 'bg-gray-50 dark:bg-gray-900' : ''
          ]"
          @click="date.day && !date.isPast && addNewExam(date)"
        >
          <div class="flex justify-between items-start">
            <span :class="[
              'text-sm font-medium',
              date.isToday ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
            ]">
              {{ date.day }}
            </span>
            <div class="flex gap-1">
              <button 
                v-if="date.hasExam"
                @click.stop="editExam(date.exam)"
                class="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                title="Edit exam"
              >
                <i class="material-icons text-sm">edit</i>
              </button>
              <button 
                v-if="date.hasExam"
                @click.stop="deleteExam(date.exam)"
                class="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                title="Delete exam"
              >
                <i class="material-icons text-sm">delete</i>
              </button>
            </div>
          </div>
          
          <div v-if="date.hasExam" class="mt-2 space-y-2">
            <div class="p-2 rounded bg-blue-100 dark:bg-blue-800">
              <div class="text-xs font-medium text-blue-800 dark:text-blue-200">
                {{ getSubjectName(date.exam.subject) }}
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-300">
                {{ formatTime(date.exam.time) }}
              </div>
              <div class="text-xs text-blue-500 dark:text-blue-400">
                Duration: {{ date.exam.duration }}min
              </div>
            </div>
            <div v-if="date.exam.participants" class="text-xs text-gray-500">
              {{ date.exam.participants }} participants
            </div>
          </div>
        </div>
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Modal from '@/components/Modal.vue'
import { mockSubjects } from '@/data/mockSubjects'
import { examData } from '@/store/dummy-data/examination-data'

export default {
  name: 'ExamCalendar',
  
  components: {
    Modal
  },

  setup() {
    const store = useStore()
    const showModal = ref(false)
    const isEditing = ref(false)
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDate = ref(new Date())
    
    const examForm = ref({
      subject: '',
      date: '',
      time: '',
      duration: 120,
      participants: null,
      notes: ''
    })

    const currentMonthYear = computed(() => {
      return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' })
    })

    const calendarDates = computed(() => {
      const firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
      const lastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
      const today = new Date()
      const dates = []

      for (let i = 0; i < firstDay.getDay(); i++) {
        dates.push({ day: '', hasExam: false })
      }

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const currentDateObj = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i)
        const currentDateStr = currentDateObj.toISOString().split('T')[0]
        const exam = examData.examSchedule.find(e => e.date === currentDateStr)
        
        dates.push({
          day: i,
          isToday: currentDateObj.toDateString() === today.toDateString(),
          hasExam: !!exam,
          exam: exam || null,
          isPast: currentDateObj < today
        })
      }

      return dates
    })

    const previousMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
    }

    const nextMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
    }

    const addNewExam = (date) => {
      isEditing.value = false
      examForm.value = {
        subject: '',
        date: `${currentDate.value.getFullYear()}-${String(currentDate.value.getMonth() + 1).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`,
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
      weekDays,
      examForm,
      calendarDates,
      currentMonthYear,
      editExam,
      deleteExam,
      saveExam,
      mockSubjects,
      previousMonth,
      nextMonth,
      addNewExam,
      getSubjectName,
      formatTime
    }
  }
}
</script>

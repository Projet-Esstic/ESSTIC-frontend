<template>
  <div class="form-group">
    <label :class="[Theme.applyTextStyle('bodyLarge'), 'block mb-2']">Examen</label>
    <div class="relative">
      <select 
        v-model="selectedExam"
        class="w-full p-2 border rounded bg-white dark:bg-gray-800 pr-8"
        required
      >
        <option value="" disabled>Sélectionnez un examen</option>
        <option 
          v-for="exam in exams" 
          :key="exam.id"
          :value="exam.id"
        >
          {{ exam.name }} ({{ exam.year }})
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <span class="material-icons text-gray-400">expand_more</span>
      </div>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'

export default {
  name: 'ExamSelection',
  
  setup() {
    const store = useStore()
    const selectedExam = ref('')
    const exams = ref([])
    const error = ref('')
    
    const fetchExams = async () => {
      try {
        // TODO: Replace with actual API call
        exams.value = [
          { 
            id: 'latest_exam_2025',
            name: 'Concours ESSTIC',
            year: '2025',
            isLatest: true
          },
          {
            id: 'special_exam_2025',
            name: 'Concours Spécial ESSTIC',
            year: '2025',
            isLatest: false
          }
        ]
        
        // Select the latest exam by default
        const latestExam = exams.value.find(exam => exam.isLatest)
        if (latestExam) {
          selectedExam.value = latestExam.id
        }
      } catch (err) {
        error.value = 'Erreur lors du chargement des examens'
        console.error('Failed to fetch exams:', err)
      }
    }

    watch(selectedExam, (newValue) => {
      if (newValue) {
        store.commit('candidateRegistration/updateExamId', newValue)
      }
    })

    onMounted(() => {
      fetchExams()
    })

    return {
      selectedExam,
      exams,
      error,
      Theme
    }
  }
}
</script>

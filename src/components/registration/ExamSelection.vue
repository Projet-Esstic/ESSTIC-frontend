<template>
  <div>
    <!-- Examen Selection -->
    <div class="form-group">
      <label class="block mb-2">Examen</label>
      <div class="relative">
        <select 
          :value="selectedExam"
          @change="updateSelectedExam($event.target.value)"
          class="w-full p-2 border rounded bg-white dark:bg-gray-800 pr-8"
          required
        >
          <option value="" disabled>Sélectionnez un examen</option>
          <option 
            v-for="exam in exams" 
            :key="exam._id"
            :value="exam._id"
          >
            {{ exam.name }} ({{ exam.academicYear }})
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <span class="material-icons text-gray-400">expand_more</span>
        </div>
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </div>

    <!-- Field of Study Selection -->
    <div class="form-group mt-4">
      <label class="block mb-2">Domaine d'étude</label>
      <div class="relative">
        <select 
          :value="selectedFieldOfStudy"
          @change="updateSelectedFieldOfStudy($event.target.value)"
          class="w-full p-2 border rounded bg-white dark:bg-gray-800 pr-8"
          required
        >
          <option value="" disabled>Sélectionnez un domaine d'étude</option>
          <option 
            v-for="field in fieldsOfStudy" 
            :key="field._id"
            :value="field._id"
          >
            {{ field.name }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <span class="material-icons text-gray-400">expand_more</span>
        </div>
      </div>
      <p v-if="errorField" class="text-red-500 text-sm mt-1">{{ errorField }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch} from 'vue'
import { useStore } from 'vuex'
import { examService, departmentService } from '@/api/services/index'

export default {
  name: 'ExamSelection',
  props: {
    modelValue: String, // Selected exam ID
    selectedField: String // Selected field of study
  },
  setup(props, { emit }) {
    const store = useStore()
    const selectedExam = ref(props.modelValue || '')
    const selectedFieldOfStudy = ref(props.selectedField || '')
    const exams = ref([])
    const fieldsOfStudy = ref([])
    const error = ref('')
    const errorField = ref('')

    // Fetch exams from API
    const fetchExams = async () => {
      try {
        const response = await examService.getEntranceExams()
        exams.value = response
      } catch (err) {
        error.value = 'Erreur lors du chargement des examens'
        console.error('Failed to fetch exams:', err)
      }
    }
    // Fetch exams from API
    const fetchStudies = async () => {
      try {
        const response = await departmentService.getAllDepartments()
        fieldsOfStudy.value = response
        console.log("fields",fieldsOfStudy);
      } catch (err) {
        error.value = 'Erreur lors du chargement des examens'
        console.error('Failed to fetch exams:', err)
      }
    }

    // Update selected exam
    const updateSelectedExam = (value) => {
      selectedExam.value = value
      emit('update:modelValue', value) // Sync with parent
      store.commit('candidateRegistration/UPDATE_EXAM_ID', value)
    }

    // Fetch fields of study from Vuex
    // const fieldsOfStudy = computed(() => store.getters['candidateRegistration/getFields'])

    // Update selected field of study
    const updateSelectedFieldOfStudy = (value) => {
      selectedFieldOfStudy.value = value
      emit('update:selectedField', value) // Sync with parent
      store.commit('candidateRegistration/UPDATE_FIELD_OF_STUDY', value)
    }

    watch(() => props.modelValue, (newValue) => {
      selectedExam.value = newValue
    })

    watch(() => props.selectedField, (newValue) => {
      selectedFieldOfStudy.value = newValue
    })

    onMounted(() => {
      fetchExams(),
      fetchStudies()
    })

    return {
      selectedExam,
      selectedFieldOfStudy,
      exams,
      error,
      errorField,
      fieldsOfStudy,
      updateSelectedExam,
      updateSelectedFieldOfStudy
    }
  }
}
</script>

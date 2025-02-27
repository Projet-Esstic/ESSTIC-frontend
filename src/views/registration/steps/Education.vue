<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-text-light dark:text-text-dark mb-2']">Formation Académique</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark opacity-80']">Détails de votre parcours académique</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- High School Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Études Secondaires</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Nom de l'établissement</label>
            <input 
              v-model="form.highSchool.schoolName" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Nom de votre lycée"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Année d'obtention</label>
            <input 
              v-model="form.highSchool.yearCompleted" 
              type="number" 
              min="1950"
              :max="currentYear"
              :class="Theme.applyInputStyle()" 
              required
            />
          </div>

          <div class="form-group md:col-span-2">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Matières principales</label>
            <textarea 
              v-model="form.highSchool.majorSubjects" 
              :class="Theme.applyInputStyle()" 
              rows="2"
              placeholder="Ex: Mathématiques, Physique, Sciences..."
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- University Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Études Universitaires</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Nom de l'université</label>
            <input 
              v-model="form.university.universityName" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Nom de votre université"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Diplôme obtenu</label>
            <input 
              v-model="form.university.degree" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Ex: Licence en Informatique"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Année d'obtention</label>
            <input 
              v-model="form.university.yearCompleted" 
              type="number" 
              min="1950"
              :max="currentYear"
              :class="Theme.applyInputStyle()" 
              required
            />
          </div>
        </div>
      </div>

      <!-- Document Upload Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Documents Académiques</h3>
        <div class="space-y-4">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Relevé de notes</label>
            <input 
              type="file" 
              @change="handleTranscriptUpload" 
              accept=".pdf,.doc,.docx"
              :class="Theme.applyInputStyle()" 
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Diplômes</label>
            <input 
              type="file" 
              @change="handleDiplomaUpload" 
              accept=".pdf,.doc,.docx"
              :class="Theme.applyInputStyle()" 
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">CV</label>
            <input 
              type="file" 
              @change="handleCVUpload" 
              accept=".pdf,.doc,.docx"
              :class="Theme.applyInputStyle()" 
            />
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="button" 
          @click="previousStep"
          class="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200"
        >
          <span class="material-icons mr-2">arrow_back</span>
          Précédent
        </button>
        <button 
          type="submit"
          class="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
        >
          <span class="material-icons mr-2">arrow_forward</span>
          Suivant
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'

export default {
  setup() {
    const store = useStore()
    
    const currentYear = new Date().getFullYear()

    const form = ref({
      highSchool: {
        schoolName: '',
        yearCompleted: currentYear,
        majorSubjects: ''
      },
      university: {
        universityName: '',
        degree: '',
        yearCompleted: currentYear
      },
      documents: {
        transcript: null,
        diploma: null,
        cv: null
      }
    })

    const handleTranscriptUpload = (event) => {
      form.value.documents.transcript = event.target.files[0]
    }

    const handleDiplomaUpload = (event) => {
      form.value.documents.diploma = event.target.files[0]
    }

    const handleCVUpload = (event) => {
      form.value.documents.cv = event.target.files[0]
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          highSchool: {
            schoolName: form.value.highSchool.schoolName,
            yearCompleted: form.value.highSchool.yearCompleted,
            majorSubjects: form.value.highSchool.majorSubjects
          },
          university: {
            universityName: form.value.university.universityName,
            degree: form.value.university.degree,
            yearCompleted: form.value.university.yearCompleted
          },
          documents: {
            transcript: form.value.documents.transcript,
            diploma: form.value.documents.diploma,
            cv: form.value.documents.cv
          }
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'education',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      // Validate high school information
      if (!form.value.highSchool.schoolName) {
        newErrors.schoolName = "Le nom de l'établissement est requis"
      }
      if (!form.value.highSchool.yearCompleted) {
        newErrors.yearCompleted = "L'année d'obtention est requise"
      }
      if (!form.value.highSchool.majorSubjects) {
        newErrors.majorSubjects = 'Les matières principales sont requises'
      }

      // Validate university information
      if (!form.value.university.universityName) {
        newErrors.universityName = "Le nom de l'université est requis"
      }
      if (!form.value.university.degree) {
        newErrors.degree = 'Le diplôme est requis'
      }
      if (!form.value.university.yearCompleted) {
        newErrors.uniYearCompleted = "L'année d'obtention est requise"
      }
      
      return Object.keys(newErrors).length === 0
    }

    return {
      form,
      currentYear,
      handleTranscriptUpload,
      handleDiplomaUpload,
      handleCVUpload,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>

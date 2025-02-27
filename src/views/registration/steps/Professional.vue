<template>
  <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
      <h2 class="text-2xl font-bold text-white mb-2">Activités Professionnelles</h2>
      <p class="text-blue-100">Partagez votre expérience professionnelle</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <!-- Professional Experience List -->
      <div class="space-y-6">
        <div v-for="(experience, index) in form.professionalExperience" :key="index" 
             class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 relative">
          <button 
            @click="removeExperience(index)" 
            class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
            type="button"
          >
            <span class="material-icons">close</span>
          </button>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Entreprise</label>
              <input 
                v-model="experience.company" 
                type="text" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Nom de l'entreprise"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poste</label>
              <input 
                v-model="experience.position" 
                type="text" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Titre du poste"
                required
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Années d'expérience</label>
              <input 
                v-model="experience.yearsOfExperience" 
                type="number" 
                min="0"
                max="50"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea 
                v-model="experience.description" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                rows="2"
                placeholder="Décrivez vos responsabilités et réalisations..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Experience Button -->
      <button 
        type="button"
        @click="addExperience"
        class="w-full py-3 px-4 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span class="material-icons">add_circle_outline</span>
        Ajouter une expérience professionnelle
      </button>

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
          class="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
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
    
    const form = ref({
      professionalExperience: [
        {
          company: '',
          position: '',
          yearsOfExperience: 0,
          description: ''
        }
      ]
    })

    const addExperience = () => {
      form.value.professionalExperience.push({
        company: '',
        position: '',
        yearsOfExperience: 0,
        description: ''
      })
    }

    const removeExperience = (index) => {
      if (form.value.professionalExperience.length > 1) {
        form.value.professionalExperience.splice(index, 1)
      }
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        try {
          await store.dispatch('candidateRegistration/updateStepData', {
            step: 'professional',
            data: form.value
          })
          store.dispatch('candidateRegistration/nextStep')
        } catch (error) {
          console.error('Error submitting form:', error)
        }
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      // Validate work experience
      if (form.value.professionalExperience.length === 0) {
        newErrors.workExperience = 'Au moins une expérience professionnelle est requise'
      }

      // Validate skills
      // if (formData.skills.length === 0) {
      //   newErrors.skills = 'Au moins une compétence est requise'
      // }
      
      // errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    return {
      form,
      addExperience,
      removeExperience,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>

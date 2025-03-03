<template>
  <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <div class="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
      <h2 class="text-2xl font-bold text-white mb-2">Activités Extra</h2>
      <p class="text-purple-100">Partagez vos activités extrascolaires et expériences</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <!-- Activities List -->
      <div class="space-y-6">
        <div v-for="(activity, index) in form.activities" :key="index" 
             class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 relative">
          <button 
            @click="removeActivity(index)" 
            class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
            type="button"
          >
            <span class="material-icons">close</span>
          </button>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activité</label>
              <input 
                v-model="activity.activity" 
                type="text" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                placeholder="Ex: Club d'informatique, Association sportive..."
                required
              />
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea 
                v-model="activity.description" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                rows="2"
                placeholder="Décrivez votre rôle et vos réalisations..."
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Activity Button -->
      <button 
        type="button"
        @click="addActivity"
        class="w-full py-3 px-4 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span class="material-icons">add_circle_outline</span>
        Ajouter une activité
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
          class="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
        >
          Suivant
          <span class="material-icons ml-2">arrow_forward</span>
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
      activities: [
        {
          activity: 'Club de Robotique',
          description: 'Membre actif du club de robotique universitaire. Participation à des compétitions nationales et conception de robots autonomes.'
        },
        {
          activity: 'Bénévolat - Les Restos du Cœur',
          description: 'Distribution de repas et aide à l\'organisation d\'événements de collecte. Contribution hebdomadaire de 4 heures pendant 2 ans.'
        },
        {
          activity: 'Association Sportive - Basketball',
          description: 'Capitaine de l\'équipe universitaire de basketball. Organisation d\'entraînements et participation à des tournois régionaux.'
        }
      ]
    })

    const addActivity = () => {
      form.value.activities.push({
        activity: '',
        description: ''
      })
    }

    const removeActivity = (index) => {
      if (form.value.activities.length > 1) {
        form.value.activities.splice(index, 1)
      }
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        try {
          await store.dispatch('candidateRegistration/updateStepData', {
            step: 'extraActivities',
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
      
      // Validate activities
      if (form.value.activities.length === 0 || form.value.activities.every(activity => activity.activity === '' && activity.description === '')) {
        newErrors.activities = 'Au moins une activité est requise'
      }

      // Check if any errors were found
      return Object.keys(newErrors).length === 0
    }

    return {
      form,
      addActivity,
      removeActivity,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>
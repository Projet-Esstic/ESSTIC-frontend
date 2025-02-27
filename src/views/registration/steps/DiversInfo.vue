<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-text-light dark:text-text-dark mb-2']">Renseignements Divers</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark opacity-80']">Informations complémentaires importantes</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <!-- Additional Information -->
      <div class="space-y-6">
        <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="grid grid-cols-1 gap-6">
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Motivation pour la formation</label>
              <textarea 
                v-model="form.motivation" 
                :class="Theme.applyInputStyle()" 
                rows="4"
                placeholder="Expliquez votre motivation pour suivre cette formation..."
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Objectifs professionnels</label>
              <textarea 
                v-model="form.objectives" 
                :class="Theme.applyInputStyle()" 
                rows="4"
                placeholder="Décrivez vos objectifs professionnels après la formation..."
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Compétences particulières</label>
              <div class="space-y-4">
                <div v-for="(skill, index) in form.skills" :key="index" class="flex gap-4">
                  <input 
                    v-model="skill.name"
                    type="text" 
                    class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Ex: Leadership, Communication, ..."
                    required
                  />
                  <button 
                    @click="removeSkill(index)" 
                    type="button"
                    class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    v-if="form.skills.length > 1"
                  >
                    <span class="material-icons">close</span>
                  </button>
                </div>
              </div>
              <button 
                type="button"
                @click="addSkill"
                class="mt-4 py-2 px-4 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors duration-200 flex items-center gap-2"
              >
                <span class="material-icons">add_circle_outline</span>
                Ajouter une compétence
              </button>
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Informations supplémentaires</label>
              <textarea 
                v-model="form.additionalInfo" 
                :class="Theme.applyInputStyle()" 
                rows="4"
                placeholder="Autres informations pertinentes..."
              ></textarea>
            </div>
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
          class="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
        >
          <span class="material-icons mr-2">check_circle</span>
          Terminer
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
      motivation: '',
      objectives: '',
      skills: [{ name: '' }],
      additionalInfo: ''
    })

    const addSkill = () => {
      form.value.skills.push({ name: '' })
    }

    const removeSkill = (index) => {
      if (form.value.skills.length > 1) {
        form.value.skills.splice(index, 1)
      }
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = () => {
      store.dispatch('candidateRegistration/updateStepData', {
        step: 'diversInfo',
        data: form.value
      })
      store.dispatch('candidateRegistration/nextStep')
    }

    return {
      form,
      addSkill,
      removeSkill,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>

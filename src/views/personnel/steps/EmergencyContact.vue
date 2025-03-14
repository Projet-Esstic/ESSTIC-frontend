<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Contact d'Urgence</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Informations sur le contact d'urgence</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- Emergency Contact Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Contact d'Urgence</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Nom</label>
            <input 
              v-model="form.emergencyContact.name" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Nom du contact"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Relation</label>
            <input 
              v-model="form.emergencyContact.relationship" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Relation avec le contact"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Téléphone</label>
            <input 
              v-model="form.emergencyContact.phone" 
              type="tel" 
              :class="Theme.applyInputStyle()" 
              placeholder="+33 6 12 34 56 78"
              required
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
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    })

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          emergencyContact: form.value.emergencyContact
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'emergencyContact',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      if (!form.value.emergencyContact.name) {
        newErrors.name = "Le nom est requis"
      }
      if (!form.value.emergencyContact.relationship) {
        newErrors.relationship = "La relation est requise"
      }
      if (!form.value.emergencyContact.phone) {
        newErrors.phone = "Le téléphone est requis"
      }

      return Object.keys(newErrors).length === 0
    }

    return {
      form,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>
<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Informations Personnelles</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Détails personnels du candidat</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- Personal Information Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Détails Personnels</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Prénom</label>
            <input 
              v-model="form.firstName" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Votre prénom"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Nom</label>
            <input 
              v-model="form.lastName" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Votre nom"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              :class="Theme.applyInputStyle()" 
              placeholder="exemple@domaine.com"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Téléphone</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              :class="Theme.applyInputStyle()" 
              placeholder="+33 6 12 34 56 78"
              required
            />
          </div>

          <div class="form-group md:col-span-2">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Adresse</label>
            <input 
              v-model="form.address" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="123 Rue de l'Exemple, Paris"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Date de Naissance</label>
            <input 
              v-model="form.dateOfBirth" 
              type="date" 
              :class="Theme.applyInputStyle()" 
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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: ''
    })

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          phone: form.value.phone,
          address: form.value.address,
          dateOfBirth: form.value.dateOfBirth
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'personalInfo',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      if (!form.value.firstName) {
        newErrors.firstName = "Le prénom est requis"
      }
      if (!form.value.lastName) {
        newErrors.lastName = "Le nom est requis"
      }
      if (!form.value.email) {
        newErrors.email = "L'email est requis"
      }
      if (!form.value.phone) {
        newErrors.phone = "Le téléphone est requis"
      }
      if (!form.value.address) {
        newErrors.address = "L'adresse est requise"
      }
      if (!form.value.dateOfBirth) {
        newErrors.dateOfBirth = "La date de naissance est requise"
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
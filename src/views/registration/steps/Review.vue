<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-xl overflow-hidden">
    <!-- Header with Profile Image -->
    <div :class="[Theme.applyGradient('primary'), 'relative p-6']">
      <div class="flex items-start justify-between">
        <div class="text-white">
          <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Récapitulatif de votre candidature</h2>
          <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Vérifiez vos informations avant la soumission finale</p>
        </div>
        
        <!-- Profile Image -->
        <div class="relative">
          <div class="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <img
              v-if="formSteps.civilStatus.profileImage"
              :src="formSteps.civilStatus.profileImage"
              class="w-full h-full object-cover"
              alt="Photo de profil"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-100"
            >
              <span class="material-icons text-gray-400 text-4xl">person</span>
            </div>
          </div>
          <div class="absolute -bottom-2 right-0 bg-green-500 rounded-full p-2 border-2 border-white">
            <span class="material-icons text-white text-sm">check</span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 space-y-8">
      <!-- État Civil -->
      <section class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <div class="flex items-center mb-4">
          <span class="material-icons text-blue-600 mr-2">person</span>
          <h3 :class="[Theme.applyTextStyle('titleMedium'), 'text-text-light dark:text-text-dark']">État Civil</h3>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(value, key) in formSteps.civilStatus" :key="key" 
               class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
               v-show="key !== 'profileImage' && key !== 'profileImageFile'">
            <span :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-70']">{{ formatLabel(key) }}</span>
            <span :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mt-1']">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Formation -->
      <section class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <div class="flex items-center mb-4">
          <span class="material-icons text-green-600 mr-2">school</span>
          <h3 :class="[Theme.applyTextStyle('titleMedium'), 'text-text-light dark:text-text-dark']">Formation</h3>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(value, key) in formSteps.education" :key="key" 
               class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-70']">{{ formatLabel(key) }}</span>
            <span :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mt-1']">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Activités Professionnelles -->
      <section class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <div class="flex items-center mb-4">
          <span class="material-icons text-purple-600 mr-2">work</span>
          <h3 :class="[Theme.applyTextStyle('titleMedium'), 'text-text-light dark:text-text-dark']">Activités Professionnelles</h3>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(value, key) in formSteps.professional" :key="key" 
               class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-70']">{{ formatLabel(key) }}</span>
            <span :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mt-1']">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Activités Extra -->
      <section class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <div class="flex items-center mb-4">
          <span class="material-icons text-yellow-600 mr-2">sports</span>
          <h3 :class="[Theme.applyTextStyle('titleMedium'), 'text-text-light dark:text-text-dark']">Activités Extra</h3>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(value, key) in formSteps.extraActivities" :key="key" 
               class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-70']">{{ formatLabel(key) }}</span>
            <span :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mt-1']">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Informations Diverses -->
      <section class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <div class="flex items-center mb-4">
          <span class="material-icons text-red-600 mr-2">info</span>
          <h3 :class="[Theme.applyTextStyle('titleMedium'), 'text-text-light dark:text-text-dark']">Informations Diverses</h3>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(value, key) in formSteps.diversInfo" :key="key" 
               class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-70']">{{ formatLabel(key) }}</span>
            <span :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mt-1']">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Boutons de navigation -->
      <div class="flex justify-between items-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="button" 
          @click="previousStep"
          class="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200"
        >
          <span class="material-icons mr-2">arrow_back</span>
          Modifier
        </button>
        <button 
          type="button"
          @click="handleSubmit"
          class="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          :disabled="loading"
        >
          Procéder au paiement  
        <span class="material-icons mr-2">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'
export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const errors = ref({})

    // Get all form data from store
    const formData = computed(() => store.state.candidateRegistration.formSteps)

    // Handle form submission
    const handleSubmit = async () => {
      loading.value = true
      try {
        // Mark review as complete and move to payment
        await store.dispatch('candidateRegistration/updateStepData', {
          step: 'review',
          data: { reviewed: true, timestamp: new Date().toISOString() }
        })
        store.dispatch('candidateRegistration/nextStep')
      } catch (error) {
        console.error('Error updating review:', error)
        errors.value = { submit: 'Une erreur est survenue lors de la soumission du formulaire' }
      } finally {
        loading.value = false
      }
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const formatLabel = (key) => {
      return key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
    }

    const formatValue = (value) => {
      if (value === null || value === undefined) {
        return 'Non renseigné'
      }
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return 'Aucun élément'
        }
        return value.map(item => {
          if (typeof item === 'object' && item !== null) {
            return Object.entries(item)
              .filter(([, val]) => val !== null && val !== undefined)
              .map(([key, val]) => `${formatLabel(key)}: ${val}`)
              .join(', ')
          }
          return item
        }).join('\n')
      }
      
      if (typeof value === 'object' && value !== null) {
        if (Object.keys(value).length === 0) {
          return 'Aucune information'
        }
        return Object.entries(value)
          .filter(([, val]) => val !== null && val !== undefined)
          .map(([key, val]) => `${formatLabel(key)}: ${val}`)
          .join('\n')
      }
      
      if (typeof value === 'boolean') {
        return value ? 'Oui' : 'Non'
      }
      
      if (value === '') {
        return 'Non renseigné'
      }
      
      return value
    }

    return {
      Theme,
      previousStep,
      formSteps: computed(() => store.state.candidateRegistration.formSteps),
      formatLabel,
      formatValue,
      formData,
      errors,
      loading,
      handleSubmit
    }
  }
}
</script>

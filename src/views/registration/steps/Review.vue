<template>
  <div class="mb-6 p-4  rounded shadow-md">
    <h2 :class="Theme.applyTextStyle('heading2')">Récapitulatif de votre candidature</h2>

    <div class="space-y-6">
      <!-- État Civil -->
      <section class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">État Civil</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(value, key) in formSteps.civilStatus" :key="key" class="form-group">
            <span :class="Theme.applyTextStyle('bodyLarge')">{{ formatLabel(key) }}:</span>
            <span class="ml-2">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Formation -->
      <section class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Formation</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(value, key) in formSteps.education" :key="key" class="form-group">
            <span :class="Theme.applyTextStyle('bodyLarge')">{{ formatLabel(key) }}:</span>
            <span class="ml-2">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Activités Professionnelles -->
      <section class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Activités Professionnelles</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(value, key) in formSteps.professional" :key="key" class="form-group">
            <span :class="Theme.applyTextStyle('bodyLarge')">{{ formatLabel(key) }}:</span>
            <span class="ml-2">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Activités Extra -->
      <section class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Activités Extra</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(value, key) in formSteps.extraActivities" :key="key" class="form-group">
            <span :class="Theme.applyTextStyle('bodyLarge')">{{ formatLabel(key) }}:</span>
            <span class="ml-2">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Informations Diverses -->
      <section class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Informations Diverses</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(value, key) in formSteps.diversInfo" :key="key" class="form-group">
            <span :class="Theme.applyTextStyle('bodyLarge')">{{ formatLabel(key) }}:</span>
            <span class="ml-2">{{ formatValue(value) }}</span>
          </div>
        </div>
      </section>

      <!-- Boutons de navigation -->
      <div class="flex justify-between mt-8">
        <button 
          type="button" 
          @click="previousStep"
          :class="[Theme.getThemeClasses(isDark).button.secondary, 'rounded p-2']"
        >
          Modifier
        </button>
        <button 
          type="button"
          @click="submitForm"
          :class="[Theme.getThemeClasses(isDark).button.primary, 'rounded p-2']"
        >
          Soumettre la candidature
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'
export default {
  setup() {
    const store = useStore()
    const formSteps = computed(() => store.state.candidateRegistration.formSteps)

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

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const submitForm = () => {
      store.dispatch('submitApplication')
    }

    return {
      Theme,
      previousStep,
      submitForm,
      formSteps,
      formatLabel,
      formatValue,
      isDark: computed(() => store.state.theme === Theme.THEMES.DARK)
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Détails de l'Emploi</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Informations sur l'emploi actuel</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- Employment Details Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Détails de l'Emploi</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Poste</label>
            <input 
              v-model="form.position" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Ex: Développeur Web"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Statut</label>
            <select 
              v-model="form.employmentStatus" 
              :class="Theme.applyInputStyle()" 
              required
            >
              <option value="active">Actif</option>
              <option value="onLeave">En congé</option>
              <option value="retired">Retraité</option>
              <option value="terminated">Terminé</option>
            </select>
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Date d'embauche</label>
            <input 
              v-model="form.hireDate" 
              type="date" 
              :class="Theme.applyInputStyle()" 
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Département</label>
            <input 
              v-model="form.department" 
              type="text" 
              :class="Theme.applyInputStyle()" 
              placeholder="Ex: Développement"
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
      position: '',
      employmentStatus: 'active',
      hireDate: '',
      department: ''
    })

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          position: form.value.position,
          employmentStatus: form.value.employmentStatus,
          hireDate: form.value.hireDate,
          department: form.value.department
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'employmentDetails',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      if (!form.value.position) {
        newErrors.position = "Le poste est requis"
      }
      if (!form.value.employmentStatus) {
        newErrors.employmentStatus = "Le statut est requis"
      }
      if (!form.value.hireDate) {
        newErrors.hireDate = "La date d'embauche est requise"
      }
      if (!form.value.department) {
        newErrors.department = "Le département est requis"
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
<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Historique des Congés</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Détails des congés pris</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- Leave History Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Congés</h3>
        <div v-for="(leave, index) in form.leaveHistory" :key="index" class="space-y-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Type de Congé</label>
              <select 
                v-model="leave.leaveType" 
                :class="Theme.applyInputStyle()" 
                required
              >
                <option value="sick">Maladie</option>
                <option value="vacation">Vacances</option>
                <option value="maternity">Maternité</option>
                <option value="personal">Personnel</option>
              </select>
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Date de Début</label>
              <input 
                v-model="leave.leaveStartDate" 
                type="date" 
                :class="Theme.applyInputStyle()" 
                required
              />
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Date de Fin</label>
              <input 
                v-model="leave.leaveEndDate" 
                type="date" 
                :class="Theme.applyInputStyle()" 
                required
              />
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Statut</label>
              <select 
                v-model="leave.approvalStatus" 
                :class="Theme.applyInputStyle()" 
                required
              >
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>

            <div class="form-group md:col-span-2">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Raison</label>
              <textarea 
                v-model="leave.reason" 
                :class="Theme.applyInputStyle()" 
                rows="2"
                placeholder="Raison du congé"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <button 
          @click="addLeave" 
          class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
        >
          <span class="material-icons mr-2">add</span>
          Ajouter un congé
        </button>
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
      leaveHistory: [
        {
          leaveType: '',
          leaveStartDate: '',
          leaveEndDate: '',
          approvalStatus: 'pending',
          reason: ''
        }
      ]
    })

    const addLeave = () => {
      form.value.leaveHistory.push({
        leaveType: '',
        leaveStartDate: '',
        leaveEndDate: '',
        approvalStatus: 'pending',
        reason: ''
      })
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          leaveHistory: form.value.leaveHistory
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'leaveHistory',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      form.value.leaveHistory.forEach((leave, index) => {
        if (!leave.leaveType) {
          newErrors[`leaveType${index}`] = "Le type de congé est requis"
        }
        if (!leave.leaveStartDate) {
          newErrors[`leaveStartDate${index}`] = "La date de début est requise"
        }
        if (!leave.leaveEndDate) {
          newErrors[`leaveEndDate${index}`] = "La date de fin est requise"
        }
        if (!leave.reason) {
          newErrors[`reason${index}`] = "La raison est requise"
        }
      })

      return Object.keys(newErrors).length === 0
    }

    return {
      form,
      addLeave,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>
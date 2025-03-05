<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Informations sur le Salaire</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Détails sur le salaire et les paiements</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- Salary Information Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Détails du Salaire</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Montant</label>
            <input 
              v-model="form.salary.amount" 
              type="number" 
              :class="Theme.applyInputStyle()" 
              placeholder="Ex: 4500"
              required
            />
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Méthode de Paiement</label>
            <select 
              v-model="form.salary.paymentMethod" 
              :class="Theme.applyInputStyle()" 
              required
            >
              <option value="bank">Banque</option>
              <option value="cash">Espèces</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Date de Paiement</label>
            <input 
              v-model="form.salary.paidDate" 
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
      salary: {
        amount: 0,
        paymentMethod: 'bank',
        paidDate: ''
      }
    })

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          salary: {
            amount: form.value.salary.amount,
            paymentMethod: form.value.salary.paymentMethod,
            paidDate: form.value.salary.paidDate
          }
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'salaryInfo',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      if (!form.value.salary.amount) {
        newErrors.amount = "Le montant est requis"
      }
      if (!form.value.salary.paymentMethod) {
        newErrors.paymentMethod = "La méthode de paiement est requise"
      }
      if (!form.value.salary.paidDate) {
        newErrors.paidDate = "La date de paiement est requise"
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
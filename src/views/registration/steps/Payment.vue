<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-xl overflow-hidden">
    <!-- Header -->
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Paiement des frais de concours</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Veuillez effectuer le paiement pour finaliser votre candidature</p>
    </div>

    <div class="p-6 space-y-8">
      <!-- Payment Method Selection -->
      <div class="space-y-4">
        <label :class="[Theme.applyTextStyle('labelLarge'), 'block text-text-light dark:text-text-dark']">Mode de paiement</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            @click="form.paymentMethod = 'mobile'"
            :class="[
              'p-4 rounded-lg border-2 transition-all duration-200',
              form.paymentMethod === 'mobile'
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
            ]"
          >
            <div class="flex items-center space-x-4">
              <span class="material-icons text-2xl text-primary-600">phone_android</span>
              <div class="text-left">
                <h3 :class="[Theme.applyTextStyle('titleSmall'), 'text-text-light dark:text-text-dark']">Mobile Money</h3>
                <p :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-60']">MTN, Orange, ou autres</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            @click="form.paymentMethod = 'bank'"
            :class="[
              'p-4 rounded-lg border-2 transition-all duration-200',
              form.paymentMethod === 'bank'
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
            ]"
          >
            <div class="flex items-center space-x-4">
              <span class="material-icons text-2xl text-primary-600">account_balance</span>
              <div class="text-left">
                <h3 :class="[Theme.applyTextStyle('titleSmall'), 'text-text-light dark:text-text-dark']">Virement bancaire</h3>
                <p :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-60']">Transfert bancaire direct</p>
              </div>
            </div>
          </button>
        </div>
        <p v-if="errors.paymentMethod" class="text-error-600 text-sm mt-1">{{ errors.paymentMethod }}</p>
      </div>

      <!-- Payment Details Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Amount -->
        <div>
          <label :class="[Theme.applyTextStyle('labelLarge'), 'block text-text-light dark:text-text-dark mb-2']">Montant</label>
          <div class="relative">
            <input
              type="number"
              v-model="form.amount"
              :class="[Theme.applyTextStyle('bodyLarge'), 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-surface-dark']"
              placeholder="25000"
              disabled
            />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">FCFA</span>
          </div>
          <p v-if="errors.amount" class="text-error-600 text-sm mt-1">{{ errors.amount }}</p>
        </div>

        <!-- Payment Date -->
        <div v-if="form.paymentMethod === 'bank'">
          <label :class="[Theme.applyTextStyle('labelLarge'), 'block text-text-light dark:text-text-dark mb-2']">Date de paiement</label>
          <input
            type="date"
            v-model="form.paymentDate"
            :class="[Theme.applyTextStyle('bodyLarge'), 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-surface-dark']"
          />
          <p v-if="errors.paymentDate" class="text-error-600 text-sm mt-1">{{ errors.paymentDate }}</p>
        </div>

        <!-- Mobile Money Fields -->
        <template v-if="form.paymentMethod === 'mobile'">
          <div>
            <label :class="[Theme.applyTextStyle('labelLarge'), 'block text-text-light dark:text-text-dark mb-2']">Numéro de téléphone</label>
            <input
              type="tel"
              v-model="form.phoneNumber"
              :class="[Theme.applyTextStyle('bodyLarge'), 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-surface-dark']"
              placeholder="6xx xxx xxx"
            />
            <p v-if="errors.phoneNumber" class="text-error-600 text-sm mt-1">{{ errors.phoneNumber }}</p>
          </div>

          <div>
            <label :class="[Theme.applyTextStyle('labelLarge'), 'block text-text-light dark:text-text-dark mb-2']">Fournisseur de Mobile Money</label>
            <select
              v-model="form.provider"
              :class="[Theme.applyTextStyle('bodyLarge'), 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-surface-dark']"
            >
              <option value="">Sélectionnez un fournisseur</option>
              <option value="MTN">MTN</option>
              <option value="Orange">Orange</option>
              <option value="Autre">Autre</option>
            </select>
            <p v-if="errors.provider" class="text-error-600 text-sm mt-1">{{ errors.provider }}</p>
          </div>
        </template>

        <!-- Receipt Upload -->
        <div v-if="form.paymentMethod === 'bank'">
          <label :class="[Theme.applyTextStyle('labelLarge'), 'block text-text-light dark:text-text-dark mb-2']">Reçu de paiement</label>
          <div class="flex items-center justify-center w-full">
            <label
              class="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <span class="material-icons text-2xl mb-2 text-gray-500">cloud_upload</span>
                <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">
                  <span>Cliquez pour télécharger</span> ou glissez et déposez
                </p>
                <p :class="[Theme.applyTextStyle('bodySmall'), 'text-text-light dark:text-text-dark opacity-60']">
                  PNG, JPG ou PDF (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                class="hidden"
                @change="handleFileUpload"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </div>
          <p v-if="errors.receiptFile" class="text-error-600 text-sm mt-1">{{ errors.receiptFile }}</p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            @click="previousStep"
            class="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200"
          >
            <span class="material-icons mr-2">arrow_back</span>
            Retour
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="flex items-center px-6 py-3 bg-black hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
          >
            <span v-if="loading" class="material-icons animate-spin mr-2">sync</span>
            <span v-else class="material-icons mr-2">check_circle</span>
            {{ loading ? 'Traitement en cours...' : 'Soumettre la candidature' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore  } from 'vuex'
import { useRouter } from 'vue-router'
import { Theme } from '@/utils/Theme'
import { paymentService } from '@/api/services'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false)
    const errors = ref({})
    const form = ref({
      paymentMethod: '',
      amount: '25000', // Fixed amount for registration
      paymentDate: new Date().toISOString().split('T')[0],
      phoneNumber: '',
      provider: '', // For mobile money provider
      receiptFile: null
    })

    const handleSubmit = async () => {
      // const store = useStore()
      if (validateForm()) {
        loading.value = true
        try {
          // For mobile money, we use current timestamp
          const paymentData = {
            ...form.value,
            paymentDate: form.value.paymentMethod === 'mobile' ? 
            new Date().toISOString() : form.value.paymentDate
          }
          
          const civilStatus = computed(() => store.state.candidateRegistration.formSteps);
          const data = civilStatus.value; // Extract the raw data from the proxy

            // Merge paymentData into data
              const formData = { ...data, paymentData };
              console.log(formData);
          // Submit payment to backend
          console.log(paymentData);
          await paymentService.submitPayment(formData)
          // Update store with form data
          await store.dispatch('candidateRegistration/updateStepData', {
            step: 'payment',
            data: paymentData
          })

          // Submit the complete application
          await store.dispatch('candidateRegistration/submitApplication')
          
          // Move to success page or dashboard
          router.push('/dashboard')
        } catch (error) {
          console.error('Error submitting payment:', error)
          errors.value = { submit: 'Une erreur est survenue lors de la soumission du paiement' }
        } finally {
          loading.value = false
        }
      }
    }

    const validateForm = () => {
      const newErrors = {}

      // Required fields validation
      if (!form.value.paymentMethod) {
        newErrors.paymentMethod = 'Le mode de paiement est requis'
      }

      // Mobile money specific validation
      if (form.value.paymentMethod === 'mobile') {
        if (!form.value.phoneNumber) {
          newErrors.phoneNumber = 'Le numéro de téléphone est requis pour le paiement mobile'
        }
        if (!form.value.provider) {
          newErrors.provider = 'Le fournisseur de Mobile Money est requis'
        }
      }

      // Bank transfer specific validation
      if (form.value.paymentMethod === 'bank') {
        if (!form.value.paymentDate) {
          newErrors.paymentDate = 'La date de paiement est requise'
        }
        if (!form.value.receiptFile) {
          newErrors.receiptFile = 'Le reçu de paiement est requis'
        }
      }

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        form.value.receiptFile = file
      }
    }

    return {
      Theme,
      form,
      errors,
      loading,
      handleSubmit,
      previousStep,
      handleFileUpload
    }
  }
}
</script>

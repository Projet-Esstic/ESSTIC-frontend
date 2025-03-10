<template>
  <div class="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg overflow-hidden">
    <div :class="[Theme.applyGradient('primary'), 'p-6']">
      <h2 :class="[Theme.applyTextStyle('titleLarge'), 'text-white dark:text-text-dark mb-2']">Évaluations de Performance</h2>
      <p :class="[Theme.applyTextStyle('bodyMedium'), 'text-white dark:text-text-dark opacity-80']">Détails des évaluations de performance</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
      <!-- Performance Reviews Section -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600">
        <h3 :class="[Theme.applyTextStyle('heading3'), 'text-text-light dark:text-text-dark mb-4']">Évaluations</h3>
        <div v-for="(review, index) in form.performanceReviews" :key="index" class="space-y-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Date de l'évaluation</label>
              <input 
                v-model="review.reviewDate" 
                type="date" 
                :class="Theme.applyInputStyle()" 
                required
              />
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Évaluateur</label>
              <input 
                v-model="review.reviewer" 
                type="text" 
                :class="Theme.applyInputStyle()" 
                placeholder="Nom de l'évaluateur"
                required
              />
            </div>

            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Note</label>
              <input 
                v-model="review.rating" 
                type="number" 
                min="1"
                max="5"
                :class="Theme.applyInputStyle()" 
                required
              />
            </div>

            <div class="form-group md:col-span-2">
              <label :class="[Theme.applyTextStyle('bodyMedium'), 'text-text-light dark:text-text-dark mb-2']">Commentaires</label>
              <textarea 
                v-model="review.comments" 
                :class="Theme.applyInputStyle()" 
                rows="2"
                placeholder="Commentaires de l'évaluateur"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <button 
          @click="addReview" 
          class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
        >
          <span class="material-icons mr-2">add</span>
          Ajouter une évaluation
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
      performanceReviews: [
        {
          reviewDate: '',
          reviewer: '',
          rating: 0,
          comments: ''
        }
      ]
    })

    const addReview = () => {
      form.value.performanceReviews.push({
        reviewDate: '',
        reviewer: '',
        rating: 0,
        comments: ''
      })
    }

    const previousStep = () => {
      store.dispatch('candidateRegistration/previousStep')
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        const formData = {
          performanceReviews: form.value.performanceReviews
        }
        store.dispatch('candidateRegistration/updateStepData', {
          step: 'performanceReviews',
          data: formData
        })
        store.dispatch('candidateRegistration/nextStep')
      }
    }

    const validateForm = () => {
      const newErrors = {}
      
      form.value.performanceReviews.forEach((review, index) => {
        if (!review.reviewDate) {
          newErrors[`reviewDate${index}`] = "La date de l'évaluation est requise"
        }
        if (!review.reviewer) {
          newErrors[`reviewer${index}`] = "L'évaluateur est requis"
        }
        if (!review.rating) {
          newErrors[`rating${index}`] = "La note est requise"
        }
      })

      return Object.keys(newErrors).length === 0
    }

    return {
      form,
      addReview,
      handleSubmit,
      previousStep,
      Theme
    }
  }
}
</script>
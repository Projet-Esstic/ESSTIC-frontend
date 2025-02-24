<template>
  <form @submit.prevent="handleSubmit" class="civil-status-form mb-6 p-4 bg-white dark:bg-background-dark rounded shadow-md">
    <!-- Profile Image Upload -->
    <div class="form-section">
      <h3 class="section-title">Photo de profil</h3>
      <ProfileImageUpload />
    </div>

    <!-- Informations de base -->
    <div class="grid grid-cols-2 gap-4">
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom</label>
        <input 
          v-model="form.nom" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.nom }"
        />
        <span v-if="errors.nom" class="text-red-500 text-sm">{{ errors.nom }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Prénom</label>
        <input 
          v-model="form.prenom" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.prenom }"
        />
        <span v-if="errors.prenom" class="text-red-500 text-sm">{{ errors.prenom }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Date de Naissance</label>
        <input 
          v-model="form.dateDeNaissance" 
          type="date" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.dateDeNaissance }"
          :max="maxDate"
        />
        <span v-if="errors.dateDeNaissance" class="text-red-500 text-sm">{{ errors.dateDeNaissance }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Lieu de Naissance</label>
        <input 
          v-model="form.lieuDeNaissance" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.lieuDeNaissance }"
        />
        <span v-if="errors.lieuDeNaissance" class="text-red-500 text-sm">{{ errors.lieuDeNaissance }}</span>
      </div>
    </div>

    <!-- Situation familiale -->
    <div class="form-group mt-4">
      <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Situation de Famille</label>
      <select 
        v-model="form.situationDeFamille" 
        required 
        class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        :class="{ 'border-red-500': errors.situationDeFamille }"
      >
        <option value="">Sélectionnez</option>
        <option value="Célibataire">Célibataire</option>
        <option value="Marié">Marié(e)</option>
        <option value="Veuf ou divorcé">Veuf ou divorcé(e)</option>
      </select>
      <span v-if="errors.situationDeFamille" class="text-red-500 text-sm">{{ errors.situationDeFamille }}</span>
    </div>

    <!-- Coordonnées -->
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Résidence Habituelle</label>
        <input 
          v-model="form.residenceHabituelle" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.residenceHabituelle }"
        />
        <span v-if="errors.residenceHabituelle" class="text-red-500 text-sm">{{ errors.residenceHabituelle }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Boîte Postale</label>
        <input 
          v-model="form.boitePostale" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.boitePostale }"
        />
        <span v-if="errors.boitePostale" class="text-red-500 text-sm">{{ errors.boitePostale }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Numéro de Téléphone</label>
        <input 
          v-model="form.numeroDeTelephone" 
          type="tel" 
          required 
          pattern="[0-9]{9}"
          placeholder="6XXXXXXXX"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.numeroDeTelephone }"
        />
        <span v-if="errors.numeroDeTelephone" class="text-red-500 text-sm">{{ errors.numeroDeTelephone }}</span>
      </div>
    </div>

    <!-- Références familiales -->
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom du Père</label>
        <input 
          v-model="form.referencesFamilales.nom_pere" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.nom_pere }"
        />
        <span v-if="errors.nom_pere" class="text-red-500 text-sm">{{ errors.nom_pere }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom de la Mère</label>
        <input 
          v-model="form.referencesFamilales.nom_mere" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.nom_mere }"
        />
        <span v-if="errors.nom_mere" class="text-red-500 text-sm">{{ errors.nom_mere }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Adresse des Parents</label>
        <input 
          v-model="form.addressParents" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.addressParents }"
        />
        <span v-if="errors.addressParents" class="text-red-500 text-sm">{{ errors.addressParents }}</span>
      </div>
    </div>

    <!-- Boutons de navigation -->
    <div class="flex justify-between mt-8">
      <button 
        type="button" 
        @click="$emit('previous-step')"
        class="bg-secondary-light dark:bg-secondary-dark text-white hover:bg-secondary-hover rounded p-2"
      >
        Précédent
      </button>
      <button 
        type="submit"
        class="bg-primary-light dark:bg-primary-dark text-white hover:bg-primary-hover rounded p-2"
        :disabled="loading"
      >
        <span v-if="loading">
          <i class="fas fa-spinner fa-spin mr-2"></i>
          Chargement...
        </span>
        <span v-else>Suivant</span>
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'
import ProfileImageUpload from '@/components/registration/ProfileImageUpload.vue'

export default {
  name: 'CivilStatus',
  
  components: {
    ProfileImageUpload
  },
  
  setup() {
    const store = useStore()
    const errors = ref({})
    
    const form = ref({
      nom: '',
      prenom: '',
      dateDeNaissance: '',
      lieuDeNaissance: '',
      situationDeFamille: '',
      residenceHabituelle: '',
      boitePostale: '',
      numeroDeTelephone: '',
      referencesFamilales: {
        nom_pere: '',
        nom_mere: ''
      },
      addressParents: ''
    })

    // Calculate max date (must be at least 17 years old)
    const maxDate = computed(() => {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 17)
      return date.toISOString().split('T')[0]
    })

    // Initialize form with existing data if any
    const existingData = store.getters['candidateRegistration/getFormData']('civilStatus')
    if (existingData) {
      form.value = { ...form.value, ...existingData }
    }

    const loading = computed(() => store.getters['candidateRegistration/getLoading'])

    const validateForm = () => {
      const newErrors = {}

      // Required field validation
      if (!form.value.nom) newErrors.nom = 'Le nom est requis'
      if (!form.value.prenom) newErrors.prenom = 'Le prénom est requis'
      if (!form.value.dateDeNaissance) newErrors.dateDeNaissance = 'La date de naissance est requise'
      if (!form.value.lieuDeNaissance) newErrors.lieuDeNaissance = 'Le lieu de naissance est requis'
      if (!form.value.situationDeFamille) newErrors.situationDeFamille = 'La situation de famille est requise'
      if (!form.value.residenceHabituelle) newErrors.residenceHabituelle = 'La résidence habituelle est requise'
      if (!form.value.boitePostale) newErrors.boitePostale = 'La boîte postale est requise'
      if (!form.value.referencesFamilales.nom_pere) newErrors.nom_pere = 'Le nom du père est requis'
      if (!form.value.referencesFamilales.nom_mere) newErrors.nom_mere = 'Le nom de la mère est requis'
      if (!form.value.addressParents) newErrors.addressParents = "L'adresse des parents est requise"

      // Phone number validation
      if (!form.value.numeroDeTelephone) {
        newErrors.numeroDeTelephone = 'Le numéro de téléphone est requis'
      } else if (!/^[67][0-9]{8}$/.test(form.value.numeroDeTelephone)) {
        newErrors.numeroDeTelephone = 'Le numéro doit commencer par 6 ou 7 et avoir 9 chiffres'
      }

      // Date validation
      if (form.value.dateDeNaissance) {
        const birthDate = new Date(form.value.dateDeNaissance)
        const minDate = new Date()
        minDate.setFullYear(minDate.getFullYear() - 35) // Max age 35 years
        const maxDateValue = new Date(maxDate.value)

        if (birthDate < minDate) {
          newErrors.dateDeNaissance = 'Vous devez avoir moins de 35 ans'
        } else if (birthDate > maxDateValue) {
          newErrors.dateDeNaissance = 'Vous devez avoir au moins 17 ans'
        }
      }

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }

      try {
        // Save form data
        await store.dispatch('candidateRegistration/saveStepData', {
          step: 'civilStatus',
          data: form.value
        })
        
        // Move to next step
        store.dispatch('candidateRegistration/nextStep')
      } catch (error) {
        console.error('Failed to save form data:', error)
        store.commit('candidateRegistration/SET_ERROR', 'Failed to save form data')
      }
    }

    return {
      form,
      errors,
      loading,
      maxDate,
      Theme,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.civil-status-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

input.border-red-500:focus, select.border-red-500:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fa-spin {
  animation: spin 1s linear infinite;
}
</style>

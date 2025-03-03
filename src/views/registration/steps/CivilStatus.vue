<template>
  <form @submit.prevent="handleSubmit" class="civil-status-form mb-6 p-4 bg-white dark:bg-background-dark rounded shadow-md">
    <!-- Profile Image Upload -->
    <!-- Exam Selection -->
    <div class="form-section mb-6">
      <h3 class="section-title">Sélection de l'Examen</h3>
      <ExamSelection v-model="form.selectedEntranceExam" v-model:selectedField="form.fieldOfStudy" />
    </div>

    <!-- Profile Image -->
    <div class="form-section">
      <h3 class="section-title">Photo de profil</h3>
      <ProfileImageUpload />
    </div>

    <!-- Informations de base -->
    <div class="grid grid-cols-2 gap-4">
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="exemple@email.com"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Prénom</label>
        <input 
          v-model="form.firstName" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom</label>
        <input 
          v-model="form.lastName" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Date de Naissance</label>
        <input 
          v-model="form.dateOfBirth" 
          type="date" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Genre</label>
        <select 
          v-model="form.gender" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        >
          <option value="">Sélectionnez votre genre</option>
          <option value="male">Masculin</option>
          <option value="female">Féminin</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Numéro de Téléphone</label>
        <input 
          v-model="form.phoneNumber" 
          type="tel" 
          pattern="[0-9]{9}"
          placeholder="6XXXXXXXX"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Lieu de Naissance</label>
        <input 
          v-model="form.lieuDeNaissance" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Situation de Famille</label>
        <select 
          v-model="form.situationDeFamille" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        >
          <option value="">Sélectionnez</option>
          <option value="Célibataire">Célibataire</option>
          <option value="Marié">Marié(e)</option>
          <option value="Veuf ou divorcé">Veuf ou divorcé(e)</option>
        </select>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Boîte Postale</label>
        <input 
          v-model="form.boitePostale" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom du Père</label>
        <input 
          v-model="form.referencesFamilales.nom_pere" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom de la Mère</label>
        <input 
          v-model="form.referencesFamilales.nom_mere" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Adresse des Parents</label>
        <input 
          v-model="form.addressParents" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>

    <!-- Adresse -->
    <div class="mt-6">
      <h3 :class="[Theme.applyTextStyle('titleMedium'), 'mb-4']">Adresse</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Rue</label>
          <input 
            v-model="form.address.street" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Ville</label>
          <input 
            v-model="form.address.city" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Région</label>
          <input 
            v-model="form.address.state" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Pays</label>
          <input 
            v-model="form.address.country" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>
    </div>

    <!-- Contact d'Urgence -->
    <div class="mt-6">
      <h3 :class="[Theme.applyTextStyle('titleMedium'), 'mb-4']">Contact d'Urgence</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom Complet</label>
          <input 
            v-model="form.emergencyContact.name" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Relation</label>
          <input 
            v-model="form.emergencyContact.relationship" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Téléphone</label>
          <input 
            v-model="form.emergencyContact.phone" 
            type="tel" 
            pattern="[0-9]{9}"
            placeholder="6XXXXXXXX"
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          />
        </div>
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'
import ProfileImageUpload from '@/components/registration/ProfileImageUpload.vue'
import ExamSelection from '@/components/registration/ExamSelection.vue'

export default {
  name: 'CivilStatus',
  components: {
    ProfileImageUpload,
    ExamSelection
  },
  setup() {
    const store = useStore()
    const loading = ref(false)

    // Form data initialized with empty values
    const form = ref({
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      profilePicture: null,
      address: {
        street: '',
        city: '',
        state: '',
        country: ''
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      },
      selectedEntranceExam: '',
      fieldOfStudy: '',
      examCenter: '',
      documents: {
        transcript: null,
        diploma: null,
        cv: null,
        other: null
      },
      lieuDeNaissance: '',
      situationDeFamille: '',
      boitePostale: '',
      referencesFamilales: {
        nom_pere: '',
        nom_mere: ''
      },
      addressParents: ''
    })

    // Handle form submission
    const handleSubmit = async () => {
      loading.value = true
      try {
        // Submit the entire form object, which contains only user-entered data
        console.log('Submitting user-entered data:', form.value) // For debugging
        await store.dispatch('candidateRegistration/updateStepData', {
          step: 'civilStatus',
          data: form.value
        })
        store.dispatch('candidateRegistration/nextStep')
      } catch (error) {
        console.error('Error updating civil status:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      handleSubmit,
      Theme
    }
  }
}
</script>

<style scoped>
.section-title {
  @apply text-lg font-semibold mb-4 text-text-light dark:text-text-dark;
}

.form-group {
  @apply mb-4;
}

.form-group label {
  @apply block mb-2;
}

.form-section {
  @apply mb-6;
}
</style>
<template>
  <form @submit.prevent="handleSubmit" class="civil-status-form mb-6 p-4 bg-white dark:bg-background-dark rounded shadow-md">
    <!-- Profile Image Upload -->
    <!-- Exam Selection -->
    <div class="form-section mb-6">
      <h3 class="section-title">Sélection de l'Examen</h3>
      <ExamSelection />
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
          required 
          placeholder="exemple@email.com"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.email }"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Prénom</label>
        <input 
          v-model="form.firstName" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.firstName }"
        />
        <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom</label>
        <input 
          v-model="form.lastName" 
          type="text" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.lastName }"
        />
        <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Date de Naissance</label>
        <input 
          v-model="form.dateOfBirth" 
          type="date" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.dateOfBirth }"
        />
        <span v-if="errors.dateOfBirth" class="text-red-500 text-sm">{{ errors.dateOfBirth }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Genre</label>
        <select 
          v-model="form.gender" 
          required 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.gender }"
        >
          <option value="">Sélectionnez votre genre</option>
          <option value="male">Masculin</option>
          <option value="female">Féminin</option>
          <option value="other">Autre</option>
        </select>
        <span v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender }}</span>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Numéro de Téléphone</label>
        <input 
          v-model="form.phoneNumber" 
          type="tel" 
          required 
          pattern="[0-9]{9}"
          placeholder="6XXXXXXXX"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          :class="{ 'border-red-500': errors.phoneNumber }"
        />
        <span v-if="errors.phoneNumber" class="text-red-500 text-sm">{{ errors.phoneNumber }}</span>
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
      <div class="form-group">
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

    <!-- Adresse -->
    <div class="mt-6">
      <h3 :class="[Theme.applyTextStyle('titleMedium'), 'mb-4']">Adresse</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Rue</label>
          <input 
            v-model="form.address.street" 
            type="text" 
            required 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.address?.street }"
          />
          <span v-if="errors.address?.street" class="text-red-500 text-sm">{{ errors.address.street }}</span>
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Ville</label>
          <input 
            v-model="form.address.city" 
            type="text" 
            required 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.address?.city }"
          />
          <span v-if="errors.address?.city" class="text-red-500 text-sm">{{ errors.address.city }}</span>
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Région</label>
          <input 
            v-model="form.address.state" 
            type="text" 
            required 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.address?.state }"
          />
          <span v-if="errors.address?.state" class="text-red-500 text-sm">{{ errors.address.state }}</span>
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Pays</label>
          <input 
            v-model="form.address.country" 
            type="text" 
            required 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.address?.country }"
          />
          <span v-if="errors.address?.country" class="text-red-500 text-sm">{{ errors.address.country }}</span>
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
            required 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.emergencyContact?.name }"
          />
          <span v-if="errors.emergencyContact?.name" class="text-red-500 text-sm">{{ errors.emergencyContact.name }}</span>
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Relation</label>
          <input 
            v-model="form.emergencyContact.relationship" 
            type="text" 
            required 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.emergencyContact?.relationship }"
          />
          <span v-if="errors.emergencyContact?.relationship" class="text-red-500 text-sm">{{ errors.emergencyContact.relationship }}</span>
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Téléphone</label>
          <input 
            v-model="form.emergencyContact.phone" 
            type="tel" 
            required 
            pattern="[0-9]{9}"
            placeholder="6XXXXXXXX"
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            :class="{ 'border-red-500': errors.emergencyContact?.phone }"
          />
          <span v-if="errors.emergencyContact?.phone" class="text-red-500 text-sm">{{ errors.emergencyContact.phone }}</span>
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
    const errors = ref({})

    // Form data with test values
    const form = ref({
      // User model fields
      email: 'test@example.com',
      firstName: 'John',  
      lastName: 'Doe',   
      dateOfBirth: '2000-01-01', 
      gender: 'male',     
      phoneNumber: '678123456', 
      profilePicture: null,
      address: {
        street: '123 Test Street',
        city: 'Yaoundé',
        state: 'Centre',
        country: 'Cameroon'
      },
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Parent',
        phone: '678987654'
      },

      // Candidate model fields
      selectedEntranceExam: 'exam1',
      fieldOfStudy: 'Computer Science',  
      examCenter: 'Yaoundé',    
      documents: {
        transcript: null,
        diploma: null,
        cv: null,
        other: null
      },

      // Additional fields
      lieuDeNaissance: 'Douala',
      situationDeFamille: 'Single',
      boitePostale: 'BP 1234',
      referencesFamilales: {
        nom_pere: 'Papa Doe',
        nom_mere: 'Mama Doe'
      },
      addressParents: '456 Parent Street'
    })

    // Validation rules
    const validateForm = () => {
      const newErrors = {}

      // User model validations
      if (!form.value.email) newErrors.email = "L'email est requis"
      if (!form.value.firstName) newErrors.firstName = "Le prénom est requis"
      if (!form.value.lastName) newErrors.lastName = "Le nom est requis"
      if (!form.value.dateOfBirth) newErrors.dateOfBirth = "La date de naissance est requise"
      if (!form.value.gender) newErrors.gender = "Le genre est requis"
      if (!form.value.phoneNumber) newErrors.phoneNumber = "Le numéro de téléphone est requis"
      
      // Address validation
      if (!form.value.address.street) {
        if (!newErrors.address) newErrors.address = {}
        newErrors.address.street = 'La rue est requise'
      }
      if (!form.value.address.city) {
        if (!newErrors.address) newErrors.address = {}
        newErrors.address.city = 'La ville est requise'
      }
      if (!form.value.address.state) {
        if (!newErrors.address) newErrors.address = {}
        newErrors.address.state = 'La région est requise'
      }

      // Emergency contact validation
      if (!form.value.emergencyContact.name) {
        if (!newErrors.emergencyContact) newErrors.emergencyContact = {}
        newErrors.emergencyContact.name = 'Le nom du contact est requis'
      }
      if (!form.value.emergencyContact.relationship) {
        if (!newErrors.emergencyContact) newErrors.emergencyContact = {}
        newErrors.emergencyContact.relationship = 'La relation est requise'
      }
      if (!form.value.emergencyContact.phone) {
        if (!newErrors.emergencyContact) newErrors.emergencyContact = {}
        newErrors.emergencyContact.phone = 'Le numéro de téléphone est requis'
      }

      // Candidate model validations
      if (!form.value.selectedEntranceExam) newErrors.selectedEntranceExam = "L'examen d'entrée est requis"
      if (!form.value.fieldOfStudy) newErrors.fieldOfStudy = "Le département est requis"
      if (!form.value.examCenter) newErrors.examCenter = "Le centre d'examen est requis"

      // Additional form validations
      if (!form.value.lieuDeNaissance) newErrors.lieuDeNaissance = "Le lieu de naissance est requis"
      if (!form.value.situationDeFamille) newErrors.situationDeFamille = "La situation de famille est requise"
      if (!form.value.boitePostale) newErrors.boitePostale = "La boîte postale est requise"
      if (!form.value.referencesFamilales.nom_pere) newErrors.nom_pere = "Le nom du père est requis"
      if (!form.value.referencesFamilales.nom_mere) newErrors.nom_mere = "Le nom de la mère est requis"
      if (!form.value.addressParents) newErrors.addressParents = "L'adresse des parents est requise"

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async () => {
        loading.value = true
        try {
        if (validateForm()) {
          // Update store with properly structured data
          await store.dispatch('candidateRegistration/updateStepData', {
            step: 'civilStatus',
            data: {
              // User data
              email: form.value.email,
              firstName: form.value.firstName,
              lastName: form.value.lastName,
              dateOfBirth: form.value.dateOfBirth,
              gender: form.value.gender,
              phoneNumber: form.value.phoneNumber,
              profilePicture: form.value.profilePicture,
              address: form.value.address,
              emergencyContact: form.value.emergencyContact,

              // Candidate data
              selectedEntranceExam: form.value.selectedEntranceExam,
              fieldOfStudy: form.value.fieldOfStudy,
              examCenter: form.value.examCenter,
              documents: form.value.documents,

              // Additional data
              lieuDeNaissance: form.value.lieuDeNaissance,
              situationDeFamille: form.value.situationDeFamille,
              boitePostale: form.value.boitePostale,
              referencesFamilales: form.value.referencesFamilales,
              addressParents: form.value.addressParents
            }
          })
          store.dispatch('candidateRegistration/nextStep')
        }
        } catch (error) {
        console.error('Error updating civil status:', error)
          errors.value = { submit: 'Une erreur est survenue lors de la soumission du formulaire' }
        } finally {
          loading.value = false
        }
      }

    return {
      form,
      errors,
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

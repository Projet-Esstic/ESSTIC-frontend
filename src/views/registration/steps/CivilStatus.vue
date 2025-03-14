<template>
  <form @submit.prevent="handleSubmit" class="civil-status-form mb-6 p-4 bg-white dark:bg-background-dark rounded shadow-md">
    <!-- Exam Selection -->
    <div class="form-section mb-6">
      <h3 class="section-title">Sélection de l'Examen <span class="text-red-500">*</span></h3>
      <ExamSelection v-model="form.selectedEntranceExam" v-model:selectedField="form.fieldOfStudy" required />
    </div>

    <!-- Profile Image -->
    <div class="form-section">
      <h3 class="section-title">Photo de profil <span class="text-red-500">*</span></h3>
      <ProfileImageUpload 
        v-model="form.profilePicture" 
        @update:modelValue="handleProfilePictureUpdate"
        @change="handleProfileChange"
        @input="handleProfileInput"
        required 
      />
    </div>

    <!-- Informations de base -->
    <div class="grid grid-cols-2 gap-4">
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Email <span class="text-red-500">*</span></label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="exemple@email.com"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Prénom <span class="text-red-500">*</span></label>
        <input 
          v-model="form.firstName" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom <span class="text-red-500">*</span></label>
        <input 
          v-model="form.lastName" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Date de Naissance <span class="text-red-500">*</span></label>
        <input 
          v-model="form.dateOfBirth" 
          type="date" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Genre <span class="text-red-500">*</span></label>
        <select 
          v-model="form.gender" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        >
          <option value="">Sélectionnez votre genre</option>
          <option value="male">Masculin</option>
          <option value="female">Féminin</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Numéro de Téléphone <span class="text-red-500">*</span></label>
        <input 
          v-model="form.phoneNumber" 
          type="tel" 
          pattern="[0-9]{9}"
          placeholder="6XXXXXXXX"
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Lieu de Naissance <span class="text-red-500">*</span></label>
        <input 
          v-model="form.lieuDeNaissance" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Situation de Famille <span class="text-red-500">*</span></label>
        <select 
          v-model="form.situationDeFamille" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        >
          <option value="">Sélectionnez</option>
          <option value="Célibataire">Célibataire</option>
          <option value="Marié">Marié(e)</option>
          <option value="Veuf ou divorcé">Veuf ou divorcé(e)</option>
        </select>
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Boîte Postale <span class="text-red-500">*</span></label>
        <input 
          v-model="form.boitePostale" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom du Père <span class="text-red-500">*</span></label>
        <input 
          v-model="form.referencesFamilales.nom_pere" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom de la Mère <span class="text-red-500">*</span></label>
        <input 
          v-model="form.referencesFamilales.nom_mere" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Adresse des Parents <span class="text-red-500">*</span></label>
        <input 
          v-model="form.addressParents" 
          type="text" 
          class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
          required
        />
      </div>
    </div>

    <!-- Adresse -->
    <div class="mt-6">
      <h3 :class="[Theme.applyTextStyle('titleMedium'), 'mb-4']">Adresse <span class="text-red-500">*</span></h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Rue <span class="text-red-500">*</span></label>
          <input 
            v-model="form.address.street" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Ville <span class="text-red-500">*</span></label>
          <input 
            v-model="form.address.city" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Région <span class="text-red-500">*</span></label>
          <select 
            v-model="form.address.state" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          >
            <option value="">Sélectionnez une région</option>
            <option value="Adamaoua">Adamaoua</option>
            <option value="Centre">Centre</option>
            <option value="Est">Est</option>
            <option value="Extrême-Nord">Extrême-Nord</option>
            <option value="Littoral">Littoral</option>
            <option value="Nord">Nord</option>
            <option value="Nord-Ouest">Nord-Ouest</option>
            <option value="Ouest">Ouest</option>
            <option value="Sud">Sud</option>
            <option value="Sud-Ouest">Sud-Ouest</option>
          </select>
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Pays <span class="text-red-500">*</span></label>
          <input 
            v-model="form.address.country" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          />
        </div>
      </div>
    </div>

    <!-- Contact d'Urgence -->
    <div class="mt-6">
      <h3 :class="[Theme.applyTextStyle('titleMedium'), 'mb-4']">Contact d'Urgence <span class="text-red-500">*</span></h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom Complet <span class="text-red-500">*</span></label>
          <input 
            v-model="form.emergencyContact.name" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Relation <span class="text-red-500">*</span></label>
          <input 
            v-model="form.emergencyContact.relationship" 
            type="text" 
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Téléphone <span class="text-red-500">*</span></label>
          <input 
            v-model="form.emergencyContact.phone" 
            type="tel" 
            pattern="[0-9]{9}"
            placeholder="6XXXXXXXX"
            class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600"
            required
          />
        </div>
      </div>
    </div>

    <!-- Required Fields Notice -->
    <div class="mt-4 text-sm text-red-500">
      * Tous les champs sont obligatoires
    </div>

    <!-- Boutons de navigation -->
    <div class="flex justify-between mt-8">
      <button 
        type="button" 
        @click.stop="$emit('previous-step')"
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
import { ref, onMounted } from 'vue'
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
  emits: ['previous-step', 'next-step'],
  setup(props, { emit }) {
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
      profilePicture: {
        preview: '',
        file: null
      },
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

    // Load saved data if available
    onMounted(() => {
      const savedData = store.state.candidateRegistration.steps?.civilStatus
      if (savedData) {
        Object.assign(form.value, savedData)
      }
    })

    // Custom form validation
    const validateForm = () => {
      // Add custom validation if needed beyond HTML5 validation
      return true
    }

    const handleProfilePictureUpdate = (imageData) => {
      form.value.profilePicture = imageData;
      form.value.profileImageFile = imageData.file;
      console.log('Profile picture updated:', {
        hasPreview: !!imageData.preview,
        hasFile: !!imageData.file
      });
    }

    const handleProfileChange = (event) => {
      console.log('Change event received:', event);
    }

    const handleProfileInput = (event) => {
      console.log('Input event received:', event);
    }

    // Handle form submission
    const handleSubmit = async () => {
      if (!validateForm()) return
      
      loading.value = true
      try {
        console.log('Form submission - Profile picture status:', {
          exists: !!form.value.profilePicture.file,
          type: typeof form.value.profilePicture.file,
          value: form.value.profilePicture.file
        });
        
        await store.dispatch('candidateRegistration/updateStepData', {
          step: 'civilStatus',
          data: form.value
        })
        console.log('Civil status data saved successfully');
        emit('next-step')
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
      handleProfilePictureUpdate,
      handleProfileChange,
      handleProfileInput,
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

/* Highlight fields with errors */
input:user-invalid,
select:user-invalid,
textarea:user-invalid {
  @apply border-red-500 bg-red-50 dark:bg-red-900/20;
}
input:user-valid,
select:user-valid,
textarea:user-valid {
  @apply border-green-500 bg-green-50 dark:bg-green-900/20;
}

</style>
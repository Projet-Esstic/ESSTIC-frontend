<template>
  <div class="mb-6 p-4 bg-white dark:bg-background-dark rounded shadow-md">
    <h2 :class="Theme.applyTextStyle('heading2')" class="text-text-light dark:text-text-dark">État Civil</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Informations de base -->
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom</label>
          <input v-model="form.nom" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Prénom</label>
          <input v-model="form.prenom" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Date de Naissance</label>
          <input v-model="form.dateDeNaissance" type="date" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Lieu de Naissance</label>
          <input v-model="form.lieuDeNaissance" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
      </div>

      <!-- Situation familiale -->
      <div class="form-group">
        <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Situation de Famille</label>
        <select v-model="form.situationDeFamille" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600">
          <option value="">Sélectionnez</option>
          <option value="Célibataire">Célibataire</option>
          <option value="Marié">Marié(e)</option>
          <option value="Veuf ou divorcé">Veuf ou divorcé(e)</option>
        </select>
      </div>

      <!-- Coordonnées -->
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Résidence Habituelle</label>
          <input v-model="form.residenceHabituelle" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Boîte Postale</label>
          <input v-model="form.boitePostale" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Numéro de Téléphone</label>
          <input v-model="form.numeroDeTelephone" type="tel" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
      </div>

      <!-- Références familiales -->
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom du Père</label>
          <input v-model="form.referencesFamilales.nom_pere" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Nom de la Mère</label>
          <input v-model="form.referencesFamilales.nom_mere" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Adresse des Parents</label>
          <input v-model="form.addressParents" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
      </div>

      <!-- Origine -->
      <div class="grid grid-cols-3 gap-4">
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Pays d'Origine</label>
          <input v-model="form.paysdOrigine" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Région</label>
          <input v-model="form.region" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
        </div>
        <div class="form-group">
          <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Département d'Origine</label>
          <input v-model="form.departementdOrigine" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
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
        >
          Suivant
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Theme } from '@/utils/Theme'

export default {
  setup() {
    const store = useStore()
    
    const form = ref({
      nom: '',
      prenom: '',
      dateDeNaissance: null,
      lieuDeNaissance: '',
      situationDeFamille: '',
      residenceHabituelle: '',
      boitePostale: '',
      numeroDeTelephone: '',
      referencesFamilales: {
        nom_pere: '',
        nom_mere: ''
      },
      addressParents: '',
      paysdOrigine: '',
      region: '',
      departementdOrigine: ''
    })

    const handleSubmit = () => {
      store.dispatch('saveStepData', {
        step: 'civilStatus',
        data: form.value
      })
      store.dispatch('nextStep')
    }

    return {
      form,
      Theme,
      handleSubmit,
      isDark: computed(() => store.state.theme === Theme.THEMES.DARK)
    }
  }
}
</script>

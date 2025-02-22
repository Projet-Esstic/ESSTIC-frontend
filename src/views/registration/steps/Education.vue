<template>
  <div class="mb-6 p-4 bg-white dark:bg-background-dark rounded shadow-md">
    <h2 :class="Theme.applyTextStyle('heading2')" class="text-text-light dark:text-text-dark">Études et Diplômes</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Études secondaires -->
      <div class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')" class="text-text-light dark:text-text-dark">Études Secondaires ou Techniques</h3>
        <div v-for="(etude, index) in form.etudesSecondairesOuTechniques" :key="index" class="space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Années</label>
              <input v-model="etude.annees" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
            </div>
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Classes</label>
              <input v-model="etude.classes" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
            </div>
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Établissements</label>
              <input v-model="etude.etablissements" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
            </div>
          </div>
        </div>
        <button @click.prevent="addSecondaryEducation" class="bg-secondary-light dark:bg-secondary-dark text-white hover:bg-secondary-hover mt-2 p-2 rounded">+ Ajouter</button>
      </div>

      <!-- Études supérieures -->
      <div class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')" class="text-text-light dark:text-text-dark">Études Supérieures</h3>
        <div v-for="(etude, index) in form.etudesSuperieures" :key="index" class="space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Années</label>
              <input v-model="etude.annees" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
            </div>
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Disciplines</label>
              <input v-model="etude.disciplines" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
            </div>
            <div class="form-group">
              <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Facultés/Écoles</label>
              <input v-model="etude.facultesOuEcoles" type="text" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600" />
            </div>
          </div>
        </div>
        <button @click.prevent="addHigherEducation" class="bg-secondary-light dark:bg-secondary-dark text-white hover:bg-secondary-hover mt-2 p-2 rounded">+ Ajouter</button>
      </div>

      <!-- Langues -->
      <div class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')" class="text-text-light dark:text-text-dark">Langues Pratiquées</h3>
        <div class="grid grid-cols-1 gap-4">
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Langues Nationales</label>
            <select v-model="form.languesPartiquees.languesNationale" required class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600">
              <option value="">Sélectionnez</option>
              <option value="Ewondo">Ewondo</option>
              <option value="Bamiléké">Bamiléké</option>
              <option value="Fulfulde">Fulfulde</option>
              <option value="Douala">Douala</option>
              <option value="Bassa">Bassa</option>
            </select>
          </div>
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Langues étrangères que vous lisez</label>
            <select v-model="form.languesPartiquees.languesEtrangeres_lisez_vous" multiple class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600">
              <option value="Anglais">Anglais</option>
              <option value="Français">Français</option>
              <option value="Espagnol">Espagnol</option>
              <option value="Allemand">Allemand</option>
              <option value="Italien">Italien</option>
              <option value="Chinois">Chinois</option>
            </select>
          </div>
          <div class="form-group">
            <label :class="[Theme.applyTextStyle('bodyLarge'), 'text-text-light dark:text-text-dark']">Langues étrangères que vous parlez</label>
            <select v-model="form.languesPartiquees.languesEtrangeres_parlez_vous" multiple class="border rounded p-2 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-gray-300 dark:border-gray-600">
              <option value="Anglais">Anglais</option>
              <option value="Français">Français</option>
              <option value="Espagnol">Espagnol</option>
              <option value="Allemand">Allemand</option>
              <option value="Italien">Italien</option>
              <option value="Chinois">Chinois</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Boutons de navigation -->
      <div class="flex justify-between mt-8">
        <button 
          type="button" 
          @click="previousStep"
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
      etudesSecondairesOuTechniques: [{
        annees: '',
        classes: '',
        etablissements: ''
      }],
      etudesSuperieures: [{
        annees: '',
        disciplines: '',
        facultesOuEcoles: ''
      }],
      languesPartiquees: {
        languesNationale: '',
        languesEtrangeres_lisez_vous: [],
        languesEtrangeres_parlez_vous: []
      }
    })

    const addSecondaryEducation = () => {
      form.value.etudesSecondairesOuTechniques.push({
        annees: '',
        classes: '',
        etablissements: ''
      })
    }

    const addHigherEducation = () => {
      form.value.etudesSuperieures.push({
        annees: '',
        disciplines: '',
        facultesOuEcoles: ''
      })
    }

    const previousStep = () => {
      store.dispatch('previousStep')
    }

    const handleSubmit = () => {
      store.dispatch('saveStepData', {
        step: 'education',
        data: form.value
      })
      store.dispatch('nextStep')
    }

    return {
      form,
      Theme,
      handleSubmit,
      previousStep,
      addSecondaryEducation,
      addHigherEducation,
      isDark: computed(() => store.state.theme === Theme.THEMES.DARK)
    }
  }
}
</script>

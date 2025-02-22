<template>
  <div class="mb-6 p-4 rounded shadow-md">
    <h2 :class="Theme.applyTextStyle('heading2')">Activités Professionnelles</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Activités passées -->
      <div class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Expériences Professionnelles Passées</h3>
        <div class="form-group">
          <label :class="Theme.applyTextStyle('bodyLarge')">Avez-vous déjà exercé?</label>
          <SwitchField v-model="form.activitesProfessionellesPassees.avez_vous_deja_exerce" />
        </div>
        
        <div v-if="form.activitesProfessionellesPassees.avez_vous_deja_exerce">
          <div v-for="(prof, index) in form.activitesProfessionellesPassees.professions" :key="index" class="space-y-4">
            <div class="grid grid-cols-3 gap-4">
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Années</label>
                <input v-model="prof.annees" type="text" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Secteur d'activité</label>
                <input v-model="prof.secteurdActivite" type="text" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Nature des emplois</label>
                <input v-model="prof.natureDesEmpoisOcccupes" type="text" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
            </div>
          </div>
          <button @click="addProfession" :class="[Theme.getThemeClasses(isDark).button.secondary, 'mt-2']">+ Ajouter une expérience</button>
        </div>
      </div>

      <!-- Activité actuelle -->
      <div class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Activité Professionnelle Actuelle</h3>
        <div class="form-group">
          <label :class="Theme.applyTextStyle('bodyLarge')">Exercez-vous actuellement?</label>
          <SwitchField v-model="form.activitesProfessionellesCurrent.exercez_vous" />
        </div>
        
        <div v-if="form.activitesProfessionellesCurrent.exercez_vous" class="space-y-4">
          <div class="form-group">
            <label :class="Theme.applyTextStyle('bodyLarge')">Domaine</label>
            <input v-model="form.activitesProfessionellesCurrent.domaines" type="text" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
          </div>
          <div class="form-group">
            <label :class="Theme.applyTextStyle('bodyLarge')">Nom de l'employeur</label>
            <input v-model="form.activitesProfessionellesCurrent.nomEmployeur" type="text" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
          </div>
          <div class="form-group">
            <label :class="Theme.applyTextStyle('bodyLarge')">Depuis quand?</label>
            <input v-model="form.activitesProfessionellesCurrent.depuisQuand" type="date" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
          </div>
        </div>
      </div>

      <!-- Boutons de navigation -->
      <div class="flex justify-between mt-8">
        <button 
          type="button" 
          @click="$emit('previous-step')"
          :class="[Theme.getThemeClasses(isDark).button.secondary, 'rounded p-2']"
        >
          Précédent
        </button>
        <button 
          type="submit"
          :class="[Theme.getThemeClasses(isDark).button.primary, 'rounded p-2']"
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
import SwitchField from '@/components/SwitchField.vue'

export default {
  components: {
    SwitchField
  },
  setup() {
    const store = useStore()
    
    const form = ref({
      activitesProfessionellesPassees: {
        avez_vous_deja_exerce: false,
        professions: [{
          annees: '',
          secteurdActivite: '',
          natureDesEmpoisOcccupes: ''
        }]
      },
      activitesProfessionellesCurrent: {
        exercez_vous: false,
        domaines: '',
        nomEmployeur: '',
        depuisQuand: null
      }
    })

    const addProfession = () => {
      form.value.activitesProfessionellesPassees.professions.push({
        annees: '',
        secteurdActivite: '',
        natureDesEmpoisOcccupes: ''
      })
    }

    const handleSubmit = () => {
      store.dispatch('saveStepData', {
        step: 'professional',
        data: form.value
      })
      store.dispatch('nextStep')
    }

    return {
      form,
      Theme,
      handleSubmit,
      addProfession,
      isDark: computed(() => store.state.theme === Theme.THEMES.DARK)
    }
  }
}
</script>

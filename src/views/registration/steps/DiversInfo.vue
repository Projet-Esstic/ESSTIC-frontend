<template>
  <div class="mb-6 p-4  rounded shadow-md">
    <h2 :class="Theme.applyTextStyle('heading2')">Renseignements Divers</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="mb-6">
        <h3 :class="Theme.applyTextStyle('heading3')">Séjours à l'étranger</h3>
        <div class="form-group">
          <label :class="Theme.applyTextStyle('bodyLarge')">Avez-vous déjà séjourné à l'étranger?</label>
          <SwitchField v-model="form.sejourne_a_l_etranger.avez_vous" />
        </div>

        <div v-if="form.sejourne_a_l_etranger.avez_vous" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label :class="Theme.applyTextStyle('bodyLarge')">Motif du séjour</label>
              <input v-model="form.sejourne_a_l_etranger.reason" type="text" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" placeholder="Ex: Études, Stage, Travail..." />
            </div>
            <div class="form-group">
              <label :class="Theme.applyTextStyle('bodyLarge')">Pays/Ville de séjour</label>
              <input v-model="form.sejourne_a_l_etranger.lieu" type="text" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" placeholder="Ex: France, Paris" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label :class="Theme.applyTextStyle('bodyLarge')">Date de début</label>
              <input v-model="form.sejourne_a_l_etranger.dates.commencement" type="date" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
            </div>
            <div class="form-group">
              <label :class="Theme.applyTextStyle('bodyLarge')">Date de fin</label>
              <input v-model="form.sejourne_a_l_etranger.dates.fini" type="date" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
            </div>
          </div>

          <div class="form-group">
            <label :class="Theme.applyTextStyle('bodyLarge')">Rencontres Internationales</label>
            <TagInput v-model="form.sejourne_a_l_etranger.rencontresInternationales" placeholder="Ajouter une rencontre + Enter" :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button 
          type="button" 
          @click="previousStep"
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
      sejourne_a_l_etranger: {
        avez_vous: false,
        reason: '',
        lieu: '',
        dates: {
          commencement: null,
          fini: null
        },
        rencontresInternationales: []
      }
    })

    const previousStep = () => {
      store.dispatch('previousStep')
    }

    const handleSubmit = () => {
      store.dispatch('saveStepData', {
        step: 'diversInfo',
        data: form.value
      })
      store.dispatch('nextStep')
    }

    return {
      form,
      Theme,
      handleSubmit,
      previousStep,
      isDark: computed(() => store.state.theme === Theme.THEMES.DARK)
    }
  }
}
</script>

<template>
  <div class="mb-6 p-4  rounded shadow-md">
    <h2 :class="Theme.applyTextStyle('heading2')">Autres Activités</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="mb-6">
        <div class="form-group">
          <label :class="Theme.applyTextStyle('bodyLarge')">Avez-vous des activités extra-scolaires ou extra-professionnelles?</label>
          <SwitchField v-model="form.extra_socalariesOuExtra_professionelles.avez_vous" />
        </div>

        <div v-if="form.extra_socalariesOuExtra_professionelles.avez_vous">
          <div v-for="(activite, index) in form.extra_socalariesOuExtra_professionelles.lesquelle" :key="index" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Nature des activités</label>
                <input v-model="activite.natureDesActivies" type="text" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Organismes liés</label>
                <input v-model="activite.organismesAuxquelSontLies" type="text" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Date de début</label>
                <input v-model="activite.dates.commencement" type="date" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
              <div class="form-group">
                <label :class="Theme.applyTextStyle('bodyLarge')">Date de fin</label>
                <input v-model="activite.dates.fini" type="date" required :class="[Theme.getThemeClasses(isDark).input, 'border rounded p-2 w-full']" />
              </div>
            </div>
          </div>
          <button @click="addActivity" :class="[Theme.getThemeClasses(isDark).button.secondary, 'mt-2']">+ Ajouter une activité</button>
        </div>
      </div>

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
      extra_socalariesOuExtra_professionelles: {
        avez_vous: false,
        lesquelle: [{
          natureDesActivies: '',
          organismesAuxquelSontLies: '',
          dates: {
            commencement: null,
            fini: null
          }
        }]
      }
    })

    const addActivity = () => {
      form.value.extra_socalariesOuExtra_professionelles.lesquelle.push({
        natureDesActivies: '',
        organismesAuxquelSontLies: '',
        dates: {
          commencement: null,
          fini: null
        }
      })
    }

    const handleSubmit = () => {
      store.dispatch('saveStepData', {
        step: 'extraActivities',
        data: form.value
      })
      store.dispatch('nextStep')
    }

    return {
      form,
      Theme,
      handleSubmit,
      addActivity,
      isDark: computed(() => store.state.theme === Theme.THEMES.DARK)
    }
  }
}
</script>

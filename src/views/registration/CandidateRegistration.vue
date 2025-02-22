<template>
  <div :class="themeClasses.app">
    <div class="max-w-6xl mx-auto p-6">
      <!-- Progress Stepper -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div v-for="(step, index) in steps" 
               :key="index"
               class="flex items-center">
            <div :class="[
                   'step-indicator',
                   currentStep >= index + 1 
                     ? themeClasses.button.primary
                     : `bg-surface-${isDark ? 'dark' : 'light'} border-text-muted`,
                   'relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200'
                 ]">
              {{ step.label }}
            </div>
            <div v-if="index < steps.length - 1" 
                 :class="[
                   currentStep > index + 1 
                     ? 'bg-primary-500'
                     : `bg-surface-${isDark ? 'dark' : 'light'}`,
                   'h-1 w-16 mx-2 rounded-full transition-all duration-200'
                 ]">
            </div>
          </div>
        </div>
      </div>      <!-- Form Steps -->
      <component 
        :is="currentStepComponent"
        @next-step="nextStep"
        @previous-step="previousStep"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CivilStatus from './steps/CivilStatus.vue'
import Education from './steps/Education.vue'
import Professional from './steps/Professional.vue'
import ExtraActivities from './steps/ExtraActivities.vue'
import DiversInfo from './steps/DiversInfo.vue'
import Review from './steps/Review.vue'

export default {
  components: {
    CivilStatus,
    Education,
    Professional,
    ExtraActivities,
    DiversInfo,
    Review
  },
  setup() {
    const store = useStore()
    
    const steps = [
      { label: '1', component: 'CivilStatus' },
      { label: '2', component: 'Education' },
      { label: '3', component: 'Professional' },
      { label: '4', component: 'ExtraActivities' },
      { label: '5', component: 'DiversInfo' },
      { label: '6', component: 'Review' }
    ]

    const currentStepComponent = computed(() => {
      return steps[store.state.candidateRegistration.currentStep - 1].component
    })

    return {
      currentStep: computed(() => store.state.candidateRegistration.currentStep),
      totalSteps: computed(() => store.state.candidateRegistration.totalSteps),
      themeClasses: computed(() => store.state.themeClasses),
      isDark: computed(() => store.state.theme === 'dark'),
      steps,
      currentStepComponent
    }
  }
}
</script>


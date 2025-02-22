<template>
  <div class="h-screen p-8 overflow-auto">
    <div class="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 animate-fade-in">
      <!-- Page Title -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2 animate-slide-up">
          Inscription au Concours
        </h2>
        <p class="text-gray-600 animate-slide-up-delay">
          Remplissez le formulaire ci-dessous pour vous inscrire au concours d'entrée à l'ESSTIC
        </p>
      </div>
      <!-- Back button for admin mode -->
      <div v-if="isAdminMode" class="mb-6 animate-fade-in">
        <button
          @click="goBack"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
        >
          <span class="material-icons text-lg">arrow_back</span>
          Retour à la gestion des candidats
        </button>
      </div>
      <!-- Progress Stepper -->
      <div class="mb-12 animate-fade-in-delay">
        <div class="flex justify-between items-center relative">
          <div v-for="(step, index) in steps" 
               :key="index"
               class="flex items-center flex-1">
            <!-- Step Circle -->
            <div class="relative z-10 flex-shrink-0">
              <div 
                :class="[
                  'step-indicator group',
                  {
                    'bg-blue-600 text-white shadow-lg shadow-blue-500/30': isStepComplete(index + 1),
                    'bg-primary-600 text-white shadow-lg shadow-primary-500/30': !isStepComplete(index + 1) && currentStep.value === index + 1,
                    'bg-gray-100 text-gray-400': !isStepComplete(index + 1) && currentStep.value !== index + 1
                  },
                  'relative flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold transition-all duration-500'
                ]"
                @mouseenter="animateStep(index)"
              >
                <!-- Step Number -->
                <span :class="[
                  'transition-transform duration-300',
                  {'scale-number': animatedStep === index},
                  {'text-blue-50': isStepComplete(index + 1)}
                ]">
                  {{ index + 1 }}
                </span>

                <!-- Success Icon (when step is complete) -->
                <span 
                  v-if="isStepComplete(index + 1)"
                  class="absolute inset-0 flex items-center justify-center text-white animate-success"
                >
                  <i class="material-icons text-2xl">check</i>
                </span>

                <!-- Tooltip -->
                <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div :class="[
                    'text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap',
                    isStepComplete(index + 1) ? 'bg-blue-700 text-white' : 'bg-gray-800 text-white'
                  ]">
                    {{ step.label }}
                  </div>
                </div>
              </div>

              <!-- Pulse Effect for Current Step -->
              <div 
                v-if="currentStep.value === index + 1"
                class="absolute inset-0 z-0"
              >
                <div class="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
                <div class="absolute inset-0 rounded-full bg-primary-500 animate-pulse opacity-30"></div>
              </div>
            </div>

            <!-- Connection Line -->
            <div v-if="index < steps.length - 1" class="flex-1 mx-4 relative h-1">
              <!-- Background Line -->
              <div class="absolute inset-0 bg-gray-200 rounded-full"></div>
              
              <!-- Progress Line -->
              <div 
                :class="[
                  'absolute h-full rounded-full transition-all duration-1000 ease-out',
                  {
                    'bg-gradient-to-r from-blue-500 to-blue-600': isStepComplete(index + 1),
                    'bg-gradient-to-r from-primary-500 to-primary-600': !isStepComplete(index + 1) && currentStep.value === index + 1,
                    'bg-gray-200': !isStepComplete(index + 1) && currentStep.value !== index + 1
                  },
                  isStepComplete(index + 1) ? 'w-full' : 
                  currentStep.value === index + 1 ? 'w-1/2 animate-progress' : 'w-0'
                ]"
              ></div>
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
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
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
    const route = useRoute()
    const router = useRouter()
    const isAdminMode = computed(() => route.meta.isAdmin)
    const animatedStep = ref(null)
    const themeClasses = computed(() => store.state.themeClasses)
    
    const currentStep = computed(() => store.state.candidateRegistration.currentStep)
    const completedSteps = computed(() => store.state.candidateRegistration.completedSteps || [])
    
    const isStepComplete = (stepNumber) => {
      console.log('Checking step completion:', stepNumber, completedSteps.value)
      return completedSteps.value.includes(stepNumber)
    }

    const markStepComplete = (stepNumber) => {
      console.log('Marking step complete:', stepNumber)
      store.commit('completeStep', stepNumber)
    }

    const nextStep = () => {
      if (currentStep.value < steps.length) {
        // Mark current step as complete
        markStepComplete(currentStep.value)
        
        // Move to next step
        const nextStepNumber = currentStep.value + 1
        store.commit('setCurrentStep', nextStepNumber)
        router.push({ query: { ...route.query, step: nextStepNumber } })
      }
    }

    const previousStep = () => {
      if (currentStep.value > 1) {
        const prevStepNumber = currentStep.value - 1
        store.commit('setCurrentStep', prevStepNumber)
        router.push({ query: { ...route.query, step: prevStepNumber } })
      }
    }

    const steps = [
      { label: '1', component: 'CivilStatus' },
      { label: '2', component: 'Education' },
      { label: '3', component: 'Professional' },
      { label: '4', component: 'ExtraActivities' },
      { label: '5', component: 'DiversInfo' },
      { label: '6', component: 'Review' }
    ]

    const currentStepComponent = computed(() => {
      return steps[currentStep.value - 1].component
    })

    watch(() => route.query.step, (newStep) => {
      if (newStep) {
        const stepNumber = parseInt(newStep)
        if (stepNumber > 0 && stepNumber <= steps.length) {
          store.commit('setCurrentStep', stepNumber)
        }
      }
    }, { immediate: true })

    const goBack = () => {
      router.push('/entrance-exam')
    }

    const animateStep = (index) => {
      animatedStep.value = index
      setTimeout(() => {
        animatedStep.value = null
      }, 300)
    }

    return {
      currentStep,
      completedSteps,
      totalSteps: computed(() => store.state.candidateRegistration.totalSteps),
      animatedStep,
      animateStep,
      themeClasses,
      isDark: computed(() => store.state.theme === 'dark'),
      steps,
      currentStepComponent,
      isAdminMode,
      goBack,
      isStepComplete,
      nextStep,
      previousStep,
      markStepComplete
    }
  }
}
</script>

<style scoped>
/* Step Indicator Animations */
.scale-number {
  transform: scale(1.2);
}

.animate-success {
  animation: successPop 0.5s ease-out;
}

@keyframes successPop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Progress Bar Animation */
.animate-progress {
  animation: progressGrow 1s ease-out;
}

@keyframes progressGrow {
  from { width: 0; }
  to { width: 50%; }
}

/* Pulse Animation for Current Step */
@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes pulse {
  50% {
    opacity: .4;
  }
}
</style>

<style scoped>
/* Fade and Slide Animations */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.6s ease-out 0.3s both;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-slide-up-delay {
  animation: slideUp 0.6s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Step Indicator Animations */
.step-indicator {
  transition: all 0.3s ease;
}

.step-indicator:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

/* Form Transitions */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>

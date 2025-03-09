<template>
  <div :class="[themeClasses.app, 'h-screen flex flex-col md:flex-row']">
  <!-- Left Section with Logo - Now responsive -->
  <div :class="[
      'md:w-1/3 w-full p-4 flex flex-col items-center justify-center h-screen bg-blue-500',
      `bg-gradient-to-br ${getGradientClass()}`
    ]" aria-label="ESSTIC welcome section">

      <!-- Progress Bar for multi-step process -->
      <!-- Welcome Message Above Logo -->
      <div class="relative z-10 mb-3 md:mb-8 text-center w-full max-w-md">
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20">
          <h2 class="text-white text-xl md:text-2xl font-semibold mb-2 typing-animation">
            Bienvenue à l'ESSTIC
          </h2>
          <p class="text-white/90 typing-animation-delay-1">
            Prêt à commencer votre aventure académique ?
          </p>
        </div>
      </div>
      
      <!-- Gradient Background instead of circles -->
      <div class="absolute inset-0 bg-gradient-radial from-black/5 to-transparent z-0"></div>
      
      <!-- Logo and School Name -->
      <div class="relative z-10 text-center mb-3 md:mb-8 w-full max-w-md">
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20">
          <h1 class="text-white text-2xl md:text-3xl font-bold mb-3 md:mb-4 animate-fade-in">
            ESSTIC
          </h1>
          <p class="text-white/90 text-base md:text-lg animate-fade-in-delay">
            École Supérieure des Sciences et Technologies de l'Information et de la Communication
          </p>
        </div>
      </div>

      <!-- Step Messages Below Logo -->
      <div class="relative z-10 mt-2 md:mt-2 w-full max-w-md">
        <transition-group name="fade-slide" mode="out-in">
          <div 
            v-if="stepMessages[currentStepIndex]"
            :key="currentStepIndex"
            class="bg-white/10 backdrop-blur-md rounded-lg p-5 md:p-6 shadow-lg typing-animation-delay-2 border border-white/20"
            tabindex="0"
            :aria-label="`Étape ${currentStepIndex + 1}: ${stepMessages[currentStepIndex].title}`"
          >
            <h3 class="text-white text-xl font-semibold mb-2 typing-text">
              {{ stepMessages[currentStepIndex].title }}
            </h3>
            <p class="text-white/90 typing-text-delay">
              {{ stepMessages[currentStepIndex].description }}
            </p>
            
            <!-- Save Progress Button -->
            <button 
              class="mt-4 bg-white/20 hover:bg-white/30 focus:bg-white/30 text-white py-2 px-4 rounded-md transition-colors text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary-700"
              @click="saveProgress"
              aria-label="Sauvegarder et continuer plus tard"
            >
              <span class="mr-2">💾</span> Sauvegarder et continuer plus tard
            </button>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Right Section with Content -->
    <div class="w-full md:w-2/3 overflow-auto bg-white dark:bg-gray-900 flex flex-col">
      <!-- Header with help and support -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div class="logo-container relative inline-block mb-0">
          <img
            src="@/assets/images/esstic-logo.png"
            alt="ESSTIC Logo"
            class="w-24 h-24 md:w-20 md:h-10 object-contain animate-pulse-subtle"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-75"></div>
        </div>
        <h2 class="text-primary-900 dark:text-white font-medium">
          {{ stepMessages[currentStepIndex]?.title || 'Inscription' }}
        </h2>
        <div class="flex items-center space-x-4">
          <select
            class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-primary-900 dark:text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            aria-label="Sélecteur de langue" v-model="selectedLanguage">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <button 
            class="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
            aria-label="Obtenir de l'aide"
          >
            <span class="flex items-center"><span class="mr-1">❓</span> Aide</span>
          </button>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="flex-grow p-4 md:p-6 overflow-auto">
        <router-view v-slot="{ Component }">
          <transition
            name="fade-slide"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      
      <!-- Footer with navigation buttons -->
      <!-- <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <button 
          v-if="currentStepIndex > 0"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          @click="goToPrevStep"
          aria-label="Retour à l'étape précédente"
        >
          Précédent
        </button>
        <div v-else></div>
        
        <button 
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          @click="goToNextStep"
          :aria-label="currentStepIndex < 3 ? 'Continuer à l\'étape suivante' : 'Soumettre votre candidature'"
        >
          {{ currentStepIndex < 3 ? 'Continuer' : 'Soumettre' }}
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'PublicLayout',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const selectedLanguage = ref('fr')
    
    const currentStepIndex = computed(() => {
      return route.query.step ? parseInt(route.query.step) - 1 : 0
    })

    const stepMessages = [
      {
        title: 'Informations Personnelles',
        description: 'Commencez par remplir vos informations personnelles pour créer votre profil.',
        estimatedTime: 5
      },
      {
        title: 'Éducation et Formation',
        description: 'Détaillez votre parcours académique et vos qualifications.',
        estimatedTime: 8
      },
      {
        title: 'Documents Requis',
        description: 'Téléchargez les documents nécessaires pour votre candidature.',
        estimatedTime: 10
      },
      {
        title: 'Vérification Finale',
        description: 'Révisez attentivement toutes vos informations avant la soumission.',
        estimatedTime: 3
      }
    ]
    
    const getGradientClass = () => {
      const gradients = [
        'from-primary-500 to-primary-700',
        'from-primary-600 to-primary-800',
        'from-primary-700 to-primary-900',
        'from-primary-800 to-primary-950'
      ]
      
      return gradients[currentStepIndex.value]
    }
    
    const getEstimatedTime = () => {
      // Calculate remaining time for current and future steps
      let remainingTime = 0
      for (let i = currentStepIndex.value; i < stepMessages.length; i++) {
        remainingTime += stepMessages[i].estimatedTime
      }
      return remainingTime
    }
    
    const goToNextStep = () => {
      if (currentStepIndex.value < 3) {
        router.push({ 
          query: { ...route.query, step: (currentStepIndex.value + 2).toString() }
        })
      } else {
        // Submit the form
        console.log('Form submitted')
        // Redirect to success page or dashboard
        router.push('/success')
      }
    }
    
    const goToPrevStep = () => {
      if (currentStepIndex.value > 0) {
        router.push({ 
          query: { ...route.query, step: currentStepIndex.value.toString() }
        })
      }
    }
    
    const saveProgress = () => {
      // Show a confirmation message
      alert('Votre progression a été sauvegardée. Vous recevrez un e-mail avec un lien pour continuer plus tard.')
      // In a real app, you'd save to localStorage or backend
    }

    return {
      themeClasses: computed(() => store.state.themeClasses),
      currentStepIndex,
      stepMessages,
      selectedLanguage,
      getGradientClass,
      getEstimatedTime,
      goToNextStep,
      goToPrevStep,
      saveProgress
    }
  }
}
</script>

<style scoped>
/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Logo and Text Animations */
.animate-pulse-subtle {
  animation: pulse 3s infinite;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.4s both;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Typing Animation */
.typing-animation {
  overflow: hidden;
  border-right: 2px solid white;
  white-space: nowrap;
  animation: typing 2.5s steps(30, end),
             blink-caret .75s step-end infinite;
}

.typing-animation-delay-1 {
  overflow: hidden;
  border-right: 2px solid white;
  white-space: nowrap;
  animation: typing 2.5s steps(30, end) 0.8s,
             blink-caret .75s step-end infinite;
  animation-fill-mode: both;
}

.typing-animation-delay-2 {
  animation: fade-in 0.5s ease-out 1.6s;
  animation-fill-mode: both;
}

.typing-text {
  animation: typing-text 0.5s ease-out;
}

.typing-text-delay {
  animation: typing-text 0.5s ease-out 0.3s;
  animation-fill-mode: both;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

@keyframes typing-text {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* New background styles */
.bg-gradient-radial {
  background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
}

/* Improved animation for logo highlight */
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Media Queries */
@media (max-width: 768px) {
  .typing-animation, .typing-animation-delay-1 {
    white-space: normal;
    border-right: none;
    animation: fade-in 0.8s ease-out;
  }
}
</style>
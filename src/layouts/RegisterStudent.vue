<template>
  <div :class="[themeClasses.app, 'min-h-screen flex flex-col md:flex-row', darkMode ? 'dark' : '']" id="bgimage">
    <!-- Left Section with Logo - Now responsive and fixed -->
    <div :class="[
        'md:w-1/3 w-full flex flex-col items-center fixed left-0 top-0 h-full bg-blue-0',
        `bg-gradient-to-br ${getGradientClass()}`
      ]" aria-label="ESSTIC welcome section">

      <!-- Home Button -->
      <div class="absolute top-4 left-4 z-20">
        <button @click="goToHome"
          class="flex items-center text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors">
          <span class="mr-2">🏠</span> Accueil
        </button>
      </div>

      <!-- Content Container with proper spacing from top -->
      <div class="flex flex-col items-center justify-center h-full w-full px-4 md:px-8 py-16 overflow-auto">
        <!-- Welcome Message Above Logo -->
        <div class="relative z-10 mb-1 md:mb-1 text-center w-full max-w-md">
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20">
            <h2 class="text-white text-xl md:text-2xl font-semibold mb-2 typing-animation">
              Bienvenue à l'ESSTIC
            </h2>
            <transition name="fade" mode="out-in">
              <p :key="currentMessageIndex" class="text-white/90 typing-animation-delay-1">
                {{ welcomeMessages[currentMessageIndex] }}
              </p>
            </transition>
          </div>
        </div>

        <!-- Gradient Background instead of circles -->
        <div class="absolute inset-0 bg-gradient-radial from-black/5 to-transparent z-0"></div>

        <!-- Logo and School Name -->
        <div class="relative z-10 text-center mb-1 md:mb-2 w-full max-w-md">
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
        <div class="relative z-10 mt-1 md:mt-1 w-full max-w-md">
          <transition-group name="fade-slide" mode="out-in">
            <div v-for="(message, index) in stepMessages" :key="message.title" v-show="currentStepIndex === index"
              class="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20" tabindex="0"
              :aria-label="`Étape ${index + 1}: ${message.title}`">
              <h3 class="text-white text-xl font-semibold mb-3 typing-text">{{ message.title }}</h3>
              <p class="text-white/90 typing-text-delay">{{ message.description }}</p>

              <!-- Save Progress Button -->
              <button
                class="mt-4 bg-white/20 hover:bg-white/30 focus:bg-white/30 text-white py-2 px-4 rounded-md transition-colors text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary-700"
                @click="saveProgress" aria-label="Sauvegarder et continuer plus tard">
                <span class="mr-2">💾</span> Sauvegarder et continuer plus tard
              </button>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <!-- Right Section with Content - Adjusted for fixed header -->
    <div class="w-full md:w-2/3 md:ml-[33.333333%] flex flex-col h-screen border-l-2 border-white/20">
      <!-- Header with help and support - Fixed -->
      <div class="p-4 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 z-10 sticky top-0 flex justify-between items-center">
        <div class="logo-container relative inline-block">
          <img src="@/assets/images/esstic-logo.png" alt="ESSTIC Logo"
            class="w-16 h-16 md:w-20 md:h-10 object-contain animate-pulse-subtle" loading="lazy" />
          <div class="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-75"></div>
        </div>
        <h2 class="text-black dark:text-white font-medium">
          {{ stepMessages[currentStepIndex]?.title || 'Inscription' }}
        </h2>
        <div class="flex items-center space-x-4">
          <!-- Dark Mode Toggle Button -->
          <button
            @click="toggleDarkMode"
            class="flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            :aria-label="darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'"
          >
            <span v-if="darkMode" class="text-sm flex items-center"><span class="mr-1">☀️</span> Clair</span>
            <span v-else class="text-sm flex items-center"><span class="mr-1">🌙</span> Sombre</span>
          </button>
          
          <select
            class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black dark:text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            aria-label="Sélecteur de langue" v-model="selectedLanguage">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <button
            class="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
            aria-label="Obtenir de l'aide">
            <span class="flex items-center text-black dark:text-white"><span class="mr-1">❓</span> Aide</span>
          </button>
        </div>
      </div>

      <!-- Main Content Area - With proper overflow handling -->
      <div class="flex-grow p-4 md:p-6 overflow-y-auto  text-black dark:text-white">
        <!-- For testing: -->
        <candidate-registration></candidate-registration>

        <!-- Original router-view: -->
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import CandidateRegistration from '../views/registration/CandidateRegistration.vue'

export default {
  name: 'RegisterStudent',
  components: {
    CandidateRegistration
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const selectedLanguage = ref('fr')
    const darkMode = ref(false)
    const currentStepIndex = computed(() => {
      return route.query.step ? parseInt(route.query.step) - 1 : 0
    })
    const currentMessageIndex = ref(0)
    let messageInterval

    const welcomeMessages = [
      "Prêt à commencer votre aventure académique ?",
      "Façonnez votre avenir dans les TIC avec nous",
      "Une formation d'excellence vous attend",
      "Rejoignez la communauté ESSTIC"
    ]

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
    
    const goToHome = () => {
      router.push('/')
    }
    
    // Dark mode toggle function
    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
      // Save preference to localStorage
      localStorage.setItem('darkMode', darkMode.value ? 'dark' : 'light')
    }

    onMounted(() => {
      messageInterval = setInterval(() => {
        currentMessageIndex.value = (currentMessageIndex.value + 1) % welcomeMessages.length
      }, 15000)
      
      // Check for saved dark mode preference
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode) {
        darkMode.value = savedDarkMode === 'dark'
      } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        darkMode.value = prefersDark
      }
    })

    onUnmounted(() => {
      if (messageInterval) {
        clearInterval(messageInterval)
      }
    })

    return {
      themeClasses: computed(() => store.state.themeClasses),
      currentStepIndex,
      stepMessages,
      selectedLanguage,
      darkMode,
      getGradientClass,
      getEstimatedTime,
      goToNextStep,
      goToPrevStep,
      saveProgress,
      goToHome,
      toggleDarkMode,
      currentMessageIndex,
      welcomeMessages
    }
  }
}
</script>
  
<style scoped>
#bgimage {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('@/assets/images/bgimage3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Dark mode transition */
.dark {
  color-scheme: dark;
}

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

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
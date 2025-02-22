<template>
  <div :class="[themeClasses.app, 'min-h-screen flex']">
    <!-- Left Section with Logo -->
    <div :class="[
      'w-1/3 flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors duration-1000',
      currentStepIndex === 0 ? 'bg-white dark:bg-primary-500' :
      currentStepIndex === 1 ? 'bg-white dark:bg-primary-600' :
      currentStepIndex === 2 ? 'bg-white dark:bg-primary-700' :
      'bg-white dark:bg-primary-800'
    ]">
      <!-- Welcome Message Above Logo -->
      <div class="relative z-10 mb-8 text-center">
        <div class="bg-gray-50 dark:bg-primary-600/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-transparent">
          <h2 class="text-primary-900 dark:text-white text-2xl font-semibold mb-2 typing-animation">
            Bienvenue à l'ESSTIC
          </h2>
          <p class="text-primary-800 dark:text-white/90 typing-animation-delay-1">
            Prêt à commencer votre aventure académique ?
          </p>
        </div>
      </div>
      <!-- Animated Background Circles -->
      <div class="absolute inset-0 overflow-hidden">
        <div v-for="i in 5" :key="i"
          :class="[`circle-${i}`, 'absolute rounded-full bg-white/10']"
          :style="{
            width: `${30 + i * 20}px`,
            height: `${30 + i * 20}px`,
            animation: `float-${i} ${8 + i * 2}s infinite ease-in-out`
          }"
        />
      </div>
      
      <!-- Logo and School Name -->
      <div class="relative z-10 text-center mb-8">
        <div class="logo-container relative inline-block mb-6">
          <img
            :src="require('@/assets/images/esstic-logo.png')"
            alt="ESSTIC Logo"
            class="w-32 h-32 object-contain animate-pulse-subtle"
          />
          <div class="absolute inset-0 bg-white/10 rounded-full scale-animation"></div>
        </div>
        <div class="bg-gray-50 dark:bg-primary-600/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-transparent">
          <h1 class="text-primary-900 dark:text-white text-3xl font-bold mb-4 animate-fade-in">
            ESSTIC
          </h1>
          <p class="text-primary-800 dark:text-white/90 text-lg animate-fade-in-delay">
            École Supérieure des Sciences et Technologies de l'Information et de la Communication
          </p>
        </div>
      </div>

      <!-- Step Messages Below Logo -->
      <div class="relative z-10 mt-8 w-full">
        <transition-group name="fade-slide" mode="out-in">
          <div 
            v-for="(message, index) in stepMessages" 
            :key="message.title"
            v-show="currentStepIndex === index"
            class="bg-primary-600/90 backdrop-blur-sm rounded-lg p-6 shadow-lg typing-animation-delay-2"
          >
            <h3 class="text-primary-900 dark:text-white text-xl font-semibold mb-2 typing-text shadow-sm">{{ message.title }}</h3>
            <p class="text-primary-800 dark:text-white/90 typing-text-delay">{{ message.description }}</p>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Right Section with Content -->
    <div class="w-2/3 overflow-auto">
      <router-view v-slot="{ Component }">
        <transition
          name="fade-slide"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'PublicLayout',
  setup() {
    const store = useStore()
    const route = useRoute()
    
    const currentStepIndex = computed(() => {
      return route.query.step ? parseInt(route.query.step) - 1 : 0
    })

    const stepMessages = [
      {
        title: 'Informations Personnelles',
        description: 'Commencez par remplir vos informations personnelles pour créer votre profil.'
      },
      {
        title: 'Éducation et Formation',
        description: 'Détaillez votre parcours académique et vos qualifications.'
      },
      {
        title: 'Documents Requis',
        description: 'Téléchargez les documents nécessaires pour votre candidature.'
      },
      {
        title: 'Vérification Finale',
        description: 'Révisez attentivement toutes vos informations avant la soumission.'
      }
    ]

    return {
      themeClasses: computed(() => store.state.themeClasses),
      currentStepIndex,
      stepMessages
    }
  }
}
</script>

<style scoped>
/* Floating Circle Animations */
@keyframes float-1 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-30%, -70%) scale(1.1); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(50%, 50%) scale(1.1); }
  50% { transform: translate(70%, 30%) scale(1); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(-20%, 30%) scale(1); }
  50% { transform: translate(-40%, 50%) scale(1.1); }
}

@keyframes float-4 {
  0%, 100% { transform: translate(30%, -30%) scale(1.1); }
  50% { transform: translate(50%, -50%) scale(1); }
}

@keyframes float-5 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  50% { transform: translate(20%, -20%) scale(1.1); }
}

/* Circle Positioning */
.circle-1 { top: 20%; left: 20%; }
.circle-2 { bottom: 30%; right: 20%; }
.circle-3 { top: 50%; left: 30%; }
.circle-4 { bottom: 20%; left: 40%; }
.circle-5 { top: 30%; right: 30%; }

/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Logo and Text Animations */
.animate-bounce-slow {
  animation: bounce 3s infinite;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s both;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Typing Animation */
.typing-animation {
  overflow: hidden;
  border-right: 2px solid white;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end),
             blink-caret .75s step-end infinite;
}

.typing-animation-delay-1 {
  overflow: hidden;
  border-right: 2px solid white;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end) 1s,
             blink-caret .75s step-end infinite;
  animation-fill-mode: both;
}

.typing-animation-delay-2 {
  animation: fade-in 0.5s ease-out 2s;
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

/* Smooth color transitions */
.transition-colors {
  transition: background-color 0.5s ease-in-out;
}
</style>

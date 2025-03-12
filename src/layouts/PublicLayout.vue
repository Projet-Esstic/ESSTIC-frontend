<template>
  <div :class="[themeClasses?.app || '', 'h-screen flex flex-col md:flex-row']">
    <!-- Left Section with Logo -->
    <div :class="[
      'md:w-1/3 w-full p-4 flex flex-col items-center justify-center h-screen bg-blue-500',
      `bg-gradient-to-br ${getGradientClass()}`
    ]" aria-label="ESSTIC welcome section">

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

      <!-- Gradient Background -->
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
          <div v-if="stepMessages[currentStepIndex]" :key="currentStepIndex"
            class="bg-white/10 backdrop-blur-md rounded-lg p-5 md:p-6 shadow-lg typing-animation-delay-2 border border-white/20"
            tabindex="0" :aria-label="`Étape ${currentStepIndex + 1}: ${stepMessages[currentStepIndex].title}`">
            <h3 class="text-white text-xl font-semibold mb-2 typing-text">
              {{ stepMessages[currentStepIndex].title }}
            </h3>
            <p class="text-white/90 typing-text-delay">
              {{ stepMessages[currentStepIndex].description }}
            </p>

            <!-- Save Progress Button -->
            <button
              class="mt-4 bg-white/20 hover:bg-white/30 focus:bg-white/30 text-white py-2 px-4 rounded-md transition-colors text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary-700 cursor-pointer"
              onclick="alert('Votre progression a été sauvegardée. Vous recevrez un e-mail avec un lien pour continuer plus tard.')"
              aria-label="Sauvegarder et continuer plus tard">
              <span class="mr-2">💾</span> Sauvegarder et continuer plus tard
            </button>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Right Section with Content -->
    <div :class="['w-full md:w-2/3 overflow-auto bg-white', darkMode ? 'dark:bg-gray-900' : '']">
      <!-- Header with help and support -->
      <div
        :class="['p-4 border-b border-gray-200 z-50', darkMode ? 'dark:border-gray-800' : '', 'flex justify-between items-center']">
        <div class="logo-container relative inline-block mb-0">
          <img src="@/assets/images/esstic-logo.png" alt="ESSTIC Logo"
            class="w-24 h-24 md:w-20 md:h-10 object-contain animate-pulse-subtle" loading="lazy" />
        </div>
        <h2 :class="['text-primary-900', darkMode ? 'dark:text-white' : '', 'font-medium']">
          {{ stepMessages[currentStepIndex]?.title || 'Inscription' }}
        </h2>
        <div class="flex items-center space-x-4">
          <!-- Dark Mode Toggle -->
          <button @click="toggleDarkMode"
            class="flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            :aria-label="darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'">
            <span v-if="darkMode" class="text-sm flex items-center"><span class="mr-1">☀️</span> Clair</span>
            <span v-else class="text-sm flex items-center"><span class="mr-1">🌙</span> Sombre</span>
          </button>
          <!-- Language Selector -->
          <select @change="changeLanguage" :class="['border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
            darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 text-primary-900']"
            aria-label="Sélecteur de langue">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <!-- Help Button -->
          <button @click="showHelp" :class="['hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1',
            darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600']"
            aria-label="Obtenir de l'aide">
            <span class="flex items-center"><span class="mr-1">❓</span> Aide</span>
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-grow p-4 md:p-6 overflow-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <!-- Footer with navigation buttons -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <button v-if="currentStepIndex > 0" style="cursor: pointer;"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          onclick="const urlParams = new URLSearchParams(window.location.search); const currentStep = parseInt(urlParams.get('step') || '1'); if(currentStep > 1) { urlParams.set('step', (currentStep - 1).toString()); window.location.search = urlParams.toString(); }"
          aria-label="Retour à l'étape précédente">
          Précédent
        </button>
        <div v-else></div>

        <button style="cursor: pointer;"
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          onclick="const urlParams = new URLSearchParams(window.location.search); const currentStep = parseInt(urlParams.get('step') || '1'); if(currentStep < 4) { urlParams.set('step', (currentStep + 1).toString()); window.location.search = urlParams.toString(); } else { window.location.href = '/success'; }"
          :aria-label="currentStepIndex < 3 ? 'Continuer à l\'étape suivante' : 'Soumettre votre candidature'">
          {{ currentStepIndex < 3 ? 'Continuer' : 'Soumettre' }} </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'PublicLayout',
  setup() {
    const store = useStore();
    const route = useRoute();
    const selectedLanguage = ref('fr');
    const darkMode = ref(false);

    const currentStepIndex = computed(() => {
      return route.query.step ? parseInt(route.query.step) - 1 : 0;
    });

    const stepMessages = [
      {
        title: 'Informations Personnelles',
        description: 'Commencez par remplir vos informations personnelles pour créer votre profil.',
        estimatedTime: 5,
      },
      {
        title: 'Éducation et Formation',
        description: 'Détaillez votre parcours académique et vos qualifications.',
        estimatedTime: 8,
      },
      {
        title: 'Documents Requis',
        description: 'Téléchargez les documents nécessaires pour votre candidature.',
        estimatedTime: 10,
      },
      {
        title: 'Vérification Finale',
        description: 'Révisez attentivement toutes vos informations avant la soumission.',
        estimatedTime: 3,
      },
    ];

    const getGradientClass = () => {
      const gradients = [
        'from-primary-500 to-primary-700',
        'from-primary-600 to-primary-800',
        'from-primary-700 to-primary-900',
        'from-primary-800 to-primary-950',
      ];
      return gradients[currentStepIndex.value];
    };

    const getEstimatedTime = () => {
      let remainingTime = 0;
      for (let i = currentStepIndex.value; i < stepMessages.length; i++) {
        remainingTime += stepMessages[i].estimatedTime;
      }
      return remainingTime;
    };

    const toggleDarkMode = () => {
      console.log('toggleDarkMode triggered');
      darkMode.value = !darkMode.value;
      localStorage.setItem('darkMode', darkMode.value ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', darkMode.value);
    };

    const changeLanguage = () => {
      console.log('changeLanguage triggered, new value:', selectedLanguage.value);
      localStorage.setItem('language', selectedLanguage.value);
    };

    const showHelp = () => {
      console.log('showHelp triggered');
      alert("Centre d'aide ESSTIC: Un conseiller va vous contacter dans les plus brefs délais.");
    };

    onMounted(() => {
      console.log('Component mounted');
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode) {
        darkMode.value = savedDarkMode === 'dark';
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        darkMode.value = prefersDark;
      }
      document.documentElement.classList.toggle('dark', darkMode.value);

      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        selectedLanguage.value = savedLanguage;
      }
    });

    return {
      themeClasses: computed(() => store.state.themeClasses),
      currentStepIndex,
      stepMessages,
      selectedLanguage,
      darkMode,
      getGradientClass,      // Added here
      getEstimatedTime,      // Added here
      toggleDarkMode,
      changeLanguage,
      showHelp,
    };
  },
};
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

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent
  }

  50% {
    border-color: white;
  }
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

  75%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Media Queries */
@media (max-width: 768px) {

  .typing-animation,
  .typing-animation-delay-1 {
    white-space: normal;
    border-right: none;
    animation: fade-in 0.8s ease-out;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
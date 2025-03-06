<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center">
            <img src="@/assets/images/logo.png" alt="ESSTIC Logo" class="h-12 w-auto"/>
            <div class="ml-3">
              <span class="text-2xl font-bold text-gray-900">ESSTIC</span>
              <p class="text-sm text-gray-600">Excellence & Innovation</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 rounded-sm cursor-pointer px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105">
              <i class="fas fa-home text-lg"></i>
              <span class="font-medium">Accueil</span>
            </router-link>
            <router-link to="/programs" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 rounded-sm cursor-pointer px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105">
              <i class="fas fa-graduation-cap text-lg"></i>
              <span class="font-medium">Programmes</span>
            </router-link>
            <router-link to="/admission" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 rounded-sm cursor-pointer px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105">
              <i class="fas fa-user-plus text-lg"></i>
              <span class="font-medium">Admission</span>
            </router-link>
            <router-link to="/contact" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 rounded-sm cursor-pointer px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105">
              <i class="fas fa-envelope text-lg"></i>
              <span class="font-medium">Contact</span>
            </router-link>
            <router-link to="/login" class="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <i class="fas fa-sign-in-alt"></i>
              <span>Connexion</span>
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" 
                    class="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-show="isMobileMenuOpen" class="md:hidden">
          <div class="pt-2 pb-3 space-y-1 border-t border-gray-100">
            <router-link to="/" class="flex items-center space-x-2 px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out hover:translate-x-2">
              <i class="fas fa-home text-blue-600"></i>
              <span class="font-medium">Accueil</span>
            </router-link>
            <router-link to="/programs" class="flex items-center space-x-2 px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out hover:translate-x-2">
              <i class="fas fa-graduation-cap text-blue-600"></i>
              <span class="font-medium">Programmes</span>
            </router-link>
            <router-link to="/admission" class="flex items-center space-x-2 px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out hover:translate-x-2">
              <i class="fas fa-user-plus text-blue-600"></i>
              <span class="font-medium">Admission</span>
            </router-link>
            <router-link to="/contact" class="flex items-center space-x-2 px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out hover:translate-x-2">
              <i class="fas fa-envelope text-blue-600"></i>
              <span class="font-medium">Contact</span>
            </router-link>
            <router-link to="/login" class="flex items-center space-x-2 px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out hover:translate-x-2">
              <i class="fas fa-sign-in-alt text-blue-600"></i>
              <span class="font-medium">Connexion</span>
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative flex-1 flex items-center justify-center bg-cover bg-center overflow-hidden" 
             :style="{ backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url(${bgImage})` }">
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
      
      <!-- Content -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
            Bienvenue à <span class="text-blue-400">l'ESSTIC</span>
          </h1>
          <p class="text-xl sm:text-2xl text-gray-50 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            École Supérieure des Sciences et Technologies de l'Information et de la Communication. 
            <span class="block mt-2 text-blue-300">Formez-vous aux métiers du numérique et de la communication.</span>
          </p>
          
          <!-- Search Input -->
          <div class="max-w-2xl mx-auto mb-12 relative group">
            <div class="relative transform hover:scale-[1.01] transition-all duration-300">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Rechercher un programme, un cours..." 
                class="w-full px-6 py-4 pl-12 text-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            </div>
            <!-- Search Results Dropdown -->
            <div v-if="searchQuery" 
                 class="absolute w-full mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 opacity-0 group-focus-within:opacity-100 border border-gray-100">
              <div class="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <p class="text-gray-800 font-medium">Résultat de recherche...</p>
                <p class="text-sm text-gray-600 mt-1">Description du résultat</p>
              </div>
            </div>
          </div>

          <router-link 
            to="/register-student" 
            class="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl group"
          >
            <i class="fas fa-user-plus group-hover:rotate-12 transition-transform duration-300"></i>
            <span>S'inscrire Maintenant</span>
          </router-link>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import bgImage from '@/assets/images/bgimage.avif'

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

</script>

<style scoped>
.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

/* Glass effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style>
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
            <router-link to="/register-student" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 rounded-sm cursor-pointer px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105">
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
             :style="{ backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url(${images[currentImageIndex]})` }">
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
      
      <!-- Content -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 :class="['text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight', isAnimating ? 'slide-out' : 'slide-in']"
              v-html="headlines[currentImageIndex].title">
          </h1>
          <p :class="['text-xl sm:text-2xl text-gray-50 mb-12 leading-relaxed font-light max-w-3xl mx-auto', isAnimating ? 'fade-out' : 'fade-in']">
            {{ headlines[currentImageIndex].subtitle }}
          </p>
          
          <!-- Search Input -->
          <div class="max-w-2xl mx-auto mb-12 relative group">
            <div class="relative transform hover:scale-[1.01] transition-all duration-300">
              <input 
                type="text" 
                v-model="searchQuery"
                @focus="showResults = true"
                @blur="handleSearchBlur"
                placeholder="Rechercher un programme, un cours..." 
                class="w-full px-6 py-4 pl-12 text-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            </div>
            
            <!-- Search Results Dropdown -->
            <div v-if="showResults && searchQuery && hasResults" 
                 class="absolute w-full mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl z-50 border border-gray-100 divide-y divide-gray-100 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <!-- Programs Section -->
              <div v-if="searchResults.programs.length" class="p-4 bg-white">
                <h3 class="text-sm font-semibold text-blue-600 mb-3 flex items-center">
                  <i class="fas fa-graduation-cap mr-2"></i>Programmes
                </h3>
                <div 
                  v-for="program in searchResults.programs" 
                  :key="program.path"
                  @click="openInNewWindow(program.path)"
                  class="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-150 text-gray-700 hover:text-blue-600 cursor-pointer mb-1 flex items-center justify-between group"
                >
                  <span class="flex-1">{{ program.title }}</span>
                  <i class="fas fa-external-link-alt text-sm opacity-60 group-hover:opacity-100 transition-opacity"></i>
                </div>
              </div>
              
              <!-- Courses Section -->
              <div v-if="searchResults.courses.length" class="p-4 bg-white">
                <h3 class="text-sm font-semibold text-blue-600 mb-3 flex items-center">
                  <i class="fas fa-book mr-2"></i>Cours
                </h3>
                <div 
                  v-for="course in searchResults.courses" 
                  :key="course.path"
                  @click="openInNewWindow(course.path)"
                  class="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-150 text-gray-700 hover:text-blue-600 cursor-pointer mb-1 flex items-center justify-between group"
                >
                  <span class="flex-1">{{ course.title }}</span>
                  <i class="fas fa-external-link-alt text-sm opacity-60 group-hover:opacity-100 transition-opacity"></i>
                </div>
              </div>
              
              <!-- News Section -->
              <div v-if="searchResults.news.length" class="p-4 bg-white">
                <h3 class="text-sm font-semibold text-blue-600 mb-3 flex items-center">
                  <i class="fas fa-newspaper mr-2"></i>Actualités
                </h3>
                <div 
                  v-for="item in searchResults.news" 
                  :key="item.path"
                  @click="openInNewWindow(item.path)"
                  class="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-150 text-gray-700 hover:text-blue-600 cursor-pointer mb-1 flex items-center justify-between group"
                >
                  <span class="flex-1">{{ item.title }}</span>
                  <i class="fas fa-external-link-alt text-sm opacity-60 group-hover:opacity-100 transition-opacity"></i>
                </div>
              </div>
            </div>
            
            <!-- No Results Message -->
            <div v-else-if="showResults && searchQuery && !hasResults" 
                 class="absolute w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
              <div class="p-6 text-center text-gray-500">
                <i class="fas fa-search mr-2"></i>
                Aucun résultat trouvé pour "{{ searchQuery }}"
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import bgImage1 from '@/assets/images/bgimage.avif'
import bgImage2 from '@/assets/images/bgimage2.webp'
import bgImage3 from '@/assets/images/bgimage3.jpg'
import bgImage4 from '@/assets/images/bgimage4.jpg'

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const showResults = ref(false)

// Handle search blur
const handleSearchBlur = () => {
  window.setTimeout(() => {
    showResults.value = false
  }, 200)
}

// Handle link click in new window
const openInNewWindow = (path) => {
  window.open(path, '_blank')
}

// Dummy data for search
const searchData = {
  programs: [
    { title: 'Licence en Développement Web', path: '/programs/web-development' },
    { title: 'Master en Cybersécurité', path: '/programs/cybersecurity' },
    { title: 'Licence en Réseaux et Télécommunications', path: '/programs/networking' },
    { title: 'Master en Intelligence Artificielle', path: '/programs/ai' },
    { title: 'Licence en Design Numérique', path: '/programs/digital-design' },
    { title: 'Master en Data Science', path: '/programs/data-science' },
    { title: 'Licence en Multimédia', path: '/programs/multimedia' },
    { title: 'Master en IoT et Systèmes Embarqués', path: '/programs/iot' }
  ],
  courses: [
    { title: 'Introduction à la Programmation Python', path: '/courses/python-intro' },
    { title: 'Développement Full Stack JavaScript', path: '/courses/fullstack-js' },
    { title: 'Sécurité des Réseaux', path: '/courses/network-security' },
    { title: 'Base de Données Avancées', path: '/courses/advanced-db' },
    { title: 'Intelligence Artificielle et Machine Learning', path: '/courses/ai-ml' },
    { title: 'Développement Mobile React Native', path: '/courses/react-native' },
    { title: 'DevOps et Cloud Computing', path: '/courses/devops-cloud' },
    { title: 'Blockchain et Cryptographie', path: '/courses/blockchain' }
  ],
  news: [
    { title: 'Inscription Ouverte pour 2025-2026', path: '/news/inscriptions-2025' },
    { title: 'Nouveau Partenariat Microsoft', path: '/news/microsoft-partnership' },
    { title: 'Hackathon ESSTIC 2025', path: '/news/hackathon-2025' },
    { title: 'Conférence sur l\'IA - Mai 2025', path: '/news/ai-conference' },
    { title: 'Nouveaux Laboratoires Inaugurés', path: '/news/new-labs' },
    { title: 'Programme d\'Échange International', path: '/news/exchange-program' }
  ]
}

// Computed property for filtered results
const searchResults = computed(() => {
  if (!searchQuery.value) return null
  
  const query = searchQuery.value.toLowerCase()
  return {
    programs: searchData.programs.filter(item => 
      item.title.toLowerCase().includes(query)
    ),
    courses: searchData.courses.filter(item => 
      item.title.toLowerCase().includes(query)
    ),
    news: searchData.news.filter(item => 
      item.title.toLowerCase().includes(query)
    )
  }
})

// Computed property to check if we have any results
const hasResults = computed(() => {
  if (!searchResults.value) return false
  return searchResults.value.programs.length > 0 || 
         searchResults.value.courses.length > 0 || 
         searchResults.value.news.length > 0
})

const currentImageIndex = ref(0)
const isAnimating = ref(false)

const headlines = [
  {
    title: "Bienvenue à <span class='text-blue-400'>l'ESSTIC</span>",
    subtitle: "École Supérieure des Sciences et Technologies de l'Information et de la Communication"
  },
  {
    title: "Innovez avec <span class='text-blue-400'>l'Excellence</span>",
    subtitle: "Découvrez nos programmes de formation de pointe en technologie"
  },
  {
    title: "Construisez votre <span class='text-blue-400'>Avenir</span>",
    subtitle: "Une formation pratique adaptée aux besoins du marché"
  },
  {
    title: "Rejoignez <span class='text-blue-400'>l'Élite</span>",
    subtitle: "Devenez un leader dans le domaine des TIC"
  }
]

const images = [bgImage1, bgImage2, bgImage3, bgImage4]

let intervalId = null

const nextImage = () => {
  isAnimating.value = true
  setTimeout(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
    isAnimating.value = false
  }, 600) // Half of the animation duration to ensure smooth transition
}

onMounted(() => {
  intervalId = setInterval(nextImage, 15000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  transition: background-image 0.6s ease-in-out;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.slide-in {
  animation: slide-in 1.2s ease-out forwards;
}

.slide-out {
  animation: slide-out 0.6s ease-in forwards;
}

.fade-in {
  animation: fade-in 1.2s ease-out forwards;
}

.fade-out {
  animation: fade-out 0.6s ease-in forwards;
}

/* Glass effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Custom scrollbar styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(16, 84, 167, 0.8) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(16, 84, 167, 0.8);
  border-radius: 20px;
  border: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(16, 84, 167, 1);
}
</style>
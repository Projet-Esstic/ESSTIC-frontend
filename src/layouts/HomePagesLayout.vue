<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Header/Navigation -->
    <nav class="bg-primary-light dark:bg-primary-dark text-white shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center">
            <img src="@/assets/images/esstic-logo.png" alt="ESSTIC Logo" class="h-12 w-auto mr-3">
            <span class="font-display font-bold text-xl">ESSTIC</span>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link 
              v-for="(item, index) in navItems" 
              :key="index"
              :to="item.path"
              class="text-white hover:text-gray-200 transition-colors duration-200 font-sans text-body"
              :class="{ 'router-link-active': $route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden text-white focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div 
          v-show="mobileMenuOpen" 
          class="md:hidden mt-4 pb-4"
        >
          <router-link 
            v-for="(item, index) in navItems" 
            :key="index"
            :to="item.path"
            class="block py-2 text-white hover:text-gray-200 transition-colors duration-200"
            :class="{ 'router-link-active': $route.path === item.path }"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-light dark:bg-surface-dark text-text-muted py-8">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <p>© {{ new Date().getFullYear() }} ESSTIC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref} from 'vue'
import { Theme } from '@/utils/Theme'
import { useRoute } from 'vue-router'

export default {
  name: 'HomePagesLayout',
  
  setup() {
    const route = useRoute()
    const mobileMenuOpen = ref(false)
    
    const navItems = [
      { name: 'Accueil', path: '/' },
      { name: 'Inscription', path: '/candidate-registration' }, 
      { name: 'Connexion', path: '/login' },
      { name: 'A propos', path: '/a-propos' },
      { name: 'Contact', path: '/contact' }
    ]

    return {
      mobileMenuOpen,
      navItems,
      Theme,
      route
    }
  }
}
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
  opacity: 0.9;
}

.router-link-exact-active {
  border-bottom: 2px solid white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

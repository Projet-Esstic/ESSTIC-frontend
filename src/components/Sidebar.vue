<template>
  <div class="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 overflow-y-auto">
    <!-- Logo/Header -->
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-2xl font-bold text-white">ESSTIC</h1>
      <p class="text-sm text-gray-400">Admin Dashboard</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="mt-4">
      <!-- Dashboard Section -->
      <div class="px-4 py-2">
        <router-link to="/" class="flex items-center py-2 px-4 rounded-lg transition-colors" :class="[$route.path === '/' ? 'bg-blue-600' : 'hover:bg-gray-700']">
          <span class="material-icons mr-3">dashboard</span>
          <span>Dashboard</span>
        </router-link>
      </div>

      <!-- Main Modules Section -->
      <div class="mt-4">
        <div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Modules</div>
        <div class="space-y-1 px-2">
          <router-link 
            to="/entrance-exam"
            class="flex items-center py-2 px-4 rounded-lg transition-colors text-sm"
            :class="[isEntranceExamRoute ? 'bg-blue-600' : 'hover:bg-gray-700']"
          >
            <span class="material-icons mr-3 text-lg">school</span>
            <span>Entrance Exam</span>
          </router-link>
        </div>
      </div>

      <!-- Theme Toggle -->
      <div class="px-4 py-2 mt-4">
        <button 
          @click="toggleTheme" 
          class="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 w-full transition-colors"
        >
          <span class="material-icons mr-3">{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
          <span>{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
      </div>
    </nav>
  </div>

  <!-- Overlay for mobile -->
  <div 
    v-if="isMobileMenuOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
    @click="isMobileMenuOpen = false"
  ></div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'Sidebar',
  setup() {
    const store = useStore();
    const route = useRoute();
    const isMobileMenuOpen = ref(false);

    const isDarkMode = computed(() => store.getters.isDarkMode);
    const isEntranceExamRoute = computed(() => route.path.startsWith('/entrance-exam'));

    const toggleTheme = () => {
      store.commit('toggleTheme');
    };

    return {
      isDarkMode,
      toggleTheme,
      isMobileMenuOpen,
      isEntranceExamRoute
    };
  }
};
</script>

<style scoped>
/* Add any specific styles here */
</style>

<template>
  <div>
    <!-- Toggle button for mobile -->
    <button 
      @click="toggleSidebar" 
      class="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-md"
    >
      <span class="material-icons">{{ collapsed ? 'menu_open' : 'menu' }}</span>
      <!-- Tooltip for mobile button -->
      <span v-if="collapsed" class="tooltip">Open Menu</span>
    </button>

    <!-- Toggle button for desktop -->
    <button 
      @click="toggleSidebar" 
      class="top-0 absolute z-40 hidden md:block bg-gray-800 text-white p-1 rounded-r-md transition-all"
      :class="collapsed ? 'left-0' : 'left-56'"
    >
      <span class="material-icons">{{ collapsed ? 'chevron_left' : 'chevron_right' }}</span>
      <!-- Tooltip for desktop button -->
      <span v-if="collapsed" class="tooltip">Toggle Sidebar</span>
    </button>

    <!-- Sidebar -->
    <div 
      class="h-screen bg-gray-800 text-white fixed left-0 top-0 transition-all duration-300 z-30"
      :class="[
        collapsed ? 'w-16' : 'w-64', 
        isMobileOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
      ]"
    >
      <!-- Logo/Header -->
      <div class="p-4 border-b border-gray-700 flex items-center">
        <h1 v-if="!collapsed" class="text-2xl font-bold text-white">ESSTIC</h1>
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-4">
        <div class="px-2 py-2">
          <router-link to="/" class="relative flex items-center py-2 px-2 rounded-lg transition-colors group"
            :class="[$route.path === '/' ? 'bg-blue-600' : 'hover:bg-gray-700']">
            <span class="material-icons">dashboard</span>
            <span v-if="!collapsed" class="ml-3">Dashboard</span>
            <!-- Tooltip for Dashboard -->
            <span v-if="collapsed" class="tooltip">Dashboard</span>
          </router-link>
        </div>

        <div class="mt-4">
          <div v-if="!collapsed" class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Modules</div>
          <div class="space-y-1 px-2">
            <router-link 
              v-for="route in menuItems"
              :key="route.path"
              :to="route.path"
              class="relative flex items-center py-2 px-2 rounded-lg transition-colors text-sm group"
              :class="[route.name === currentRoute.name ? 'bg-blue-600' : 'hover:bg-gray-700']"
            >
              <span class="material-icons text-lg">{{ route.meta.icon || 'school' }}</span>
              <span v-if="!collapsed" class="ml-3">{{ route.meta.title }}</span>
              <!-- Tooltip for modules -->
              <span v-if="collapsed" class="tooltip">{{ route.meta.title }}</span>
            </router-link>
          </div>
        </div>

        <div class="px-2 py-2 mt-4">
          <button 
            @click="toggleTheme" 
            class="relative flex items-center py-2 px-2 rounded-lg hover:bg-gray-700 w-full transition-colors group"
          >
            <span class="material-icons">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
            <span v-if="!collapsed" class="ml-3">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
            <!-- Tooltip for theme toggle -->
            <span v-if="collapsed" class="tooltip">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Overlay for mobile -->
    <div 
      v-if="isMobileOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
      @click="closeMobileSidebar"
    ></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const isMobileOpen = ref(false);

    const isDark = computed(() => store.getters.isDarkMode);
    const currentRoute = computed(() => route);

    const menuItems = [
      { path: '/entrance-exam', name: 'EntranceExam', meta: { title: 'Entrance Exam', icon: 'school' } }
    ];

    const toggleTheme = () => {
      store.commit('toggleTheme');
    };

    const toggleSidebar = () => {
      emit('toggle');
    };

    return {
      isDark,
      toggleTheme,
      toggleSidebar,
      isMobileOpen,
      menuItems,
      currentRoute
    };
  }
};
</script>

<style scoped>
/* Tooltip Styling */
.tooltip {
  position: absolute;
  left: 3.5rem; /* Positioned to the right of icons */
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none; /* Prevents unwanted interactions */
  z-index: 50;
}

/* Show tooltip on hover when collapsed */
.group:hover .tooltip {
  opacity: 1;
}
</style>

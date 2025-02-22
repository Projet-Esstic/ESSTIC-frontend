<template>
  <div :class="themeClasses.app">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="pl-64 w-full min-h-screen">
      <!-- Top Navigation Bar -->
      <nav :class="[themeClasses.nav, 'p-4 flex items-center justify-between shadow-md']">
        <div class="flex items-center">
          <button class="lg:hidden mr-4" @click="toggleMobileMenu">
            <span class="material-icons">menu</span>
          </button>
          <router-link 
            v-for="route in menuItems"
            :key="route.path"
            :to="route.path"
            :class="[
              'px-4 py-2 rounded transition-colors',
              route.name === currentRoute.name
                ? `bg-primary-${isDark ? 'dark' : 'light'} text-white`
                : 'text-gray-300 hover:text-white'
            ]"
          >
            {{ route.meta.title }}
          </router-link>
        </div>
      </nav>
      
      <!-- Main Content Area -->
      <main :class="['container mx-auto', `p-${getSpacing('layoutXl')}`]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    
    const isDark = computed(() => store.getters.isDarkMode);
    const themeClasses = computed(() => store.getters.getThemeClasses);
    const getTextStyle = (style) => store.getters.getTextStyle(style);
    const getSpacing = (size) => store.getters.getSpacing(size);
    const currentRoute = computed(() => route);
    
    const menuItems = [
      { path: '/', name: 'Home', meta: { title: 'Dashboard' } },
      { path: '/entrance-exam', name: 'EntranceExam', meta: { title: 'Examens' } },
      { path: '/candidate-registration', name: 'CandidateRegistration', meta: { title: 'Candidats' } }
    ];

    const toggleMobileMenu = () => {
      // You can implement mobile menu toggle logic here
    };
    
    return {
      isDark,
      themeClasses,
      getTextStyle,
      getSpacing,
      menuItems,
      currentRoute,
      toggleMobileMenu
    };
  }
};
</script>

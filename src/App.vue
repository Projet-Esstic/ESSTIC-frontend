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
          <h2 class="text-xl font-semibold text-white">{{ currentPageTitle }}</h2>
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
    
    const isDarkMode = computed(() => store.getters.isDarkMode);
    const themeClasses = computed(() => store.getters.getThemeClasses);
    const getTextStyle = (style) => store.getters.getTextStyle(style);
    const getSpacing = (size) => store.getters.getSpacing(size);
    
    const currentPageTitle = computed(() => {
      switch(route.name) {
        case 'Home':
          return 'Dashboard';
        case 'EntranceExam':
          return 'Course Management';
        case 'FieldsOfStudy':
          return 'Fields of Study';
        case 'CoefficientsMatrix':
          return 'Coefficients Matrix';
        default:
          return route.name || 'Dashboard';
      }
    });

    const toggleMobileMenu = () => {
      // You can implement mobile menu toggle logic here
    };
    
    return {
      isDarkMode,
      themeClasses,
      getTextStyle,
      getSpacing,
      currentPageTitle,
      toggleMobileMenu
    };
  }
};
</script>

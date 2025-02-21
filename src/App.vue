<template>
  <div :class="themeClasses.app">
    <nav :class="[themeClasses.nav, 'p-4 flex items-center justify-between']">
      <div class="flex gap-4">
        <router-link 
          to="/" 
          :class="[getTextStyle('bodyLarge'), 'text-white hover:opacity-80 transition-opacity']">
          Home
        </router-link>
        <router-link 
          to="/about" 
          :class="[getTextStyle('bodyLarge'), 'text-white hover:opacity-80 transition-opacity']">
          About
        </router-link>
      </div>
      
      <button 
        @click="toggleTheme" 
        :class="[themeClasses.button.secondary, 'p-2 rounded-lg flex items-center gap-2']">
        <span>{{ isDarkMode ? '🌞' : '🌙' }}</span>
        <span>{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
      </button>
    </nav>
    
    <main :class="['container mx-auto', `p-${getSpacing('layoutXl')}`]">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    
    const isDarkMode = computed(() => store.getters.isDarkMode)
    const themeClasses = computed(() => store.getters.getThemeClasses)
    const getTextStyle = (style) => store.getters.getTextStyle(style)
    const getSpacing = (size) => store.getters.getSpacing(size)
    
    const toggleTheme = () => {
      store.commit('toggleTheme')
    }
    
    return {
      isDarkMode,
      themeClasses,
      getTextStyle,
      getSpacing,
      toggleTheme
    }
  }
}
</script>

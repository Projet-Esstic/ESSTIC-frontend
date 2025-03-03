<template>
  <div :class="themeClasses.app">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
    <div :class="['transition-all duration-300', isSidebarCollapsed ? 'pl-16' : 'pl-64', 'w-full min-h-screen']">
      <main class="container w-full mx-auto py-1 px-1">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import { useStore } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()
    const isSidebarCollapsed = ref(false) // Track sidebar state

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    return {
      themeClasses: computed(() => store.state.themeClasses),
      isSidebarCollapsed,
      toggleSidebar
    }
  }
}
</script>

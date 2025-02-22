<template>
  <div :class="themeClasses.app">
    <Sidebar />
    <div class="pl-64 w-full min-h-screen">
      <main class="container mx-auto py-6 px-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()
    return {
      themeClasses: computed(() => store.state.themeClasses)
    }
  }
}
</script>

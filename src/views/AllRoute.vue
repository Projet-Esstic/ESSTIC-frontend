<template>
  <div :class="Theme.getThemeClasses().app">
    <div class="container mx-auto p-6">
      <h1 :class="Theme.applyTextStyle('heading1')" class="mb-8">Navigation</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link 
          v-for="route in routes" 
          :key="route.path"
          :to="route.path"
          custom
        >
          <template v-slot="{ navigate }">
            <button 
              :class="[Theme.getThemeClasses().button.primary, 'w-full p-4 rounded-lg transition-all duration-200']"
              @click="navigate"
            >
              <span :class="Theme.applyTextStyle('heading4')">
                {{ route.name }}
              </span>
              <p v-if="route.meta?.title" :class="Theme.applyTextStyle('bodySmall')" class="mt-2">
                {{ route.meta.title }}
              </p>
            </button>
          </template>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Theme } from '@/utils/Theme'
import router from '@/router'

export default {
  name: 'AllRoutes',
  data() {
    return {
      Theme,
      routes: router.getRoutes().filter(route => route.name)
    }
  }
}
</script>

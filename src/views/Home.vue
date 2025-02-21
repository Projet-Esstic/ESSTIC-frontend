<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-primary-light dark:text-primary-dark mb-8">
      Welcome to ESSTIC
    </h1>
    <div class="max-w-2xl mx-auto">
      <p class="text-lg text-text-light dark:text-text-dark mb-8">
        This is a Vue.js application with dynamic theme switching between light and dark modes.
      </p>
      <div class="space-y-4">
        <button class="px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-80 transition-opacity">
          Sample Button
        </button>
        
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">
              Light Theme
            </h3>
            <p class="text-text-light dark:text-text-dark">
              Clean and professional look with blue and white colors
            </p>
          </div>
          
          <div class="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">
              Dark Theme
            </h3>
            <p class="text-text-light dark:text-text-dark">
              Easy on the eyes with dark mode support
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

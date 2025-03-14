<template>
    <div class="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 class="text-3xl font-bold mb-6">Settings Management</h1>
  
      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              currentTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]">
            {{ tab.name }}
          </button>
        </nav>
      </div>
  
      <!-- Tab Panels -->
      <div class="mt-6">
        <PermissionManagement v-if="currentTab === 'permissions'" />
        <RoleManagement v-if="currentTab === 'roles'" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import PermissionManagement from './PermissionManagement.vue'
  import RoleManagement from './RoleManagement.vue'
  
  export default {
    name: 'SettingsManagement',
  
    components: {
      PermissionManagement,
      RoleManagement
    },
  
    setup() {
      const currentTab = ref('permissions')
  
      const tabs = [
        { id: 'permissions', name: 'Permissions' },
        { id: 'roles', name: 'Roles' }
      ]
  
      return {
        currentTab,
        tabs
      }
    }
  }
  </script>
  
<template>
  <div>
    <!-- Toggle button for mobile -->
    <button @click="toggleSidebar" class="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-md">
      <span class="material-icons">{{ collapsed ? 'menu_open' : 'menu' }}</span>
      <span v-if="collapsed" class="tooltip">Open Menu</span>
    </button>

    <!-- Toggle button for desktop -->
    <button @click="toggleSidebar"
      class="top-0 fixed z-40 hidden md:block bg-blue-600 text-white p-1 rounded-r-md transition-all"
      :class="collapsed ? 'left-16' : 'left-64'">
      <span class="material-icons">{{ collapsed ? 'chevron_left' : 'chevron_right' }}</span>
      <span v-if="collapsed" class="tooltip">Toggle Sidebar</span>
    </button>

    <!-- Sidebar -->
    <div class="h-screen bg-gray-800 text-white fixed left-0 top-0 transition-all duration-300 z-30" :class="[
      collapsed ? 'w-16' : 'w-64',
      isMobileOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
    ]">
      <!-- Logo/Header -->
      <div class="p-1 border-b border-gray-700 flex items-center bg-white">
        <img src="@/assets/images/logo.png" alt="" width="100%">
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-4">
        <div class="px-2 py-2">
          <router-link to="/dashboard" class="relative flex items-center py-2 px-2 rounded-lg transition-colors group"
            :class="[$route.path === '/dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700']">
            <span class="material-icons">dashboard</span>
            <span v-if="!collapsed" class="ml-3">Dashboard</span>
            <span v-if="collapsed" class="tooltip">Dashboard</span>
          </router-link>
        </div>

        <div class="mt-4">
          <div v-if="!collapsed" class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Modules</div>
          <div class="space-y-1 px-2">
            <!-- Loading Spinner when permissions are not yet fetched -->
            <template v-if="loading">
              <div class="flex justify-center items-center py-2">
                <span class="material-icons animate-spin">refresh</span>
                <span class="ml-2 text-gray-400">Loading permissions...</span>
              </div>
            </template>

            <!-- Menu Items -->
            <template v-else>
              <router-link v-for="route in menuItems" :key="route.path" :to="route.path"
                class="relative flex items-center py-2 px-2 rounded-lg transition-colors text-sm group"
                :class="[route.name === currentRoute.name ? 'bg-blue-600' : 'hover:bg-gray-700']">
                <span class="material-icons text-lg">{{ route.meta.icon }}</span>
                <span v-if="!collapsed" class="ml-3">{{ route.meta.title }}</span>
                <span v-if="collapsed" class="tooltip">{{ route.meta.title }}</span>
              </router-link>
            </template>
          </div>
        </div>

        <div class="px-2 py-2 mt-4">
          <button @click="logOut"
            class="relative flex items-center py-2 px-2 rounded-lg hover:bg-gray-700 w-full transition-colors group">
            <span class="material-icons">logout</span>
            <span v-if="!collapsed" class="ml-3">Log out</span>
            <span v-if="collapsed" class="tooltip">Log out</span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Overlay for mobile -->
    <div v-if="isMobileOpen" class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20" @click="closeMobileSidebar"></div>
  </div>
</template>

<script>
import { authService } from '@/api/services/index';
import axios from '../api/client.js';
import { ENDPOINTS } from '../api/config.js';

export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      userPermission: [],  // For storing user permissions
      menuItems: [],       // For storing filtered menu items based on permissions
      isMobileOpen: false, // For controlling the mobile sidebar
      allMenuItems: [
        { path: '/entrance-exam', name: 'ExamenEntree', meta: { title: 'Examen d\'Entrée', icon: 'assignment' } },
        { path: '/student-management', name: 'GestionEtudiants', meta: { title: 'Gestion des Étudiants', icon: 'people' } },
        { path: '/personnel', name: 'GestionPersonnel', meta: { title: 'Gestion du Personnel', icon: 'people' } },
        { path: '/settings-management', name: 'GestionParametres', meta: { title: 'Paramètres', icon: 'settings' } }
      ],
      loading: true,       // Loading state to show when permissions are being fetched
    };
  },
  computed: {
    currentRoute() {
      return this.$route;
    }
  },
  created() {
    this.fetchPermissions();
  },
  methods: {
    async fetchPermissions() {
      try {
        const user = await authService.getUserRole();
        console.log(user);
        const response = await axios(ENDPOINTS.ROLES_PERMISSION);
        const data = response.data;
        console.log("response.data", response.data);

        if (data && data.permissions) {
          this.userPermission = data.permissions;

          // Filter the menu items based on the user's permissions
          this.menuItems = this.allMenuItems.filter(item =>
            this.userPermission?.read?.includes(item.name)
          );
        }
      } catch (error) {
        console.error('Failed to fetch user roles:', error);
      } finally {
        this.loading = false; // Set loading to false once data is fetched
      }
    },
    toggleSidebar() {
      this.$emit('toggle');
      if (this.isMobileOpen) this.isMobileOpen = false;
    },
    closeMobileSidebar() {
      this.isMobileOpen = false;
    },
    async logOut() {
      await authService.logout();
      this.$router.push('/login');
    }
  }
};
</script>

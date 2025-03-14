<template>
    <header class="fixed top-0 left-0 w-full bg-gray-50 dark:bg-gray-900 z-10 shadow-md">
      <div :class="['flex flex-col md:flex-row justify-between items-center px-4 py-4', isSidebarCollapsed ? 'ml-16' : 'ml-64']">
        <div class="mb-4 md:mb-0">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">ESSTIC  Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-2 text-sm">Comprehensive Institute Performance Insights</p>
        </div>
  
        <!-- Right Side: Search, Notifications, Messages, Theme Toggle, Profile -->
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <!-- Advanced Search -->
          <div class="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search analytics..." 
              v-model="localSearchQuery"
              class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              aria-label="Search analytics"
              @input="$emit('update:searchQuery', localSearchQuery)"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
  
          <!-- Notification Bell -->
          <div class="relative">
            <button ESSTIC Analytics
              @click="toggleNotifications" 
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a3 3 0 00-6 0v.083A6 6 0 002 11v3.159c0 .538-.214 1.055-.595 1.436L0 17h5m10 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
              <span v-if="unreadNotifications > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{{ unreadNotifications }}</span>
            </button>
            <!-- Notification Dropdown -->
            <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div class="p-4">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h4>
                <div v-if="notifications.length === 0" class="text-gray-500 dark:text-gray-400 text-sm mt-2">No new notifications</div>
                <div v-else class="space-y-2 mt-2 max-h-60 overflow-y-auto">
                  <div 
                    v-for="(notification, index) in notifications" 
                    :key="index" 
                    :class="['p-2 rounded-lg', { 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500': !notification.read, 'hover:bg-gray-200 dark:hover:bg-gray-600': true }]"
                  >
                    <p class="text-sm text-gray-900 dark:text-white">{{ notification.message }}</p>
                    <div class="flex justify-between items-center">
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</p>
                      <span 
                        v-if="!notification.read"
                        @click.stop="markAsRead(index)" 
                        class="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                      >
                        Mark as Read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Messages Icon -->
          <div class="relative">
            <button 
              @click="toggleMessages" 
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <span v-if="unreadMessages > 0" class="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{{ unreadMessages }}</span>
            </button>
            <!-- Messages Dropdown -->
            <div v-if="showMessages" class="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div class="p-4">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Messages</h4>
                <div v-if="messages.length === 0" class="text-gray-500 dark:text-gray-400 text-sm mt-2">No new messages</div>
                <div v-else class="space-y-4 mt-2 max-h-60 overflow-y-auto">
                  <div 
                    v-for="(message, index) in messages" 
                    :key="index" 
                    class="p-2 rounded-lg"
                  >
                    <div :class="['cursor-pointer', { 'bg-gray-100 dark:bg-gray-700 p-2 border-l-4 border-blue-500': !message.read, 'hover:bg-gray-200 dark:hover:bg-gray-600 p-2 border-l-4': true }]">
                      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.sender }}</p>
                      <p class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ message.content }}</p>
                      <div class="flex justify-between items-center">
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ message.time }}</p>
                        <span 
                          @click.stop="toggleReply(index)" 
                          class="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        >
                          Reply
                        </span>
                      </div>
                    </div>
                    <!-- Reply Section -->
                    <div v-if="message.showReply" class="mt-2">
                      <textarea 
                        v-model="message.replyText" 
                        placeholder="Type your reply..." 
                        class="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      ></textarea>
                      <button 
                        @click="sendReply(index)" 
                        class="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                        :disabled="!message.replyText"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Dark Mode Toggle -->
          <div class="relative">
            <button 
              @click="toggleTheme" 
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
  
          <!-- Profile Dropdown -->
          <div class="relative">
            <button @click="toggleProfileDropdown" class="flex items-center space-x-2">
              <img :src="userProfileImage" alt="User Profile" class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" />
            </button>
            <div v-if="showProfileDropdown" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div class="p-4">
                <div class="flex items-center space-x-2 mb-4">
                  <img :src="userProfileImage" alt="User Profile" class="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ userName }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
                  </div>
                </div>
                <hr class="my-2 border-gray-200 dark:border-gray-700" />
                <button @click="viewProfile" class="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>View Profile</span>
                </button>
                <button @click="openSettings" class="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </button>
                <button @click="logout" class="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'AppHeader',
    props: {
      searchQuery: {
        type: String,
        default: ''
      },
      notifications: {
        type: Array,
        required: true
      },
      messages: {
        type: Array,
        required: true
      },
      userProfileImage: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      userEmail: {
        type: String,
        required: true
      },
      isSidebarCollapsed: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const store = useStore()
      const isDark = computed(() => store.getters.isDarkMode)
  
      const toggleTheme = () => {
        store.commit('toggleTheme')
        // Removed emit('toggle-theme') as it's redundant with Vuex handling
      }
  
      return {
        isDark,
        toggleTheme
      }
    },
    data() {
      return {
        localSearchQuery: this.searchQuery,
        showNotifications: false,
        showMessages: false,
        showProfileDropdown: false
      }
    },
    computed: {
      unreadNotifications() {
        return this.notifications.filter(n => !n.read).length
      },
      unreadMessages() {
        return this.messages.filter(m => !m.read).length
      }
    },
    methods: {
      toggleNotifications() {
        this.showNotifications = !this.showNotifications
        this.showMessages = false
        this.showProfileDropdown = false
        this.$emit('toggle-notifications', this.showNotifications)
      },
      markAsRead(index) {
        this.$emit('mark-as-read', index)
      },
      toggleMessages() {
        this.showMessages = !this.showMessages
        this.showNotifications = false
        this.showProfileDropdown = false
        this.$emit('toggle-messages', this.showMessages)
      },
      toggleReply(index) {
        this.$emit('toggle-reply', index)
      },
      sendReply(index) {
        this.$emit('send-reply', index)
      },
      toggleProfileDropdown() {
        this.showProfileDropdown = !this.showProfileDropdown
        this.showNotifications = false
        this.showMessages = false
        this.$emit('toggle-profile-dropdown', this.showProfileDropdown)
      },
      viewProfile() {
        this.$emit('view-profile')
      },
      openSettings() {
        this.$emit('open-settings')
      },
      logout() {
        this.$emit('logout')
      }
    }
  }
  </script>
  
  <style scoped>
  header {
    height: 6rem; /* Adjust this value based on your header's content */
  }
  </style>
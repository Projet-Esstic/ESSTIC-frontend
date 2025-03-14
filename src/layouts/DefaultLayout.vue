<template>
  <div :class="themeClasses.app">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
    <div :class="['transition-all duration-300', isSidebarCollapsed ? 'pl-16' : 'pl-64', 'w-full min-h-screen flex flex-col']">
      <!-- Header -->
      <AppHeader
        :search-query="searchQuery"
        :notifications="notifications"
        :messages="messages"
        :user-profile-image="userProfileImage"
        :user-name="userName"
        :user-email="userEmail"
        :is-sidebar-collapsed="isSidebarCollapsed"
        @update:searchQuery="searchQuery = $event"
        @toggle-notifications="showNotifications = $event"
        @mark-as-read="markAsRead"
        @toggle-messages="showMessages = $event"
        @toggle-reply="toggleReply"
        @send-reply="sendReply"
        @toggle-profile-dropdown="showProfileDropdown = $event"
        @view-profile="viewProfile"
        @open-settings="openSettings"
        @logout="logout"
      />
      <!-- Main Content -->
      <main class="container w-full mx-auto py-1 px-1 flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import AppHeader from '../components/AppHeader.vue'
import { useStore } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    AppHeader
  },
  setup() {
    const store = useStore()
    const isSidebarCollapsed = ref(false)

    // Header-related state
    const searchQuery = ref('')
    const showNotifications = ref(false)
    const showMessages = ref(false)
    const showProfileDropdown = ref(false)
    const notifications = ref([
      { message: 'New faculty member added', time: '1h ago', read: true },
      { message: 'System update completed', time: '3h ago', read: false },
      { message: 'Research grant approved', time: '1d ago', read: true },
      { message: 'Research completed', time: '2d ago', read: false }
    ])
    const messages = ref([
      { sender: 'Dr. Smith', content: 'Please review the project proposal.', time: '2h ago', read: false, showReply: false, replyText: '' },
      { sender: 'Dr. Giggs', content: 'Please review that github project file.', time: '3h ago', read: false, showReply: false, replyText: '' },
      { sender: 'Jane Doe', content: 'Meeting scheduled for tomorrow.', time: '5h ago', read: false, showReply: false, replyText: '' },
      { sender: 'Admin', content: 'System maintenance planned.', time: '1d ago', read: true, showReply: false, replyText: '' }
    ])
    const userProfileImage = ref('https://randomuser.me/api/portraits/men/31.jpg')
    const userName = ref('Rean Giggs')
    const userEmail = ref('somorean@example.com')

    // Methods for sidebar
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    // Methods for header
    const markAsRead = (index) => {
      notifications.value[index].read = true
    }

    const toggleReply = (index) => {
      messages.value[index].showReply = !messages.value[index].showReply
      if (!messages.value[index].read) {
        messages.value[index].read = true
      }
    }

    const sendReply = (index) => {
      const replyText = messages.value[index].replyText.trim()
      if (replyText) {
        console.log(`Replying to ${messages.value[index].sender}: ${replyText}`)
        messages.value[index].replyText = '' // Clear the input
        messages.value[index].showReply = false // Hide the reply box
      }
    }

    const viewProfile = () => {
      console.log('Navigating to profile page')
      // Add navigation logic here (e.g., this.$router.push('/profile'))
    }

    const openSettings = () => {
      console.log('Opening settings')
      // Add settings logic here
    }

    const logout = () => {
      console.log('User logged out')
      // Add logout logic here (e.g., redirect to login page)
    }

    return {
      themeClasses: computed(() => store.state.themeClasses),
      isSidebarCollapsed,
      toggleSidebar,
      searchQuery,
      notifications,
      messages,
      userProfileImage,
      userName,
      userEmail,
      showNotifications,
      showMessages,
      showProfileDropdown,
      markAsRead,
      toggleReply,
      sendReply,
      viewProfile,
      openSettings,
      logout
    }
  }
}
</script>

<style scoped>
main {
  padding-top: 6rem; /* Adjust based on header height */
}
</style>
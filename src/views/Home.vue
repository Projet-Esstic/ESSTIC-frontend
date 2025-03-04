<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen antialiased">
    <div class="container mx-auto px-4 py-8 max-w-7xl relative">
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-center mb-10">
        <div class="mb-4 md:mb-0">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">ESSTIC Analytics</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-2 text-lg">Comprehensive Institute Performance Insights</p>
        </div>

        <!-- Right Side: Search, Notifications, Profile -->
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <!-- Advanced Search -->
          <div class="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search analytics..." 
              v-model="searchQuery"
              class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              aria-label="Search analytics"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Notification Bell -->
          <div class="relative">
            <button 
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

          <!-- Profile Dropdown -->
          <div class="relative">
            <button @click="toggleProfileDropdown" class="flex items-center space-x-2">
              <img :src="userProfileImage" alt="User Profile" class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700">
            </button>
            <div v-if="showProfileDropdown" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div class="p-4">
                <div class="flex items-center space-x-2 mb-4">
                  <img :src="userProfileImage" alt="User Profile" class="w-12 h-12 rounded-full object-cover">
                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ userName }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
                  </div>
                </div>
                <hr class="my-2 border-gray-200 dark:border-gray-700">
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
      </header>

      <!-- Key Performance Indicators -->
      <section id="kpi" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div v-for="(stat, index) in keyStatistics" :key="index" 
             class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{{ stat.label }}</h3>
                <p class="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">{{ stat.value }}</p>
              </div>
              <div :class="stat.iconBg" class="p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" :class="stat.iconClasses" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="stat.label === 'Total Students'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.49-.637-2.1M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.231-1.49.637-2.1M14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path v-else-if="stat.label === 'Faculty Members'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path v-else-if="stat.label === 'Research Projects'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5M9 21l3-3 3 3" />
                </svg>
              </div>
            </div>
            <div class="flex items-center">
              <span :class="stat.trend > 0 ? 'text-green-500' : 'text-red-500'" class="mr-2 font-semibold">
                {{ stat.trend > 0 ? '▲' : '▼' }} {{ Math.abs(stat.trend) }}%
              </span>
              <span class="text-gray-500 text-sm">vs previous period</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Grid (unchanged below this point) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Charts -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Enrollment Chart -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Student Enrollment Trends</h3>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-full p-1 flex space-x-2">
                <button 
                  @click="enrollmentPeriod = 'annual'" 
                  :class="{'bg-white dark:bg-gray-600': enrollmentPeriod === 'annual'}"
                  class="px-4 py-2 text-sm rounded-full hover:bg-white dark:hover:bg-gray-600 transition-colors"
                >
                  Annual
                </button>
                <button 
                  @click="enrollmentPeriod = 'monthly'" 
                  :class="{'bg-blue-500 text-white': enrollmentPeriod === 'monthly'}"
                  class="px-4 py-2 text-sm rounded-full"
                >
                  Monthly
                </button>
              </div>
            </div>
            <div class="h-96">
              <canvas ref="enrollmentChart"></canvas>
            </div>
          </div>

          <!-- Department Chart -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Department Distribution</h3>
            <div class="h-96">
              <canvas ref="departmentChart"></canvas>
            </div>
          </div>

          <!-- Student Performance Overview -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Student Performance Overview</h3>
            <div class="h-96">
              <canvas ref="performanceChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Right Column: Students and Additional Info -->
        <div class="space-y-8">
          <!-- Top Students with Filter and Count -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-1xl font-bold text-gray-900 dark:text-white">Top Students ({{ filteredStudents.length }})</h3>
              <select 
                v-model="selectedDepartment" 
                class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg p-2 text-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div class="space-y-4">
              <div v-for="(student, index) in visibleStudents" :key="index" 
                   class="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <img :src="student.profileImage" :alt="student.name" 
                     class="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ student.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ student.class }} | GPA: {{ student.gpa }}</p>
                </div>
              </div>
            </div>
            <div v-if="!selectedDepartment" class="flex justify-between mt-4">
              <button 
                @click="showPreviousStudents" 
                :disabled="studentPage === 0"
                class="p-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                title="Show Less"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button 
                @click="showNextStudents" 
                :disabled="studentPage >= studentMaxPage"
                class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                title="Show More"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h3>
            <div class="space-y-4">
              <div v-for="(event, index) in upcomingEvents" :key="index" 
                   class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ event.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  <span class="font-medium">{{ event.date }}</span> | {{ event.location }}
                </p>
              </div>
            </div>
          </div>

          <!-- Recent Activity with Icon Buttons for Cycling -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
            <div class="space-y-4">
              <div v-for="(activity, index) in visibleActivities" :key="index" 
                   class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">{{ activity.title }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ activity.description }}</p>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-4">
              <button 
                @click="showPreviousActivities" 
                :disabled="currentPage === 0"
                class="p-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                title="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button 
                @click="showNextActivities" 
                :disabled="currentPage >= maxPage"
                class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                title="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'ESSTICDashboard',
  data() {
    return {
      searchQuery: '',
      enrollmentPeriod: 'monthly',
      selectedDepartment: '',
      currentPage: 0,
      studentPage: 0,
      pageSize: 3,
      studentPageSize: 4,
      showNotifications: false,
      showMessages: false,
      showProfileDropdown: false,
      notifications: [
        { message: 'New faculty member added', time: '1h ago', read: true },
        { message: 'System update completed', time: '3h ago', read: false },
        { message: 'Research grant approved', time: '1d ago', read: true },
        { message: 'Research completed by all approved men and women who worked hard in the github project', time: '2d ago', read: false }
      ],
      messages: [
        { sender: 'Dr. Smith', content: 'Please review the project proposal.', time: '2h ago', read: false, showReply: false, replyText: '' },
        { sender: 'Dr. Giggs', content: 'Please review that github project file.', time: '3h ago', read: false, showReply: false, replyText: '' },
        { sender: 'Jane Doe', content: 'Meeting scheduled for tomorrow.', time: '5h ago', read: false, showReply: false, replyText: '' },
        { sender: 'Admin', content: 'System maintenance planned.', time: '1d ago', read: true, showReply: false, replyText: '' }
      ],
      userProfileImage: 'https://randomuser.me/api/portraits/men/99.jpg',
      userName: 'Rean Giggs',
      userEmail: 'somorean@example.com',
      keyStatistics: [
        { label: 'Total Students', value: '1,245', trend: 12, iconBg: 'bg-blue-500', iconClasses: 'h-8 w-8 text-white' },
        { label: 'Faculty Members', value: '86', trend: 3, iconBg: 'bg-green-500', iconClasses: 'h-8 w-8 text-white' },
        { label: 'Research Projects', value: '24', trend: 8, iconBg: 'bg-purple-500', iconClasses: 'h-8 w-8 text-white' },
        { label: 'Departments', value: '7', trend: 0, iconBg: 'bg-red-500', iconClasses: 'h-8 w-8 text-white' }
      ],
      topStudents: [
        { name: 'John Doe', class: 'Computer Science', gpa: '3.9', profileImage: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Emily Carter', class: 'Computer Science', gpa: '3.6', profileImage: 'https://randomuser.me/api/portraits/women/22.jpg' },
        { name: 'Alex Brown', class: 'Computer Science', gpa: '3.8', profileImage: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { name: 'Jane Smith', class: 'Engineering', gpa: '3.8', profileImage: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Sarah Wilson', class: 'Engineering', gpa: '3.7', profileImage: 'https://randomuser.me/api/portraits/women/65.jpg' },
        { name: 'Tom Lee', class: 'Engineering', gpa: '3.5', profileImage: 'https://randomuser.me/api/portraits/men/88.jpg' },
        { name: 'Mike Johnson', class: 'Business', gpa: '3.7', profileImage: 'https://randomuser.me/api/portraits/men/75.jpg' },
        { name: 'Lisa Anderson', class: 'Business', gpa: '3.9', profileImage: 'https://randomuser.me/api/portraits/women/33.jpg' },
        { name: 'Robert Chen', class: 'Business', gpa: '3.6', profileImage: 'https://randomuser.me/api/portraits/men/12.jpg' }
      ],
      upcomingEvents: [
        { title: 'Annual Research Symposium', date: 'June 15, 2024', location: 'Main Conference Hall' },
        { title: 'Student Leadership Workshop', date: 'July 10, 2024', location: 'Campus Auditorium' },
        { title: 'Industry Networking Day', date: 'August 5, 2024', location: 'Innovation Center' }
      ],
      recentActivities: [
        { title: 'New Faculty Hired', description: 'Dr. Emily Carter joined Computer Science dept.', time: '2h ago' },
        { title: 'Research Grant Approved', description: 'Funding secured for AI project.', time: '5h ago' },
        { title: 'Student Workshop', description: 'Resume building session completed.', time: '1d ago' },
        { title: 'System Update', description: 'Analytics dashboard updated.', time: '2d ago' },
        { title: 'New Course Added', description: 'AI Ethics course introduced.', time: '3d ago' },
        { title: 'Campus Event', description: 'Career fair held in main hall.', time: '4d ago' }
      ],
      enrollmentChart: null,
      departmentChart: null,
      performanceChart: null
    }
  },
  computed: {
    filteredStudents() {
      if (!this.selectedDepartment) return this.topStudents
      return this.topStudents.filter(student => student.class === this.selectedDepartment)
    },
    visibleStudents() {
      if (this.selectedDepartment) return this.filteredStudents
      const start = this.studentPage * this.studentPageSize
      const end = start + this.studentPageSize
      return this.topStudents.slice(start, end)
    },
    visibleActivities() {
      const start = this.currentPage * this.pageSize
      const end = start + this.pageSize
      return this.recentActivities.slice(start, end)
    },
    maxPage() {
      return Math.ceil(this.recentActivities.length / this.pageSize) - 1
    },
    studentMaxPage() {
      return Math.ceil(this.topStudents.length / this.studentPageSize) - 1
    },
    unreadNotifications() {
      return this.notifications.filter(n => !n.read).length
    },
    unreadMessages() {
      return this.messages.filter(m => !m.read).length
    }
  },
  mounted() {
    this.initCharts()
  },
  beforeUnmount() {
    this.destroyCharts()
  },
  methods: {
    destroyCharts() {
      if (this.enrollmentChart) {
        this.enrollmentChart.destroy()
        this.enrollmentChart = null
      }
      if (this.departmentChart) {
        this.departmentChart.destroy()
        this.departmentChart = null
      }
      if (this.performanceChart) {
        this.performanceChart.destroy()
        this.performanceChart = null
      }
    },
    initCharts() {
      this.destroyCharts()

      const enrollmentCtx = this.$refs.enrollmentChart.getContext('2d')
      this.enrollmentChart = new Chart(enrollmentCtx, {
        type: 'line',
        data: {
          labels: this.enrollmentPeriod === 'monthly' 
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] 
            : ['2020', '2021', '2022', '2023', '2024'],
          datasets: [{
            label: 'Student Enrollment',
            data: this.enrollmentPeriod === 'monthly' 
              ? [1000, 1100, 1200, 1250, 1300, 1350] 
              : [800, 950, 1100, 1250, 1450],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.05)' } }
          }
        }
      })

      const departmentCtx = this.$refs.departmentChart.getContext('2d')
      this.departmentChart = new Chart(departmentCtx, {
        type: 'pie',
        data: {
          labels: ['Computer Science', 'Engineering', 'Business', 'Social Sciences', 'Natural Sciences'],
          datasets: [{
            data: [25, 20, 18, 22, 15],
            backgroundColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(99, 102, 241)',
              'rgb(236, 72, 153)'
            ]
          }]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      })

      const performanceCtx = this.$refs.performanceChart.getContext('2d')
      this.performanceChart = new Chart(performanceCtx, {
        type: 'bar',
        data: {
          labels: ['Computer Science', 'Engineering', 'Business', 'Social Sciences', 'Natural Sciences'],
          datasets: [{
            label: 'Average GPA',
            data: [3.75, 3.65, 3.60, 3.55, 3.70],
            backgroundColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(99, 102, 241)',
              'rgb(236, 72, 153)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(99, 102, 241)',
              'rgb(236, 72, 153)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 4.0,
              ticks: { stepSize: 0.5 },
              grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: { grid: { display: false } }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `Avg GPA: ${context.parsed.y}`
              }
            }
          }
        }
      })
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
      this.showMessages = false
      this.showProfileDropdown = false
    },
    markAsRead(index) {
      this.notifications[index].read = true
    },
    toggleMessages() {
      this.showMessages = !this.showMessages
      this.showNotifications = false
      this.showProfileDropdown = false
    },
    toggleReply(index) {
      this.messages[index].showReply = !this.messages[index].showReply
      if (!this.messages[index].read) {
        this.messages[index].read = true
      }
    },
    sendReply(index) {
      const replyText = this.messages[index].replyText.trim()
      if (replyText) {
        console.log(`Replying to ${this.messages[index].sender}: ${replyText}`)
        // Here you would typically send the reply to a backend API
        this.messages[index].replyText = '' // Clear the input
        this.messages[index].showReply = false // Hide the reply box
        // Optionally, add the reply to a conversation history or update UI
      }
    },
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown
      this.showNotifications = false
      this.showMessages = false
    },
    viewProfile() {
      console.log('Navigating to profile page')
      // Add navigation logic here (e.g., this.$router.push('/profile'))
    },
    openSettings() {
      console.log('Opening settings')
      // Add settings logic here
    },
    logout() {
      console.log('User logged out')
      // Add your logout logic here (e.g., redirect to login page)
    },
    showNextActivities() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++
      }
    },
    showPreviousActivities() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
    showNextStudents() {
      if (this.studentPage < this.studentMaxPage) {
        this.studentPage++
      }
    },
    showPreviousStudents() {
      if (this.studentPage > 0) {
        this.studentPage--
      }
    }
  },
  watch: {
    enrollmentPeriod() {
      this.initCharts()
    }
  }
}
</script>
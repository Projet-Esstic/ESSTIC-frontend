<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen antialiased">
    <div class="container mx-auto px-4 py-8 max-w-7xl relative">
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

      <!-- Main Content Grid -->
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
      enrollmentPeriod: 'monthly',
      selectedDepartment: '',
      currentPage: 0,
      studentPage: 0,
      pageSize: 3,
      studentPageSize: 4,
      keyStatistics: [
        { label: 'Total Students', value: '1,245', trend: 12, iconBg: 'bg-blue-500', iconClasses: 'h-8 w-8 text-white' },
        { label: 'Faculty Members', value: '86', trend: 50, iconBg: 'bg-green-500', iconClasses: 'h-8 w-8 text-white' },
        { label: 'Research Projects', value: '24', trend: 8, iconBg: 'bg-purple-500', iconClasses: 'h-8 w-8 text-white' },
        { label: 'Departments', value: '7', trend: 25, iconBg: 'bg-red-500', iconClasses: 'h-8 w-8 text-white' }
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
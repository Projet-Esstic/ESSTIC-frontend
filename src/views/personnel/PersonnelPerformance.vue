
<template>
  <div class="text-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl text-left font-bold text-black dark:text-white mb-8">
      ESSTIC Personnel Performance Tracker
    </h1>

    <!-- Filters -->
    <div class="max-w-5xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="department-select" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Department:
          </label>
          <select
            id="department-select"
            v-model="selectedDepartment"
            @change="updateFilteredPersonnel"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
          </select>
        </div>
        <div>
          <label for="status-select" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Employment Status:
          </label>
          <select
            id="status-select"
            v-model="selectedStatus"
            @change="updateFilteredPersonnel"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option v-for="status in employmentStatuses" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>
        <div>
          <label for="personnel-search" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Search by Name:
          </label>
          <input
            id="personnel-search"
            v-model="searchName"
            @input="updateFilteredPersonnel"
            type="text"
            placeholder="Enter personnel name"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>

    <!-- Personnel Records -->
    <div class="max-w-5xl mx-auto mb-6">
      <div v-if="filteredPersonnel.length === 0" class="text-gray-500 dark:text-gray-400">
        No personnel match the selected filters.
      </div>
      <div v-else>
        <div v-for="person in filteredPersonnel" :key="person.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <!-- Personnel Info Header -->
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-xl font-semibold">{{ person.user.firstName }} {{ person.user.lastName }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ person.department }}</p>
            </div>
            <div class="text-right">
              <span :class="getStatusBadgeClass(person.employmentStatus)" class="px-3 py-1 rounded-full text-sm">
                {{ person.employmentStatus }}
              </span>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <!-- Average Performance Rating -->
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Average Rating</h4>
              <div class="flex items-center">
                <span class="text-2xl font-bold mr-2">{{ calculateAverageRating(person) }}</span>
                <div class="flex text-yellow-400">
                  <i v-for="n in 5" :key="n" class="fas fa-star" :class="{'text-gray-300': n > Math.round(calculateAverageRating(person))}"></i>
                </div>
              </div>
            </div>

            <!-- Attendance Rate -->
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Attendance Rate</h4>
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold">{{ calculateAttendanceRate(person) }}%</span>
                  </div>
                </div>
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
                  <div
                    :style="{ width: calculateAttendanceRate(person) + '%' }"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Training Completion -->
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Training Programs</h4>
              <p class="text-2xl font-bold">{{ person.trainingPrograms.length }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
          </div>

          <!-- Recent Reviews -->
          <div class="mb-6">
            <h4 class="text-lg font-medium mb-4">Recent Performance Reviews</h4>
            <div class="space-y-4">
              <div v-for="review in person.performanceReviews.slice(0, 3)" :key="review._id" class="border-l-4 border-blue-500 pl-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium">{{ formatDate(review.reviewDate) }}</p>
                    <p class="text-gray-600 dark:text-gray-400">{{ review.comments }}</p>
                  </div>
                  <div class="flex text-yellow-400">
                    <i v-for="n in 5" :key="n" class="fas fa-star" :class="{'text-gray-300': n > review.rating}"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills and Certifications -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-medium mb-4">Skills</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in person.skills" :key="skill.skillName" 
                      class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                  {{ skill.skillName }} ({{ skill.proficiencyLevel }})
                </span>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-medium mb-4">Certifications</h4>
              <div class="space-y-2">
                <div v-for="cert in person.certifications" :key="cert.certificationName" 
                     class="flex justify-between items-center">
                  <span>{{ cert.certificationName }}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ formatDate(cert.dateIssued) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDepartment: "",
      selectedStatus: "",
      searchName: "",
      departments: ["Journalisme", "Communication", "Documentation", "Informatique"],
      employmentStatuses: ["active", "onLeave", "retired", "terminated", "suspended"],
      personnel: [], // Will be populated from API
      filteredPersonnel: []
    };
  },

  methods: {
    updateFilteredPersonnel() {
      this.filteredPersonnel = this.personnel.filter(person => {
        const departmentMatch = !this.selectedDepartment || person.department === this.selectedDepartment;
        const statusMatch = !this.selectedStatus || person.employmentStatus === this.selectedStatus;
        const nameMatch = !this.searchName || 
          `${person.user.firstName} ${person.user.lastName}`.toLowerCase().includes(this.searchName.toLowerCase());
        
        return departmentMatch && statusMatch && nameMatch;
      });
    },

    calculateAverageRating(person) {
      if (!person.performanceReviews.length) return 0;
      const sum = person.performanceReviews.reduce((acc, review) => acc + review.rating, 0);
      return (sum / person.performanceReviews.length).toFixed(1);
    },

    calculateAttendanceRate(person) {
      if (!person.attendance.length) return 0;
      const present = person.attendance.filter(a => a.status === 'present').length;
      return Math.round((present / person.attendance.length) * 100);
    },

    getStatusBadgeClass(status) {
      const classes = {
        active: 'bg-green-100 text-green-800',
        onLeave: 'bg-yellow-100 text-yellow-800',
        retired: 'bg-gray-100 text-gray-800',
        terminated: 'bg-red-100 text-red-800',
        suspended: 'bg-orange-100 text-orange-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },

  async mounted() {
    try {
      const response = await fetch('/api/personnel/all');
      this.personnel = await response.json();
      this.updateFilteredPersonnel();
    } catch (error) {
      console.error('Error fetching personnel data:', error);
    }
  }
};
</script>

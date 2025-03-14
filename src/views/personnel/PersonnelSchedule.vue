<template>
  <div class="text-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-4xl font-bold text-primary-light dark:text-primary-dark mb-8">
      Personnel Schedule Management
    </h1>

    <!-- Filters -->
    <div class="max-w-5xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department:</label>
          <select v-model="selectedDepartment" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark">
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept._id" :value="dept._id">{{ dept.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status:</label>
          <select v-model="selectedStatus" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="onLeave">On Leave</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date:</label>
          <input type="date" v-model="selectedDate" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark">
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Personnel</h3>
        <p class="text-3xl font-bold text-primary-light dark:text-primary-dark">{{ filteredSchedules.length }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Active</h3>
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ activeCount }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">On Leave</h3>
        <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ onLeaveCount }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Suspended</h3>
        <p class="text-3xl font-bold text-red-600 dark:text-red-400">{{ suspendedCount }}</p>
      </div>
    </div>

    <!-- Schedule Grid -->
    <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Personnel</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resource</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="schedule in filteredSchedules" :key="schedule._id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-primary-light dark:bg-primary-dark opacity-20 rounded-full flex items-center justify-center text-primary-light dark:text-primary-dark">
                    {{ getInitials(schedule.personnel?.user?.fullName) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ schedule.personnel?.user?.fullName }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ schedule.personnel?.department?.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ schedule.class }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ formatDate(schedule.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ formatTime(schedule.time) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ schedule.resource }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Edit
                  </button>
                  <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { personnelService } from '@/api/services/personnelService';

export default {
  name: 'PersonnelSchedule',
  setup() {
    const schedules = ref([]);
    const departments = ref([]);
    const selectedDepartment = ref('');
    const selectedStatus = ref('');
    const selectedDate = ref('');

    const fetchSchedules = async () => {
      try {
        const response = await personnelService.getAllPersonnel();
        schedules.value = response;
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    const filteredSchedules = computed(() => {
      return schedules.value.filter(schedule => {
        const matchDepartment = !selectedDepartment.value || schedule.personnel?.department?._id === selectedDepartment.value;
        const matchStatus = !selectedStatus.value || schedule.personnel?.employmentStatus === selectedStatus.value;
        const matchDate = !selectedDate.value || new Date(schedule.date).toISOString().split('T')[0] === selectedDate.value;
        return matchDepartment && matchStatus && matchDate;
      });
    });

    const activeCount = computed(() => 
      schedules.value.filter(s => s.personnel?.employmentStatus === 'active').length
    );

    const onLeaveCount = computed(() => 
      schedules.value.filter(s => s.personnel?.employmentStatus === 'onLeave').length
    );

    const suspendedCount = computed(() => 
      schedules.value.filter(s => s.personnel?.employmentStatus === 'suspended').length
    );

    const getInitials = (name) => {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const formatTime = (time) => {
      return time;
    };

    onMounted(() => {
      fetchSchedules();
    });

    return {
      schedules,
      departments,
      selectedDepartment,
      selectedStatus,
      selectedDate,
      filteredSchedules,
      activeCount,
      onLeaveCount,
      suspendedCount,
      getInitials,
      formatDate,
      formatTime
    };
  }
};
</script>

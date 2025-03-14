
<template>
  <div class="text-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl text-left font-bold text-black dark:text-white mb-8">
      Personnel Assignment Management
    </h1>

    <!-- Filters -->
    <div class="max-w-5xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Department:
          </label>
          <select
            v-model="selectedDepartment"
            @change="filterPersonnel"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept._id" :value="dept._id">
              {{ dept.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Role:
          </label>
          <select
            v-model="selectedRole"
            @change="filterPersonnel"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Roles</option>
            <option value="teacher">Teacher</option>
            <option value="seniorTeacher">Senior Teacher</option>
            <option value="coordinator">Coordinator</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Status:
          </label>
          <select
            v-model="selectedStatus"
            @change="filterPersonnel"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="onLeave">On Leave</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div class="mt-4">
        <input
          v-model="searchQuery"
          @input="filterPersonnel"
          type="text"
          placeholder="Search personnel..."
          class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
    </div>

    <!-- Personnel List -->
    <div class="max-w-5xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Personnel
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Department
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="person in filteredPersonnel" :key="person._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    {{ getInitials(person.user.firstName + ' ' + person.user.lastName) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ person.user.firstName }} {{ person.user.lastName }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ person.user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ getDepartmentName(person.department) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ person.role }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(person.employmentStatus)">
                  {{ person.employmentStatus }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button @click="assignSubjects(person)" 
                  class="text-primary-light dark:text-primary-dark hover:opacity-75 mr-2">
                  <font-awesome-icon :icon="['fas', 'book']" />
                </button>
                <button @click="updateRole(person)"
                  class="text-yellow-600 dark:text-yellow-400 hover:opacity-75 mr-2">
                  <font-awesome-icon :icon="['fas', 'user-tag']" />
                </button>
                <button @click="toggleStatus(person)"
                  class="text-red-600 dark:text-red-400 hover:opacity-75">
                  <font-awesome-icon :icon="['fas', 'power-off']" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Assignment Modal -->
    <div v-if="showAssignmentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Assign Subjects</h3>
          <button @click="showAssignmentModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Subjects
          </label>
          <select v-model="selectedSubjects" multiple
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <option v-for="subject in availableSubjects" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="showAssignmentModal = false"
            class="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button @click="saveAssignment"
            class="px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:opacity-90">
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/client.js';
import { ENDPOINTS } from '@/api/config.js';

export default {
  data() {
    return {
      personnel: [],
      departments: [],
      selectedDepartment: '',
      selectedRole: '',
      selectedStatus: '',
      searchQuery: '',
      showAssignmentModal: false,
      selectedPerson: null,
      selectedSubjects: [],
      availableSubjects: [
        'Mathematics', 'Physics', 'Chemistry', 'Biology',
        'Computer Science', 'Literature', 'History', 'Geography'
      ]
    }
  },

  computed: {
    filteredPersonnel() {
      return this.personnel.filter(person => {
        const departmentMatch = !this.selectedDepartment || person.department === this.selectedDepartment;
        const roleMatch = !this.selectedRole || person.role === this.selectedRole;
        const statusMatch = !this.selectedStatus || person.employmentStatus === this.selectedStatus;
        const searchMatch = !this.searchQuery || 
          `${person.user.firstName} ${person.user.lastName}`.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        return departmentMatch && roleMatch && statusMatch && searchMatch;
      });
    }
  },

  methods: {
    async fetchPersonnel() {
      try {
        const response = await axios.get(ENDPOINTS.PERSONNEL);
        this.personnel = response.data;
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }
    },

    async fetchDepartments() {
      try {
        const response = await axios.get(ENDPOINTS.DEPARTMENT);
        this.departments = response.data;
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    },

    getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    },

    getDepartmentName(departmentId) {
      const department = this.departments.find(d => d._id === departmentId);
      return department ? department.name : 'Unknown';
    },

    getStatusClass(status) {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'suspended':
          return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        case 'onLeave':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      }
    },

    assignSubjects(person) {
      this.selectedPerson = person;
      this.selectedSubjects = [...person.assignedSubjects || []];
      this.showAssignmentModal = true;
    },

    async saveAssignment() {
      try {
        await axios.post(`${ENDPOINTS.PERSONNEL}/${this.selectedPerson._id}/subjects`, {
          subjects: this.selectedSubjects
        });
        
        const personIndex = this.personnel.findIndex(p => p._id === this.selectedPerson._id);
        if (personIndex !== -1) {
          this.personnel[personIndex].assignedSubjects = this.selectedSubjects;
        }
        
        this.showAssignmentModal = false;
      } catch (error) {
        console.error('Error saving subject assignment:', error);
      }
    },

    async updateRole(person) {
      try {
        const newRole = person.role === 'teacher' ? 'seniorTeacher' : 
          person.role === 'seniorTeacher' ? 'coordinator' : 'teacher';
        
        await axios.patch(`${ENDPOINTS.PERSONNEL}/${person._id}/role`, {
          newRole
        });
        
        person.role = newRole;
      } catch (error) {
        console.error('Error updating role:', error);
      }
    },

    async toggleStatus(person) {
      try {
        const newStatus = person.employmentStatus === 'active' ? 'suspended' : 'active';
        
        await axios.patch(`${ENDPOINTS.PERSONNEL}/${person._id}/status`, {
          status: newStatus
        });
        
        person.employmentStatus = newStatus;
      } catch (error) {
        console.error('Error toggling status:', error);
      }
    }
  },

  mounted() {
    this.fetchPersonnel();
    this.fetchDepartments();
  }
}
</script>

<template>
  <h1 class="text-2xl font-semibold">Personnel List</h1>
  <div class="container mx-auto px-4 py-8">
    <!-- Search and Filter -->
    <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:w-64">
        <input v-model="searchQuery" type="text" placeholder="Search personnel..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark" />
        <button v-if="searchQuery" @click="searchQuery = ''"
          class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          ✕
        </button>
      </div>

      <div class="flex items-center gap-4">
        <select v-model="sortBy"
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark">
          <option value="user.fullName">Sort by Name</option>
          <option value="employmentStatus">Sort by Status</option>
          <option value="department">Sort by Department</option>
          <option value="hireDate">Sort by Hire Date</option>
        </select>

        <button @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700">
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </button>
      </div>
    </div>

    <!-- Personnel List -->
    <div v-if="paginatedPersonnel.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Employment Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Department
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Hire Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="personnel in paginatedPersonnel" :key="personnel._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                  {{ getInitials(personnel.user.fullName) }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ personnel.user.fullName }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ personnel.user.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ personnel.employmentStatus }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ personnel.department }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ formatDate(personnel.hireDate) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button @click="viewDetails(personnel._id)" class="text-primary-light dark:text-primary-dark hover:opacity-75 mr-3" title="View Details">
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>
              <button @click="editPersonnel(personnel)" class="text-yellow-600 dark:text-yellow-400 hover:opacity-75 mr-3" title="Edit Personnel">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <button @click="confirmDelete(personnel)" class="text-red-600 dark:text-red-400 hover:opacity-75" title="Delete Personnel">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p class="text-gray-500 dark:text-gray-400">
        {{ searchQuery ? 'No personnel match your search criteria' : 'No personnel added yet' }}
      </p>
      <button @click="$router.push('/personnel/add')"
        class="mt-4 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90">
        Add New Personnel
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="filteredPersonnel.length > 0" class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Showing <span class="font-medium">{{ paginationStart }}</span> to <span class="font-medium">{{ paginationEnd }}</span> of 
        <span class="font-medium">{{ filteredPersonnel.length }}</span> personnel
      </div>
      <div class="flex space-x-2">
        <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-md" :class="currentPage === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'">
          Previous
        </button>
        <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-md" :class="currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { personnelService } from '@/api/services/personnelService';

export default {
  name: 'PersonnelList',
  data() {
    return {
      personnelList: [],
      searchQuery: '',
      sortBy: 'user.fullName',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    filteredPersonnel() {
      let filtered = [...this.personnelList];
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(personnel => 
          personnel.user.fullName.toLowerCase().includes(query) ||
          personnel.employmentStatus.toLowerCase().includes(query) ||
          personnel.department.toLowerCase().includes(query)
        );
      }

      return filtered.sort((a, b) => {
        let aValue = this.getNestedValue(a, this.sortBy);
        let bValue = this.getNestedValue(b, this.sortBy);

        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (this.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },
    paginatedPersonnel() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPersonnel.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPersonnel.length / this.itemsPerPage);
    },
    paginationStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    paginationEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredPersonnel.length);
    }
  },
  methods: {
    async fetchPersonnel() {
      try {
        this.personnelList = await personnelService.getAllPersonnel();
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getInitials(name) {
      if (!name) return '';
      return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    },
    getNestedValue(obj, path) {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    },
    viewDetails(id) {
      this.$router.push(`/personnel/detail/${id}`);
    },
    editPersonnel(personnel) {
      this.$router.push(`/personnel/edit/${personnel._id}`);
    },
    confirmDelete() {
      // Implement delete confirmation modal
    }
  },
  created() {
    this.fetchPersonnel();
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
button[title] {
  position: relative;
}

button[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
}
</style>
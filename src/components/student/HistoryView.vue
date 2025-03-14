<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold text-center text-blue-600">History</h2>
    
    <!-- Filter Dropdown -->
    <div class="mb-4 flex justify-center">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 mr-2">Filter by Type:</label>
      <select v-model="selectedFilter" @change="filterHistory" class="w-1/3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-150 ease-in-out">
        <option value="">All</option>
        <option value="document">Document Requests</option>
        <option value="leave">Leave Requests</option>
        <option value="absence">Absence Justifications</option>
      </select>
    </div>

    <!-- History Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in filteredHistory" :key="item.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 cursor-pointer" @click="openModal(item)">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{{ item.description }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ item.date }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" @click="closeModal"></div>

        <!-- Modal panel -->
        <div class="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl sm:align-middle">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">{{ selectedHistoryItem.title }}</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-300">Status: <span :class="statusClass">{{ selectedHistoryItem.status }}</span></p>
              <p class="text-sm text-gray-500 dark:text-gray-300 mt-2">Message: {{ selectedHistoryItem.adminMessage }}</p>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'HistoryView',
  setup() {
    const selectedFilter = ref('');
    const showModal = ref(false);
    const selectedHistoryItem = ref({});
    const history = ref([
      { id: 1, title: 'Document Request 1', description: 'Description for document request 1', date: '2023-10-01', type: 'document', status: 'Approved', adminMessage: 'Your document request has been approved.' },
      { id: 2, title: 'Leave Request 1', description: 'Description for leave request 1', date: '2023-10-02', type: 'leave', status: 'Pending', adminMessage: 'Your leave request is under review.' },
      { id: 3, title: 'Absence Justification 1', description: 'Description for absence justification 1', date: '2023-10-03', type: 'absence', status: 'Rejected', adminMessage: 'Your absence justification was rejected due to insufficient evidence.' },
      // Add more history items as needed
    ]);

    const filteredHistory = computed(() => {
      if (!selectedFilter.value) {
        return history.value;
      }
      return history.value.filter(item => item.type === selectedFilter.value);
    });

    const filterHistory = () => {
      // Logic to filter history based on selectedFilter
    };

    const openModal = (item) => {
      selectedHistoryItem.value = item;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const statusClass = computed(() => {
      switch (selectedHistoryItem.value.status) {
        case 'Approved':
          return 'text-green-500';
        case 'Pending':
          return 'text-yellow-500';
        case 'Rejected':
          return 'text-red-500';
        default:
          return 'text-gray-500';
      }
    });

    return {
      selectedFilter,
      filteredHistory,
      filterHistory,
      showModal,
      selectedHistoryItem,
      openModal,
      closeModal,
      statusClass
    };
  }
};
</script>

<style scoped>
/* Add custom styles for better UI */
.cursor-pointer {
  cursor: pointer;
}

.transition {
  transition: all 0.3s ease-in-out;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style> 
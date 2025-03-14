<template>
  <div class="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
    <h2 class="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">Request History</h2>
    
    <!-- Filter Section -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Filter by Type:</label>
      <select
        v-model="selectedFilter"
        @change="filterHistory"
        class="w-full sm:w-64 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all duration-200"
      >
        <option value="">All Requests</option>
        <option value="document">Document Requests</option>
        <option value="leave">Leave Requests</option>
        <option value="absence">Absence Justifications</option>
      </select>
    </div>

    <!-- History Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredHistory"
        :key="item.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700"
        @click="openModal(item)"
      >
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">{{ item.title }}</h3>
          <span :class="getStatusBadge(item.status)" class="text-xs font-medium px-2 py-1 rounded-full">
            {{ item.status }}
          </span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{{ item.description }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">{{ formatDate(item.date) }}</p>
      </div>
      <div v-if="filteredHistory.length === 0" class="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
        No requests found matching your filter.
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" @click="closeModal" aria-hidden="true"></div>

          <!-- Modal panel -->
          <div class="relative inline-block w-full max-w-lg p-6 my-8 text-left bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all sm:align-middle">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white" id="modal-title">{{ selectedHistoryItem.title }}</h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">Status:</span>
                <span :class="getStatusBadge(selectedHistoryItem.status)" class="text-sm font-medium px-2 py-1 rounded-full">
                  {{ selectedHistoryItem.status }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Date: {{ formatDate(selectedHistoryItem.date) }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">Description: {{ selectedHistoryItem.description }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">Admin Message: {{ selectedHistoryItem.adminMessage || 'No message provided.' }}</p>
            </div>
            <div class="mt-6">
              <button
                type="button"
                class="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-base font-medium"
                @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
    ]);

    const filteredHistory = computed(() => {
      if (!selectedFilter.value) return history.value;
      return history.value.filter(item => item.type === selectedFilter.value);
    });

    const filterHistory = () => {
      // Already handled by computed property
    };

    const openModal = (item) => {
      selectedHistoryItem.value = item;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const getStatusBadge = (status) => {
      switch (status) {
        case 'Approved':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'Rejected':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return {
      selectedFilter,
      filteredHistory,
      filterHistory,
      showModal,
      selectedHistoryItem,
      openModal,
      closeModal,
      getStatusBadge,
      formatDate
    };
  }
};
</script>

<style scoped>
/* Enhanced Styles */
.max-w-7xl {
  max-width: 80rem;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.rounded-xl {
  border-radius: 0.75rem;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .transform,
.modal-fade-leave-active .transform {
  transition: all 0.3s ease;
}

.modal-fade-enter-from .transform,
.modal-fade-leave-to .transform {
  transform: translateY(20px);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  h2 {
    font-size: 1.75rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .max-w-md {
    max-width: 90%;
  }
}
</style>
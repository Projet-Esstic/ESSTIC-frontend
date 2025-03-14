<template>
  <div class="container mx-auto p-4 md:p-6 lg:p-8">
    <h1 class="text-3xl font-bold mb-6">Student Requests</h1>
    
    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="[
            currentTab === tab.id
              ? 'border-blue-500 text-blue-600 dark:text-blue-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Panels -->
    <div class="mt-6">
      <DocumentRequest v-if="currentTab === 'document'" />
      <LeaveRequest v-if="currentTab === 'leave'" />
      <JustifyAbsenceRequest v-if="currentTab === 'justify-absence'" />
      <HistoryView v-if="currentTab === 'history'" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import DocumentRequest from '@/components/student/DocumentRequest.vue';
import LeaveRequest from '@/components/student/LeaveRequest.vue';
import JustifyAbsenceRequest from '@/components/student/JustifyAbsenceRequest.vue';
import HistoryView from '@/components/student/HistoryView.vue';

export default {
  name: 'StudentRequest',
  components: {
    DocumentRequest,
    LeaveRequest,
    JustifyAbsenceRequest,
    HistoryView
  },
  setup() {
    const tabs = [
      { id: 'document', name: 'Document Request' },
      { id: 'leave', name: 'Leave Request' },
      { id: 'justify-absence', name: 'Justify Absence Request' },
      { id: 'history', name: 'History' }
    ];

    const currentTab = ref('document');

    return {
      tabs,
      currentTab
    };
  }
};
</script>


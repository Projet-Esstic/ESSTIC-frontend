<template>
  <div class="container mx-auto p-4 md:p-6 lg:p-8">
    <h1 class="text-3xl font-bold mb-6">Entrance Exam Management</h1>
    
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
      <EntranceExamManagement 
        v-if="currentTab === 'exams'" 
      />
      <CourseManagement 
        v-if="currentTab === 'courses'" 
        :fields="fields"
      />
      <CandidateManagement
        v-if="currentTab === 'candidates'"
        :fields="fields"
      />
      <MarksManagement
        v-if="currentTab === 'marks'"
        :fields="fields"
      />
      <Deliberation
        v-if="currentTab === 'deliberation'"
        :fields="fields"
      />
      <ExamResults
        v-if="currentTab === 'results'"
        :fields="fields"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CourseManagement from './CourseManagement.vue';
import CandidateManagement from './CandidateManagement.vue';
import EntranceExamManagement from './EntranceExamManagement.vue';
import MarksManagement from './MarksManagement.vue';
import Deliberation from './Deliberation.vue';
import ExamResults from './ExamResults.vue';

export default {
  name: 'EntranceExam',
  components: {
    CourseManagement,
    CandidateManagement,
    EntranceExamManagement,
    MarksManagement,
    Deliberation,
    ExamResults
  },
  setup() {
    const tabs = [
      { id: 'exams', name: 'Create Exam' },
      { id: 'courses', name: 'Course Management' },
      { id: 'candidates', name: 'Candidate Management' },
      { id: 'marks', name: 'Marks Management' },
      { id: 'deliberation', name: 'Deliberation' },
      { id: 'results', name: 'Results' }
    ];

    const currentTab = ref('exams');
    
    // Default fields of study
    const fields = ref([
      { id: 1, name: 'Computer Science', coefficient: 3 },
      { id: 2, name: 'Electrical Engineering', coefficient: 2 },
      { id: 3, name: 'Mechanical Engineering', coefficient: 2 },
      { id: 4, name: 'Civil Engineering', coefficient: 2 }
    ]);

    return {
      tabs,
      currentTab,
      fields
    };
  }
};
</script>

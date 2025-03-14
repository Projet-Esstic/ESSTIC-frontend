
<template>
  <div class="container mx-auto p-4 md:p-6 lg:p-8">
    <h1 class="text-3xl font-bold mb-6">Personnel Management</h1>
    
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
      <PersonnelList 
        v-if="currentTab === 'list'" 
        :departments="departments"
      />
      <PersonnelAssignment 
        v-if="currentTab === 'assignment'" 
        :departments="departments"
      />
      <PersonnelSchedule
        v-if="currentTab === 'schedule'" 
        :departments="departments"
      />
      <PersonnelAttendance 
        v-if="currentTab === 'attendance'" 
        :departments="departments"
      />
      <PersonnelPerformance
        v-if="currentTab === 'performance'"
        :departments="departments"
      />
      <PersonnelLeave
        v-if="currentTab === 'leave'"
        :departments="departments"
      />
      <PersonnelRequest
        v-if="currentTab === 'request'"
        :departments="departments"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import PersonnelList from './PersonnelList.vue'
import PersonnelAssignment from './PersonnelAssignment.vue'
import PersonnelSchedule from './PersonnelSchedule.vue'
import PersonnelAttendance from './PersonnelAttendance.vue'
import PersonnelPerformance from './PersonnelPerformance.vue'
import PersonnelLeave from './PersonnelLeave.vue'
import PersonnelRequest from './PersonnelRequest.vue'
import { departmentService } from '@/api/services/index'

export default {
  name: 'PersonnelManagement',
  
  components: {
    PersonnelList,
    PersonnelAssignment,
    PersonnelSchedule,
    PersonnelAttendance,
    PersonnelPerformance,
    PersonnelLeave,
    PersonnelRequest
  },

  setup() {
    const currentTab = ref('list')
    const departments = ref([])
    const loading = ref(false)
    const error = ref(null)

    const tabs = [
      { id: 'list', name: 'Personnel List' },
      { id: 'assignment', name: 'Assignments' },
      { id: 'schedule', name: 'Schedules' },
      { id: 'attendance', name: 'Attendance' },
      { id: 'performance', name: 'Performance' },
      { id: 'leave', name: 'Leave Management' },
      { id: 'request', name: 'Requests' },
    ]

    const loadDepartments = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await departmentService.getAllDepartments()
        departments.value = response
      } catch (err) {
        console.error('Failed to load departments:', err)
        error.value = 'Failed to load departments'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadDepartments()
    })

    return {
      currentTab,
      tabs,
      departments,
      loading,
      error
    }
  }
}
</script>

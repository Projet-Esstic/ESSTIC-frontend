<template>
  <div class="container mx-auto p-4 md:p-6 lg:p-8">
    <h1 class="text-3xl font-bold mb-6">Student Management</h1>
    
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
      <EnrollmentList 
        v-if="currentTab === 'enrollment'" 
        :departments="departments"
      />
      <StudentList 
        v-if="currentTab === 'list'" 
        :departments="departments"
      />
      <CourseRegistration 
        v-if="currentTab === 'courses'" 
        :departments="departments"
      />
      <Attendance 
        v-if="currentTab === 'attendance'" 
        :departments="departments"
      />
      <GradeManagement
        v-if="currentTab === 'grades'"
        :departments="departments"
      />
      <AcademicProgress
        v-if="currentTab === 'progress'"
        :departments="departments"
      />
      <Graduation
        v-if="currentTab === 'graduation'"
        :departments="departments"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
// import { useStore } from 'vuex'
import EnrollmentList from './EnrollmentList.vue'
import StudentList from './StudentList.vue'
//import CourseRegistration from './CourseRegistration.vue'
import Attendance from './Attendance.vue'
import GradeManagement from './GradeManagement.vue'
import AcademicProgress from './AcademicProgress.vue'
import Graduation from './Graduation.vue'
import { departmentService } from '@/api/services/index'

export default {
  name: 'StudentManagement',
  
  components: {
    EnrollmentList,
    StudentList,
   // CourseRegistration,
    Attendance,
    GradeManagement,
    AcademicProgress,
    Graduation
  },

  setup() {
    // const store = useStore()
    const currentTab = ref('enrollment')
    const departments = ref([])
    const loading = ref(false)
    const error = ref(null)

    const tabs = [
      { id: 'enrollment', name: 'Enrollment' },
      { id: 'list', name: 'Student List' },
      { id: 'courses', name: 'Course Registration' },
      { id: 'attendance', name: 'Attendance' },
      { id: 'grades', name: 'Grades' },
      { id: 'progress', name: 'Academic Progress' },
      { id: 'graduation', name: 'Graduation' }
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

<template>
  <div class="mb-6 p-4 bg-white rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">Add Entrance Exam Course</h2>
    <form @submit.prevent="addCourse" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Course Code</label>
        <input 
          v-model="form.courseCode" 
          placeholder="e.g., MATH101" 
          class="mt-1 block w-full border rounded-md shadow-sm p-2" 
          required 
        />
        <div v-if="errors.courseCode" class="text-red-600">{{ errors.courseCode }}</div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Course Name</label>
        <input 
          v-model="form.courseName" 
          placeholder="e.g., Mathematics" 
          class="mt-1 block w-full border rounded-md shadow-sm p-2" 
          required 
        />
        <div v-if="errors.courseName" class="text-red-600">{{ errors.courseName }}</div>
      </div>

      <div v-for="(dept, index) in form.department" :key="index" class="space-y-2">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <select 
              v-model="dept.departmentInfo" 
              class="mt-1 block w-full border rounded-md shadow-sm p-2"
              required
            >
              <option value="">Select Department</option>
              <option v-for="dep in departments" :key="dep._id" :value="dep._id">
                {{ dep.name }}
              </option>
            </select>
            <div v-if="errors[`department${index}`]" class="text-red-600">{{ errors[`department${index}`] }}</div>
          </div>
          
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Coefficient</label>
            <input 
              v-model.number="dept.coefficient" 
              type="number" 
              min="1"
              class="mt-1 block w-full border rounded-md shadow-sm p-2" 
              required 
            />
            <div v-if="errors[`coefficient${index}`]" class="text-red-600">{{ errors[`coefficient${index}`] }}</div>
          </div>

          <button 
            type="button" 
            @click="removeDepartment(index)" 
            class="mt-6 p-2 text-red-600 hover:text-red-800"
            v-if="form.department.length > 1"
          >
            Remove
          </button>
        </div>
      </div>

      <button 
        type="button" 
        @click="addDepartment" 
        class="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Add Another Department
      </button>

      <div v-if="errors.submit" class="text-red-600">{{ errors.submit }}</div>

      <div class="flex justify-end mt-4">
        <button 
          type="submit" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="loading"
        >
          {{ loading ? 'Creating...' : 'Create Course' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const form = ref({
      courseCode: '',
      courseName: '',
      isEntranceExam: true,
      department: [{
        departmentInfo: '',
        coefficient: 1
      }]
    })

    const departments = ref([])
    const loading = ref(false)
    const errors = ref({})

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/departments`)
        departments.value = response.data
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }

    const addDepartment = () => {
      form.value.department.push({
        departmentInfo: '',
        coefficient: 1
      })
    }

    const removeDepartment = (index) => {
      form.value.department.splice(index, 1)
    }

    const addCourse = async () => {
      if (validateForm()) {
        loading.value = true
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BACKEND_URL}/api/courses`, 
            form.value
          )
          // Emit success event
          // emit('course-added', response.data)
          // Reset form
          form.value = {
            courseCode: '',
            courseName: '',
            isEntranceExam: true,
            department: [{
              departmentInfo: '',
              coefficient: 1
            }]
          }
          errors.value = {}
        } catch (error) {
          console.error('Error creating course:', error)
          errors.value = {
            submit: 'Failed to create course. Please try again.'
          }
        } finally {
          loading.value = false
        }
      }
    }

    const validateForm = () => {
      const newErrors = {}

      if (!form.value.courseCode.trim()) {
        newErrors.courseCode = 'Course code is required'
      }
      if (!form.value.courseName.trim()) {
        newErrors.courseName = 'Course name is required'
      }

      // Validate departments
      form.value.department.forEach((dept, index) => {
        if (!dept.departmentInfo) {
          newErrors[`department${index}`] = 'Department is required'
        }
        if (!dept.coefficient || dept.coefficient < 1) {
          newErrors[`coefficient${index}`] = 'Coefficient must be at least 1'
        }
      })

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    onMounted(() => {
      fetchDepartments()
    })

    return {
      form,
      departments,
      loading,
      errors,
      addDepartment,
      removeDepartment,
      addCourse
    }
  }
}
</script>

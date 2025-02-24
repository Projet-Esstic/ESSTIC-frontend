<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Course Management</h2>
      <button 
        @click="showAddModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Course
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2 text-gray-600 dark:text-gray-400">Loading courses...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Error loading courses</h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <!-- Courses List -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration (mins)
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Marks
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Field
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coefficient
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="course in courses" :key="course.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ course.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ course.code }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ course.duration }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ course.totalMarks }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="space-y-1">
                <div v-for="field in fields" :key="field.id" class="text-sm text-gray-900">
                  {{ field.name }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="space-y-1">
                <div v-for="field in fields" :key="field.id" class="text-sm text-gray-900">
                  {{ course.coefficients[field.id] || 0 }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button 
                @click="editCourse(course)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button 
                @click="deleteCourse(course)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Course Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">{{ editingCourse ? 'Edit Course' : 'Add New Course' }}</h3>
        <form @submit.prevent="saveCourse" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Course Name</label>
            <input 
              type="text" 
              v-model="courseForm.name"
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Course Code</label>
            <input 
              type="text" 
              v-model="courseForm.code"
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input 
              type="number" 
              v-model.number="courseForm.duration"
              required
              min="1"
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Marks</label>
            <input 
              type="number" 
              v-model.number="courseForm.totalMarks"
              required
              min="1"
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div class="space-y-4">
            <label class="block text-lg font-medium text-gray-700">Fields of Study Coefficients</label>
            <div v-for="field in fields" :key="field.id" class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 flex-grow">
                {{ field.name }} Coefficient
              </label>
              <input 
                type="number" 
                v-model.number="courseForm.coefficients[field.id]"
                min="0"
                max="10"
                step="0.5"
                class="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                @input="validateCoefficient($event, field.id)"
              >
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {{ editingCourse ? 'Save Changes' : 'Add Course' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CourseManagement',
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const showAddModal = ref(false);
    const editingCourse = ref(null);
    const courseForm = ref({
      name: '',
      code: '',
      duration: 60,
      totalMarks: 20,
      coefficients: {}
    });

    // Get courses from store
    const courses = computed(() => store.getters['courses/getAllCourses']);
    const loading = computed(() => store.getters['courses/isLoading']);
    const error = computed(() => store.getters['courses/getError']);

    // Initialize coefficients for all fields
    props.fields.forEach(field => {
      courseForm.value.coefficients[field.id] = 0;
    });

    const resetForm = () => {
      courseForm.value = {
        name: '',
        code: '',
        duration: 60,
        totalMarks: 20,
        coefficients: {}
      };
      // Reset coefficients
      props.fields.forEach(field => {
        courseForm.value.coefficients[field.id] = 0;
      });
      editingCourse.value = null;
    };

    const editCourse = (course) => {
      editingCourse.value = course;
      courseForm.value = {
        name: course.name,
        code: course.code,
        duration: course.duration,
        totalMarks: course.totalMarks,
        coefficients: { ...(course.coefficients || {}) }
      };
      showAddModal.value = true;
    };

    const saveCourse = async () => {
      try {
        const courseData = {
          ...courseForm.value,
          fields: props.fields.map(field => ({
            id: field.id,
            coefficient: courseForm.value.coefficients[field.id]
          }))
        };

        if (editingCourse.value) {
          await store.dispatch('courses/updateCourse', {
            id: editingCourse.value.id,
            courseData
          });
        } else {
          await store.dispatch('courses/createCourse', courseData);
        }

        showAddModal.value = false;
        resetForm();
      } catch (err) {
        console.error('Error saving course:', err);
      }
    };

    const deleteCourse = async (course) => {
      if (confirm('Are you sure you want to delete this course?')) {
        try {
          await store.dispatch('courses/deleteCourse', course.id);
        } catch (err) {
          console.error('Error deleting course:', err);
        }
      }
    };

    const validateCoefficient = (event, fieldId) => {
      const value = parseFloat(event.target.value)
      if (isNaN(value) || value < 0) {
        courseForm.value.coefficients[fieldId] = 0
      } else if (value > 10) {
        courseForm.value.coefficients[fieldId] = 10
      }
    }

    // Load initial courses
    onMounted(async () => {
      await store.dispatch('courses/fetchCourses');
    });

    return {
      courses,
      showAddModal,
      editingCourse,
      courseForm,
      loading,
      error,
      editCourse,
      saveCourse,
      deleteCourse,
      validateCoefficient
    };
  }
};</script>

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

    <!-- Courses List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
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
            <div v-for="field in fields" :key="field.id" class="bg-gray-50 p-4 rounded-md">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700">{{ field.name }}</label>
                <input 
                  type="number" 
                  v-model.number="courseForm.coefficients[field.id]"
                  min="0"
                  max="5"
                  class="w-20 px-2 py-1 border rounded-md"
                  required
                />
              </div>
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
import { ref } from 'vue';
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
    const courses = ref([]);
    const showAddModal = ref(false);
    const editingCourse = ref(null);
    const courseForm = ref({
      name: '',
      code: '',
      duration: 60,
      totalMarks: 20,
      coefficients: {}
    });

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

    const saveCourse = () => {
      const field = props.fields.find(f => f.id === courseForm.value.fieldId);
      const course = {
        id: editingCourse.value?.id || Date.now(),
        ...courseForm.value,
        field
      };

      if (editingCourse.value) {
        const index = courses.value.findIndex(c => c.id === course.id);
        courses.value[index] = course;
      } else {
        courses.value.push(course);
      }

      store.commit('entranceExam/updateCourses', courses.value);
      showAddModal.value = false;
      resetForm();
    };

    const deleteCourse = (course) => {
      if (confirm('Are you sure you want to delete this course?')) {
        courses.value = courses.value.filter(c => c.id !== course.id);
        store.commit('entranceExam/updateCourses', courses.value);
      }
    };

    // Load initial courses from store
    const storeCourses = store.state?.entranceExam?.courses || [];
    courses.value = [...storeCourses];

    return {
      courses,
      showAddModal,
      editingCourse,
      courseForm,
      editCourse,
      saveCourse,
      deleteCourse
    };
  }
};</script>

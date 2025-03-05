<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Marks Management</h2>
        <p class="text-gray-600 dark:text-gray-400">Enter marks by department or course</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
          <select 
            v-model="selectedDepartment"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Departments</option>
            <option 
              v-for="department in departments" 
              :key="department._id" 
              :value="department._id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
          <select 
            v-model="selectedCourse"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Course</option>
            <option 
              v-for="course in courses" 
              :key="course._id" 
              :value="course._id"
            >
              {{ course.courseName }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or registration number"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>
      </div>
    </div>

    <!-- Marks Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mark (/20)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Final Mark</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="student in filteredStudents" :key="student._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ student.registrationNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ student.user ? `${student.user.firstName} ${student.user.lastName}` : 'Unknown' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ getFieldName(student.fieldOfStudy) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <!-- Debugging log for modifications length -->
              {{ console.log('Modifications for', student._id, ':', student.modifications.length) }}
              <input 
                type="number" 
                v-model="student.mark"
                min="0"
                max="20"
                step="0.25"
                :class="{
                  'w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white': true,
                  'bg-blue-100 dark:bg-blue-900': student.modifications.length > 1
                }"
                :title="student.modifications.length > 0 ? `Last modified by: ${student.modifications[student.modifications.length - 1].modifiedBy.name}` : ''"
              >
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ calculateWeightedMark(student).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Submit Marks Button -->
    <div class="flex justify-end">
      <button 
        @click="submitMarks"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit Marks
      </button>
    </div>

    <!-- No Student Selected Message -->
    <div v-if="filteredStudents.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
      No students found for the selected department.
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { candidateService, courseService, marksService } from '@/api/services';
import { departmentService } from '@/api/services/index';

export default {
  name: 'MarksManagement',

  setup() {
    const departments = ref([]);
    const courses = ref([]);
    const students = ref([]);
    const selectedDepartment = ref('');
    const selectedCourse = ref('');
    const searchQuery = ref('');

    // Load initial data
    onMounted(async () => {
      await Promise.all([
        loadDepartments(),
        loadCourses()
      ]);
    });

    // Watch for course selection to load students
    watch(selectedCourse, (newCourse) => {
      if (newCourse) {
        loadStudents();
      }
    });

    const loadDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments();
        departments.value = response;
      } catch (err) {
        console.error('Failed to load departments:', err);
      }
    };

    const loadCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        courses.value = response;
        console.log('Loaded courses:', courses.value); // Debug course data
      } catch (err) {
        console.error('Failed to load courses:', err);
      }
    };

    const loadStudents = async () => {
      if (!selectedCourse.value) return;

      try {
        const response = await candidateService.getAllCandidates();
        students.value = response.map(student => {
          const existingMark = student.Marks.find(m => m.courseId === selectedCourse.value);
          return {
            ...student,
            originalMark: existingMark ? existingMark.mark.currentMark : 0, // Store original mark
            mark: existingMark ? existingMark.mark.currentMark : 0,        // Current editable mark
            modifications: existingMark ? existingMark.mark.modified : []   // Modification history
          };
        });
        console.log('Loaded students:', students.value); // Debug student data
      } catch (err) {
        console.error('Failed to load students:', err);
      }
    };

    // Get coefficient for a student based on their field of study and selected course
    const getStudentCoefficient = (student) => {
      if (!selectedCourse.value) {
        console.log('No course selected, coefficient defaulting to 1');
        return 1;
      }

      const course = courses.value.find(c => c._id === selectedCourse.value);
      if (!course) {
        console.log('Course not found for ID:', selectedCourse.value);
        return 1;
      }

      const deptCoefficient = course.department.find(
        dept => dept.departmentInfo === student.fieldOfStudy
      );

      if (!deptCoefficient) {
        console.log('No coefficient found for fieldOfStudy:', student.fieldOfStudy);
        return 1;
      }

      const coefficient = deptCoefficient.coefficient;
      console.log('Coefficient for student', student._id, ':', coefficient);
      return typeof coefficient === 'number' ? coefficient : 1;
    };

    // Calculate final mark (current mark * coefficient)
    const calculateWeightedMark = (student) => {
      const coefficient = getStudentCoefficient(student);
      return (student.mark || 0) * coefficient;
    };

    // Filtered students based on department and search
    const filteredStudents = computed(() => {
      return students.value.filter(student => {
        const matchesDepartment = selectedDepartment.value 
          ? student.fieldOfStudy === selectedDepartment.value 
          : true;
        const matchesSearch = searchQuery.value 
          ? (student.user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
             student.user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase())) 
          : true;
        return matchesDepartment && matchesSearch;
      });
    });

    // Get field name for a given field ID
    const getFieldName = (fieldId) => {
      if (!fieldId) return 'Unknown Field';
      const dept = departments.value.find(d => d._id === fieldId);
      return dept ? dept.name : 'Unknown Field';
    };

    // Submit only modified marks
    const submitMarks = async () => {
      if (!selectedCourse.value) {
        console.error('No course selected. Please select a course before submitting marks.');
        return;
      }

      // Filter students with modified marks
      const modifiedStudents = filteredStudents.value.filter(student => student.mark !== student.originalMark);

      if (modifiedStudents.length === 0) {
        console.log('No marks have been modified.');
        return;
      }

      const marksToSubmit = modifiedStudents.map(student => ({
        candidateId: student._id,
        courseId: selectedCourse.value,
        mark: {
          currentMark: student.mark,
          modified: [{
            modifiedBy: {
              name: 'john', // Replace with dynamic user data in a real app
              userId: '67c27ede7d34bf9e2a6ec7b0' // Replace with current user ID
            },
            preMark: student.originalMark, // Previous mark
            modMark: student.mark          // New mark
          }]
        }
      }));

      try {
        console.log(marksToSubmit);
        
        await marksService.updateCandidateMarks(marksToSubmit);
        console.log('Modified marks submitted successfully:', marksToSubmit);
        await loadStudents(); // Reload to reflect updates
      } catch (error) {
        console.error('Failed to submit marks:', error);
      }
    };

    return {
      departments,
      courses,
      students,
      selectedDepartment,
      selectedCourse,
      searchQuery,
      filteredStudents,
      calculateWeightedMark,
      getStudentCoefficient,
      getFieldName,
      submitMarks
    };
  }
};
</script>
<template>
  <h1 class="text-2xl font-semibold">
    Student Registered Courses
  </h1>
  <div class="container mx-auto px-4 py-8">
    <!-- Filters Section -->
    <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Department Selection -->
      <div>
        <label for="department-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select
          Department</label>
        <select id="department-select" v-model="selectedDepartmentId"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark">
          <option value="all">All Departments</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>


    </div>

    <!-- Search and Semester Filter -->
    <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:w-64">
        <input v-model="searchQuery" type="text" placeholder="Search courses..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark" />
        <button v-if="searchQuery" @click="searchQuery = ''"
          class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          ✕
        </button>
      </div>

      <div class="flex items-center gap-4">
        <select v-model="selectedSemester"
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark">
          <option value="all">All Semesters</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>

        <select v-model="sortBy"
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark">
          <option value="courseCode">Sort by Course Code</option>
          <option value="courseName">Sort by Course Name</option>
          <option value="credits">Sort by Credits</option>
          <option value="studentName">Sort by Student</option>
        </select>

        <button @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700">
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Courses</h3>
        <p class="text-3xl font-bold text-primary-light dark:text-primary-dark">{{ filteredRegistrations.length }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Credit Hours</h3>
        <p class="text-3xl font-bold text-primary-light dark:text-primary-dark">{{ totalCredits }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Students Enrolled</h3>
        <p class="text-3xl font-bold text-primary-light dark:text-primary-dark">{{ uniqueStudentsCount }}</p>
      </div>
    </div>

    <!-- Courses List -->
    <div v-if="paginatedRegistrations.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Course Code
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Course Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Credits
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Student
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Department
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Semester
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="reg in paginatedRegistrations" :key="`${reg.studentId}-${reg.courseId}`"
            class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ reg.courseCode }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
              {{ reg.courseName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ reg.credits }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div
                  class="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                  {{ getInitials(reg.studentName) }}
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ reg.studentName }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ reg.studentId }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ reg.departmentName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              Semester {{ reg.semester }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="reg.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                reg.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                  'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'">
                {{ reg.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button @click="viewRegistrationDetails(reg)"
                class="text-primary-light dark:text-primary-dark hover:opacity-75 mr-3"
                title="View Registration Details">
                <font-awesome-icon :icon="['fas', 'eye']" />
              </button>

              <button @click="updateRegistrationStatus(reg)"
                class="text-yellow-600 dark:text-yellow-400 hover:opacity-75" title="Update Registration Status">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p class="text-gray-500 dark:text-gray-400">
        {{ searchQuery ? 'No courses match your search criteria' : 'No registered courses found' }}
      </p>
      <button @click="addNewRegistration"
        class="mt-4 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90">
        Register New Course
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="filteredRegistrations.length > 0" class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Showing <span class="font-medium">{{ paginationStart }}</span> to <span class="font-medium">{{ paginationEnd
        }}</span> of <span class="font-medium">{{ filteredRegistrations.length }}</span> registrations
      </div>
      <div class="flex space-x-2">
        <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-md" :class="currentPage === 1
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'">
          Previous
        </button>
        <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-md" :class="currentPage === totalPages
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'">
          Next
        </button>
      </div>
    </div>

    <!-- View Registration Details Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">Course Registration Details</h3>
          <button @click="showViewModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <div v-if="selectedRegistration" class="space-y-6">
          <div class="flex items-center justify-center mb-6">
            <div
              class="h-20 w-20 bg-primary-light dark:bg-primary-dark opacity-20 rounded-full flex items-center justify-center">
              <span class="text-3xl font-bold text-primary-light dark:text-primary-dark">{{
                selectedRegistration.courseCode.substring(0, 2) }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6">
            <!-- Course Information -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-primary-light dark:text-primary-dark mb-3">Course Information</h4>
              <div class="grid grid-cols-2 gap-y-3">
                <div class="text-sm text-gray-500 dark:text-gray-400">Course Code</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedRegistration.courseCode }}
                </div>

                <div class="text-sm text-gray-500 dark:text-gray-400">Course Name</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedRegistration.courseName }}
                </div>

                <div class="text-sm text-gray-500 dark:text-gray-400">Credits</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedRegistration.credits }}
                </div>

                <div class="text-sm text-gray-500 dark:text-gray-400">Semester</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Semester {{
                  selectedRegistration.semester }}</div>
              </div>
            </div>

            <!-- Student Information -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-primary-light dark:text-primary-dark mb-3">Student Information</h4>
              <div class="grid grid-cols-2 gap-y-3">
                <div class="text-sm text-gray-500 dark:text-gray-400">Student ID</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedRegistration.studentId }}
                </div>

                <div class="text-sm text-gray-500 dark:text-gray-400">Name</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedRegistration.studentName }}
                </div>

                <div class="text-sm text-gray-500 dark:text-gray-400">Department</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedRegistration.departmentName
                }}</div>
              </div>
            </div>

            <!-- Registration Status -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-primary-light dark:text-primary-dark mb-3">Registration Status</h4>
              <div class="grid grid-cols-2 gap-y-3">
                <div class="text-sm text-gray-500 dark:text-gray-400">Status</div>
                <div class="text-sm font-medium">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" :class="selectedRegistration.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                    selectedRegistration.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                      'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'">
                    {{ selectedRegistration.status }}
                  </span>
                </div>

                <div class="text-sm text-gray-500 dark:text-gray-400">Registration Date</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{
                  selectedRegistration.registrationDate }}</div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button @click="showViewModal = false"
              class="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Close
            </button>
            <button @click="updateRegistrationStatus(selectedRegistration)"
              class="px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:opacity-90">
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Update Registration Status</h3>
          <button @click="showStatusModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <div v-if="selectedRegistration" class="mb-6">
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Update the registration status for <strong>{{ selectedRegistration.courseName }}</strong> ({{
              selectedRegistration.courseCode }}) by <strong>{{ selectedRegistration.studentName }}</strong>
          </p>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select v-model="statusForm.status"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comments (Optional)</label>
            <textarea v-model="statusForm.comments" rows="3"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              placeholder="Add any additional notes or comments"></textarea>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="showStatusModal = false"
            class="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button @click="saveStatusUpdate"
            class="px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Add New Registration Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Register New Course</h3>
          <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <form @submit.prevent="saveNewRegistration" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student</label>
            <select v-model="registrationForm.studentId"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required @change="updateStudentDetails">
              <option disabled value="">Select a student</option>
              <option v-for="student in students" :key="student.id" :value="student.id">
                {{ student.name }} ({{ student.id }})
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
            <select v-model="registrationForm.courseId"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required @change="updateCourseDetails">
              <option disabled value="">Select a course</option>
              <option v-for="course in availableCourses" :key="course.id" :value="course.id">
                {{ course?.name }} ({{ course?.code }}) - {{ course?.credits }} credits
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
            <select v-model="registrationForm.semester"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select v-model="registrationForm.status"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showAddModal = false"
              class="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:opacity-90">
              Register Course
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../api/client.js';
import { ENDPOINTS } from '../../api/config.js';

export default {
  props: {
    departments: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      // Filter and search states
      selectedDepartmentId: 'all',
      selectedStudentId: 'all',
      selectedSemester: 'all',
      searchQuery: '',
      sortBy: 'courseCode',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10,

      // Modal states
      showViewModal: false,
      showStatusModal: false,
      showAddModal: false,
      selectedRegistration: null,

      // Form states
      statusForm: {
        status: '',
        comments: ''
      },
      registrationForm: {
        studentId: '',
        courseId: '',
        semester: '1',
        status: 'Active'
      },

      // Data

      students: [
        { id: 'STU001', name: 'John Smith', departmentId: 'CS' },
        { id: 'STU002', name: 'Sarah Johnson', departmentId: 'CS' },
        { id: 'STU003', name: 'Michael Brown', departmentId: 'ENG' },
        { id: 'STU004', name: 'Emily Davis', departmentId: 'ENG' },
        { id: 'STU005', name: 'Robert Wilson', departmentId: 'BUS' },
        { id: 'STU006', name: 'Jessica Lee', departmentId: 'BUS' },
        { id: 'STU007', name: 'David Martinez', departmentId: 'MED' },
        { id: 'STU008', name: 'Jennifer Taylor', departmentId: 'MED' },
        { id: 'STU009', name: 'Daniel Harris', departmentId: 'ART' },
        { id: 'STU010', name: 'Amanda Garcia', departmentId: 'ART' }
      ],

      courses: [],

      registrations: [
        {
          id: 1,
          studentId: 'STU001',
          courseId: 'CS101',
          semester: '1',
          status: 'Active',
          registrationDate: '2025-01-15'
        },
        {
          id: 2,
          studentId: 'STU001',
          courseId: 'CS201',
          semester: '1',
          status: 'Active',
          registrationDate: '2025-01-15'
        },
        {
          id: 3,
          studentId: 'STU002',
          courseId: 'CS101',
          semester: '1',
          status: 'Active',
          registrationDate: '2025-01-16'
        },
        {
          id: 4,
          studentId: 'STU003',
          courseId: 'ENG101',
          semester: '1',
          status: 'Active',
          registrationDate: '2025-01-14'
        },
        {
          id: 5,
          studentId: 'STU004',
          courseId: 'ENG201',
          semester: '1',
          status: 'Pending',
          registrationDate: '2025-01-17'
        },
        {
          id: 6,
          studentId: 'STU005',
          courseId: 'BUS101',
          semester: '2',
          status: 'Active',
          registrationDate: '2025-01-15'
        },
        {
          id: 7,
          studentId: 'STU006',
          courseId: 'BUS201',
          semester: '2',
          status: 'Dropped',
          registrationDate: '2025-01-16'
        },
        {
          id: 8,
          studentId: 'STU007',
          courseId: 'MED101',
          semester: '1',
          status: 'Active',
          registrationDate: '2025-01-15'
        },
        {
          id: 9,
          studentId: 'STU008',
          courseId: 'MED201',
          semester: '2',
          status: 'Active',
          registrationDate: '2025-01-16'
        },
        {
          id: 10,
          studentId: 'STU009',
          courseId: 'ART101',
          semester: '1',
          status: 'Pending',
          registrationDate: '2025-01-16'
        },
        {
          id: 11,
          studentId: 'STU010',
          courseId: 'ART201',
          semester: '2',
          status: 'Active',
          registrationDate: '2025-01-17'
        },
        {
          id: 12,
          studentId: 'STU001',
          courseId: 'CS301',
          semester: '2',
          status: 'Active',
          registrationDate: '2025-01-18'
        }
      ]
    }
  },

  computed: {
    // Courses available for registration (exclude already registered courses by selected student)
    availableCourses() {
      if (!this.registrationForm.studentId) {
        return this.courses;
      }

      const registeredCourseIds = this.registrations
        .filter(reg => reg.studentId === this.registrationForm.studentId)
        .map(reg => reg.courseId);

      return this.courses.filter(course => !registeredCourseIds.includes(course.id));
    },

    // Registrations with all details for display
    registrationsWithDetails() {
      return this.registrations.map(reg => {
        const student = this.students.find(s => s.id === reg.studentId);
        const course = this.courses.find(c => c.id === reg.courseId);
        // const department = this.departments.find(d => d.id === student.departmentId);

        return {
          ...reg,
          studentName: student?.name,
          courseCode: course?.code,
          courseName: course?.name,
          credits: course?.credits,
          departmentId: student?.departmentId,
          departmentName: ""
        };
      });
    },

    // Registrations filtered by selected criteria
    filteredRegistrations() {
      let result = [...this.registrationsWithDetails];

      // Filter by department
      if (this.selectedDepartmentId !== 'all') {
        result = result.filter(reg => reg.departmentId === this.selectedDepartmentId);
      }

      // Filter by student
      if (this.selectedStudentId !== 'all') {
        result = result.filter(reg => reg.studentId === this.selectedStudentId);
      }

      // Filter by semester
      if (this.selectedSemester !== 'all') {
        result = result.filter(reg => reg.semester === this.selectedSemester);
      }

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(reg =>
          reg.courseCode.toLowerCase().includes(query) ||
          reg.courseName.toLowerCase().includes(query) ||
          reg.studentName.toLowerCase().includes(query) ||
          reg.departmentName.toLowerCase().includes(query)
        );
      }

      // Sort results
      result.sort((a, b) => {
        let compareA, compareB;

        switch (this.sortBy) {
          case 'courseCode':
            compareA = a.courseCode;
            compareB = b.courseCode;
            break;
          case 'courseName':
            compareA = a.courseName;
            compareB = b.courseName;
            break;
          case 'credits':
            compareA = a.credits;
            compareB = b.credits;
            break;
          case 'studentName':
            compareA = a.studentName;
            compareB = b.studentName;
            break;
          default:
            compareA = a.courseCode;
            compareB = b.courseCode;
        }

        if (this.sortOrder === 'asc') {
          return compareA > compareB ? 1 : -1;
        } else {
          return compareA < compareB ? 1 : -1;
        }
      });

      return result;
    },

    // Paginated registrations for current page
    paginatedRegistrations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredRegistrations.slice(start, end);
    },

    // Pagination data
    totalPages() {
      return Math.ceil(this.filteredRegistrations.length / this.itemsPerPage);
    },

    paginationStart() {
      return this.filteredRegistrations.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    },

    paginationEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredRegistrations.length);
    },

    // Statistics
    totalCredits() {
      return this.filteredRegistrations.reduce((sum, reg) => sum + reg.credits, 0);
    },

    uniqueStudentsCount() {
      const uniqueStudentIds = new Set(this.filteredRegistrations.map(reg => reg.studentId));
      return uniqueStudentIds.size;
    }
  },

  watch: {
    // Reset pagination when filters change
    selectedDepartmentId() {
      this.currentPage = 1;
      // Reset student selection when department changes
      this.selectedStudentId = 'all';
    },
    selectedStudentId() {
      this.currentPage = 1;
    },
    selectedSemester() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    },

    // Reset form when modal closes
    showStatusModal(newVal) {
      if (!newVal) {
        this.statusForm = {
          status: '',
          comments: ''
        };
      }
    },
    showAddModal(newVal) {
      if (!newVal) {
        this.registrationForm = {
          studentId: '',
          courseId: '',
          semester: '1',
          status: 'Active'
        };
      }
    }
  },

  methods: {
    // Get initials for student avatar
    getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    },

    // Modal handlers
    viewRegistrationDetails(registration) {
      this.selectedRegistration = registration;
      this.showViewModal = true;
    },

    updateRegistrationStatus(registration) {
      this.selectedRegistration = registration;
      this.statusForm.status = registration.status;
      this.showStatusModal = true;
      this.showViewModal = false; // Close view modal if open
    },

    addNewRegistration() {
      this.showAddModal = true;
    },

    // Form handlers
    saveStatusUpdate() {
      // Find the registration index
      const index = this.registrations.findIndex(
        reg => reg.studentId === this.selectedRegistration.studentId &&
          reg.courseId === this.selectedRegistration.courseId
      );

      if (index !== -1) {
        // Update the registration status
        this.registrations[index].status = this.statusForm.status;

        // In a real app, you would save comments to a database here
        console.log('Status updated with comments:', this.statusForm.comments);

        // Show success message
        alert(`Status updated to ${this.statusForm.status}`);

        // Close the modal
        this.showStatusModal = false;
      }
    },

    updateStudentDetails() {
      // This would typically fetch additional student details if needed
      console.log('Student selected:', this.registrationForm.studentId);
    },

    updateCourseDetails() {
      // This would typically fetch additional course details if needed
      console.log('Course selected:', this.registrationForm.courseId);
    },

    saveNewRegistration() {
      // Generate a new ID (in a real app, this would be handled by the backend)
      const newId = Math.max(...this.registrations.map(reg => reg.id)) + 1;

      // Create the registration date (today's date)
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      // Create new registration object
      const newRegistration = {
        id: newId,
        studentId: this.registrationForm.studentId,
        courseId: this.registrationForm.courseId,
        semester: this.registrationForm.semester,
        status: this.registrationForm.status,
        registrationDate: formattedDate
      };

      // Add to registrations array
      this.registrations.push(newRegistration);

      // Show success message
      alert('Course registration successful!');

      // Close the modal
      this.showAddModal = false;
    },
    async fetchCourse() {
      try {
        const response = await axios.get(ENDPOINTS.COURSES);
        this.courses = response.data;

      } catch (error) {
        console.error('Erreur lors de la récupération des départements :', error);
      }
    },

  }
};

</script>
<style>
/* Add this to your global styles or component styles */
button[title] {
  position: relative;
}

button[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
}
</style>
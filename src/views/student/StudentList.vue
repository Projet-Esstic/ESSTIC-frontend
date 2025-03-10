<template>
  <h1 class="text-2xl font-semibold">Student List</h1>
  <div class="container mx-auto px-4 py-8">
    <!-- Department Selection -->
    <div class="mb-6">
      <label for="department-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Department</label>
      <select 
        id="department-select"
        v-model="selectedDepartmentId" 
        class="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
      >
        <option value="all">All Departments</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }}
        </option>
      </select>
    </div>

    <div class="text-left mb-8">
      <h1 class="text-3xl font-bold text-primary-light dark:text-primary-dark">
        {{ currentDepartmentName }} Students
      </h1>
      <p class="text-text-light dark:text-text-dark mt-2">
        Total Students: {{ filteredByDepartmentStudents.length }}
      </p>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:w-64">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search students..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
        />
        <button 
          v-if="searchQuery" 
          @click="searchQuery = ''"
          class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      <div class="flex items-center gap-4">
        <select 
          v-model="sortBy" 
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
        >
          <option value="name">Sort by Name</option>
          <option value="id">Sort by ID</option>
          <option value="level">Sort by Level</option>
          <option value="departmentName">Sort by Department</option>
        </select>
        
        <button 
          @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
          class="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </button>
      </div>
    </div>

    <!-- Student List -->
    <div v-if="paginatedStudents.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Student ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Department
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Level
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="student in paginatedStudents" :key="student.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ student.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                  {{ getInitials(student.name) }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ student.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ getDepartmentName(student.departmentId) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ student.level }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ student.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
  <button 
    @click="viewStudent(student)" 
    class="text-primary-light dark:text-primary-dark hover:opacity-75 mr-3"
    title="View Student"
  >
    <font-awesome-icon :icon="['fas', 'eye']" />
  </button>
  <button 
    @click="editStudent(student)" 
    class="text-yellow-600 dark:text-yellow-400 hover:opacity-75 mr-3"
    title="Edit Student"
  >
    <font-awesome-icon :icon="['fas', 'edit']" />
  </button>
  <button 
    @click="confirmDelete(student)" 
    class="text-red-600 dark:text-red-400 hover:opacity-75"
    title="Delete Student"
  >
    <font-awesome-icon :icon="['fas', 'trash']" />
  </button>
</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p class="text-gray-500 dark:text-gray-400">
        {{ searchQuery ? 'No students match your search criteria' : 'No students in this department yet' }}
      </p>
      <button 
        @click="addNewStudent" 
        class="mt-4 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90"
      >
        Add New Student
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="filteredStudents.length > 0" class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Showing <span class="font-medium">{{ paginationStart }}</span> to <span class="font-medium">{{ paginationEnd }}</span> of <span class="font-medium">{{ filteredStudents.length }}</span> students
      </div>
      <div class="flex space-x-2">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-md"
          :class="currentPage === 1 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
        >
          Previous
        </button>
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-md"
          :class="currentPage === totalPages 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete {{ studentToDelete ? studentToDelete.name : '' }}? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false" 
            class="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button 
            @click="deleteStudent" 
            class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- View Student Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Student Details</h3>
          <button @click="showViewModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <div v-if="selectedStudent" class="space-y-4">
          <div class="flex justify-center mb-6">
            <div class="h-24 w-24 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-2xl text-gray-500 dark:text-gray-300">
              {{ getInitials(selectedStudent.name) }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-sm text-gray-500 dark:text-gray-400">Student ID</div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedStudent.id }}</div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400">Name</div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedStudent.name }}</div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400">Department</div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ getDepartmentName(selectedStudent.departmentId) }}</div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400">Level</div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedStudent.level }}</div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400">Email</div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ selectedStudent.email }}</div>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button 
            @click="editStudent(selectedStudent)" 
            class="px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:opacity-90"
          >
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Edit/Add Student Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ isEditing ? 'Edit Student' : 'Add New Student' }}
          </h3>
          <button @click="showEditModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <form @submit.prevent="saveStudent" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label>
            <input 
              v-model="editForm.id" 
              type="text" 
              :readonly="isEditing"
              :class="{'bg-gray-100 dark:bg-gray-700': isEditing}"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              v-model="editForm.name" 
              type="text" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <select 
              v-model="editForm.departmentId" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            >
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
            <select 
              v-model="editForm.level" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            >
              <option v-for="level in [1, 2, 3, 4, 5]" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input 
              v-model="editForm.email" 
              type="email" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
              required
            />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              @click="showEditModal = false" 
              class="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentList',
  props: {
    // This prop is no longer required since we now manage departments internally
    defaultDepartmentId: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      // Department data
      departments: [
        { id: 'DEP001', name: 'Computer Security' },
        { id: 'DEP002', name: 'Software Engineering' },
        { id: 'DEP003', name: 'Artificial Intelligence' },
        { id: 'DEP004', name: 'Data Science' },
        { id: 'DEP005', name: 'Networks & Telecommunications' }
      ],
      selectedDepartmentId: 'all', // Default to showing all departments
      
      // Student data
      students: [
        // Computer Security students
        { id: 'ST001', name: 'John Doe', level: 3, email: 'john.doe@esstic.edu', departmentId: 'DEP001' },
        { id: 'ST002', name: 'Jane Smith', level: 2, email: 'jane.smith@esstic.edu', departmentId: 'DEP001' },
        { id: 'ST003', name: 'Samuel Johnson', level: 4, email: 'samuel.j@esstic.edu', departmentId: 'DEP001' },
        { id: 'ST004', name: 'Alice Brown', level: 1, email: 'alice.b@esstic.edu', departmentId: 'DEP001' },
        
        // Software Engineering students
        { id: 'ST005', name: 'Robert Wilson', level: 3, email: 'r.wilson@esstic.edu', departmentId: 'DEP002' },
        { id: 'ST006', name: 'Emily Davis', level: 2, email: 'emily.d@esstic.edu', departmentId: 'DEP002' },
        { id: 'ST007', name: 'Michael Clark', level: 4, email: 'michael.c@esstic.edu', departmentId: 'DEP002' },
        { id: 'ST008', name: 'Sophia Martinez', level: 1, email: 'sophia.m@esstic.edu', departmentId: 'DEP002' },
        
        // Artificial Intelligence students
        { id: 'ST009', name: 'David Anderson', level: 5, email: 'david.a@esstic.edu', departmentId: 'DEP003' },
        { id: 'ST010', name: 'Olivia Taylor', level: 3, email: 'olivia.t@esstic.edu', departmentId: 'DEP003' },
        { id: 'ST011', name: 'James Wilson', level: 2, email: 'james.w@esstic.edu', departmentId: 'DEP003' },
        { id: 'ST012', name: 'Emma Garcia', level: 4, email: 'emma.g@esstic.edu', departmentId: 'DEP003' },
        
        // Data Science students
        { id: 'ST013', name: 'Benjamin Lee', level: 1, email: 'benjamin.l@esstic.edu', departmentId: 'DEP004' },
        { id: 'ST014', name: 'Ava Hernandez', level: 3, email: 'ava.h@esstic.edu', departmentId: 'DEP004' },
        { id: 'ST015', name: 'Lucas Moore', level: 5, email: 'lucas.m@esstic.edu', departmentId: 'DEP004' },
        { id: 'ST016', name: 'Mia Robinson', level: 2, email: 'mia.r@esstic.edu', departmentId: 'DEP004' },
        
        // Networks & Telecommunications students
        { id: 'ST017', name: 'Alexander White', level: 4, email: 'alexander.w@esstic.edu', departmentId: 'DEP005' },
        { id: 'ST018', name: 'Charlotte Lewis', level: 1, email: 'charlotte.l@esstic.edu', departmentId: 'DEP005' },
        { id: 'ST019', name: 'Ethan Scott', level: 3, email: 'ethan.s@esstic.edu', departmentId: 'DEP005' },
        { id: 'ST020', name: 'Amelia Green', level: 2, email: 'amelia.g@esstic.edu', departmentId: 'DEP005' }
      ],
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc',
      currentPage: 1,
      itemsPerPage: 10,
      
      // Delete modal state
      showDeleteModal: false,
      studentToDelete: null,
      
      // View modal state
      showViewModal: false,
      selectedStudent: null,
      
      // Edit/Add modal state
      showEditModal: false,
      isEditing: false,
      editForm: {
        id: '',
        name: '',
        email: '',
        level: 1,
        departmentId: ''
      }
    }
  },
  computed: {
    currentDepartmentName() {
      if (this.selectedDepartmentId === 'all') {
        return 'All';
      }
      
      const department = this.departments.find(dept => dept.id === this.selectedDepartmentId);
      return department ? department.name : '';
    },
    
    filteredByDepartmentStudents() {
      if (this.selectedDepartmentId === 'all') {
        return this.students;
      }
      
      return this.students.filter(student => student.departmentId === this.selectedDepartmentId);
    },
    
    sortedStudents() {
      return [...this.filteredByDepartmentStudents].sort((a, b) => {
        let aValue, bValue;
        
        if (this.sortBy === 'departmentName') {
          aValue = this.getDepartmentName(a.departmentId).toLowerCase();
          bValue = this.getDepartmentName(b.departmentId).toLowerCase();
        } else {
          aValue = a[this.sortBy];
          bValue = b[this.sortBy];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
        }
        
        if (this.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },
    
    filteredStudents() {
      if (!this.searchQuery) {
        return this.sortedStudents;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.sortedStudents.filter(student => {
        const departmentName = this.getDepartmentName(student.departmentId).toLowerCase();
        return student.name.toLowerCase().includes(query) || 
               student.id.toLowerCase().includes(query) || 
               student.email.toLowerCase().includes(query) ||
               student.level.toString().includes(query) ||
               departmentName.includes(query);
      });
    },
    
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredStudents.slice(start, end);
    },
    
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredStudents.length / this.itemsPerPage));
    },
    
    paginationStart() {
      return this.filteredStudents.length ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
    },
    
    paginationEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredStudents.length);
    }
  },
  methods: {
    getDepartmentName(departmentId) {
      const department = this.departments.find(dept => dept.id === departmentId);
      return department ? department.name : 'Unknown Department';
    },
    
    getInitials(name) {
      if (!name) return '';
      return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    },
    
    // View student details
    viewStudent(student) {
      this.selectedStudent = { ...student };
      this.showViewModal = true;
    },
    
    // Edit student
    editStudent(student) {
      this.isEditing = true;
      this.editForm = { ...student };
      this.showViewModal = false;
      this.showEditModal = true;
    },
    
    // Delete student
    confirmDelete(student) {
      this.studentToDelete = student;
      this.showDeleteModal = true;
    },
    
    deleteStudent() {
      if (this.studentToDelete) {
        this.students = this.students.filter(s => s.id !== this.studentToDelete.id);
      }
      this.showDeleteModal = false;
      this.studentToDelete = null;
      
      // Reset to first page if current page is now empty
      if (this.paginatedStudents.length === 0 && this.currentPage > 1) {
        this.currentPage = Math.max(1, this.currentPage - 1);
      }
    },
    
    // Add new student
    addNewStudent() {
      this.isEditing = false;
      
      // Generate new ID based on the highest existing ID
      const highestId = this.students.reduce((max, student) => {
        const idNum = parseInt(student.id.replace('ST', ''));
        return idNum > max ? idNum : max;
      }, 0);
      
      const newId = `ST${String(highestId + 1).padStart(3, '0')}`;
      
      this.editForm = {
        id: newId,
        name: '',
        email: '',
        level: 1,
        // Set default department to the currently selected one (if not 'all')
        departmentId: this.selectedDepartmentId !== 'all' ? this.selectedDepartmentId : this.departments[0].id
      };
      
      this.showEditModal = true;
    },
    
    // Save student (add or update)
    saveStudent() {
      if (this.isEditing) {
        // Update existing student
        const index = this.students.findIndex(s => s.id === this.editForm.id);
        if (index !== -1) {
          this.students[index] = { ...this.editForm };
        }
      } else {
        // Add new student
        this.students.push({ ...this.editForm });
      }
      
      this.showEditModal = false;
      this.editForm = {
        id: '',
        name: '',
        email: '',
        level: 1,
        departmentId: ''
      };
    }
  },
  watch: {
    // Reset to first page when search query or department changes
    searchQuery() {
      this.currentPage = 1;
    },
    selectedDepartmentId() {
      this.currentPage = 1;
    }
  },
  created() {
    // Initialize with default department if provided
    if (this.defaultDepartmentId && 
        (this.defaultDepartmentId === 'all' || 
         this.departments.some(dept => dept.id === this.defaultDepartmentId))) {
      this.selectedDepartmentId = this.defaultDepartmentId;
    }
  }
}
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
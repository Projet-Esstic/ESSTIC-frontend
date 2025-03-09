<template>
  <div class="student-attendance">
    <!-- Main Container -->
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-6">Student Attendance System</h1>
      
      <!-- Attendance Taking Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Take Attendance</h2>
        
        <!-- Class, Date and Course Selection -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
            <select v-model="selectedClass" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option :value="null">-- Select Class --</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <input type="date" v-model="selectedDate" class="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :max="currentDate">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
            <select v-model="selectedCourse" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :disabled="!selectedClass">
              <option :value="null">-- Select Course --</option>
              <option v-for="course in classCoursesOptions" :key="course.id" :value="course.id">{{ course.name }}</option>
            </select>
          </div>
        </div>
        
        <!-- Attendance Form -->
        <div v-if="attendanceStatus !== 'notTaken' && currentAttendance.length > 0">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">
              {{ attendanceStatus === 'new' ? 'New Attendance' : (attendanceStatus === 'edit' ? 'Edit Attendance' : 'Attendance Saved') }}
            </h3>
            <div class="flex space-x-2">
              <button @click="markAll('present')" class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                Mark All Present
              </button>
              <button @click="markAll('absent')" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                Mark All Absent
              </button>
              <button @click="markAll('late')" class="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                Mark All Late
              </button>
            </div>
          </div>
          
          <!-- Students Attendance Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="student in currentAttendance" :key="student.studentId">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ student.rollNumber }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.gender }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="student.status = 'present'" 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="student.status === 'present' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'">
                        Present
                      </button>
                      <button 
                        @click="student.status = 'absent'" 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="student.status === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'">
                        Absent
                      </button>
                      <button 
                        @click="student.status = 'late'" 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="student.status === 'late' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'">
                        Late
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <span class="mr-2 truncate max-w-xs">{{ student.notes }}</span>
                      <button @click="startEditingNotes(student.studentId, student.notes)" class="text-indigo-600 hover:text-indigo-900">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Save Button -->
          <div class="mt-6 flex justify-end">
            <button 
              @click="saveAttendance" 
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ attendanceStatus === 'edit' ? 'Update Attendance' : 'Save Attendance' }}
            </button>
          </div>
        </div>
        
        <!-- No students message -->
        <div v-else-if="selectedClass && selectedCourse && !currentAttendance.length" class="text-center py-8">
          <p class="text-gray-500">No students found in this class.</p>
        </div>
        
        <!-- Select class and course prompt -->
        <div v-else-if="!selectedClass || !selectedCourse" class="text-center py-8">
          <p class="text-gray-500">Please select a class and course to take attendance.</p>
        </div>
      </div>
      
      <!-- Edit Notes Modal -->
      <div v-if="editingNotes" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 class="text-lg font-medium mb-4">Edit Notes</h3>
          <textarea v-model="editNoteText" rows="4" class="w-full border rounded-md p-2 mb-4"></textarea>
          <div class="flex justify-end space-x-2">
            <button @click="cancelEditNotes" class="px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button @click="saveNotes" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Save
            </button>
          </div>
        </div>
      </div>
      
      <!-- Attendance Reports & Analysis Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-6">Attendance Reports & Analysis</h2>
        
        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div class="flex flex-col space-y-2">
              Start<input type="date" v-model="dateRange.start" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              End<input type="date" v-model="dateRange.end" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select v-model="filterDepartment" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">All Departments</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select v-model="filterCourse" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">All Courses</option>
              <option v-for="course in courseOptions" :key="course.id" :value="course.id">{{ course.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <input type="text" v-model="filterStudent" placeholder="Search by name" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Attendance Status</label>
            <select v-model="filterAttendanceStatus" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>
        
        <!-- Filter Actions -->
        <div class="flex justify-between items-center mb-6">
          <button @click="clearFilters" class="px-3 py-1 border rounded hover:bg-gray-100">
            Clear Filters
          </button>
          <button @click="exportToCSV" class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Export to CSV
          </button>
        </div>
        
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500">Total Students</h4>
            <p class="text-2xl font-bold">{{ attendanceStats.totalStudents }}</p>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500">Total Classes</h4>
            <p class="text-2xl font-bold">{{ attendanceStats.totalClasses }}</p>
          </div>
          
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-green-700">Present</h4>
            <p class="text-2xl font-bold text-green-700">{{ attendanceStats.presentPercentage }}%</p>
          </div>
          
          <div class="bg-red-50 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-red-700">Absent</h4>
            <p class="text-2xl font-bold text-red-700">{{ attendanceStats.absentPercentage }}%</p>
          </div>
          
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-yellow-700">Late</h4>
            <p class="text-2xl font-bold text-yellow-700">{{ attendanceStats.latePercentage }}%</p>
          </div>
        </div>
        
        <!-- Attendance Records Table -->
        <div v-if="paginatedAttendanceData.records.length > 0">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="record in paginatedAttendanceData.records" :key="`${record.date}-${record.courseId}-${record.studentId}`">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatDate(record.date) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.class }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.course }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.studentName }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded" :class="getStatusClass(record.status)">
                      {{ record.status.charAt(0).toUpperCase() + record.status.slice(1) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ record.notes }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4">
            <div class="flex justify-between w-full">
              <div class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, paginatedAttendanceData.totalRecords) }}</span> of <span class="font-medium">{{ paginatedAttendanceData.totalRecords }}</span> results
              </div>
              <div>
                <nav class="inline-flex rounded-md shadow-sm">
                  <button 
                    @click="currentPage > 1 ? currentPage-- : null" 
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                    Previous
                  </button>
                  <div class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm">
                    {{ currentPage }} / {{ totalPages }}
                  </div>
                  <button 
                    @click="currentPage < totalPages ? currentPage++ : null" 
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No records message -->
        <div v-else class="text-center py-8">
          <p class="text-gray-500">No attendance records found for the selected filters.</p>
        </div>
      </div>
      
      <!-- Individual Student Report (Modal-like section that could be expanded) -->
      <div v-if="false" class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Student Attendance Report</h2>
        <!-- This section would be implemented when clicking on a student -->
        <!-- For now, it's commented out as it would be triggered by a user action -->
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: 'StudentAttendance',
  data() {
    return {
      // Core data
      currentDate: new Date().toISOString().split('T')[0],
      selectedClass: null,
      selectedDate: new Date().toISOString().split('T')[0],
      selectedCourse: null,
      attendanceStatus: 'notTaken',

      // Filter states
      dateRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      filterDepartment: 'all',
      filterCourse: 'all',
      filterStudent: '',
      filterAttendanceStatus: 'all',
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 10,
      
      // Data collections
      classes: [
        { id: 'CS-Y1', name: 'Computer Science - Year 1', departmentId: 'CS' },
        { id: 'CS-Y2', name: 'Computer Science - Year 2', departmentId: 'CS' },
        { id: 'CS-Y3', name: 'Computer Science - Year 3', departmentId: 'CS' },
        { id: 'ENG-Y1', name: 'Engineering - Year 1', departmentId: 'ENG' },
        { id: 'ENG-Y2', name: 'Engineering - Year 2', departmentId: 'ENG' },
        { id: 'BUS-Y1', name: 'Business Studies - Year 1', departmentId: 'BUS' },
        { id: 'BUS-Y2', name: 'Business Studies - Year 2', departmentId: 'BUS' }
      ],
      
      departments: [
        { id: 'CS', name: 'Computer Science' },
        { id: 'ENG', name: 'Engineering' },
        { id: 'BUS', name: 'Business Studies' }
      ],
      
      courses: [
        { id: 'CS101', name: 'Introduction to Programming', classId: 'CS-Y1', departmentId: 'CS' },
        { id: 'CS102', name: 'Computer Architecture', classId: 'CS-Y1', departmentId: 'CS' },
        { id: 'CS201', name: 'Data Structures', classId: 'CS-Y2', departmentId: 'CS' },
        { id: 'CS202', name: 'Algorithms', classId: 'CS-Y2', departmentId: 'CS' },
        { id: 'CS301', name: 'Software Engineering', classId: 'CS-Y3', departmentId: 'CS' },
        { id: 'ENG101', name: 'Engineering Principles', classId: 'ENG-Y1', departmentId: 'ENG' },
        { id: 'ENG201', name: 'Circuit Analysis', classId: 'ENG-Y2', departmentId: 'ENG' },
        { id: 'BUS101', name: 'Business Fundamentals', classId: 'BUS-Y1', departmentId: 'BUS' },
        { id: 'BUS201', name: 'Financial Accounting', classId: 'BUS-Y2', departmentId: 'BUS' }
      ],
      
      students: [
        { id: 'S1001', name: 'John Smith', classId: 'CS-Y1', gender: 'Male', rollNumber: '001' },
        { id: 'S1002', name: 'Emma Johnson', classId: 'CS-Y1', gender: 'Female', rollNumber: '002' },
        { id: 'S1003', name: 'Michael Brown', classId: 'CS-Y1', gender: 'Male', rollNumber: '003' },
        { id: 'S1004', name: 'Olivia Davis', classId: 'CS-Y1', gender: 'Female', rollNumber: '004' },
        { id: 'S1005', name: 'William Wilson', classId: 'CS-Y1', gender: 'Male', rollNumber: '005' },
        { id: 'S1006', name: 'Sophia Martinez', classId: 'CS-Y2', gender: 'Female', rollNumber: '001' },
        { id: 'S1007', name: 'James Taylor', classId: 'CS-Y2', gender: 'Male', rollNumber: '002' },
        { id: 'S1008', name: 'Isabella Thomas', classId: 'CS-Y2', gender: 'Female', rollNumber: '003' },
        { id: 'S1009', name: 'Logan Jackson', classId: 'CS-Y3', gender: 'Male', rollNumber: '001' },
        { id: 'S1010', name: 'Ava White', classId: 'CS-Y3', gender: 'Female', rollNumber: '002' },
        { id: 'S1011', name: 'Benjamin Harris', classId: 'ENG-Y1', gender: 'Male', rollNumber: '001' },
        { id: 'S1012', name: 'Mia Clark', classId: 'ENG-Y1', gender: 'Female', rollNumber: '002' },
        { id: 'S1013', name: 'Elijah Lewis', classId: 'ENG-Y2', gender: 'Male', rollNumber: '001' },
        { id: 'S1014', name: 'Charlotte Lee', classId: 'ENG-Y2', gender: 'Female', rollNumber: '002' },
        { id: 'S1015', name: 'Daniel Walker', classId: 'BUS-Y1', gender: 'Male', rollNumber: '001' },
        { id: 'S1016', name: 'Amelia Hall', classId: 'BUS-Y1', gender: 'Female', rollNumber: '002' },
        { id: 'S1017', name: 'Matthew Allen', classId: 'BUS-Y2', gender: 'Male', rollNumber: '001' },
        { id: 'S1018', name: 'Harper Young', classId: 'BUS-Y2', gender: 'Female', rollNumber: '002' }
      ],
      
      // Attendance records
      attendanceRecords: [
        {
          id: 1,
          date: '2025-03-01',
          courseId: 'CS101',
          classId: 'CS-Y1',
          records: [
            { studentId: 'S1001', status: 'present', notes: '' },
            { studentId: 'S1002', status: 'present', notes: '' },
            { studentId: 'S1003', status: 'absent', notes: 'Medical leave' },
            { studentId: 'S1004', status: 'present', notes: '' },
            { studentId: 'S1005', status: 'late', notes: '15 minutes late' }
          ]
        },
        {
          id: 2,
          date: '2025-03-02',
          courseId: 'CS102',
          classId: 'CS-Y1',
          records: [
            { studentId: 'S1001', status: 'present', notes: '' },
            { studentId: 'S1002', status: 'present', notes: '' },
            { studentId: 'S1003', status: 'absent', notes: 'Medical leave' },
            { studentId: 'S1004', status: 'present', notes: '' },
            { studentId: 'S1005', status: 'present', notes: '' }
          ]
        },
        {
          id: 3,
          date: '2025-03-01',
          courseId: 'CS201',
          classId: 'CS-Y2',
          records: [
            { studentId: 'S1006', status: 'present', notes: '' },
            { studentId: 'S1007', status: 'absent', notes: 'No reason provided' },
            { studentId: 'S1008', status: 'present', notes: '' }
          ]
        },
        {
          id: 4,
          date: '2025-03-03',
          courseId: 'ENG101',
          classId: 'ENG-Y1',
          records: [
            { studentId: 'S1011', status: 'present', notes: '' },
            { studentId: 'S1012', status: 'late', notes: '10 minutes late' }
          ]
        },
        {
          id: 5,
          date: '2025-03-05',
          courseId: 'BUS101',
          classId: 'BUS-Y1',
          records: [
            { studentId: 'S1015', status: 'present', notes: '' },
            { studentId: 'S1016', status: 'present', notes: '' }
          ]
        }
      ],
      
      // Current attendance taking form
      currentAttendance: [],
      
      // For editing attendance notes
      editingNotes: false,
      editingStudentId: null,
      editNoteText: ''
    }
  },
  
  computed: {
    // Get courses for selected class
    classCoursesOptions() {
      if (!this.selectedClass) return [];
      return this.courses.filter(course => course.classId === this.selectedClass);
    },
    
    // Get students for selected class
    classStudents() {
      if (!this.selectedClass) return [];
      return this.students.filter(student => student.classId === this.selectedClass);
    },
    
    // Check if attendance has been recorded for selected date and course
    isAttendanceRecorded() {
      return this.attendanceRecords.some(record => 
        record.date === this.selectedDate && 
        record.courseId === this.selectedCourse && 
        record.classId === this.selectedClass
      );
    },
    
    // Get existing attendance record for editing
    existingAttendanceRecord() {
      return this.attendanceRecords.find(record => 
        record.date === this.selectedDate && 
        record.courseId === this.selectedCourse && 
        record.classId === this.selectedClass
      );
    },
    
    // Filter attendance records for reports and analysis
    filteredAttendanceRecords() {
      return this.attendanceRecords.filter(record => {
        // Filter by date range
        const recordDate = new Date(record.date);
        const startDate = new Date(this.dateRange.start);
        const endDate = new Date(this.dateRange.end);
        const dateInRange = recordDate >= startDate && recordDate <= endDate;
        
        // Filter by department
        const courseInfo = this.courses.find(course => course.id === record.courseId);
        const departmentMatch = this.filterDepartment === 'all' || 
                              (courseInfo && courseInfo.departmentId === this.filterDepartment);
        
        // Filter by course
        const courseMatch = this.filterCourse === 'all' || record.courseId === this.filterCourse;
        
        return dateInRange && departmentMatch && courseMatch;
      });
    },
    
    // Process filtered attendance records for table display with pagination
    paginatedAttendanceData() {
      // Flatten the records for table display
      const flattenedRecords = [];
      
      this.filteredAttendanceRecords.forEach(record => {
        const courseInfo = this.courses.find(course => course.id === record.courseId);
        const classInfo = this.classes.find(cls => cls.id === record.classId);
        
        record.records.forEach(studentRecord => {
          // Skip if not matching student filter
          if (this.filterStudent && !this.getStudentName(studentRecord.studentId).toLowerCase().includes(this.filterStudent.toLowerCase())) {
            return;
          }
          
          // Skip if not matching attendance status filter
          if (this.filterAttendanceStatus !== 'all' && studentRecord.status !== this.filterAttendanceStatus) {
            return;
          }
          
          flattenedRecords.push({
            date: record.date,
            course: courseInfo ? courseInfo.name : record.courseId,
            courseId: record.courseId,
            class: classInfo ? classInfo.name : record.classId,
            classId: record.classId,
            studentId: studentRecord.studentId,
            studentName: this.getStudentName(studentRecord.studentId),
            status: studentRecord.status,
            notes: studentRecord.notes
          });
        });
      });
      
      // Sort by date (newest first)
      flattenedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Apply pagination
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      
      return {
        totalRecords: flattenedRecords.length,
        records: flattenedRecords.slice(startIndex, endIndex)
      };
    },
    
    // Calculate total pages for pagination
    totalPages() {
      return Math.ceil(this.paginatedAttendanceData.totalRecords / this.itemsPerPage);
    },
    
    // Calculate attendance statistics
    attendanceStats() {
      if (!this.filteredAttendanceRecords.length) {
        return {
          totalStudents: 0,
          totalClasses: 0,
          presentPercentage: 0,
          absentPercentage: 0,
          latePercentage: 0
        };
      }
      
      // Count total entries
      let totalEntries = 0;
      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;
      
      this.filteredAttendanceRecords.forEach(record => {
        record.records.forEach(studentRecord => {
          totalEntries++;
          if (studentRecord.status === 'present') presentCount++;
          else if (studentRecord.status === 'absent') absentCount++;
          else if (studentRecord.status === 'late') lateCount++;
        });
      });
      
      // Calculate unique classes and students
      const uniqueClasses = new Set(this.filteredAttendanceRecords.map(record => record.courseId + '-' + record.date));
      const uniqueStudents = new Set();
      this.filteredAttendanceRecords.forEach(record => {
        record.records.forEach(studentRecord => {
          uniqueStudents.add(studentRecord.studentId);
        });
      });
      
      return {
        totalStudents: uniqueStudents.size,
        totalClasses: uniqueClasses.size,
        presentPercentage: totalEntries ? Math.round((presentCount / totalEntries) * 100) : 0,
        absentPercentage: totalEntries ? Math.round((absentCount / totalEntries) * 100) : 0,
        latePercentage: totalEntries ? Math.round((lateCount / totalEntries) * 100) : 0
      };
    },
    
    // Get course options for filter dropdown
    courseOptions() {
      if (this.filterDepartment === 'all') {
        return this.courses;
      }
      return this.courses.filter(course => course.departmentId === this.filterDepartment);
    }
  },
  
  watch: {
    // Reset course selection when class changes
    selectedClass() {
      this.selectedCourse = null;
      this.currentAttendance = [];
      this.attendanceStatus = 'notTaken';
    },
    
    // Initialize attendance form when course is selected
    selectedCourse() {
      this.initializeAttendanceForm();
    },
    
    // Reset current page when filters change
    filterDepartment() {
      this.filterCourse = 'all';
      this.currentPage = 1;
    },
    
    filterCourse() {
      this.currentPage = 1;
    },
    
    filterStudent() {
      this.currentPage = 1;
    },
    
    filterAttendanceStatus() {
      this.currentPage = 1;
    },
    
    dateRange: {
      handler() {
        this.currentPage = 1;
      },
      deep: true
    }
  },
  
  methods: {
    // Format date for display
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    // Get student name by ID
    getStudentName(studentId) {
      const student = this.students.find(s => s.id === studentId);
      return student ? student.name : 'Unknown Student';
    },
    
    // Initialize the attendance form
    initializeAttendanceForm() {
      if (!this.selectedClass || !this.selectedCourse) {
        this.currentAttendance = [];
        this.attendanceStatus = 'notTaken';
        return;
      }
      
      // Check if attendance already exists for this date, class, and course
      const existingRecord = this.existingAttendanceRecord;
      
      if (existingRecord) {
        // Load existing attendance data
        this.currentAttendance = this.classStudents.map(student => {
          const existingStudent = existingRecord.records.find(r => r.studentId === student.id);
          return {
            studentId: student.id,
            name: student.name,
            rollNumber: student.rollNumber,
            gender: student.gender,
            status: existingStudent ? existingStudent.status : 'present',
            notes: existingStudent ? existingStudent.notes : ''
          };
        });
        this.attendanceStatus = 'edit';
      } else {
        // Create new attendance form with all students marked present by default
        this.currentAttendance = this.classStudents.map(student => ({
          studentId: student.id,
          name: student.name,
          rollNumber: student.rollNumber,
          gender: student.gender,
          status: 'present',
          notes: ''
        }));
        this.attendanceStatus = 'new';
      }
    },
    
    // Save attendance
    saveAttendance() {
      if (!this.selectedClass || !this.selectedCourse || !this.currentAttendance.length) {
        return;
      }
      
      const existingRecordIndex = this.attendanceRecords.findIndex(record => 
        record.date === this.selectedDate && 
        record.courseId === this.selectedCourse && 
        record.classId === this.selectedClass
      );
      
      const attendanceData = {
        date: this.selectedDate,
        courseId: this.selectedCourse,
        classId: this.selectedClass,
        records: this.currentAttendance.map(student => ({
          studentId: student.studentId,
          status: student.status,
          notes: student.notes
        }))
      };
      
      if (existingRecordIndex >= 0) {
        // Update existing record
        attendanceData.id = this.attendanceRecords[existingRecordIndex].id;
        this.attendanceRecords[existingRecordIndex] = attendanceData;
      } else {
        // Create new record
        attendanceData.id = this.attendanceRecords.length > 0 
          ? Math.max(...this.attendanceRecords.map(r => r.id)) + 1 
          : 1;
        this.attendanceRecords.push(attendanceData);
      }
      
      // Show success message (in a real app, this would be a toast notification)
      alert('Attendance saved successfully!');
      
      // Reset form
      this.attendanceStatus = 'saved';
    },
    
    // Mark all students with a specific status
    markAll(status) {
      this.currentAttendance.forEach(student => {
        student.status = status;
      });
    },
    
    // Edit attendance notes
    startEditingNotes(studentId, currentNotes) {
      this.editingStudentId = studentId;
      this.editNoteText = currentNotes || '';
      this.editingNotes = true;
    },
    
    saveNotes() {
      if (!this.editingStudentId) return;
      
      // Find and update the student notes
      const studentIndex = this.currentAttendance.findIndex(s => s.studentId === this.editingStudentId);
      if (studentIndex >= 0) {
        this.currentAttendance[studentIndex].notes = this.editNoteText;
      }
      
      // Reset editing state
      this.editingNotes = false;
      this.editingStudentId = null;
      this.editNoteText = '';
    },
    
    cancelEditNotes() {
      this.editingNotes = false;
      this.editingStudentId = null;
      this.editNoteText = '';
    },
    
    // Export attendance data to CSV
    exportToCSV() {
      // In a real implementation, this would generate and download a CSV file
      // For now, let's just simulate the export
      const fileName = `attendance_report_${this.dateRange.start}_to_${this.dateRange.end}.csv`;
      alert(`Exporting attendance data to ${fileName}`);
      console.log('Exporting data:', this.filteredAttendanceRecords);
    },
    
    // Get status color class based on attendance status
    getStatusClass(status) {
      switch (status) {
        case 'present':
          return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'absent':
          return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        case 'late':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      }
    },
    
    // Generate student attendance report for a specific student
    generateStudentReport(studentId) {
      const student = this.students.find(s => s.id === studentId);
      if (!student) return null;
      
      // Find all attendance records for this student
      let totalClasses = 0;
      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;
      
      const courseAttendance = {};
      
      this.attendanceRecords.forEach(record => {
        const studentRecord = record.records.find(r => r.studentId === studentId);
        if (studentRecord) {
          totalClasses++;
          
          // Count status
          if (studentRecord.status === 'present') presentCount++;
          else if (studentRecord.status === 'absent') absentCount++;
          else if (studentRecord.status === 'late') lateCount++;
          
          // Track by course
          if (!courseAttendance[record.courseId]) {
            courseAttendance[record.courseId] = {
              total: 0,
              present: 0,
              absent: 0,
              late: 0
            };
          }
          
          courseAttendance[record.courseId].total++;
          if (studentRecord.status === 'present') courseAttendance[record.courseId].present++;
          else if (studentRecord.status === 'absent') courseAttendance[record.courseId].absent++;
          else if (studentRecord.status === 'late') courseAttendance[record.courseId].late++;
        }
      });
      
      // Calculate percentages
      const attendancePercentage = totalClasses ? Math.round((presentCount / totalClasses) * 100) : 0;
      
      // Format course-wise data
      const courseData = Object.keys(courseAttendance).map(courseId => {
        const course = this.courses.find(c => c.id === courseId);
        const data = courseAttendance[courseId];
        return {
          courseId,
          courseName: course ? course.name : courseId,
          total: data.total,
          present: data.present,
          absent: data.absent,
          late: data.late,
          attendancePercentage: data.total ? Math.round((data.present / data.total) * 100) : 0
        };
      });
      
      return {
        student: {
          id: student.id,
          name: student.name,
          class: student.classId,
          className: this.classes.find(c => c.id === student.classId)?.name || student.classId,
          rollNumber: student.rollNumber
        },
        summary: {
          totalClasses,
          present: presentCount,
          absent: absentCount,
          late: lateCount,
          attendancePercentage
        },
        courseWise: courseData
      };
    },
    
    // Clear filters
    clearFilters() {
      this.filterDepartment = 'all';
      this.filterCourse = 'all';
      this.filterStudent = '';
      this.filterAttendanceStatus = 'all';
      this.dateRange = {
        start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      };
      this.currentPage = 1;
    }
  }
};
  </script>
  
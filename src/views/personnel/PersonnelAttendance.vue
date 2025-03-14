
<template>
  <div class="personnel-attendance">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Personnel Attendance System</h1>

      <!-- Attendance Taking Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Take Attendance</h2>

        <!-- Department and Date Selection -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Department</label>
            <select v-model="selectedDepartment" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option :value="null">-- Select Department --</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Date</label>
            <input type="date" v-model="selectedDate" class="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" :max="currentDate">
          </div>
        </div>

        <!-- Personnel Attendance Table -->
        <div v-if="currentPersonnel.length > 0">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Mark Attendance</h3>
            <div class="flex space-x-2">
              <button @click="markAll('present')" class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                Mark All Present
              </button>
              <button @click="markAll('absent')" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                Mark All Absent
              </button>
              <button @click="markAll('late')" class="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800">
                Mark All Late
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                <tr v-for="person in currentPersonnel" :key="person.id" class="dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ person.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ person.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ person.role }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="person.status = 'present'" 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="person.status === 'present' ? 'bg-green-600 text-white dark:bg-green-700' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'">
                        Present
                      </button>
                      <button 
                        @click="person.status = 'absent'" 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="person.status === 'absent' ? 'bg-red-600 text-white dark:bg-red-700' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'">
                        Absent
                      </button>
                      <button 
                        @click="person.status = 'late'" 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="person.status === 'late' ? 'bg-yellow-600 text-white dark:bg-yellow-700' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'">
                        Late
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <input type="text" v-model="person.notes" class="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Save Button -->
          <div class="mt-6 flex justify-end">
            <button 
              @click="saveAttendance" 
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800">
              Save Attendance
            </button>
          </div>
        </div>

        <!-- No personnel message -->
        <div v-else-if="selectedDepartment && !currentPersonnel.length" class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No personnel found in this department.</p>
        </div>

        <!-- Select department prompt -->
        <div v-else class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">Please select a department to take attendance.</p>
        </div>
      </div>

      <!-- Attendance Reports Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Attendance Reports</h2>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
            <div class="flex flex-col space-y-2">
              <input type="date" v-model="dateRange.start" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <input type="date" v-model="dateRange.end" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <select v-model="filterDepartment" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="all">All Departments</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select v-model="filterStatus" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">Total Personnel</h4>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalPersonnel }}</p>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-green-700 dark:text-green-400">Present</h4>
            <p class="text-2xl font-bold text-green-700 dark:text-green-400">{{ stats.presentPercentage }}%</p>
          </div>
          
          <div class="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-red-700 dark:text-red-400">Absent</h4>
            <p class="text-2xl font-bold text-red-700 dark:text-red-400">{{ stats.absentPercentage }}%</p>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-lg">
            <h4 class="text-sm font-medium text-yellow-700 dark:text-yellow-400">Late</h4>
            <p class="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{{ stats.latePercentage }}%</p>
          </div>
        </div>

        <!-- Export Button -->
        <div class="flex justify-end mb-6">
          <button @click="exportToCSV" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
            Export Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/config'

export default {
  name: 'PersonnelAttendance',
  
  setup() {
    const currentDate = new Date().toISOString().split('T')[0]
    const selectedDepartment = ref(null)
    const selectedDate = ref(currentDate)
    const currentPersonnel = ref([])
    const dateRange = ref({
      start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
      end: currentDate
    })
    const filterDepartment = ref('all')
    const filterStatus = ref('all')

    const departments = ref([
      { id: 'CS', name: 'Computer Science' },
      { id: 'ENG', name: 'Engineering' },
      { id: 'BUS', name: 'Business Studies' }
    ])

    const stats = computed(() => ({
      totalPersonnel: currentPersonnel.value.length,
      presentPercentage: calculatePercentage('present'),
      absentPercentage: calculatePercentage('absent'),
      latePercentage: calculatePercentage('late')
    }))

    function calculatePercentage(status) {
      if (!currentPersonnel.value.length) return 0
      const count = currentPersonnel.value.filter(p => p.status === status).length
      return Math.round((count / currentPersonnel.value.length) * 100)
    }

    function markAll(status) {
      currentPersonnel.value.forEach(person => {
        person.status = status
      })
    }

    async function saveAttendance() {
      try {
        for (const person of currentPersonnel.value) {
          await apiClient.post(`${ENDPOINTS.PERSONNEL}/${person.id}/attendance`, {
            date: selectedDate.value,
            status: person.status
          })
        }
        alert('Attendance saved successfully!')
      } catch (error) {
        console.error('Error saving attendance:', error)
        alert('Error saving attendance')
      }
    }

    function exportToCSV() {
      const headers = ['ID', 'Name', 'Department', 'Status', 'Date']
      const csvContent = [
        headers.join(','),
        ...currentPersonnel.value.map(person => [
          person.id,
          person.name,
          person.department,
          person.status,
          selectedDate.value
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `attendance_${selectedDate.value}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      currentDate,
      selectedDepartment,
      selectedDate,
      currentPersonnel,
      departments,
      dateRange,
      filterDepartment,
      filterStatus,
      stats,
      markAll,
      saveAttendance,
      exportToCSV
    }
  }
}
</script>
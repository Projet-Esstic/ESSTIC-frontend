<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Deliberation</h2>
        <p class="text-gray-600 dark:text-gray-400">Set passing criteria and view results</p>
      </div>
    </div>

    <!-- Filters and Controls -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
          <select 
            v-model="selectedDepartment"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Departments</option>
            <option 
              v-for="dept in departments" 
              :key="dept._id" 
              :value="dept._id"
            >
              {{ dept.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
          <select 
            v-model="selectedRegion"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Regions</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
          <select 
            v-model="selectedGender"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Passing Average: {{ passingAverage }}
          </label>
          <div class="flex items-center gap-4">
            <input 
              type="range" 
              :value="passingAverage"
              @input="handlePassingAverageInput"
              min="0" 
              max="20" 
              step="0.5"
              class="flex-grow"
            >
            <input 
              type="number" 
              :value="passingAverage"
              @input="handlePassingAverageInput"
              min="0" 
              max="20" 
              step="0.5"
              class="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-blue-900 dark:text-blue-100">Total Candidates</h3>
          <p class="text-2xl font-bold text-blue-600 dark:text-blue-300">{{ totalCandidates }}</p>
        </div>
        <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-green-900 dark:text-green-100">Passed</h3>
          <p class="text-2xl font-bold text-green-600 dark:text-green-300">{{ passedCandidates.length }}</p>
        </div>
        <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-red-900 dark:text-red-100">Failed</h3>
          <p class="text-2xl font-bold text-red-600 dark:text-red-300">{{ failedCandidates.length }}</p>
        </div>
        <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-purple-900 dark:text-purple-100">Pass Rate</h3>
          <p class="text-2xl font-bold text-purple-600 dark:text-purple-300">{{ passRate }}%</p>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Distribution Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-4">Average Distribution</h3>
        <div style="height: 300px; position: relative;">
          <canvas ref="distributionChart"></canvas>
        </div>
      </div>
      <!-- Pass/Fail by Field Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-4">Results by Field</h3>
        <div style="height: 300px; position: relative;">
          <canvas ref="fieldChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-medium">Detailed Results</h3>
        <button 
          @click="exportResults"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <span class="flex items-center">
            <i class="material-icons mr-2">download</i>
            Export Results
          </span>
        </button>
      </div>
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registration No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Average</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="candidate in filteredCandidates" :key="candidate._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ generateRegistrationNumber(candidate._id) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ getFieldName(candidate.fieldOfStudy) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {{ calculateAverage(candidate).toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span 
                :class="{
                  'px-2 py-1 rounded-full text-xs font-semibold': true,
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': isPassed(candidate),
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': !isPassed(candidate)
                }"
              >
                {{ isPassed(candidate) ? 'PASSED' : 'FAILED' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, onBeforeUnmount, markRaw } from 'vue'
import { io } from 'socket.io-client'
import { departmentService } from '@/api/services/index';
import { candidateService, courseService } from '@/api/services'
import { debounce } from 'lodash'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  DoughnutController
} from 'chart.js'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  DoughnutController
)

export default {
  name: 'Deliberation',

  setup() {
    const socket = ref(null)
    const departments = ref([])
    const candidates = ref([])
    const courses = ref([])
    const selectedDepartment = ref('')
    const selectedRegion = ref('')
    const selectedGender = ref('')
    const passingAverage = ref(10)
    const distributionChart = ref(null)
    const fieldChart = ref(null)
    const distributionChartInstance = ref(null)
    const fieldChartInstance = ref(null)

    const regions = ['Centre', 'Littoral', 'North West', 'South West', 'West', 'Adamawa', 'East', 'Far North', 'North', 'South']

    // Computed properties
    const filteredCandidates = computed(() => {
      return candidates.value.filter(candidate => {
        // First filter for registered status
        if (candidate.applicationStatus !== 'registered') return false;
        
        // Then apply department filter if selected
        const matchesDepartment = selectedDepartment.value 
          ? candidate.fieldOfStudy === selectedDepartment.value 
          : true;

        // Apply region filter
        const matchesRegion = selectedRegion.value
          ? candidate.user?.region === selectedRegion.value
          : true;
        
        // Apply gender filter
        const matchesGender = selectedGender.value === '' || candidate.user?.gender === selectedGender.value
        
        return matchesDepartment && matchesRegion && matchesGender;
      });
    })

    const totalCandidates = computed(() => filteredCandidates.value.length)

    const passedCandidates = computed(() => 
      filteredCandidates.value.filter(candidate => isPassed(candidate))
    )

    const failedCandidates = computed(() => 
      filteredCandidates.value.filter(candidate => !isPassed(candidate))
    )

    const passRate = computed(() => {
      if (totalCandidates.value === 0) return 0
      return ((passedCandidates.value.length / totalCandidates.value) * 100).toFixed(1)
    })

    // Lifecycle hooks
    onMounted(() => {
      initializeChartsWithEmptyData()
      loadData().then(() => {
        updateCharts()
      })
    })

    onBeforeUnmount(() => {
      if (socket.value) {
        socket.value.disconnect()
      }
      if (distributionChartInstance.value) {
        distributionChartInstance.value.destroy()
      }
      if (fieldChartInstance.value) {
        fieldChartInstance.value.destroy()
      }
    })

    // Data loading functions
    const loadDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments()
        departments.value = response
      } catch (err) {
        console.error('Failed to load departments:', err)
      }
    }

    const loadCourses = async () => {
      try {
        const response = await courseService.getAllCourses()
        courses.value = response
      } catch (err) {
        console.error('Failed to load courses:', err)
      }
    }

    const loadCandidates = async () => {
      try {
        const response = await candidateService.getAllCandidates()
        candidates.value = response
      } catch (err) {
        console.error('Failed to load candidates:', err)
      }
    }

    const loadData = async () => {
      await loadDepartments()
      await Promise.all([loadCourses(), loadCandidates()])

      // Socket setup after data is loaded
      socket.value = io(process.env.VUE_APP_SOCKET_ENDPOINT)
      socket.value.on('candidateUpdated', (updatedCandidate) => {
        const index = candidates.value.findIndex(c => c._id === updatedCandidate._id)
        if (index !== -1) {
          candidates.value[index] = updatedCandidate
        }
      })
      socket.value.on('candidateAdded', (newCandidate) => {
        candidates.value.push(newCandidate)
      })
      socket.value.on('candidateDeleted', (deletedId) => {
        candidates.value = candidates.value.filter(c => c._id !== deletedId)
      })
    }

    // Chart initialization with empty data
    const initializeChartsWithEmptyData = () => {
      const emptyData = {
        labels: [],
        datasets: []
      }
      if (distributionChart.value) {
        const chart = new ChartJS(
          distributionChart.value.getContext('2d'),
          {
            type: 'bar',
            data: emptyData,
            options: barChartOptions
          }
        )
        distributionChartInstance.value = markRaw(chart) // Prevent reactivity
      }
      if (fieldChart.value) {
        const chart = new ChartJS(
          fieldChart.value.getContext('2d'),
          {
            type: 'doughnut',
            data: emptyData,
            options: doughnutOptions
          }
        )
        fieldChartInstance.value = markRaw(chart) // Prevent reactivity
      }
    }

    // Chart update function
    const updateCharts = () => {
      if (!distributionChartInstance.value || !fieldChartInstance.value) {
        console.log('Charts not initialized yet')
        return
      }
      const distData = getDistributionData()
      const fieldData = getFieldData()
      distributionChartInstance.value.data = distData
      fieldChartInstance.value.data = fieldData
      distributionChartInstance.value.update('none')
      fieldChartInstance.value.update('none')
    }

    const debouncedUpdateCharts = debounce(updateCharts, 300)

    // Watchers for reactive updates
    watch(() => selectedDepartment.value, debouncedUpdateCharts)
    watch(() => selectedRegion.value, debouncedUpdateCharts)
    watch(() => selectedGender.value, debouncedUpdateCharts)
    watch(() => passingAverage.value, debouncedUpdateCharts)
    watch(() => candidates.value, debouncedUpdateCharts, { deep: true })

    // Helper functions
    const calculateAverage = (candidate) => {
      if (!candidate.Marks?.length) return 0
      let totalWeightedMarks = 0
      let totalCoefficients = 0
      candidate.Marks.forEach(mark => {
        const course = courses.value.find(c => c._id === mark.courseId)
        if (course) {
          const deptCoefficient = course.department.find(
            dept => dept.departmentInfo === candidate.fieldOfStudy
          )
          const coefficient = deptCoefficient ? deptCoefficient.coefficient : 1
          totalWeightedMarks += mark.mark.currentMark * coefficient
          totalCoefficients += coefficient
        }
      })
      return totalCoefficients > 0 ? totalWeightedMarks / totalCoefficients : 0
    }

    const isPassed = (candidate) => {
      return calculateAverage(candidate) >= passingAverage.value
    }

    const getDistributionData = () => {
      const ranges = ['0-5', '5-10', '10-15', '15-20']
      const data = [0, 0, 0, 0]
      filteredCandidates.value.forEach(candidate => {
        const average = calculateAverage(candidate)
        if (average < 5) data[0]++
        else if (average < 10) data[1]++
        else if (average < 15) data[2]++
        else data[3]++
      })
      return {
        labels: ranges,
        datasets: [{
          label: 'Number of Students',
          data: [...data],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
        }]
      }
    }

    const getFieldData = () => {
      const departmentResults = {}
      departments.value.forEach(dept => {
        departmentResults[dept._id] = { passed: 0, failed: 0 }
      })
      filteredCandidates.value.forEach(candidate => {
        if (candidate.fieldOfStudy && departmentResults[candidate.fieldOfStudy]) {
          if (isPassed(candidate)) {
            departmentResults[candidate.fieldOfStudy].passed++
          } else {
            departmentResults[candidate.fieldOfStudy].failed++
          }
        }
      })
      return {
        labels: departments.value.map(dept => dept.name),
        datasets: [
          {
            label: 'Passed',
            data: departments.value.map(dept => departmentResults[dept._id]?.passed || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)'
          }, 
          {
            label: 'Failed',
            data: departments.value.map(dept => departmentResults[dept._id]?.failed || 0),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      }
    }

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }

    const doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }

    const handlePassingAverageInput = (event) => {
      const value = parseFloat(event.target.value)
      passingAverage.value = Math.min(Math.max(value, 0), 20)
    }

    const generateRegistrationNumber = (id) => {
      if (!id) return 'N/A'
      const shortId = id.slice(-6).toUpperCase()
      const year = new Date().getFullYear()
      return `${year}/${shortId}`
    }

    const getFieldName = (fieldId) => {
      const dept = departments.value.find(d => d._id === fieldId)
      return dept ? dept.name : 'Unknown Field'
    }

    const exportResults = () => {
      const doc = new jsPDF()
      doc.setFontSize(16)
      doc.text('Entrance Exam Results', 14, 15)
      doc.setFontSize(12)
      doc.text(`Passing Average: ${passingAverage.value}`, 14, 25)
      doc.text(`Total Candidates: ${totalCandidates.value}`, 14, 32)
      doc.text(`Passed: ${passedCandidates.value.length}`, 14, 39)
      doc.text(`Failed: ${failedCandidates.value.length}`, 14, 46)
      doc.text(`Pass Rate: ${passRate.value}%`, 14, 53)
      const tableData = filteredCandidates.value.map(candidate => [
        generateRegistrationNumber(candidate._id),
        `${candidate.user?.firstName || ''} ${candidate.user?.lastName || ''}`,
        getFieldName(candidate.fieldOfStudy),
        calculateAverage(candidate).toFixed(2),
        isPassed(candidate) ? 'PASSED' : 'FAILED'
      ])
      doc.autoTable({
        startY: 60,
        head: [['Reg. No.', 'Name', 'Field', 'Average', 'Status']],
        body: tableData
      })
      doc.save('entrance-exam-results.pdf')
    }

    return {
      departments,
      candidates,
      courses,
      selectedDepartment,
      selectedRegion,
      selectedGender,
      passingAverage,
      filteredCandidates,
      totalCandidates,
      passedCandidates,
      failedCandidates,
      passRate,
      distributionChart,
      fieldChart,
      calculateAverage,
      isPassed,
      getFieldName,
      exportResults,
      handlePassingAverageInput,
      generateRegistrationNumber,
      regions
    }
  }
}
</script>
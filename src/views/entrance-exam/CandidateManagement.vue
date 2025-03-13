<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Candidate Management</h2>
      <div class="flex gap-4">
        <button 
          @click="registerNewCandidate"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 0112 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Register New Candidate
        </button>
        <button 
          @click="showGenerateModal = true"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate Candidate List
        </button>
      </div>
    </div>

    <div class="flex gap-6">
      <!-- Left Sidebar - Filters -->
      <div class="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-medium">Filters</h2>
        
        <!-- Search -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name or email"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <!-- Status Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select
            v-model="statusFilter"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
        </div>

        <!-- Department Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
          <select
            v-model="selectedField"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Fields of Study</option>
            <option 
              v-for="department in departments"
              :key="department._id"
              :value="department._id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>

        <!-- Region Filter -->
        <div class="mb-4">
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

        <!-- Gender Filter -->
        <div class="mb-4">
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

        <!-- Clear Filters -->
        <button
          @click="clearFilters"
          class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Clear Filters
        </button>
      </div>

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Candidates Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Field</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              <tr v-for="candidate in filteredCandidates" :key="candidate._id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-300">{{ candidate.user ? candidate.user.email : 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-300">{{ getFieldName(candidate.fieldOfStudy) || 'Not assigned' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                    {
                      'bg-green-100 text-green-800': candidate.applicationStatus === 'registered',
                      'bg-yellow-100 text-yellow-800': candidate.applicationStatus === 'pending',
                      'bg-red-100 text-red-800': candidate.applicationStatus === 'rejected'
                    }
                  ]">
                    {{ candidate.applicationStatus }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex space-x-2">
                    <button
                      @click="editCandidate(candidate)"
                      class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold hover:bg-blue-200"
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Custom Candidate Details Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <!-- Header -->
          <div class="flex justify-between items-center pb-3 border-b">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Candidate Details
            </h3>
            <button
              @click="closeEditModal"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div class="space-y-6">
              <!-- Candidate Status -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-700 mb-2">Current Status</h3>
                <span :class="[
                  'px-3 py-1 inline-flex text-sm font-semibold rounded-full',
                  {
                    'bg-green-100 text-green-800': editingCandidate?.applicationStatus === 'registered',
                    'bg-yellow-100 text-yellow-800': editingCandidate?.applicationStatus === 'pending',
                    'bg-red-100 text-red-800': editingCandidate?.applicationStatus === 'rejected'
                  }
                ]">
                  {{ editingCandidate?.applicationStatus }}
                </span>
              </div>

              <!-- Documents Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Documents</h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- Document Preview Cards -->
                  <div v-for="(doc, type) in candidateDocuments" 
                    :key="type" 
                    class="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="text-sm font-medium capitalize">{{ type }}</h4>
                      <span class="text-xs text-gray-500">
                        {{ new Date(doc.uploadedAt).toLocaleDateString() }}
                      </span>
                    </div>
                    
                    <!-- PDF Preview -->
                    <div class="relative h-32 bg-gray-50 rounded-lg overflow-hidden">
                      <embed
                        :src="doc.path"
                        type="application/pdf"
                        class="w-full h-full"
                      />
                      <div class="absolute inset-0 flex items-center justify-center">
                        <button
                          @click="openDocument(doc.path)"
                          class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          View Full Document
                        </button>
                      </div>
                    </div>
                    
                    <!-- Document Info -->
                    <div class="mt-2 space-y-1">
                      <p class="text-xs text-gray-600">
                        Original name: {{ doc.originalName }}
                      </p>
                      <p class="text-xs text-gray-600">
                        Size: {{ (doc.size / 1024).toFixed(2) }} KB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Professional Experience Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Professional Experience</h3>
                <div class="space-y-3">
                  <div v-for="exp in editingCandidate?.professionalExperience" 
                    :key="exp._id"
                    class="p-4 bg-gray-50 rounded-lg"
                  >
                    <h4 class="font-medium">{{ exp.company }}</h4>
                    <p class="text-sm text-gray-600">{{ exp.position }}</p>
                    <p class="text-sm text-gray-500">{{ exp.yearsOfExperience }} years</p>
                  </div>
                </div>
              </div>

              <!-- Extra Activities Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Extra Activities</h3>
                <div class="space-y-3">
                  <div v-for="activity in editingCandidate?.extraActivities" 
                    :key="activity._id"
                    class="p-4 bg-gray-50 rounded-lg"
                  >
                    <h4 class="font-medium">{{ activity.activity }}</h4>
                    <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Payment Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Payment Information</h3>
                <div class="space-y-3">
                  <div v-for="payment in editingCandidate?.payment" 
                    :key="payment._id"
                    class="p-4 bg-gray-50 rounded-lg"
                  >
                    <div class="flex justify-between">
                      <span class="font-medium">Amount Paid:</span>
                      <span>{{ payment.amountPaid }} FCFA</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-600">
                      <span>Date:</span>
                      <span>{{ new Date(payment.paidDate).toLocaleDateString() }}</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-600">
                      <span>Method:</span>
                      <span class="capitalize">{{ payment.paymentMethod }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-6 pt-3 border-t flex justify-between items-center">
            <!-- Status Update Buttons -->
            <div class="flex gap-2">
              <button
                v-if="['pending', 'rejected'].includes(editingCandidate?.applicationStatus)"
                @click="updateStatus(editingCandidate._id, 'registered')"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Register
              </button>
              <button
                v-if="['pending', 'registered'].includes(editingCandidate?.applicationStatus)"
                @click="updateStatus(editingCandidate._id, 'rejected')"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reject
              </button>
            </div>

            <!-- Save/Cancel Buttons -->
            <div class="flex gap-2">
              <button 
                @click="closeEditModal"
                class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                @click="saveCandidate"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate Report Modal -->
    <div v-if="showGenerateModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-medium">Generate Report</h3>
          <button 
            @click="showGenerateModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Field Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Field of Study</label>
          <select 
            v-model="selectedReportField"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option value="">All Fields of Study</option>
            <option 
              v-for="department in departments"
              :key="department._id"
              :value="department._id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>

        <!-- Statistics -->
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-blue-800 mb-2">Total Candidates</h4>
              <p class="text-2xl font-bold text-blue-900">{{ getStatistics.totalCandidates }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-green-800 mb-2">Validated Candidates</h4>
              <p class="text-2xl font-bold text-green-900">{{ getStatistics.validatedCandidates }}</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-yellow-800 mb-2">Pending Candidates</h4>
              <p class="text-2xl font-bold text-yellow-900">{{ getStatistics.pendingCandidates }}</p>
            </div>
          </div>

          <!-- Detailed Statistics Table -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status Distribution</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Period</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="stat in getStatistics.classStats" :key="stat.fieldId">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getFieldName(stat.fieldId) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ stat.total }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Validated: {{ stat.validated }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span>Pending: {{ stat.pending }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>Rejected: {{ stat.rejected }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ stat.dateRange }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end gap-4">
          <button
            @click="showGenerateModal = false"
            class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            @click="generateValidatedPDF"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { departmentService } from '@/api/services/index';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import io from 'socket.io-client';

export default {
  name: 'CandidateManagement',
  setup() {
    const store = useStore();
    const router = useRouter();
    const searchQuery = ref('');
    const selectedField = ref('');
    const statusFilter = ref('');
    const selectedRegion = ref('');
    const selectedGender = ref('');
    const showEditModal = ref(false);
    const showGenerateModal = ref(false);
    const editingCandidate = ref(null);
    const departments = ref([]);
    const formError = ref(null);
    const selectedReportField = ref('');
    const socket = ref(null);

    const statusOptions = [
      { value: 'pending', label: 'Pending' },
      { value: 'registered', label: 'Registered' },
      { value: 'rejected', label: 'Rejected' }
    ];

    const loadDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments();
        departments.value = response;
      } catch (err) {
        console.error('Failed to load departments:', err);
        formError.value = 'Failed to load departments';
      }
    };

    const connectSocket = () => {
      socket.value = io('http://localhost:5000');
      socket.value.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });
      socket.value.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });
      socket.value.on('candidates', (change) => {
        console.log('Received candidate change:', change);
        store.dispatch('candidates/fetchCandidates');
      });
    };

    onMounted(() => {
      loadDepartments();
      connectSocket();
      store.dispatch('candidates/fetchCandidates');
    });

    onUnmounted(() => {
      if (socket.value) {
        socket.value.disconnect();
        console.log('Socket.IO connection closed');
      }
    });

    const updateStatus = async (candidateId, newStatus) => {
      try {
        await store.dispatch('candidates/updateCandidateStatus', {
          id: candidateId,
          applicationStatus: newStatus
        });
        await store.dispatch('candidates/fetchCandidates');
        closeEditModal();
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    };

    const editCandidate = (candidate) => {
      editingCandidate.value = {
        ...candidate,
        _id: candidate._id,
        applicationStatus: candidate.applicationStatus,
        user: candidate.user,
        documents: candidate.documents || {},
        highSchool: candidate.highSchool || {},
        university: candidate.university || {},
        professionalExperience: candidate.professionalExperience || [],
        extraActivities: candidate.extraActivities || [],
        payment: candidate.payment || [],
        examCenter: candidate.examCenter || '',
        fieldOfStudy: candidate.fieldOfStudy || ''
      };
      showEditModal.value = true;
    };

    const saveCandidate = async () => {
      try {
        await store.dispatch('candidates/updateCandidate', {
          id: editingCandidate.value._id,
          data: {
            highSchool: editingCandidate.value.highSchool,
            university: editingCandidate.value.university,
            examCenter: editingCandidate.value.examCenter,
            fieldOfStudy: editingCandidate.value.fieldOfStudy
          }
        });
        closeEditModal();
        await store.dispatch('candidates/fetchCandidates');
      } catch (error) {
        console.error('Failed to save candidate:', error);
      }
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      editingCandidate.value = null;
    };

    const candidates = computed(() => store.getters['candidates/getAllCandidates']);

    const getStatistics = computed(() => {
      const filteredCands = selectedReportField.value
        ? candidates.value.filter(c => c.fieldOfStudy === selectedReportField.value)
        : candidates.value;

      const stats = {
        totalCandidates: filteredCands.length,
        validatedCandidates: filteredCands.filter(c => c.applicationStatus === 'registered').length,
        pendingCandidates: filteredCands.filter(c => c.applicationStatus === 'pending').length,
        classStats: []
      };

      const fieldGroups = departments.value.reduce((acc, department) => {
        const departmentCandidates = filteredCands.filter(c => c.fieldOfStudy === department._id);
        if (departmentCandidates.length > 0) {
          acc.push({
            fieldId: department._id,
            total: departmentCandidates.length,
            validated: departmentCandidates.filter(c => c.applicationStatus === 'registered').length,
            pending: departmentCandidates.filter(c => c.applicationStatus === 'pending').length,
            rejected: departmentCandidates.filter(c => c.applicationStatus === 'rejected').length,
            dateRange: getDateRange(departmentCandidates)
          });
        }
        return acc;
      }, []);

      stats.classStats = fieldGroups;
      return stats;
    });

    const filteredCandidates = computed(() => {
      let filtered = [...candidates.value];

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(candidate => {
          if (!candidate.user) return false;
          return candidate.user.firstName.toLowerCase().includes(query) ||
                 candidate.user.lastName.toLowerCase().includes(query) ||
                 candidate.user.email.toLowerCase().includes(query);
        });
      }

      if (statusFilter.value) {
        filtered = filtered.filter(candidate => 
          candidate.applicationStatus === statusFilter.value
        );
      }

      if (selectedField.value) {
        filtered = filtered.filter(candidate => 
          candidate.fieldOfStudy === selectedField.value
        );
      }

      if (selectedRegion.value) {
        filtered = filtered.filter(candidate => 
          candidate.user?.region === selectedRegion.value
        );
      }

      if (selectedGender.value) {
        filtered = filtered.filter(candidate => 
          candidate.user?.gender === selectedGender.value
        );
      }

      return filtered;
    });

    const getFieldName = (fieldId) => {
      const field = departments.value.find(f => f._id === fieldId);
      return field ? field.name : 'Unknown';
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const getDateRange = (candidates) => {
      if (!candidates.length) return 'N/A';
      const dates = candidates.map(c => new Date(c.registrationDate));
      const earliest = new Date(Math.min(...dates));
      const latest = new Date(Math.max(...dates));
      return `${formatDate(earliest)} - ${formatDate(latest)}`;
    };

    const addHeader = (doc, pageTitle = '') => {
      const logoPath = require('@/assets/images/esstic-logo.png');
      doc.addImage(logoPath, 'PNG', 15, 10, 25, 25);
      const textStartX = 50;
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      const pageWidth = doc.internal.pageSize.width;
      const textWidth = pageWidth - (textStartX + 15);
      const centerX = textStartX + (textWidth / 2);
      doc.text('ÉCOLE SUPÉRIEURE DES SCIENCES ET TECHNOLOGIES', centerX, 15, { align: 'center' });
      doc.text('DE L\'INFORMATION ET DE LA COMMUNICATION', centerX, 22, { align: 'center' });
      doc.setFontSize(12);
      doc.text('ADVANCED SCHOOL OF MASS COMMUNICATION', centerX, 29, { align: 'center' });
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(0.5);
      doc.line(15, 35, doc.internal.pageSize.width - 15, 35);
      if (pageTitle) {
        doc.setFontSize(14);
        doc.text(pageTitle, doc.internal.pageSize.width / 2, 45, { align: 'center' });
      }
    };

    const generateValidatedPDF = () => {
      const doc = new jsPDF();
      const stats = getStatistics.value;
      
      addHeader(doc);
      doc.setFontSize(22);
      doc.setTextColor(0);
      doc.text('ENTRANCE EXAMINATION 2024', doc.internal.pageSize.width / 2, 60, { align: 'center' });
      doc.setFontSize(18);
      doc.text('List of Eligible Candidates', doc.internal.pageSize.width / 2, 75, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width / 2, 90, { align: 'center' });
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(0.5);
      doc.line(50, 80, doc.internal.pageSize.width - 50, 80);
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text('ESSTIC - Excellence in Information and Communication Technology Education', 
        doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });

      stats.classStats.forEach(stat => {
        if (stat.validated > 0) {
          doc.addPage();
          addHeader(doc, getFieldName(stat.fieldId));
          const fieldCandidates = candidates.value
            .filter(c => c.fieldOfStudy === stat.fieldId && c.applicationStatus === 'registered')
            .sort((a, b) => a.user.firstName.localeCompare(b.user.firstName));
          const tableData = fieldCandidates.map((candidate, idx) => [
            (idx + 1).toString(),
            candidate.registrationNumber,
            `${candidate.user.firstName} ${candidate.user.lastName}`,
            formatDate(candidate.registrationDate)
          ]);

          doc.autoTable({
            startY: 55,
            head: [['Site No.', 'Registration No.', 'Candidate Name', 'Registration Date']],
            body: tableData,
            theme: 'grid',
            headStyles: { 
              fillColor: [41, 128, 185], 
              textColor: 255,
              fontSize: 11,
              halign: 'center',
              fontStyle: 'bold'
            },
            styles: { 
              fontSize: 10,
              cellPadding: 6,
              lineColor: [200, 200, 200],
              lineWidth: 0.1
            },
            alternateRowStyles: {
              fillColor: [245, 250, 254]
            },
            columnStyles: {
              0: { cellWidth: 20 },
              1: { cellWidth: 40 },
              2: { cellWidth: 80 },
              3: { cellWidth: 40 }
            }
          });

          const pageHeight = doc.internal.pageSize.height;
          doc.setDrawColor(41, 128, 185);
          doc.setLineWidth(0.5);
          doc.line(15, pageHeight - 25, doc.internal.pageSize.width - 15, pageHeight - 25);
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text('ESSTIC Entrance Examination 2024', 15, pageHeight - 15);
          doc.text(
            `Total Eligible Candidates: ${fieldCandidates.length}`,
            doc.internal.pageSize.width / 2,
            pageHeight - 15,
            { align: 'center' }
          );
          doc.text(
            `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
            doc.internal.pageSize.width - 15,
            pageHeight - 15,
            { align: 'right' }
          );
        }
      });

      doc.save('entrance-exam-candidates.pdf');
    };

    const registerNewCandidate = () => {
      router.push('/candidate-registration?source=admin');
    };

    const clearFilters = () => {
      searchQuery.value = '';
      selectedField.value = '';
      statusFilter.value = '';
      selectedRegion.value = '';
      selectedGender.value = '';
    };

    const openDocument = (path) => {
      window.open(path, '_blank');
    };

    const candidateDocuments = computed(() => {
      if (!editingCandidate.value?.documents) return {};
      return Object.entries(editingCandidate.value.documents)
        .reduce((acc, [type, doc]) => {
          if (doc.path) {
            acc[type] = doc;
          }
          return acc;
        }, {});
    });

    return {
      searchQuery,
      selectedField,
      statusFilter,
      selectedRegion,
      selectedGender,
      statusOptions,
      showEditModal,
      showGenerateModal,
      editingCandidate,
      departments,
      filteredCandidates,
      updateStatus,
      editCandidate,
      saveCandidate,
      closeEditModal,
      getStatistics,
      getFieldName,
      formatDate,
      registerNewCandidate,
      clearFilters,
      generateValidatedPDF,
      selectedReportField,
      openDocument,
      candidateDocuments,
      regions: ['Centre', 'Littoral', 'North West', 'South West', 'West', 'Adamawa', 'East', 'Far North', 'North', 'South']
    };
  }
};
</script>
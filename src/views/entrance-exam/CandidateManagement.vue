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
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
          <select
            v-model="selectedField"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept._id" :value="dept._id">
              {{ dept.name }}
            </option>
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
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ candidate.user.firstName }} {{ candidate.user.lastName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-300">{{ candidate.user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-300">{{ candidate.fieldId?.title || 'Not assigned' }}</div>
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
                      v-if="['pending', 'rejected'].includes(candidate.applicationStatus)"
                      @click="updateStatus(candidate._id, 'registered')"
                      class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold hover:bg-green-200"
                    >
                      Register
                    </button>
                    <button
                      v-if="['pending', 'registered'].includes(candidate.applicationStatus)"
                      @click="updateStatus(candidate._id, 'rejected')"
                      class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold hover:bg-red-200"
                    >
                      Reject
                    </button>
                    <button
                      @click="editCandidate(candidate)"
                      class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Candidate Modal -->
    <Modal 
      v-model="showEditModal"
      @close="closeEditModal"
      title="Edit Candidate Information"
    >
      <template #content>
        <form @submit.prevent="saveCandidate" class="space-y-4">
          <!-- Personal Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Personal Information</h3>
            
            <!-- High School Information -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium">High School</h4>
              <div>
                <label class="block text-sm">School Name</label>
                <input 
                  v-model="editingCandidate.highSchool.schoolName"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm">Year Completed</label>
                <input 
                  v-model="editingCandidate.highSchool.yearCompleted"
                  type="number"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>

            <!-- University Information -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium">University</h4>
              <div>
                <label class="block text-sm">University Name</label>
                <input 
                  v-model="editingCandidate.university.universityName"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm">Degree</label>
                <input 
                  v-model="editingCandidate.university.degree"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm">Year Completed</label>
                <input 
                  v-model="editingCandidate.university.yearCompleted"
                  type="number"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>

            <!-- Exam Center -->
            <div>
              <label class="block text-sm">Exam Center</label>
              <input 
                v-model="editingCandidate.examCenter"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <!-- Field of Study -->
            <div>
              <label class="block text-sm">Field of Study</label>
              <select 
                v-model="editingCandidate.fieldOfStudy"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option v-for="dept in departments" :key="dept._id" :value="dept._id">
                  {{ dept.name }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button 
            @click="closeEditModal"
            class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="saveCandidate"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </template>
    </Modal>

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
            <option value="">All Fields</option>
            <option 
              v-for="field in fields" 
              :key="field.id" 
              :value="field.id"
            >
              {{ field.name }}
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
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import { fieldService } from '@/api/services';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'CandidateManagement',
  components: {
    Modal
  },
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter();
    const searchQuery = ref('');
    const selectedField = ref('');
    const statusFilter = ref('');
    const showEditModal = ref(false);
    const showGenerateModal = ref(false);
    const editingCandidate = ref(null);
    const departments = ref([]);
    const selectedReportField = ref('');

    // Status options for filter - only show final statuses
    const statusOptions = [
      { value: 'pending', label: 'Pending' },
      { value: 'registered', label: 'Registered' },
      { value: 'rejected', label: 'Rejected' }
    ];

    // Load departments/fields
    const loadDepartments = async () => {
      try {
        const response = await fieldService.getAllFields();
        departments.value = response;
      } catch (error) {
        console.error('Failed to load departments:', error);
      }
    };

    onMounted(() => {
      loadDepartments();
    });

    const updateStatus = async (candidateId, newStatus) => {
      try {
        await store.dispatch('candidates/updateCandidateStatus', {
          id: candidateId,
          applicationStatus: newStatus
        });
        // Refresh candidates list
        await store.dispatch('candidates/fetchCandidates');
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    };

    const editCandidate = (candidate) => {
      editingCandidate.value = {
        ...candidate,
        highSchool: {
          schoolName: candidate.highSchool?.schoolName || '',
          yearCompleted: candidate.highSchool?.yearCompleted || null,
          majorSubjects: candidate.highSchool?.majorSubjects || []
        },
        university: {
          universityName: candidate.university?.universityName || '',
          degree: candidate.university?.degree || '',
          yearCompleted: candidate.university?.yearCompleted || null
        },
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
        showEditModal.value = false;
        // Refresh candidates list
        await store.dispatch('candidates/fetchCandidates');
      } catch (error) {
        console.error('Failed to save candidate:', error);
      }
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      editingCandidate.value = null;
    };

    // Get candidates from store
    const candidates = computed(() => store.getters['candidates/getAllCandidates']);

    // Fetch candidates when component mounts
    onMounted(async () => {
      await store.dispatch('candidates/fetchCandidates');
    });

    const getStatistics = computed(() => {
      const filteredCands = selectedReportField.value
        ? candidates.value.filter(c => c.fieldId === selectedReportField.value)
        : candidates.value;

      const stats = {
        totalCandidates: filteredCands.length,
        validatedCandidates: filteredCands.filter(c => c.applicationStatus === 'registered').length,
        pendingCandidates: filteredCands.filter(c => c.applicationStatus === 'pending').length,
        classStats: []
      };

      // Group by field
      const fieldGroups = props.fields.reduce((acc, field) => {
        const fieldCandidates = filteredCands.filter(c => c.fieldId === field.id);
        if (fieldCandidates.length > 0) {
          acc.push({
            fieldId: field.id,
            total: fieldCandidates.length,
            validated: fieldCandidates.filter(c => c.applicationStatus === 'registered').length,
            pending: fieldCandidates.filter(c => c.applicationStatus === 'pending').length,
            rejected: fieldCandidates.filter(c => c.applicationStatus === 'rejected').length,
            dateRange: getDateRange(fieldCandidates)
          });
        }
        return acc;
      }, []);

      stats.classStats = fieldGroups;
      return stats;
    });

    const filteredCandidates = computed(() => {
      let filtered = [...candidates.value];

      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(candidate => 
          candidate.user.firstName.toLowerCase().includes(query) ||
          candidate.user.lastName.toLowerCase().includes(query) ||
          candidate.user.email.toLowerCase().includes(query)
        );
      }

      // Apply status filter
      if (statusFilter.value) {
        filtered = filtered.filter(candidate => 
          candidate.applicationStatus === statusFilter.value
        );
      }

      // Apply field filter
      if (selectedField.value) {
        filtered = filtered.filter(candidate => 
          candidate.fieldId?._id === selectedField.value
        );
      }

      return filtered;
    });

    const getFieldName = (fieldId) => {
      const field = props.fields.find(f => f.id === fieldId);
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
      // Add logo (smaller size: 25x25)
      const logoPath = require('@/assets/images/esstic-logo.png');
      doc.addImage(logoPath, 'PNG', 15, 10, 25, 25);

      // Add header text (start after logo + margin)
      const textStartX = 50; // Logo width (25) + left margin (15) + space (10)
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185); // Blue color
      
      // Calculate text width to ensure no overlap
      const pageWidth = doc.internal.pageSize.width;
      const textWidth = pageWidth - (textStartX + 15); // 15px right margin
      const centerX = textStartX + (textWidth / 2);
      
      // French name
      doc.text('ÉCOLE SUPÉRIEURE DES SCIENCES ET TECHNOLOGIES', centerX, 15, { align: 'center' });
      doc.text('DE L\'INFORMATION ET DE LA COMMUNICATION', centerX, 22, { align: 'center' });
      
      // English name
      doc.setFontSize(12);
      doc.text('ADVANCED SCHOOL OF MASS COMMUNICATION', centerX, 29, { align: 'center' });
      
      // Add divider line
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(0.5);
      doc.line(15, 35, doc.internal.pageSize.width - 15, 35);

      // Add page title if provided
      if (pageTitle) {
        doc.setFontSize(14);
        doc.text(pageTitle, doc.internal.pageSize.width / 2, 45, { align: 'center' });
      }
    };

    const generateValidatedPDF = () => {
      const doc = new jsPDF();
      const stats = getStatistics.value;
      
      // Title Page
      addHeader(doc);
      
      doc.setFontSize(22);
      doc.setTextColor(0);
      doc.text('ENTRANCE EXAMINATION 2024', doc.internal.pageSize.width / 2, 60, { align: 'center' });
      
      doc.setFontSize(18);
      doc.text('List of Eligible Candidates', doc.internal.pageSize.width / 2, 75, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width / 2, 90, { align: 'center' });
      
      // Add decorative elements
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(0.5);
      doc.line(50, 80, doc.internal.pageSize.width - 50, 80);
      
      // Add footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text('ESSTIC - Excellence in Information and Communication Technology Education', 
        doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });

      // For each field, create a new page with the list of validated candidates
      stats.classStats.forEach(stat => {
        if (stat.validated > 0) {
          doc.addPage();
          addHeader(doc, getFieldName(stat.fieldId));
          
          // Get validated candidates for this field
          const fieldCandidates = candidates.value
            .filter(c => c.fieldId === stat.fieldId && c.applicationStatus === 'registered')
            .sort((a, b) => a.name.localeCompare(b.name));

          // Create table of candidates
          const tableData = fieldCandidates.map((candidate, idx) => [
            (idx + 1).toString(), // Site number
            candidate.registrationNumber,
            candidate.user.firstName + ' ' + candidate.user.lastName,
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

          // Add footer with total count and page info
          const pageHeight = doc.internal.pageSize.height;
          doc.setDrawColor(41, 128, 185);
          doc.setLineWidth(0.5);
          doc.line(15, pageHeight - 25, doc.internal.pageSize.width - 15, pageHeight - 25);

          doc.setFontSize(10);
          doc.setTextColor(100);
          // Left side
          doc.text('ESSTIC Entrance Examination 2024', 15, pageHeight - 15);
          // Center
          doc.text(
            `Total Eligible Candidates: ${fieldCandidates.length}`,
            doc.internal.pageSize.width / 2,
            pageHeight - 15,
            { align: 'center' }
          );
          // Right side
          doc.text(
            `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
            doc.internal.pageSize.width - 15,
            pageHeight - 15,
            { align: 'right' }
          );
        }
      });

      // Save the PDF
      doc.save('entrance-exam-candidates.pdf');
    };

    const registerNewCandidate = () => {
      router.push('/candidate-registration?source=admin');
    };

    const clearFilters = () => {
      searchQuery.value = '';
      selectedField.value = '';
      statusFilter.value = '';
    };

    return {
      searchQuery,
      selectedField,
      statusFilter,
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
      selectedReportField
    };
  }
};
</script>

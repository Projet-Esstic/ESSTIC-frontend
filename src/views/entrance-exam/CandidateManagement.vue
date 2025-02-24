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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
      <div class="w-1/4 bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-semibold mb-4">Filters</h2>
        
        <!-- Search Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Search by name...</label>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search candidates..."
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
        </div>

        <!-- Status Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Status</label>
          <select 
            v-model="statusFilter"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="validated">Validated</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <!-- Field Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Field of Study</label>
          <select 
            v-model="selectedField"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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

        <!-- Clear Filters Button -->
        <button 
          @click="clearFilters"
          class="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Candidates Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Field of Study
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="candidate in filteredCandidates" :key="candidate.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ candidate.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ getFieldName(candidate.fieldId) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    {
                      'bg-yellow-100 text-yellow-800': candidate.status === 'pending',
                      'bg-green-100 text-green-800': candidate.status === 'validated',
                      'bg-red-100 text-red-800': candidate.status === 'rejected'
                    }
                  ]">
                    {{ candidate.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(candidate.registrationDate) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    @click="editCandidate(candidate)"
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <template v-if="candidate.status === 'pending'">
                    <button 
                      @click="validateCandidate(candidate)"
                      class="text-green-600 hover:text-green-900 mr-3"
                    >
                      Validate
                    </button>
                    <button 
                      @click="rejectCandidate(candidate)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Candidate Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Edit Candidate</h3>
        <form @submit.prevent="saveCandidate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              v-model="editingCandidate.name"
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Field of Study</label>
            <select 
              v-model="editingCandidate.fieldId"
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option 
                v-for="field in fields" 
                :key="field.id" 
                :value="field.id"
              >
                {{ field.name }}
              </option>
            </select>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'CandidateManagement',
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
    const selectedReportField = ref('');

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
        validatedCandidates: filteredCands.filter(c => c.status === 'validated').length,
        pendingCandidates: filteredCands.filter(c => c.status === 'pending').length,
        classStats: []
      };

      // Group by field
      const fieldGroups = props.fields.reduce((acc, field) => {
        const fieldCandidates = filteredCands.filter(c => c.fieldId === field.id);
        if (fieldCandidates.length > 0) {
          acc.push({
            fieldId: field.id,
            total: fieldCandidates.length,
            validated: fieldCandidates.filter(c => c.status === 'validated').length,
            pending: fieldCandidates.filter(c => c.status === 'pending').length,
            rejected: fieldCandidates.filter(c => c.status === 'rejected').length,
            dateRange: getDateRange(fieldCandidates)
          });
        }
        return acc;
      }, []);

      stats.classStats = fieldGroups;
      return stats;
    });

    const filteredCandidates = computed(() => {
      return candidates.value.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesField = !selectedField.value || candidate.fieldId === selectedField.value;
        const matchesStatus = !statusFilter.value || candidate.status === statusFilter.value;
        return matchesSearch && matchesField && matchesStatus;
      });
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
            .filter(c => c.fieldId === stat.fieldId && c.status === 'validated')
            .sort((a, b) => a.name.localeCompare(b.name));

          // Create table of candidates
          const tableData = fieldCandidates.map((candidate, idx) => [
            (idx + 1).toString(), // Site number
            candidate.registrationNumber,
            candidate.name,
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

    const editCandidate = (candidate) => {
      editingCandidate.value = { ...candidate };
      showEditModal.value = true;
    };

    const saveCandidate = () => {
      store.commit('candidates/updateCandidate', editingCandidate.value);
      showEditModal.value = false;
    };

    const validateCandidate = (candidate) => {
      store.commit('candidates/updateCandidateStatus', {
        candidateId: candidate.id,
        status: 'validated'
      });
    };

    const rejectCandidate = (candidate) => {
      store.commit('candidates/updateCandidateStatus', {
        candidateId: candidate.id,
        status: 'rejected'
      });
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
      showEditModal,
      showGenerateModal,
      editingCandidate,
      selectedReportField,
      getStatistics,
      filteredCandidates,
      getFieldName,
      formatDate,
      editCandidate,
      saveCandidate,
      validateCandidate,
      rejectCandidate,
      generateValidatedPDF,
      registerNewCandidate,
      clearFilters
    };
  }
};
</script>

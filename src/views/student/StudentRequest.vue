<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-black dark:text-white mb-6">
        Student Requests Management
      </h1>
  
      <!-- Filter and Search Controls -->
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <div class="flex-1 min-w-[200px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or ID..."
            class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div class="flex-1 min-w-[200px]">
          <select
            v-model="statusFilter"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="flex-1 min-w-[200px]">
          <select
            v-model="documentTypeFilter"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="all">All Documents</option>
            <option value="transcript">Transcript</option>
            <option value="attestation">Attestation</option>
            <option value="certificate">Certificate</option>
          </select>
        </div>
        <button
          @click="processSelectedRequests"
          :disabled="selectedRequests.length === 0"
          class="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50"
        >
          Process Selected ({{ selectedRequests.length }})
        </button>
      </div>
  
      <!-- Requests Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="p-3 text-left">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
              </th>
              <th class="p-3 text-left">Student ID</th>
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Request Type</th>
              <th class="p-3 text-left">Date Requested</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Semester</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="request in paginatedRequests" 
              :key="request.id"
              class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <td class="p-3">
                <input
                  type="checkbox"
                  :value="request.id"
                  v-model="selectedRequests"
                  :disabled="request.status !== 'new'"
                />
              </td>
              <td class="p-3">{{ request.studentId }}</td>
              <td class="p-3">{{ request.studentName }}</td>
              <td class="p-3">{{ request.requestType }}</td>
              <td class="p-3">{{ formatDate(request.requestDate) }}</td>
              <td class="p-3">
                <span 
                  :class="{
                    'px-2 py-1 rounded text-xs font-medium': true,
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': request.status === 'new',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': request.status === 'pending',
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': request.status === 'done',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': request.status === 'rejected'
                  }"
                >
                  {{ request.status.charAt(0).toUpperCase() + request.status.slice(1) }}
                </span>
              </td>
              <td class="p-3">{{ request.semester }}</td>
              <td class="p-3">
                <div class="flex gap-2">
                  <button 
                    @click="processSingleRequest(request.id)" 
                    :disabled="request.status === 'pending' || request.status === 'done'"
                    class="px-3 py-1 bg-yellow-500 text-white rounded text-sm disabled:opacity-50"
                  >
                    Process
                  </button>
                  <button 
                    @click="openDocumentModal(request)" 
                    class="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    View
                  </button>
                  <button 
                    @click="updateStatus(request.id, 'done')" 
                    :disabled="request.status === 'done' || request.status === 'new'"
                    class="px-3 py-1 bg-green-500 text-white rounded text-sm disabled:opacity-50"
                  >
                    Complete
                  </button>
                  <button 
                    @click="updateStatus(request.id, 'rejected')" 
                    :disabled="request.status === 'rejected' || request.status === 'done'"
                    class="px-3 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredRequests.length === 0">
              <td colspan="8" class="p-4 text-center text-gray-500">No requests found</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {{ paginatedRequests.length }} of {{ filteredRequests.length }} requests
        </div>
        <div class="flex gap-2">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span class="px-3 py-1">Page {{ currentPage }} of {{ totalPages }}</span>
          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
  
      <!-- Document Generation Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">{{ selectedRequest.requestType }} for {{ selectedRequest.studentName }}</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <div class="mb-4">
            <p><strong>Student ID:</strong> {{ selectedRequest.studentId }}</p>
            <p><strong>Program:</strong> {{ selectedRequest.program }}</p>
            <p><strong>Academic Year:</strong> {{ selectedRequest.academicYear }}</p>
            <p><strong>Semester:</strong> {{ selectedRequest.semester }}</p>
            <p><strong>Request Date:</strong> {{ formatDate(selectedRequest.requestDate) }}</p>
          </div>
  
          <div class="border p-4 rounded mb-4">
            <h3 class="font-bold mb-2">Document Preview</h3>
            <div class="bg-gray-100 dark:bg-gray-900 p-4 min-h-[200px]">
              <div v-if="selectedRequest.requestType === 'transcript'" class="text-center">
                <h3 class="text-lg font-bold mb-6">ACADEMIC TRANSCRIPT</h3>
                <p class="mb-2">ESSTIC University</p>
                <p class="mb-2">This is to certify that</p>
                <p class="font-bold">{{ selectedRequest.studentName }} (ID: {{ selectedRequest.studentId }})</p>
                <p class="mb-2">Has successfully completed courses in</p>
                <p class="font-bold">{{ selectedRequest.program }}</p>
                <p class="mb-4">For {{ selectedRequest.semester }} of Academic Year {{ selectedRequest.academicYear }}</p>
                <table class="mx-auto mb-4 w-full max-w-md border-collapse">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="p-2 border">Course</th>
                      <th class="p-2 border">Grade</th>
                      <th class="p-2 border">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="p-2 border">Introduction to {{ selectedRequest.program }}</td>
                      <td class="p-2 border">A</td>
                      <td class="p-2 border">3</td>
                    </tr>
                    <tr>
                      <td class="p-2 border">Advanced {{ selectedRequest.program }}</td>
                      <td class="p-2 border">B+</td>
                      <td class="p-2 border">4</td>
                    </tr>
                  </tbody>
                </table>
                <div class="mt-12 pt-8 border-t">
                  <p>Registrar</p>
                  <p>_________________________</p>
                  <p>Date: {{ formatDate(new Date()) }}</p>
                </div>
              </div>
              <div v-else-if="selectedRequest.requestType === 'attestation'" class="text-center">
                <h3 class="text-lg font-bold mb-6">STUDENT ATTESTATION</h3>
                <p class="mb-2">ESSTIC University</p>
                <p class="mb-2">This is to certify that</p>
                <p class="font-bold">{{ selectedRequest.studentName }} (ID: {{ selectedRequest.studentId }})</p>
                <p class="mb-2">Is a bona fide student of ESSTIC University</p>
                <p class="mb-2">Enrolled in {{ selectedRequest.program }}</p>
                <p class="mb-4">For {{ selectedRequest.semester }} of Academic Year {{ selectedRequest.academicYear }}</p>
                <div class="mt-12 pt-8 border-t">
                  <p>Dean of Students</p>
                  <p>_________________________</p>
                  <p>Date: {{ formatDate(new Date()) }}</p>
                </div>
              </div>
              <div v-else-if="selectedRequest.requestType === 'certificate'" class="text-center">
                <h3 class="text-lg font-bold mb-6">CERTIFICATE OF COMPLETION</h3>
                <p class="mb-2">ESSTIC University</p>
                <p class="mb-2">This certifies that</p>
                <p class="font-bold text-xl">{{ selectedRequest.studentName }}</p>
                <p class="mb-2">(Student ID: {{ selectedRequest.studentId }})</p>
                <p class="mb-2">Has successfully completed the</p>
                <p class="font-bold">{{ selectedRequest.program }} Program</p>
                <p class="mb-4">During {{ selectedRequest.semester }} of Academic Year {{ selectedRequest.academicYear }}</p>
                <div class="mt-12 pt-8 border-t flex justify-between">
                  <div>
                    <p>Registrar</p>
                    <p>_________________________</p>
                  </div>
                  <div>
                    <p>Dean</p>
                    <p>_________________________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="flex justify-between">
            <button @click="closeModal" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
              Close
            </button>
            <div class="flex gap-2">
              <button 
                @click="printDocument" 
                class="px-4 py-2 bg-green-500 text-white rounded"
              >
                Print Document
              </button>
              <button 
                @click="updateStatus(selectedRequest.id, 'done'); closeModal();" 
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    data() {
      return {
        searchQuery: '',
        statusFilter: 'all',
        documentTypeFilter: 'all',
        currentPage: 1,
        itemsPerPage: 10,
        showModal: false,
        selectedRequest: {},
        selectedRequests: [],
        selectAll: false,
        requests: [
          {
            id: 1,
            studentId: 'ST2023001',
            studentName: 'Alice Johnson',
            requestType: 'transcript',
            requestDate: '2025-03-01',
            status: 'new',
            program: 'Information Technology',
            academicYear: '2024-2025',
            semester: 'Fall 2024'
          },
          {
            id: 2,
            studentId: 'ST2023001',
            studentName: 'Alice Johnson',
            requestType: 'attestation',
            requestDate: '2025-03-02',
            status: 'new',
            program: 'Information Technology',
            academicYear: '2024-2025',
            semester: 'Fall 2024'
          },
          {
            id: 3,
            studentId: 'ST2023015',
            studentName: 'Bob Smith',
            requestType: 'attestation',
            requestDate: '2025-03-05',
            status: 'new',
            program: 'Business Administration',
            academicYear: '2024-2025',
            semester: 'Spring 2025'
          },
          {
            id: 4,
            studentId: 'ST2023015',
            studentName: 'Bob Smith',
            requestType: 'certificate',
            requestDate: '2025-03-06',
            status: 'new',
            program: 'Business Administration',
            academicYear: '2024-2025',
            semester: 'Spring 2025'
          },
          {
            id: 5,
            studentId: 'ST2022089',
            studentName: 'Carol Davis',
            requestType: 'certificate',
            requestDate: '2025-03-07',
            status: 'done',
            program: 'Journalism',
            academicYear: '2024-2025',
            semester: 'Fall 2024'
          },
          {
            id: 6,
            studentId: 'ST2024112',
            studentName: 'David Wilson',
            requestType: 'transcript',
            requestDate: '2025-03-10',
            status: 'new',
            program: 'Computer Science',
            academicYear: '2024-2025',
            semester: 'Spring 2025'
          },
          {
            id: 7,
            studentId: 'ST2023045',
            studentName: 'Eva Martinez',
            requestType: 'attestation',
            requestDate: '2025-03-12',
            status: 'new',
            program: 'Economics',
            academicYear: '2024-2025',
            semester: 'Fall 2024'
          }
        ]
      };
    },
  
    computed: {
      filteredRequests() {
        return this.requests.filter(request => {
          const matchesSearch = 
            this.searchQuery === '' || 
            request.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            request.studentId.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesStatus = this.statusFilter === 'all' || request.status === this.statusFilter;
          const matchesType = this.documentTypeFilter === 'all' || request.requestType === this.documentTypeFilter;
          return matchesSearch && matchesStatus && matchesType;
        });
      },
  
      paginatedRequests() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredRequests.slice(start, end);
      },
  
      totalPages() {
        return Math.ceil(this.filteredRequests.length / this.itemsPerPage) || 1;
      }
    },
  
    methods: {
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
  
      updateStatus(requestId, newStatus) {
        const requestIndex = this.requests.findIndex(r => r.id === requestId);
        if (requestIndex !== -1) {
          this.requests[requestIndex].status = newStatus;
          this.showNotification(`Request ${requestId} status updated to ${newStatus}`);
        }
      },
  
      openDocumentModal(request) {
        this.selectedRequest = { ...request };
        this.showModal = true;
      },
  
      closeModal() {
        this.showModal = false;
        this.selectedRequest = {};
      },
  
      toggleSelectAll() {
        if (this.selectAll) {
          this.selectedRequests = this.paginatedRequests
            .filter(r => r.status === 'new')
            .map(r => r.id);
        } else {
          this.selectedRequests = [];
        }
      },
  
      processSingleRequest(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request || request.status !== 'new') return;
  
        this.updateStatus(requestId, 'pending');
        this.generatePdfForRequest(request);
      },
  
      processSelectedRequests() {
        if (this.selectedRequests.length === 0) {
          this.showNotification('No requests selected for processing');
          return;
        }
  
        const requestsToProcess = this.requests.filter(r => this.selectedRequests.includes(r.id));
        requestsToProcess.forEach(request => {
          if (request.status === 'new') {
            this.updateStatus(request.id, 'pending');
            this.generatePdfForRequest(request);
          }
        });
  
        this.selectedRequests = [];
        this.selectAll = false;
        this.showNotification(`Processed ${requestsToProcess.length} requests`);
      },
  
      generatePdfForRequest(request) {
        const doc = new jsPDF();
        const { requestType, studentName, studentId, program, academicYear, semester } = request;
        const currentDate = this.formatDate(new Date());
  
        doc.setFontSize(16);
        if (requestType === 'transcript') {
          doc.text('ACADEMIC TRANSCRIPT', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('ESSTIC University', 105, 30, { align: 'center' });
          doc.text(`This is to certify that ${studentName} (ID: ${studentId})`, 20, 50);
          doc.text(`Has completed courses in ${program}`, 20, 60);
          doc.text(`For ${semester} of Academic Year ${academicYear}`, 20, 70);
          doc.autoTable({
            startY: 80,
            head: [['Course', 'Grade', 'Credits']],
            body: [
              [`Introduction to ${program}`, 'A', '3'],
              [`Advanced ${program}`, 'B+', '4']
            ]
          });
          doc.text(`Registrar: _________________________`, 20, doc.lastAutoTable.finalY + 20);
          doc.text(`Date: ${currentDate}`, 20, doc.lastAutoTable.finalY + 30);
        } else if (requestType === 'attestation') {
          doc.text('STUDENT ATTESTATION', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('ESSTIC University', 105, 30, { align: 'center' });
          doc.text(`This is to certify that ${studentName} (ID: ${studentId})`, 20, 50);
          doc.text('Is a student of ESSTIC University', 20, 60);
          doc.text(`Enrolled in ${program} for ${semester} of ${academicYear}`, 20, 70);
          doc.text('Issued upon request.', 20, 80);
          doc.text(`Dean: _________________________`, 20, 100);
          doc.text(`Date: ${currentDate}`, 20, 110);
        } else if (requestType === 'certificate') {
          doc.text('CERTIFICATE OF COMPLETION', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('ESSTIC University', 105, 30, { align: 'center' });
          doc.text('This certifies that', 105, 50, { align: 'center' });
          doc.setFontSize(16);
          doc.text(studentName, 105, 60, { align: 'center' });
          doc.setFontSize(12);
          doc.text(`(Student ID: ${studentId})`, 105, 70, { align: 'center' });
          doc.text(`Completed ${program}`, 105, 80, { align: 'center' });
          doc.text(`During ${semester} of ${academicYear}`, 105, 90, { align: 'center' });
          doc.text(`Awarded on ${currentDate}`, 105, 100, { align: 'center' });
          doc.text('Registrar: _________________________', 20, 120);
          doc.text('Dean: _________________________', 140, 120);
        }
  
        doc.save(`${requestType}_${studentId}_${semester.replace(' ', '_')}_${request.id}.pdf`);
        this.showNotification(`Generated PDF for ${studentName} (${requestType})`);
      },
  
      printDocument() {
        const doc = new jsPDF();
        const { requestType, studentName, studentId, program, academicYear, semester } = this.selectedRequest;
        const currentDate = this.formatDate(new Date());
  
        doc.setFontSize(16);
        if (requestType === 'transcript') {
          doc.text('ACADEMIC TRANSCRIPT', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('ESSTIC University', 105, 30, { align: 'center' });
          doc.text(`This is to certify that ${studentName} (ID: ${studentId})`, 20, 50);
          doc.text(`Has completed courses in ${program}`, 20, 60);
          doc.text(`For ${semester} of Academic Year ${academicYear}`, 20, 70);
          doc.autoTable({
            startY: 80,
            head: [['Course', 'Grade', 'Credits']],
            body: [
              [`Introduction to ${program}`, 'A', '3'],
              [`Advanced ${program}`, 'B+', '4']
            ]
          });
          doc.text(`Registrar: _________________________`, 20, doc.lastAutoTable.finalY + 20);
          doc.text(`Date: ${currentDate}`, 20, doc.lastAutoTable.finalY + 30);
        } else if (requestType === 'attestation') {
          doc.text('STUDENT ATTESTATION', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('ESSTIC University', 105, 30, { align: 'center' });
          doc.text(`This is to certify that ${studentName} (ID: ${studentId})`, 20, 50);
          doc.text('Is a student of ESSTIC University', 20, 60);
          doc.text(`Enrolled in ${program} for ${semester} of ${academicYear}`, 20, 70);
          doc.text('Issued upon request.', 20, 80);
          doc.text(`Dean: _________________________`, 20, 100);
          doc.text(`Date: ${currentDate}`, 20, 110);
        } else if (requestType === 'certificate') {
          doc.text('CERTIFICATE OF COMPLETION', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('ESSTIC University', 105, 30, { align: 'center' });
          doc.text('This certifies that', 105, 50, { align: 'center' });
          doc.setFontSize(16);
          doc.text(studentName, 105, 60, { align: 'center' });
          doc.setFontSize(12);
          doc.text(`(Student ID: ${studentId})`, 105, 70, { align: 'center' });
          doc.text(`Completed ${program}`, 105, 80, { align: 'center' });
          doc.text(`During ${semester} of ${academicYear}`, 105, 90, { align: 'center' });
          doc.text(`Awarded on ${currentDate}`, 105, 100, { align: 'center' });
          doc.text('Registrar: _________________________', 20, 120);
          doc.text('Dean: _________________________', 140, 120);
        }
  
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
        this.showNotification(`Document prepared for printing for ${studentName}`);
      },
  
      showNotification(message) {
        console.log(message); // Replace with your notification system
      }
    },
  
    watch: {
      searchQuery() { this.currentPage = 1; },
      statusFilter() { this.currentPage = 1; },
      documentTypeFilter() { this.currentPage = 1; }
    },
  
    mounted() {
      // Fetch requests from API in production
    }
  };
  </script>
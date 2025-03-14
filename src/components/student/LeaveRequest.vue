<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Leave Request</h2>
    
    <!-- Leave Request Form -->
    <form @submit.prevent="submitLeaveRequest" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <!-- Leave Type Selection -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
        <select 
          v-model="leaveType" 
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="" disabled>Select leave type</option>
          <option value="vacation">Vacation Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="personal">Personal Leave</option>
          <option value="bereavement">Bereavement Leave</option>
          <option value="other">Other</option>
        </select>
        <p v-if="!leaveType && showErrors" class="text-red-500 text-sm mt-1">Leave type is required.</p>
      </div>
      
      <!-- Date Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
          <input 
            type="date" 
            v-model="startDate"
            min="2025-03-14"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p v-if="!startDate && showErrors" class="text-red-500 text-sm mt-1">Start date is required.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
          <input 
            type="date" 
            v-model="endDate"
            :min="startDate || '2025-03-14'"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p v-if="!endDate && showErrors" class="text-red-500 text-sm mt-1">End date is required.</p>
          <p v-if="dateError" class="text-red-500 text-sm mt-1">{{ dateError }}</p>
        </div>
      </div>
      
      <!-- Leave Duration -->
      <div class="mb-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Leave Duration</h3>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-lg font-bold">{{ leaveDuration }}</span>
            <span class="text-sm ml-1 text-gray-600 dark:text-gray-400">{{ leaveDuration === 1 ? 'day' : 'days' }}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span>Remaining balance: </span>
            <span class="font-medium">{{ remainingBalance }} days</span>
          </div>
        </div>
      </div>
      
 
      
      <!-- Justification from original code -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Justification</label>
        <textarea
          v-model="justification"
          placeholder="Enter your justification for the leave"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="4"
        ></textarea>
        <p v-if="!justification && showErrors" class="text-red-500 text-sm mt-1">Justification is required.</p>
      </div>
      
      <!-- Document Upload from original code -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Supporting Document</label>
          <span v-if="leaveType === 'sick'" class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Required for sick leave</span>
        </div>
        <div class="flex items-center">
          <input
            type="file"
            @change="handleFileUpload"
            class="hidden"
            ref="fileInput"
          />
          <button type="button" @click="triggerFileInput" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Choose File
          </button>
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ uploadedFileName || 'No file chosen' }}</span>
        </div>
        <div v-if="uploading" class="mt-2 flex items-center">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mr-2"></div>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ uploadProgress }}% uploaded</p>
        </div>
        <p v-if="leaveType === 'sick' && !uploadedFileName && showErrors" class="text-red-500 text-sm mt-1">Supporting document is required for sick leave.</p>
        <div v-if="filePreview" class="mt-4">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Preview:</h3>
          <img v-if="isImage" :src="filePreview" alt="Image Preview" class="max-w-full h-auto rounded-md" />
          <canvas v-else ref="pdfCanvas" class="w-full h-auto border rounded-md"></canvas>
        </div>
      </div>
      
      <!-- Buttons -->
      <div class="flex justify-between">
        <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Reset Form
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit Leave Request
        </button>
      </div>
    </form>
    
    <!-- Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Leave Request</h3>
        <div class="space-y-3 mb-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">Leave Type: <span class="font-medium text-gray-900 dark:text-white">{{ getLeaveTypeName(leaveType) }}</span></p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Duration: <span class="font-medium text-gray-900 dark:text-white">{{ formatDateRange(startDate, endDate) }} ({{ leaveDuration }} days)</span></p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Approving Manager: <span class="font-medium text-gray-900 dark:text-white">{{ getManagerName(manager) }}</span></p>
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="showConfirmation = false" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button @click="confirmSubmission" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Confirm Submission
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useToast } from 'vue-toastification';
import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc to a relative path
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export default {
  name: 'LeaveRequest',
  setup() {
    // Original form fields
    const justification = ref('');
    const uploadedFile = ref(null);
    const uploadedFileName = ref('');
    const uploadProgress = ref(0);
    const uploading = ref(false);
    const showErrors = ref(false);
    const filePreview = ref(null);
    const isImage = ref(false);
    const fileInput = ref(null);
    const pdfCanvas = ref(null);
    const toast = useToast();
    
    // New form fields
    const leaveType = ref('');
    const startDate = ref('');
    const endDate = ref('');
    const manager = ref('');
    const dateError = ref('');
    const showConfirmation = ref(false);
    
    // Example remaining balance (in a real app this would come from an API)
    const remainingBalance = ref(25);
    
    // Calculate leave duration based on start and end dates
    const leaveDuration = computed(() => {
      if (!startDate.value || !endDate.value) return 0;
      
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      
      // Calculate the difference in days, add 1 to include both start and end days
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      return diffDays;
    });
    
    // Watch for changes in the date inputs
    watch([startDate, endDate], ([newStartDate, newEndDate]) => {
      if (newStartDate && newEndDate) {
        const start = new Date(newStartDate);
        const end = new Date(newEndDate);
        
        if (end < start) {
          dateError.value = 'End date cannot be before start date';
        } else {
          dateError.value = '';
        }
      }
    });
    
    // Original file handling functions
    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadedFile.value = file;
        uploadedFileName.value = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          if (file.type.startsWith('image/')) {
            filePreview.value = e.target.result;
            isImage.value = true;
          } else if (file.type === 'application/pdf') {
            isImage.value = false;
            renderPDF(e.target.result);
          }
        };
        reader.readAsDataURL(file);
        simulateUpload();
      }
    };

    const renderPDF = (dataUrl) => {
      const loadingTask = pdfjsLib.getDocument({ data: dataUrl });
      loadingTask.promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = pdfCanvas.value;
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
        });
      }).catch((error) => {
        console.error('Error rendering PDF:', error);
        toast.error('Failed to load PDF preview.');
      });
    };

    const simulateUpload = () => {
      uploadProgress.value = 0;
      uploading.value = true;
      const interval = setInterval(() => {
        if (uploadProgress.value < 100) {
          uploadProgress.value += 10;
        } else {
          clearInterval(interval);
          uploading.value = false;
          toast.success('File uploaded successfully!');
        }
      }, 200);
    };
    
    // Reset form function
    const resetForm = () => {
      leaveType.value = '';
      startDate.value = '';
      endDate.value = '';
      justification.value = '';
      uploadedFile.value = null;
      uploadedFileName.value = '';
      filePreview.value = null;
      showErrors.value = false;
      dateError.value = '';
    };
    
    // Helper functions for confirmation dialog
    const getLeaveTypeName = (type) => {
      const types = {
        'vacation': 'Vacation Leave',
        'sick': 'Sick Leave',
        'personal': 'Personal Leave',
        'bereavement': 'Bereavement Leave',
        'other': 'Other Leave'
      };
      return types[type] || type;
    };
    
    
    const formatDateRange = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    };
    
    // Form submission
    const submitLeaveRequest = () => {
      showErrors.value = true;
      
      // Validate form
      if (!leaveType.value || !startDate.value || !endDate.value  || !justification.value) {
        toast.error('Please fill in all required fields.');
        return;
      }
      
      // Check if document is required for sick leave
      if (leaveType.value === 'sick' && !uploadedFileName.value) {
        toast.error('Supporting document is required for sick leave.');
        return;
      }
      
      // Check date error
      if (dateError.value) {
        toast.error(dateError.value);
        return;
      }
      
      // Show confirmation dialog
      showConfirmation.value = true;
    };
    
    const confirmSubmission = () => {
      // Here you would typically send the data to your backend
      console.log('Leave request submitted:', {
        leaveType: leaveType.value,
        startDate: startDate.value,
        endDate: endDate.value,
        duration: leaveDuration.value,
        manager: manager.value,
        justification: justification.value,
        file: uploadedFile.value ? uploadedFile.value.name : 'No file uploaded'
      });
      
      // Close confirmation dialog
      showConfirmation.value = false;
      
      // Show success message
      toast.success('Leave request submitted successfully!');
      
      // Reset form
      resetForm();
    };
    
    return {
      // Original form fields
      justification,
      uploadedFile,
      uploadedFileName,
      uploadProgress,
      uploading,
      showErrors,
      filePreview,
      isImage,
      fileInput,
      pdfCanvas,
      
      // New form fields
      leaveType,
      startDate,
      endDate,
      dateError,
      showConfirmation,
      remainingBalance,
      leaveDuration,
      
      // Functions
      triggerFileInput,
      handleFileUpload,
      resetForm,
      submitLeaveRequest,
      getLeaveTypeName,
      formatDateRange,
      confirmSubmission
    };
  }
};
</script>

<style>
.loader {
  border-top-color: #3498db;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 
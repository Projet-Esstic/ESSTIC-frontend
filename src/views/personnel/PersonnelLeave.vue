
<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Personnel Leave Request</h2>
    
    <form @submit.prevent="submitLeaveRequest" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
        <select 
          v-model="leaveType"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="sick">Sick Leave</option>
          <option value="vacation">Vacation</option>
          <option value="maternity">Maternity Leave</option>
          <option value="personal">Personal Leave</option>
        </select>
        <p v-if="!leaveType && showErrors" class="text-red-500 text-sm mt-1">Leave type is required.</p>
      </div>

      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
          <input
            type="date"
            v-model="startDate"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p v-if="!startDate && showErrors" class="text-red-500 text-sm mt-1">Start date is required.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
          <input
            type="date"
            v-model="endDate"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p v-if="!endDate && showErrors" class="text-red-500 text-sm mt-1">End date is required.</p>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
        <textarea
          v-model="reason"
          placeholder="Enter your reason for the leave"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="4"
        ></textarea>
        <p v-if="!reason && showErrors" class="text-red-500 text-sm mt-1">Reason is required.</p>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supporting Document</label>
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
      </div>

      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Leave Request</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import apiClient from '@/api/client';
import { ENDPOINTS } from '@/api/config';

export default {
  name: 'PersonnelLeave',
  setup() {
    const toast = useToast();
    const leaveType = ref('');
    const startDate = ref('');
    const endDate = ref('');
    const reason = ref('');
    const showErrors = ref(false);
    const fileInput = ref(null);
    const uploadedFileName = ref('');
    const uploadProgress = ref(0);
    const uploading = ref(false);
    const uploadedFile = ref(null);

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadedFile.value = file;
        uploadedFileName.value = file.name;
        simulateUpload();
      }
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

    const submitLeaveRequest = async () => {
      showErrors.value = true;

      if (!leaveType.value || !startDate.value || !endDate.value || !reason.value) {
        toast.error('Please fill in all required fields');
        return;
      }

      try {
        const response = await apiClient.post(ENDPOINTS.PERSONNEL, {
          leaveType: leaveType.value,
          startDate: startDate.value,
          endDate: endDate.value,
          reason: reason.value
        });

        if (response.data) {
          toast.success('Leave request submitted successfully');
          resetForm();
        }
      } catch (error) {
        toast.error('Failed to submit leave request');
        console.error('Leave request error:', error);
      }
    };

    const resetForm = () => {
      leaveType.value = '';
      startDate.value = '';
      endDate.value = '';
      reason.value = '';
      uploadedFileName.value = '';
      uploadedFile.value = null;
      showErrors.value = false;
    };

    return {
      leaveType,
      startDate,
      endDate,
      reason,
      showErrors,
      fileInput,
      uploadedFileName,
      uploadProgress,
      uploading,
      triggerFileInput,
      handleFileUpload,
      submitLeaveRequest
    };
  }
};
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

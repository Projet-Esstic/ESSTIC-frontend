<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold text-center text-blue-600">Justify Absence Request</h2>
    
    <!-- Loading Indicator -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Justify Absence Form -->
    <form v-else @submit.prevent="submitAbsenceRequest" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Absence</label>
        <input
          type="date"
          v-model="absenceDate"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-150 ease-in-out"
        />
        <p v-if="!absenceDate && showErrors" class="text-red-500 text-sm mt-1">Date is required.</p>
      </div>
      <div class="mb-4 flex items-center">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 mr-2">Examination Absence</label>
        <input
          type="checkbox"
          v-model="isExamination"
          @change="fetchCourses"
          class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
        />
      </div>
      <div v-if="isExamination" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
        <select v-model="selectedCourse" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-150 ease-in-out">
          <option value="">Select Course</option>
          <option v-for="course in courses" :key="course._id" :value="course._id">
            {{ course.courseName }}
          </option>
        </select>
        <p v-if="!selectedCourse && showErrors" class="text-red-500 text-sm mt-1">Course is required.</p>
      </div>
      <div v-if="isExamination" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type of Examination</label>
        <select v-model="examType" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-150 ease-in-out">
          <option value="">Select Type</option>
          <option value="exam">Exam</option>
          <option value="ca">Continuous Assessment (CA)</option>
          <option value="resit">Resit</option>
        </select>
        <p v-if="!examType && showErrors" class="text-red-500 text-sm mt-1">Examination type is required.</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Absence</label>
        <textarea
          v-model="reason"
          placeholder="Enter the reason for your absence"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-150 ease-in-out"
          rows="4"
        ></textarea>
        <p v-if="!reason && showErrors" class="text-red-500 text-sm mt-1">Reason is required.</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Supporting Document</label>
        <div class="flex items-center">
          <input
            type="file"
            @change="handleFileUpload"
            class="hidden"
            ref="fileInput"
          />
          <button type="button" @click="triggerFileInput" class="px-4 py-2 hover:text-white bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out">
            Choose File
          </button>
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ uploadedFileName || 'No file chosen' }}</span>
        </div>
        <div v-if="filePreview" class="mt-4">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Preview:</h3>
          <img v-if="isImage" :src="filePreview" alt="Image Preview" class="max-w-full h-auto rounded-md shadow-md" />
          <canvas v-else ref="pdfCanvas" class="w-full h-auto border rounded-md shadow-md"></canvas>
        </div>
      </div>
      <div class="flex justify-between">
        <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-300 text-black hover:text-white rounded-md">
          Reset Form
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit Leave Request
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import * as pdfjsLib from 'pdfjs-dist';
import { courseService } from '@/api/services/index'; // Assuming you have a course service
import { submitAbsenceRequest as submitRequest } from '@/api/services/requests'; // Import the new service

// Set the workerSrc to a relative path
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export default {
  name: 'JustifyAbsenceRequest',
  setup() {
    const absenceDate = ref('');
    const reason = ref('');
    const isExamination = ref(false);
    const selectedCourse = ref('');
    const examType = ref('');
    const courses = ref([]);
    const uploadedFile = ref(null);
    const uploadedFileName = ref('');
    const filePreview = ref(null);
    const isImage = ref(false);
    const showErrors = ref(false);
    const loading = ref(false);
    const toast = useToast();
    const fileInput = ref(null);
    const pdfCanvas = ref(null);

    const triggerFileInput = () => {
      fileInput.value.click();
    };

      // Reset form function
      const resetForm = () => {
        absenceDate.value = '';
        isExamination.value = '';
        courses.value = '';
        selectedCourse.value = '';
        uploadedFile.value = null;
        uploadedFileName.value = '';
        filePreview.value = null;
        showErrors.value = false;
        reason.value = '';
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

    const fetchCourses = async () => {
      if (isExamination.value) {
        loading.value = true;
        try {
          const response = await courseService.getAllCourses();
          courses.value = response;
        } catch (err) {
          console.error('Failed to load courses:', err);
          toast.error('Failed to load courses');
        } finally {
          loading.value = false;
        }
      }
    };

    const submitAbsenceRequest = async () => {
      showErrors.value = true;
      if (!absenceDate.value || !reason.value || (isExamination.value && (!selectedCourse.value || !examType.value))) {
        toast.error('Please provide all required information.');
        return;
      }

      loading.value = true;
      try {
        const absenceData = {
          date: absenceDate.value,
          reason: reason.value,
          isExamination: isExamination.value,
          course: selectedCourse.value,
          examType: examType.value,
          file: uploadedFile.value ? uploadedFile.value.name : 'No file uploaded'
        };

        await submitRequest(absenceData);
        toast.success('Absence request submitted successfully');
      } catch (error) {
        toast.error('Failed to submit absence request');
      } finally {
        loading.value = false;
      }
    };

    return {
      absenceDate,
      reason,
      isExamination,
      selectedCourse,
      examType,
      courses,
      uploadedFile,
      uploadedFileName,
      filePreview,
      isImage,
      showErrors,
      loading,
      fileInput,
      pdfCanvas,
      triggerFileInput,
      handleFileUpload,
      fetchCourses,
      submitAbsenceRequest,
      resetForm
    };
  }
};
</script>

<style scoped>
/* Add custom styles for better UI */
.form-checkbox {
  transition: background-color 0.2s ease-in-out;
}

.form-checkbox:checked {
  background-color: #2563eb; /* blue-600 */
}

.form-checkbox:checked::before {
  transform: translateX(1.25rem);
}

button {
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #1d4ed8; /* blue-700 */
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 
<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Leave Request</h2>
    
    <!-- Leave Request Form -->
    <form @submit.prevent="submitLeaveRequest" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
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
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Supporting Document</label>
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
        <div v-if="filePreview" class="mt-4">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Preview:</h3>
          <img v-if="isImage" :src="filePreview" alt="Image Preview" class="max-w-full h-auto rounded-md" />
          <canvas v-else ref="pdfCanvas" class="w-full h-auto border rounded-md"></canvas>
        </div>
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Leave Request</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc to a relative path
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export default {
  name: 'LeaveRequest',
  setup() {
    const justification = ref('');
    const uploadedFile = ref(null);
    const uploadedFileName = ref('');
    const uploadProgress = ref(0);
    const uploading = ref(false);
    const showErrors = ref(false);
    const filePreview = ref(null);
    const isImage = ref(false);
    const toast = useToast();
    const fileInput = ref(null);
    const pdfCanvas = ref(null);

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

    const submitLeaveRequest = () => {
      showErrors.value = true;
      if (!justification.value) {
        toast.error('Please provide a justification for your leave request.');
        return;
      }

      // Handle the leave request submission logic here
      console.log('Leave request submitted:', {
        justification: justification.value,
        file: uploadedFile.value ? uploadedFile.value.name : 'No file uploaded'
      });
      toast.success('Leave request submitted successfully');
    };

    return {
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
      triggerFileInput,
      handleFileUpload,
      submitLeaveRequest
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
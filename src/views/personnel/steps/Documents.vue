<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Documents</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Contract</label>
          <input type="file" @change="handleFileUpload('contract', $event)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ID Card</label>
          <input type="file" @change="handleFileUpload('idCard', $event)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Degree Certificate</label>
          <input type="file" @change="handleFileUpload('degreeCertificate', $event)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Other</label>
          <input type="file" @change="handleFileUpload('other', $event)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      formData: {
        type: Object,
        required: true
      }
    },  
    emits: ['update:formData'], // Declare the emitted event
    methods: {
      handleFileUpload(field, event) {
        const file = event.target.files[0];
        if (file) {
          const updatedDocuments = {
            ...this.formData.documents,
            [field]: {
              path: URL.createObjectURL(file),
              originalName: file.name,
              mimeType: file.type,
              size: file.size,
              uploadedAt: new Date(),
            },
          };
          this.$emit('update:formData', { ...this.formData, documents: updatedDocuments });
        }
      },
    },
  }
  </script>
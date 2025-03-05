<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Certifications</h3>
      <div v-for="(certification, index) in formData.certifications" :key="index" class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Certification Name</label>
          <input v-model="certification.certificationName" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Institution</label>
          <input v-model="certification.institution" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Date Issued</label>
          <input v-model="certification.dateIssued" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input v-model="certification.expirationDate" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
      </div>
      <button @click="addCertification" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Certification</button>
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
    methods: {
      addCertification() {
        this.formData.certifications.push({
          certificationName: '',
          institution: '',
          dateIssued: '',
          expirationDate: ''
        });
      }
    }
  }
  </script>
<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Review and Submit</h3>
      <div class="space-y-4">
        <div>
          <h4 class="text-lg font-semibold">Personal Information</h4>
          <p>{{ formData.user.firstName }} {{ formData.user.lastName }}</p>
          <p>{{ formData.user.email }}</p>
          <p>{{ formData.user.phone }}</p>
        </div>
        <div>
          <h4 class="text-lg font-semibold">Employment Details</h4>
          <p>{{ formData.employmentStatus }}</p>
          <p>{{ formData.hireDate }}</p>
          <p>{{ formData.department }}</p>
        </div>
        <!-- Add more sections for other steps -->
      </div>
      <button @click="submitForm" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">Submit</button>
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
      submitForm() {
        // Handle form submission
        console.log('Form Data:', this.formData);
      }
    }
  }
  </script>
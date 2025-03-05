<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Emergency Contact</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="formData.emergencyContact.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Relationship</label>
          <input v-model="formData.emergencyContact.relationship" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input v-model="formData.emergencyContact.phone" type="tel" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
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
      updateField(field, value) {
        this.$emit('update:formData', { ...this.formData, [field]: value });
      },
    },
  }
  </script>
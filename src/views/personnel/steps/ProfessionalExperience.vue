<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Professional Experience</h3>
      <div v-for="(experience, index) in formData.professionalExperience" :key="index" class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Company</label>
          <input v-model="experience.company" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Position</label>
          <input v-model="experience.position" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input v-model="experience.yearsOfExperience" type="number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
      </div>
      <button @click="addExperience" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Experience</button>
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
      addExperience() {
        this.formData.professionalExperience.push({
          company: '',
          position: '',
          yearsOfExperience: 0
        });
      }
    }
  }
  </script>
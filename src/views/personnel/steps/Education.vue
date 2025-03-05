<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Education</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">High School Name</label>
          <input v-model="formData.highSchool.schoolName" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Year Completed</label>
          <input v-model="formData.highSchool.yearCompleted" type="number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Major Subjects</label>
          <input v-model="formData.highSchool.majorSubjects" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">University Name</label>
          <input v-model="formData.university.universityName" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Degree</label>
          <input v-model="formData.university.degree" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Year Completed</label>
          <input v-model="formData.university.yearCompleted" type="number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
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
    emits: ['update:formData'], /*Declare the emitted event*/
    methods: {
      updateField(field, value) {
        this.$emit('update:formData', { ...this.formData, [field]: value });
      },
    },
  }
  </script>
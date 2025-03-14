<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Projects</h3>
      <div v-for="(project, index) in formData.projects" :key="index" class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Project Name</label>
          <input v-model="project.projectName" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea v-model="project.projectDescription" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <input v-model="project.role" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Project Duration</label>
          <input v-model="project.projectDuration" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
      </div>
      <button @click="addProject" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Project</button>
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
      addProject() {
        this.formData.projects.push({
          projectName: '',
          projectDescription: '',
          role: '',
          projectDuration: ''
        });
      }
    }
  }
  </script>
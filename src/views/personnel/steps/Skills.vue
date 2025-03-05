<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Skills</h3>
      <div v-for="(skill, index) in formData.skills" :key="index" class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Skill Name</label>
          <input v-model="skill.skillName" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Proficiency Level</label>
          <select v-model="skill.proficiencyLevel" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
      <button @click="addSkill" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Skill</button>
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
      addSkill() {
        this.formData.skills.push({
          skillName: '',
          proficiencyLevel: ''
        });
      }
    }
  }
  </script>
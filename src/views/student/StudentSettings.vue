<template>
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary-light dark:text-primary-dark mb-8">
        Informations personnelles
      </h1>
      <StudentInformation></StudentInformation>
    </div>
  </template>
  
  <script>
  import StudentInformation from '@/components/student/settings/StudentInformation.vue';

  export default {
    name: 'About',
    components: {
      StudentInformation,
    },
  }
  </script>
  
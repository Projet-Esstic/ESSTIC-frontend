<template>
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary-light dark:text-primary-dark mb-8">
        Mon Bulletin
      </h1>
      <NewAcademicProgress></NewAcademicProgress>
    </div>
  </template>
  

  <script>
  import NewAcademicProgress from '@/components/student/studentManagment/NewAcademicProgress.vue';

  export default {
    name: 'About',
    components: {
      NewAcademicProgress,
    },
  }
  </script>
  
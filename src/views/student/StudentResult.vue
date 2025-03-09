<template>
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary-light dark:text-primary-dark mb-8">
        Mon Bulletin
      </h1>
      <Bulletin></Bulletin>
    </div>
  </template>
  

  <script>
  import Bulletin from '@/components/student/result/Bulletin.vue';
  export default {
    name: 'About',
    components: {
      Bulletin,
    },
  }
  </script>
  
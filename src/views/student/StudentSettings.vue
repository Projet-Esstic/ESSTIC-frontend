<template>
    <div class="text-center">
      <StudentInformation/>
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
  
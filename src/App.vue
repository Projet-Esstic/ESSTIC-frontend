<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
};
</script>
<style>
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px; 
  }

  ::-webkit-scrollbar-track {
    background: #f0f8ff; 
  }

  ::-webkit-scrollbar-thumb {
    background: #009dff; 
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #4682b4; 
  }
</style>
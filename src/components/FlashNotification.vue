<template>
    <transition name="slide-fade">
      <div 
        v-if="message" 
        :class="[
          'fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300',
          typeClasses[type]
        ]"
      >
        <div class="flex items-center">
          <div class="mr-3">
            <!-- Icon based on type -->
            <svg v-if="type === 'error'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else-if="type === 'success'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span class="text-white font-medium">{{ message }}</span>
          <button 
            @click="close" 
            class="ml-3 text-white hover:text-gray-200 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'error',
        validator: (value) => ['error', 'success', 'warning', 'info'].includes(value)
      },
      duration: {
        type: Number,
        default: 5000
      }
    },
    data() {
      return {
        typeClasses: {
          error: 'bg-red-500',
          success: 'bg-green-500',
          warning: 'bg-yellow-500',
          info: 'bg-blue-500'
        }
      };
    },
    mounted() {
      if (this.message) {
        this.autoClose();
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      autoClose() {
        setTimeout(() => {
          this.close();
        }, this.duration);
      }
    }
  };
  </script>
  
  <style scoped>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  </style>
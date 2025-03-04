<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        <form @submit.prevent="login" class="space-y-4">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
    import {authService} from '@/api/services/index';
    export default {
        data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
        },
        methods: {  
            async login() {
                try {
                    await authService.login(this.email, this.password);
                    this.$router.push('/'); // Redirect after login
                } catch (error) {
                    this.errorMessage = error.message;
                }
            }
        }
    };
  </script>
  
  <style scoped>
  /* No additional styles needed since Tailwind handles everything */
  </style>
  
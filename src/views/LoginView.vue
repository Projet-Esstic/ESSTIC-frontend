<template>
  <div class="flex min-h-screen">
    <!-- School Illustration Section -->
    <div class="w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-1">
      <div class="text-center max-w-lg">
        <img 
          src="@/assets/images/esstic-logo.png" 
          alt="School Campus" 
          class="mx-auto mb-2  object-contain rounded-lg shadow-2xl transform transition hover:scale-105"
        />
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          ESSTIC School Portal
        </h1>
        <p class="text-lg text-gray-700 mb-8">
          Empowering education through technology and innovation
        </p>
        
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 class="font-bold text-blue-600 mb-2">Students</h3>
            <p class="text-sm text-gray-600">1,200+ Active</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 class="font-bold text-green-600 mb-2">Teachers</h3>
            <p class="text-sm text-gray-600">85 Dedicated</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 class="font-bold text-purple-600 mb-2">Courses</h3>
            <p class="text-sm text-gray-600">50+ Unique</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose ESSTIC?
          </h2>
          <ul class="space-y-3 text-left text-gray-700">
            <li class="flex items-center">
              <svg class="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Advanced Learning Technologies
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Personalized Learning Paths
            </li>
            <li class="flex items-center">
              <svg class="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              24/7 Online Support
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Login Form Section -->
    <div class="w-1/2 bg-gray-50 flex items-center justify-center p-12">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p class="text-gray-500">
            Please enter your credentials
          </p>
        </div>
        
        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input 
                id="email"
                v-model="email"
                type="email" 
                placeholder="Enter your email" 
                required 
                class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input 
                id="password"
                v-model="password"
                type="password" 
                placeholder="Enter your password" 
                required 
                class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                v-model="rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
          
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
            {{ errorMessage }}
          </p>
          
          <div class="text-center mt-4">
            <p class="text-sm text-gray-600">
              Don't have an account? 
              <a href="#" class="text-blue-600 hover:text-blue-500 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/api/services/index';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        await authService.login(this.email, this.password);
        this.$router.push('/'); // Redirect after successful login
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
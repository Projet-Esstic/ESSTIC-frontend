<template>
  <div class="flex flex-col md:flex-row min-h-screen" :class="{ 'dark': isDarkMode }" id="bgcolor">
    <!-- Flash Notification -->
    <flash-notification :message="errorMessage" type="error" :duration="3000" @close="errorMessage = ''" />
    <!-- School Illustration Section -->
    <div class="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-600 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4 md:p-6" id="boder">
      <div class="text-center max-w-lg w-full">
        <img src="@/assets/images/logo.png" alt="School Campus"
          class="mx-auto mb-4 h-32 p-2 object-contain bg-white rounded-[10px] shadow-2xl transform transition hover:scale-105 hover:shadow-3xl" />
        <h1 class="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
          ESSTIC School Portal
        </h1>
        <p class="text-base md:text-lg text-white mb-4">
          Empowering education through technology and innovation
        </p>

        <div class="grid grid-cols-3 gap-2 md:gap-4 mb-3 hide">
          <div class="bg-white p-2 md:p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 class="font-bold text-blue-600 dark:text-blue-400 text-sm md:text-base mb-1 md:mb-2">Students</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-600">1,200+ Active</p>
          </div>
          <div class="bg-white p-2 md:p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 class="font-bold text-green-600 dark:text-green-400 text-sm md:text-base mb-1 md:mb-2">Teachers</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-600">85 Dedicated</p>
          </div>
          <div class="bg-white p-2 md:p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 class="font-bold text-purple-600 dark:text-purple-400 text-sm md:text-base mb-1 md:mb-2">Courses</h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-600">50+ Unique</p>
          </div>
        </div>

        <div class="bg-white p-3 md:p-4 rounded-lg shadow-md hide">
          <h2 class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-600 mb-3 md:mb-4">
            Why Choose ESSTIC?
          </h2>
          <ul class="space-y-2 md:space-y-3 text-left text-gray-700 dark:text-gray-600">
            <li class="flex items-center text-sm md:text-base">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-500 mr-2 md:mr-3" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Advanced Learning Technologies
            </li>
            <li class="flex items-center text-sm md:text-base">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-500 mr-2 md:mr-3" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Personalized Learning Paths
            </li>
            <li class="flex items-center text-sm md:text-base">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-500 mr-2 md:mr-3" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              24/7 Online Support
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Login Form Section -->
    <div class="md:w-1/2 bg-gray-0 dark:bg-gray-0 flex items-center justify-center p-4 md:p-12 relative">
      <!-- Dark Mode Toggle -->
      <button @click="toggleDarkMode" class="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <svg v-if="isDarkMode" class="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="h-6 w-6 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700" id="form">
        <div class="text-center mb-6 md:mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p class="text-sm md:text-base text-gray-500 dark:text-gray-300">
            Please enter your credentials
          </p>
        </div>

        <form @submit.prevent="login" class="space-y-4 md:space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
              <input id="email" v-model="email" type="email" placeholder="Enter your email" required
                class="w-full pl-8 md:pl-10 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                  </path>
                </svg>
              </div>
              <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                placeholder="Enter your password" required
                class="w-full pl-8 md:pl-10 pr-10 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              <button type="button" @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 focus:outline-none">
                <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                  </path>
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                  </path>
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm md:text-base">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" v-model="rememberMe"
                class="h-3 w-3 md:h-4 md:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded" />
              <label for="remember-me" class="ml-2 block text-xs md:text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" class="text-xs md:text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 md:py-3 text-sm md:text-base rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Sign In
          </button>

          <div class="text-center mt-4">
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-300">
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
import FlashNotification from '@/components/FlashNotification.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
      showPassword: false,
      isDarkMode: false // Initialize dark mode state
    };
  },
  methods: {
    async login() {
      try {
        await authService.login(this.email, this.password);
        this.$router.push('/'); // Redirect after successful login
      } catch (error) {
        this.errorMessage = error.message || 'Login failed. Please try again';
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
  components: {
    FlashNotification
  },
  mounted() {
    // Optionally, check localStorage or system preference for initial mode
    if (localStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  },
  watch: {
    isDarkMode(newValue) {
      // Persist the dark mode state in localStorage
      localStorage.setItem('darkMode', newValue);
    }
  }
};
</script>

<style scoped>
#bgcolor {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: linear-gradient(30deg, #7b84ff 12%, transparent 12.5%, transparent 87%, #7b84ff 87.5%, #7b84ff), 
                    linear-gradient(150deg, #7b84ff 12%, transparent 12.5%, transparent 87%, #7b84ff 87.5%, #7b84ff), 
                    linear-gradient(30deg, #7b84ff 12%, transparent 12.5%, transparent 87%, #7b84ff 87.5%, #7b84ff), 
                    linear-gradient(150deg, #7b84ff 12%, transparent 12.5%, transparent 87%, #7b84ff 87.5%, #7b84ff), 
                    linear-gradient(60deg, #7b84ff77 25%, transparent 25.5%, transparent 75%, #7b84ff77 75%, #7b84ff77), 
                    linear-gradient(60deg, #7b84ff77 25%, transparent 25.5%, transparent 75%, #7b84ff77 75%, #7b84ff77);
  background-size: 74px 130px;
  background-position: 0 0, 0 0, 37px 65px, 37px 65px, 0 0, 37px 65px;
}

#boder {
  border-radius: 0 30px 30px 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

@media (max-width: 760px) {
  #boder {
    border-radius: 0 0px 30px 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .hide {
    display: none;
  }
}

#form {
  box-shadow: rgba(50, 50, 93, 0.116) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.103) 0px 18px 36px -18px inset;
}

/* Ensure dark mode works by applying it to the root element */
.dark {
  color-scheme: dark;
}
</style>
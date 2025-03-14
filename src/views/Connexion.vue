
<template>
  <div class="h-screen p-8 overflow-auto">
    <div class="max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 animate-fade-in">
      <!-- Page Title -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2 animate-slide-up">
          Connexion
        </h2>
        <p class="text-gray-600 animate-slide-up-delay">
          Connectez-vous à votre compte ESSTIC
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Role Selection -->
        <div class="animate-fade-in-delay">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Sélectionnez votre rôle
          </label>
          <select 
            v-model="role"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            required
          >
            <option value="">Choisir un rôle</option>
            <option value="student">Étudiant</option>
            <option value="candidate">Candidat</option>
            <option value="admin">Administrateur</option>
            <option value="teacher">Enseignant</option>
          </select>
        </div>

        <!-- Username/Email/Phone -->
        <div class="animate-fade-in-delay">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Identifiant
          </label>
          <input 
            type="text" 
            v-model="identifier"
            placeholder="Email, téléphone ou nom d'utilisateur"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            required
          >
        </div>

        <!-- Password -->
        <div class="animate-fade-in-delay">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <div class="relative">
            <input 
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Votre mot de passe"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              required
            >
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <i class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</i>
            </button>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between text-sm animate-fade-in-delay">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="rememberMe"
              class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            >
            <span class="ml-2 text-gray-600">Se souvenir de moi</span>
          </label>
          <a href="#" class="text-primary-600 hover:text-primary-700">
            Mot de passe oublié?
          </a>
        </div>

        <!-- Login Button -->
        <button 
          type="submit"
          class="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-500/50 transition-all duration-200 animate-fade-in-delay flex items-center justify-center gap-2"
        >
          <i class="material-icons">login</i>
          Se connecter
        </button>

        <!-- Registration Link -->
        <p class="text-center text-sm text-gray-600 animate-fade-in-delay">
          Pas encore de compte? 
          <router-link 
            to="/candidate-registration" 
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            S'inscrire
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Connexion',
  setup() {
    const router = useRouter()
    const store = useStore()
    
    const role = ref('')
    const identifier = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const rememberMe = ref(false)

    const handleLogin = async () => {
      try {
        await store.dispatch('auth/login', {
          role: role.value,
          identifier: identifier.value,
          password: password.value,
          rememberMe: rememberMe.value
        })

        // Redirect based on role
        switch(role.value) {
          case 'student':
            router.push('/student-dashboard')
            break
          case 'candidate':
            router.push('/candidate-dashboard')
            break
          case 'admin':
            router.push('/admin-dashboard')
            break
          case 'teacher':
            router.push('/teacher-dashboard')
            break
          default:
            router.push('/')
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

    return {
      role,
      identifier,
      password,
      showPassword,
      rememberMe,
      handleLogin
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.6s ease-out 0.3s both;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-slide-up-delay {
  animation: slideUp 0.6s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

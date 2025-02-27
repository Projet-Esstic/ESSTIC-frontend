<template>
  <div class="profile-image-upload">
    <div class="flex items-center justify-center w-full">
      <div class="relative w-32 h-32 mb-4">
        <!-- Image Preview -->
        <img
          v-if="imagePreview"
          :src="imagePreview"
          class="w-full h-full object-cover rounded-full border-4 border-blue-500"
          alt="Profile Preview"
        />
        <div
          v-else
          class="w-full h-full rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
        >
          <span class="material-icons text-gray-400 text-4xl">person</span>
        </div>
        
        <!-- Upload Button -->
        <label
          class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-lg transition-all duration-200"
          :class="{ 'opacity-75': loading }"
        >
          <input
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleImageUpload"
            :disabled="loading"
          />
          <span class="material-icons text-lg">photo_camera</span>
        </label>
      </div>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>
    
    <!-- Help Text -->
    <p class="text-gray-500 text-sm text-center mt-2">
      Format accepté: JPG, PNG. Taille max: 2MB
    </p>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProfileImageUpload',
  
  setup() {
    const store = useStore()
    const imagePreview = ref('')
    const loading = ref(false)
    const error = ref('')
    
    // Watch for existing profile image in store
    watch(
      () => store.state.candidateRegistration.formSteps.civilStatus.profileImage,
      (newValue) => {
        if (newValue) {
          imagePreview.value = newValue
        }
      },
      { immediate: true }
    )
    
    const handleImageUpload = async (event) => {
      const file = event.target.files[0]
      if (!file) return
      
      // Validate file
      if (!file.type.match('image.*')) {
        error.value = 'Veuillez sélectionner une image valide'
        return
      }
      
      if (file.size > 2 * 1024 * 1024) { // 2MB
        error.value = 'L\'image ne doit pas dépasser 2MB'
        return
      }
      
      error.value = ''
      loading.value = true
      
      try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
          // Store in Vuex
          store.commit('candidateRegistration/updateCivilStatus', {
            profileImage: e.target.result
          })
        }
        reader.readAsDataURL(file)
      } catch (err) {
        error.value = 'Une erreur est survenue lors du chargement de l\'image'
        console.error('Image upload error:', err)
      } finally {
        loading.value = false
      }
    }
    
    return {
      imagePreview,
      loading,
      error,
      handleImageUpload
    }
  }
}
</script>

<style scoped>
.profile-image-upload {
  margin: 1rem 0;
}
</style>

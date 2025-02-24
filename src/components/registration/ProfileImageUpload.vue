<template>
  <div class="profile-upload">
    <!-- Profile Image Preview -->
    <div 
      class="profile-preview"
      :class="{ 'has-image': profileImage }"
    >
      <img 
        v-if="profileImage" 
        :src="profileImage" 
        alt="Profile"
        class="profile-image"
        @error="handleImageError"
      />
      <div v-else class="upload-placeholder">
        <i class="fas fa-user"></i>
      </div>
      
      <!-- Upload Progress -->
      <div 
        v-if="uploadProgress > 0 && uploadProgress < 100" 
        class="upload-progress"
      >
        <div 
          class="progress-bar" 
          :style="{ width: `${uploadProgress}%` }"
        ></div>
        <span class="progress-text">{{ uploadProgress }}%</span>
      </div>
    </div>

    <!-- Upload Controls -->
    <div class="upload-controls">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
      
      <div class="button-group">
        <button
          type="button"
          class="btn btn-primary"
          @click="triggerFileInput"
          :disabled="loading"
        >
          <i class="fas fa-upload mr-2"></i>
          {{ profileImage ? 'Change Photo' : 'Upload Photo' }}
        </button>
        
        <button
          v-if="profileImage"
          type="button"
          class="btn btn-danger ml-2"
          @click="removePhoto"
          :disabled="loading"
        >
          <i class="fas fa-trash mr-2"></i>
          Remove
        </button>
      </div>

      <!-- Error Message -->
      <p v-if="error" class="error-message mt-2">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProfileImageUpload',
  
  setup() {
    const store = useStore()
    const fileInput = ref(null)
    
    // Computed properties from store
    const profileImage = computed(() => store.getters['candidateRegistration/getProfileImage'])
    const uploadProgress = computed(() => store.getters['candidateRegistration/getUploadProgress'])
    const loading = computed(() => store.getters['candidateRegistration/getLoading'])
    const error = computed(() => store.getters['candidateRegistration/getError'])
    
    // Methods
    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const resizeImage = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        
        reader.onload = (e) => {
          const img = new Image()
          img.src = e.target.result
          
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            
            // Set passport photo dimensions (35mm x 45mm at 300 DPI)
            canvas.width = 413  // 35mm at 300 DPI
            canvas.height = 531 // 45mm at 300 DPI
            
            // Calculate scaling to maintain aspect ratio
            const scale = Math.min(
              canvas.width / img.width,
              canvas.height / img.height
            )
            
            // Calculate centered position
            const x = (canvas.width - img.width * scale) / 2
            const y = (canvas.height - img.height * scale) / 2
            
            // Draw white background
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            // Draw image centered and scaled
            ctx.drawImage(
              img,
              x, y,
              img.width * scale,
              img.height * scale
            )
            
            // Convert to blob
            canvas.toBlob((blob) => {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              }))
            }, 'image/jpeg', 0.95)
          }
          
          img.onerror = reject
        }
        
        reader.onerror = reject
      })
    }
    
    const handleFileSelect = async (event) => {
      const file = event.target.files[0]
      if (!file) return
      
      try {
        // Check file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Please select an image file')
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Image size should be less than 5MB')
        }
        
        // Resize image to passport dimensions
        const resizedFile = await resizeImage(file)
        
        // Upload the resized image
        await store.dispatch('candidateRegistration/uploadProfileImage', resizedFile)
      } catch (error) {
        console.error('Failed to upload image:', error)
        store.commit('candidateRegistration/SET_ERROR', error.message)
      } finally {
        // Clear the input so the same file can be selected again
        event.target.value = ''
      }
    }
    
    const handleImageError = () => {
      store.commit('candidateRegistration/SET_ERROR', 'Failed to load image')
      store.commit('candidateRegistration/SET_PROFILE_IMAGE', null)
    }
    
    const removePhoto = async () => {
      try {
        await store.dispatch('candidateRegistration/deleteProfileImage')
      } catch (error) {
        console.error('Failed to remove image:', error)
      }
    }
    
    return {
      fileInput,
      profileImage,
      uploadProgress,
      loading,
      error,
      triggerFileInput,
      handleFileSelect,
      handleImageError,
      removePhoto
    }
  }
}
</script>

<style scoped>
.profile-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.profile-preview {
  position: relative;
  width: 165px;  /* 35mm at 120 DPI for display */
  height: 212px; /* 45mm at 120 DPI for display */
  border-radius: 4px; /* Less rounded for passport style */
  overflow: hidden;
  background-color: #f3f4f6;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.profile-preview.has-image {
  border-color: #3b82f6;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed to contain to prevent cropping */
  background-color: white; /* White background for passport photo */
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #9ca3af;
}

.upload-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 2px;
}

.progress-bar {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.upload-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.hidden {
  display: none;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
}
</style>

<template>
  <div class="form-field">
    <label 
      :for="id" 
      class="block text-sm font-medium mb-1"
      :class="[
        error ? 'text-red-600' : 'text-gray-700 dark:text-gray-200'
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :class="[
          'w-full px-4 py-2 rounded-lg border transition-all duration-200',
          'focus:outline-none focus:ring-2',
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200',
          'bg-white dark:bg-gray-700',
          'text-gray-900 dark:text-white',
          'placeholder-gray-400 dark:placeholder-gray-300'
        ]"
      />
      
      <!-- Icon (if provided) -->
      <div 
        v-if="icon" 
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <i 
          class="material-icons text-lg"
          :class="error ? 'text-red-500' : 'text-gray-400'"
        >
          {{ icon }}
        </i>
      </div>
    </div>
    
    <!-- Error Message -->
    <p 
      v-if="error" 
      class="mt-1 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
}

/* Input focus animation */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Error state animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error input {
  animation: shake 0.4s ease-in-out;
}
</style>

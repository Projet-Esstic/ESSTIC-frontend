
<template>
  <div class="relative inline-block w-10 mr-2 align-middle select-none">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
    />
    <label
      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
    ></label>
  </div>
</template>

<script>
export default {
  name: 'SwitchField',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #68D391;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #68D391;
}

.toggle-checkbox {
  right: 0;
  transition: all 0.3s;
  border-color: #CBD5E0;
}

.toggle-label {
  transition: background-color 0.3s;
}
</style>

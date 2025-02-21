<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Fields of Study</h2>
    </div>

    <!-- Fields List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Field Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coefficient
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="field in modelValue" :key="field.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ field.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input 
                type="number" 
                v-model.number="field.coefficient"
                min="1"
                max="5"
                class="w-20 px-2 py-1 border rounded-md"
                @change="updateField(field)"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button 
                @click="editField(field)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Field Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Edit Field of Study</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              v-model="editingField.name"
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Coefficient</label>
            <input 
              type="number" 
              v-model.number="editingField.coefficient"
              min="1"
              max="5"
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              @click="showEditModal = false"
              class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="saveField"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FieldsOfStudy',
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const showEditModal = ref(false);
    const editingField = ref(null);

    const updateField = (field) => {
      const updatedFields = props.modelValue.map(f => 
        f.id === field.id ? { ...f, coefficient: field.coefficient } : f
      );
      emit('update:modelValue', updatedFields);
    };

    const editField = (field) => {
      editingField.value = { ...field };
      showEditModal.value = true;
    };

    const saveField = () => {
      const updatedFields = props.modelValue.map(f => 
        f.id === editingField.value.id ? { ...editingField.value } : f
      );
      emit('update:modelValue', updatedFields);
      showEditModal.value = false;
    };

    return {
      showEditModal,
      editingField,
      updateField,
      editField,
      saveField
    };
  }
};</script>

<template>
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <!-- Notification system -->
    <div v-if="notification.show" class="mb-6">
      <div :class="`flex items-center p-4 rounded-lg ${notification.bgColor} ${notification.textColor}`">
        <div class="mr-3">
          <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="notification.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-medium">{{ notification.title }}</p>
          <p class="text-sm opacity-90">{{ notification.message }}</p>
        </div>
        <button @click="closeNotification" class="ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex items-center mb-8">
      <div class="bg-blue-100 p-3 rounded-lg mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800">Permission Management</h2>
    </div>

    <div class="bg-gray-50 p-5 rounded-lg mb-8">
      <label for="permission-input" class="block text-sm font-medium text-gray-700 mb-2">New Permission</label>
      <div class="flex">
        <input 
          id="permission-input"
          v-model="newPermission" 
          type="text" 
          placeholder="Enter permission name (e.g., 'create', 'delete')"
          class="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        />
        <button 
          @click="addPermission" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Permission
        </button>
      </div>
    </div>

    <div class="mb-3 flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-700">Permission List</h3>
      <div class="text-sm text-gray-500">{{ permissions.length }} permission(s)</div>
    </div>

    <div v-if="permissions.length === 0" class="bg-gray-50 rounded-lg p-10 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="text-gray-500 mb-2">No permissions found</p>
      <p class="text-gray-400 text-sm">Add your first permission using the form above</p>
    </div>

    <ul v-else class="bg-white rounded-lg overflow-hidden border border-gray-200 divide-y divide-gray-200">
      <li 
        v-for="permission in permissions" 
        :key="permission.name" 
        class="group hover:bg-blue-50 transition-colors duration-150"
      >
        <div class="flex justify-between items-center p-4">
          <div class="flex items-center">
            <div class="bg-blue-100 p-2 rounded-md mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
            <div>
              <span class="font-medium text-gray-800">{{ permission.name }}</span>
              <p class="text-xs text-gray-500 mt-1">Created on {{ new Date().toLocaleDateString() }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <button 
              @click="toggleStatus(permission)" 
              :class="permission.status ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'"
              class="text-white px-4 py-2 rounded-md mr-3 text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg v-if="permission.status" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ permission.status ? 'Active' : 'Inactive' }}
            </button>
            <button 
              @click="confirmDelete(permission.name)" 
              class="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>


    <!-- Confirmation Modal -->
    <div v-if="confirmationModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p class="mb-6">Are you sure you want to delete <span class="font-semibold">{{ confirmationModal.permissionName }}</span> permission? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="confirmationModal.show = false" 
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            @click="proceedDelete" 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../api/client.js'
import { ENDPOINTS } from '../../api/config.js'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const permissions = ref([])
    const newPermission = ref('')
    const notification = ref({
      show: false,
      type: 'success',
      title: '',
      message: '',
      bgColor: '',
      textColor: ''
    })
    const confirmationModal = ref({
      show: false,
      permissionName: ''
    })

    const loadPermissions = async () => {
      try {
        const response = await axios.get(ENDPOINTS.PERMISSIONS)
        permissions.value = response.data.permissions
      } catch (err) {
        console.error('Failed to load permissions:', err)
        showNotification('error', 'Error', 'Failed to load permissions')
      }
    }

    const showNotification = (type, title, message) => {
      notification.value = {
        show: true,
        type,
        title,
        message,
        bgColor: type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : 'bg-blue-100',
        textColor: type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-blue-800'
      }
      
      setTimeout(() => {
        notification.value.show = false
      }, 5000)
    }

    const closeNotification = () => {
      notification.value.show = false
    }

    const addPermission = async () => {
      if (!newPermission.value) {
        showNotification('error', 'Input Required', 'Please enter a permission name')
        return
      }
      
      try {
        await axios.post(ENDPOINTS.PERMISSIONS, { name: newPermission.value, status: true })
        showNotification('success', 'Permission Added', `"${newPermission.value}" has been added successfully`)
        newPermission.value = ''
        await loadPermissions()
      } catch (err) {
        console.error('Failed to add permission:', err)
        showNotification('error', 'Error', 'Failed to add permission')
      }
    }

    const toggleStatus = async (permission) => {
      try {
        await axios.put(ENDPOINTS.PERMISSIONS_STATUS, { 
          name: permission.name, 
          status: !permission.status 
        })
        const newStatus = !permission.status ? 'active' : 'inactive'
        showNotification('success', 'Status Updated', `"${permission.name}" is now ${newStatus}`)
        await loadPermissions()
      } catch (err) {
        console.error('Failed to update permission status:', err)
        showNotification('error', 'Error', 'Failed to update permission status')
      }
    }

    const confirmDelete = (name) => {
      confirmationModal.value = {
        show: true,
        permissionName: name
      }
    }

    const proceedDelete = async () => {
      const name = confirmationModal.value.permissionName
      try {
        await axios.delete(ENDPOINTS.PERMISSIONS, { data: { name } })
        showNotification('success', 'Permission Deleted', `"${name}" has been deleted successfully`)
        confirmationModal.value.show = false
        await loadPermissions()
      } catch (err) {
        console.error('Failed to delete permission:', err)
        showNotification('error', 'Error', 'Failed to delete permission')
      }
    }

    onMounted(loadPermissions)

    return {
      permissions,
      newPermission,
      notification,
      confirmationModal,
      addPermission,
      toggleStatus,
      confirmDelete,  
      proceedDelete,
      closeNotification
    }
  }
}
</script>
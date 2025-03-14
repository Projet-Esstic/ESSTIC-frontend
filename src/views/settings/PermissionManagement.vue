<template>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Manage Permissions</h2>
  
      <div class="flex mb-4">
        <input v-model="newPermission" type="text" placeholder="Enter Permission Name"
          class="border p-2 rounded w-full" />
        <button @click="addPermission" class="bg-blue-500 text-white px-4 py-2 rounded ml-2">Add</button>
      </div>
  
      <ul class="border rounded p-4">
        <li v-for="permission in permissions" :key="permission.name" class="flex justify-between p-2 border-b">
          <span>{{ permission.name }}</span>
          <div>
            <button @click="toggleStatus(permission)" :class="permission.status ? 'bg-green-500' : 'bg-gray-500'"
              class="text-white px-4 py-1 rounded mr-2">
              {{ permission.status ? 'Active' : 'Inactive' }}
            </button>
            <button @click="deletePermission(permission.name)" class="bg-red-500 text-white px-4 py-1 rounded">
              Delete
            </button>
          </div>
        </li>
      </ul>
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
  
      const loadPermissions = async () => {
        try {
          const response = await axios.get(ENDPOINTS.PERMISSIONS)
          permissions.value = response.data.permissions
        } catch (err) {
          console.error('Failed to load permissions:', err)
        }
      }
  
      const addPermission = async () => {
        if (!newPermission.value) return
        try {
          await axios.post(ENDPOINTS.PERMISSIONS, { name: newPermission.value, status: true })
          newPermission.value = ''
          loadPermissions()
        } catch (err) {
          console.error('Failed to add permission:', err)
        }
      }
  
      const toggleStatus = async (permission) => {
        try {
          await axios.put(ENDPOINTS.PERMISSIONS_STATUS, { name: permission.name, status: !permission.status })
          loadPermissions()
        } catch (err) {
          console.error('Failed to update permission status:', err)
        }
      }
  
      const deletePermission = async (name) => {
        try {
          await axios.delete(ENDPOINTS.PERMISSIONS, { data: { name } })
          loadPermissions()
        } catch (err) {
          console.error('Failed to delete permission:', err)
        }
      }
  
      onMounted(loadPermissions)
  
      return {
        permissions,
        newPermission,
        addPermission,
        toggleStatus,
        deletePermission
      }
    }
  }
  </script>
  
<template>
    <div class="container mx-auto p-4 md:p-6 lg:p-8  min-h-screen text-white">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl text-black dark:text-white font-bold flex items-center">
          <svg class="w-8 h-8 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M7 10h10m0 0H7m10 0a3 3 0 01-3-3V4H10v3a3 3 0 01-3 3z" />
          </svg>
          Role Management
        </h1>
        <button @click="openModal(null)" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300">
          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Role
        </button>
      </div>
  
      <!-- Roles Table -->
      <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-700">
              <th class="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-700 transition duration-200">
              <td class="px-6 py-4">{{ role.name }}</td>
              <td class="px-6 py-4">
                <span :class="role.status ? 'bg-green-500' : 'bg-red-500'" class="px-2 py-1 rounded-full text-xs">
                  {{ role.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 flex space-x-2">
                <button @click="openModal(role)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center transition duration-300">
                  <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2sing828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button @click="toggleStatus(role)" :class="role.status ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'" class="text-white px-3 py-1 rounded flex items-center transition duration-300">
                  <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {{ role.status ? 'Deactivate' : 'Activate' }}
                </button>
                <button @click="openDeleteConfirm(role.name)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center transition duration-300">
                  <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Role Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div class="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {{ editingRole ? 'Edit Role' : 'Add Role' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Role Name" 
            class="w-full mb-4 p-3 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
  
          <div class="mb-4">
            <label class="block mb-2 font-semibold flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
              Permissions
            </label>
            <div v-for="permission in permissions" :key="permission.id" class="mb-3 bg-gray-700 p-3 rounded-lg">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="permission.name" 
                  :value="permission.name" 
                  v-model="selectedPermissions" 
                  class="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500" 
                  @change="updatePermission(permission.name)"
                />
                <label :for="permission.name" class="text-sm">{{ permission.name }}</label>
              </div>
              <div v-if="selectedPermissions.includes(permission.name)" class="ml-6 mt-2">
                <label class="block mb-1 text-xs font-medium">Pages:</label>
                <div v-for="page in pages" :key="page" class="mb-1 flex items-center">
                  <input 
                    type="checkbox" 
                    :id="`page-${page}-${permission.name}`" 
                    :value="page" 
                    v-model="form.permissions[permission.name]" 
                    class="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500" 
                  />
                  <label :for="`page-${page}-${permission.name}`" class="text-sm">{{ page }}</label>
                </div>
              </div>
            </div>
          </div>
  
          <div class="flex justify-end space-x-3">
            <button @click="closeModal" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center transition duration-300">
              <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button @click="saveRole" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition duration-300">
              <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="isDeleteConfirmOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div class="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold flex items-center">
              <svg class="w-6 h-6 mr-2 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Confirm Delete
            </h2>
            <button @click="closeDeleteConfirm" class="text-gray-400 hover:text-white">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <p class="mb-4 text-gray-300">Are you sure you want to delete the role: <span class="font-semibold text-white">{{ roleToDelete }}</span>?</p>
  
          <div class="flex justify-end space-x-3">
            <button @click="closeDeleteConfirm" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center transition duration-300">
              <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button @click="confirmDelete" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center transition duration-300">
              <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from '../../api/client.js';
  import { ENDPOINTS } from '../../api/config.js';
  import { PagesList } from '../../api/pages.js';
  
  export default {
    setup() {
      const roles = ref([]);
      const permissions = ref([]);
      const pages = ref(PagesList);
      const isModalOpen = ref(false);
      const editingRole = ref(null);
      const form = ref({ name: '', permissions: {}, status: true });
      const selectedPermissions = ref([]);
      const isDeleteConfirmOpen = ref(false);
      const roleToDelete = ref(null);
  
      const fetchRoles = async () => {
        try {
          const response = await axios.get(ENDPOINTS.ROLES);
          roles.value = response?.data?.roles || [];
        } catch (error) {
          console.error('Failed to fetch roles:', error);
        }
      };
  
      const fetchPermissions = async () => {
        try {
          const response = await axios.get(ENDPOINTS.PERMISSIONS_ACTIVE);
          permissions.value = response.data?.permissions || [];
        } catch (error) {
          console.error('Failed to fetch permissions:', error);
        }
      };
  
      const updatePermission = (permissionName) => {
        if (selectedPermissions.value.includes(permissionName)) {
          if (!form.value.permissions[permissionName]) {
            form.value.permissions[permissionName] = [];
          }
        } else {
          delete form.value.permissions[permissionName];
        }
      };
  
      const openModal = (role) => {
        const permissionsObj = {};
        permissions.value.forEach(permission => {
          permissionsObj[permission.name] = [];
        });
  
        if (role) {
          editingRole.value = role;
          role.permissions.forEach(permission => {
            permissionsObj[permission.name] = [...permission.pages];
          });
          form.value = {
            name: role.name,
            permissions: permissionsObj,
            status: role.status
          };
          selectedPermissions.value = role.permissions.map(p => p.name);
        } else {
          editingRole.value = null;
          form.value = {
            name: '',
            permissions: permissionsObj,
            status: true
          };
          selectedPermissions.value = [];
        }
        isModalOpen.value = true;
      };
  
      const closeModal = () => {
        isModalOpen.value = false;
      };
  
      const saveRole = async () => {
            try {
                const convertedPermissions = [];

                for (const [name, pages] of Object.entries(form.value.permissions)) {
                    convertedPermissions.push({
                        name: name,
                        pages: pages
                    });
                }
                form.value.permissions = convertedPermissions
                console.log(form.value); // Output the form data for debugging
                // Make API call to save role
                await axios.post(`${ENDPOINTS.ROLES}`, form.value);
                fetchRoles();
                closeModal();
            } catch (error) {
                console.error('Failed to save role', error);
            }
        };

  
      const toggleStatus = async (role) => {
        try {
          await axios.put(ENDPOINTS.ROLES_STATUS, { 
            name: role.name, 
            status: !role.status 
          });
          await fetchRoles();
        } catch (error) {
          console.error('Failed to toggle role status:', error);
        }
      };
  
      const openDeleteConfirm = (name) => {
        roleToDelete.value = name;
        isDeleteConfirmOpen.value = true;
      };
  
      const closeDeleteConfirm = () => {
        isDeleteConfirmOpen.value = false;
        roleToDelete.value = null;
      };
  
      const confirmDelete = async () => {
        try {
          if (roleToDelete.value) {
            await axios.delete(ENDPOINTS.ROLES, { data: { name: roleToDelete.value } });
            await fetchRoles();
            closeDeleteConfirm();
          }
        } catch (error) {
          console.error('Failed to delete role:', error);
          alert('Failed to delete role: ' + (error.response?.data?.message || error.message));
        }
      };
  
      onMounted(() => {
        fetchRoles();
        fetchPermissions();
      });
  
      return {
        roles,
        permissions,
        pages,
        isModalOpen,
        editingRole,
        form,
        selectedPermissions,
        isDeleteConfirmOpen,
        roleToDelete,
        openModal,
        closeModal,
        saveRole,
        updatePermission,
        toggleStatus,
        openDeleteConfirm,
        closeDeleteConfirm,
        confirmDelete,
      };
    }
  };
  </script>
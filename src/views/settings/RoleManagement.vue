<template>
    <div class="container mx-auto p-4 md:p-6 lg:p-8 bg-black text-white">
        <h1 class="text-3xl font-bold mb-6">Role Management</h1>

        <button @click="openModal(null)" class="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">Add Role</button>

        <!-- Roles Table -->
        <table class="w-full border-collapse border border-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th class="border border-gray-600 px-4 py-2">Name</th>
                    <th class="border border-gray-600 px-4 py-2">Status</th>
                    <th class="border border-gray-600 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role.id" class="border border-gray-600">
                    <td class="border border-gray-600 px-4 py-2 text-white">{{ role.name }}</td>
                    <td class="border border-gray-600 px-4 py-2">{{ role.status ? 'Active' : 'Inactive' }}</td>
                    <td class="border border-gray-600 px-4 py-2">
                        <button @click="openModal(role)"
                            class="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                        <button @click="toggleStatus(role)" class="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                            {{ role.status ? 'Deactivate' : 'Activate' }}
                        </button>
                        <button @click="deleteRole(role.name)" class="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Role Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-gray-900 p-6 rounded-lg w-96 text-white">
                <h2 class="text-2xl mb-4">{{ editingRole ? 'Edit Role' : 'Add Role' }}</h2>

                <input v-model="form.name" type="text" placeholder="Role Name"
                    class="w-full mb-3 p-2 border border-gray-600 rounded bg-black text-white" />

                <label class="block mb-2">Permissions:</label>
                <div v-for="permission in permissions" :key="permission.id" class="mb-2">
                    <div class="flex items-center">
                        <input type="checkbox" :id="permission.name" :value="permission.name"
                            v-model="selectedPermissions" @change="updatePermission(permission)" class="mr-2" />
                        <label :for="permission.name">{{ permission.name }}</label>
                    </div>

                    <div v-if="selectedPermissions.includes(permission.name)" class="ml-4">
                        <label class="block mb-2">Pages:</label>
                        <div v-for="page in pages" :key="page" class="mb-1">
                            <input type="checkbox" :id="`page-${page}-${permission.name}`" :value="page"
                                v-model="form.permissions[permission.name]" @change="updatePage(permission.name, page)"
                                class="mr-2" />
                            <label :for="`page-${page}-${permission.name}`">{{ page }}</label>
                        </div>
                    </div>

                </div>

                <div class="flex justify-end mt-4">
                    <button @click="saveRole" class="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                    <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
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
        const selectedPermissions = ref([]); // Array to store selected permission names

        const fetchRoles = async () => {
            try {
                const response = await axios.get(ENDPOINTS.ROLES);
                roles.value = response?.data?.roles;
            } catch (error) {
                console.error('Failed to fetch roles', error);
            }
        };

        const fetchPermissions = async () => {
            try {
                const response = await axios.get(ENDPOINTS.PERMISSIONS_ACTIVE);
                permissions.value = response.data?.permissions;
            } catch (error) {
                console.error('Failed to fetch permissions', error);
            }
        };

        const updatePermission = (permission) => {
            // Ensure permission is selected or deselected
            if (selectedPermissions.value.includes(permission.name)) {
                form.value.permissions[permission.name] = [];
            } else {
                delete form.value.permissions[permission.name];
            }
        };

        const updatePage = (permissionName, page) => {
            // Handle adding/removing pages from permissions

            // console.log("form.value.permissions",form.value.permissions[permissionName]);
            if (!form.value.permissions[permissionName]) {
                form.value.permissions[permissionName] = [];
            }

            const permissionPages = form.value.permissions[permissionName];
            const pageIndex = permissionPages.indexOf(page);
            console.log("permissionPages", permissionPages);
            console.log("page", page);
            console.log("pageIndex", pageIndex);

            // if (pageIndex === -1) {
            //     form.value.permissions[permissionName].push(page); // Add page if it's not in the list
            // } else {
            //     form.value.permissions[permissionName].splice(pageIndex, 1); // Remove page if it's already in the list
            // }
        };

        const openModal = (role) => {
            // Reset form to empty state
            const permissionsObj = {};
            permissions.value.forEach(permission => {
                permissionsObj[permission.name] = [];
            });

            if (role) {
                editingRole.value = role;
                role.permissions.forEach(permission => {
                    permission.pages.forEach(page => {
                        permissionsObj[permission.name].push(page);
                    });
                });

                form.value = {
                    name: role.name,
                    permissions: permissionsObj,
                    status: role.status
                };

                selectedPermissions.value = role.permissions.map(p => p.name);
            } else {
                editingRole.value = null;
                form.value.name = ""
                form.value.permissions = permissionsObj;
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
            // Toggle the status of the role
            try {
                await axios.put(ENDPOINTS.ROLES_STATUS, { name: role.name, status: !role.status })
                fetchRoles();
            } catch (error) {
                console.error('Failed to save role', error);
            }
        };

        const deleteRole = async (name) => {
            // Confirm before deleting
            if (confirm(`Are you sure you want to delete the role: ${name}?`)) {
                try {
                    console.log(name);
                    await axios.delete(ENDPOINTS.ROLES, { data: { name } })
                    fetchRoles();
                } catch (error) {
                    console.error('Failed to save role', error);
                }
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
            openModal,
            closeModal,
            saveRole,
            updatePermission,
            updatePage,
            toggleStatus,
            deleteRole,
        };
    }
};
</script>

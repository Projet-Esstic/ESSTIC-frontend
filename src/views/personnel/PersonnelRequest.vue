
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-black dark:text-white mb-6">
      Personnel Requests Management
    </h1>

    <!-- Filter and Search Controls -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <div class="flex-1 min-w-[200px]">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or ID..."
          class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div class="flex-1 min-w-[200px]">
        <select
          v-model="statusFilter"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="onLeave">On Leave</option>
          <option value="suspended">Suspended</option>
          <option value="retired">Retired</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>
      <div class="flex-1 min-w-[200px]">
        <select
          v-model="departmentFilter"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All Departments</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>
      <button
        @click="processSelectedRequests"
        :disabled="selectedPersonnel.length === 0"
        class="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50"
      >
        Process Selected ({{ selectedPersonnel.length }})
      </button>
    </div>

    <!-- Personnel Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="p-3 text-left">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            </th>
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Department</th>
            <th class="p-3 text-left">Role</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Hire Date</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="person in paginatedPersonnel"
            :key="person.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <td class="p-3">
              <input
                type="checkbox"
                :value="person.id"
                v-model="selectedPersonnel"
              />
            </td>
            <td class="p-3">{{ person.id }}</td>
            <td class="p-3">{{ person.user.firstName }} {{ person.user.lastName }}</td>
            <td class="p-3">{{ person.department.name }}</td>
            <td class="p-3">{{ person.role }}</td>
            <td class="p-3">
              <span
                :class="{
                  'px-2 py-1 rounded text-xs font-medium': true,
                  'bg-green-100 text-green-800': person.employmentStatus === 'active',
                  'bg-yellow-100 text-yellow-800': person.employmentStatus === 'onLeave',
                  'bg-red-100 text-red-800': person.employmentStatus === 'suspended',
                  'bg-gray-100 text-gray-800': person.employmentStatus === 'retired' || person.employmentStatus === 'terminated'
                }"
              >
                {{ person.employmentStatus.charAt(0).toUpperCase() + person.employmentStatus.slice(1) }}
              </span>
            </td>
            <td class="p-3">{{ formatDate(person.hireDate) }}</td>
            <td class="p-3">
              <div class="flex gap-2">
                <button
                  @click="viewDetails(person)"
                  class="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  View
                </button>
                <button
                  @click="editPersonnel(person)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  @click="toggleStatus(person)"
                  :class="{
                    'px-3 py-1 rounded text-sm text-white': true,
                    'bg-red-500': person.employmentStatus === 'active',
                    'bg-green-500': person.employmentStatus === 'suspended'
                  }"
                >
                  {{ person.employmentStatus === 'active' ? 'Suspend' : 'Activate' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredPersonnel.length === 0">
            <td colspan="8" class="p-4 text-center text-gray-500">No personnel found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ paginatedPersonnel.length }} of {{ filteredPersonnel.length }} personnel
      </div>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span class="px-3 py-1">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Personnel Details Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Personnel Details</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 class="font-bold mb-2">Personal Information</h3>
            <p><strong>Name:</strong> {{ selectedPerson.user.firstName }} {{ selectedPerson.user.lastName }}</p>
            <p><strong>Email:</strong> {{ selectedPerson.user.email }}</p>
            <p><strong>Phone:</strong> {{ selectedPerson.user.phoneNumber }}</p>
            <p><strong>Department:</strong> {{ selectedPerson.department.name }}</p>
            <p><strong>Role:</strong> {{ selectedPerson.role }}</p>
            <p><strong>Status:</strong> {{ selectedPerson.employmentStatus }}</p>
          </div>
          <div>
            <h3 class="font-bold mb-2">Employment Details</h3>
            <p><strong>Hire Date:</strong> {{ formatDate(selectedPerson.hireDate) }}</p>
            <p><strong>Salary:</strong> {{ selectedPerson.salary.amount }}</p>
            <p><strong>Payment Method:</strong> {{ selectedPerson.salary.paymentMethod }}</p>
          </div>
        </div>

        <div class="border-t pt-4">
          <h3 class="font-bold mb-2">Documents</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(doc, type) in selectedPerson.documents" :key="type" class="flex items-center justify-between">
              <span class="capitalize">{{ type }}</span>
              <button
                v-if="doc.path"
                @click="downloadDocument(type, doc)"
                class="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed ,onMounted} from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const statusFilter = ref('all');
    const departmentFilter = ref('all');
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const selectedPerson = ref({});
    const selectedPersonnel = ref([]);
    const selectAll = ref(false);
    const departments = ref([]);
    const personnel = ref([]);

    const filteredPersonnel = computed(() => {
      return personnel.value.filter(person => {
        const matchesSearch = 
          searchQuery.value === '' || 
          `${person.user.firstName} ${person.user.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = statusFilter.value === 'all' || person.employmentStatus === statusFilter.value;
        const matchesDepartment = departmentFilter.value === 'all' || person.department.id === departmentFilter.value;
        return matchesSearch && matchesStatus && matchesDepartment;
      });
    });

    const paginatedPersonnel = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredPersonnel.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredPersonnel.value.length / itemsPerPage.value) || 1;
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedPersonnel.value = paginatedPersonnel.value.map(p => p.id);
      } else {
        selectedPersonnel.value = [];
      }
    };

    const viewDetails = (person) => {
      selectedPerson.value = person;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedPerson.value = {};
    };

    const toggleStatus = async (person) => {
      const newStatus = person.employmentStatus === 'active' ? 'suspended' : 'active';
      try {
        await updatePersonnelStatus(person.id, newStatus);
        person.employmentStatus = newStatus;
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    const downloadDocument = async (type, doc) => {
      try {
        // Implement document download logic
        console.log(`Downloading ${type} document:`, doc);
      } catch (error) {
        console.error('Error downloading document:', error);
      }
    };

    const updatePersonnelStatus = async (id, status) => {
      // Implement status update logic
      console.log(`Updating personnel ${id} status to ${status}`);
    };

    // Lifecycle hook
    onMounted(async () => {
      try {
        // Implement API calls to fetch personnel and departments
        personnel.value = []; // Fetch from API
        departments.value = []; // Fetch from API
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      searchQuery,
      statusFilter,
      departmentFilter,
      currentPage,
      itemsPerPage,
      showModal,
      selectedPerson,
      selectedPersonnel,
      selectAll,
      departments,
      personnel,
      filteredPersonnel,
      paginatedPersonnel,
      totalPages,
      formatDate,
      toggleSelectAll,
      viewDetails,
      closeModal,
      toggleStatus,
      downloadDocument,
      updatePersonnelStatus
    };
  }
};
</script>
<template>
  <div class="bg-blue-100 min-h-screen p-6">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 relative">
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Liste du Personnel</h1>

      <router-link to="/personnel/create" class="inline-block mb-4">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Créer un Nouveau Personnel
        </button>
      </router-link>

      <div class="overflow-x-auto">
        <table class="w-full border border-gray-300 rounded-lg bg-white shadow-sm">
          <thead>
            <tr class="bg-blue-500 text-white text-left">
              <th class="px-4 py-2">Utilisateur</th>
              <th class="px-4 py-2">Statut de l'Emploi</th>
              <th class="px-4 py-2">Département</th>
              <th class="px-4 py-2">Date d'Embauche</th>
              <th class="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="personnel in paginatedPersonnel" :key="personnel._id" class="border-b">
              <td class="px-4 py-2 bg-black text-white">{{ personnel.user.firstName }}</td>
              <td class="px-4 py-2 bg-black text-white">{{ personnel.employmentStatus }}</td>
              <td class="px-4 py-2 bg-black text-white">{{ personnel.department }}</td>
              <td class="px-4 py-2 bg-black text-white">{{ formatDate(personnel.hireDate) }}</td>
              <td class="px-4 py-2 bg-black text-white text-center">
                <!-- Eye Icon for Viewing Details -->
                <button @click="viewDetails(personnel._id)" class="text-gray-200 hover:text-gray-400">
                  &#128065; <!-- Eye icon (Unicode for eye) -->
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-center space-x-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50">
          Précédent
        </button>
        <span class="text-gray-700">Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { personnelService } from '@/api/services/index';

export default {
  data() {
    return {
      personnelList: [],
      currentPage: 1,
      perPage: 5, // Number of personnel per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.personnelList.length / this.perPage);
    },
    paginatedPersonnel() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.personnelList.slice(start, start + this.perPage);
    }
  },
  created() {
    this.fetchPersonnel();
  },
  methods: {
    async fetchPersonnel() {
      try {
        this.personnelList = await personnelService.getAllPersonnel();
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    viewDetails(id) {
      this.$router.push(`/personnel/detail/${id}`);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

button:disabled {
  cursor: not-allowed;
}
</style>

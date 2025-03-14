<template>
  <div class="min-h-screen p-6 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Liste du Personnel</h1>

      <router-link to="/personnel/create" class="inline-block mb-4">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Créer un Nouveau Personnel
        </button>
      </router-link>

      <div class="overflow-x-auto">
        <table class="w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
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
            <tr v-for="personnel in paginatedPersonnel" :key="personnel._id" class="border-b dark:border-gray-700">
              <td class="px-4 py-2 text-gray-800 dark:text-white">{{ personnel.user.firstName }}</td>
              <td class="px-4 py-2 text-gray-800 dark:text-white">{{ personnel.employmentStatus }}</td>
              <td class="px-4 py-2 text-gray-800 dark:text-white">{{ personnel.department }}</td>
              <td class="px-4 py-2 text-gray-800 dark:text-white">{{ formatDate(personnel.hireDate) }}</td>
              <td class="px-4 py-2 text-gray-800 dark:text-white text-center">
                <button @click="viewDetails(personnel._id)" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400">
                  &#128065;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex justify-center space-x-4">
        <button @click="prevPage" :disabled="currentPage === 1" 
                class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50">
          Précédent
        </button>
        <span class="text-gray-700 dark:text-gray-300">Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" 
                class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50">
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
      perPage: 5, 
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
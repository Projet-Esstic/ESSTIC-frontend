<template>
  <div class="show-course-container mt-8">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex flex-wrap gap-4 w-full">
          <div class="flex flex-row flex-wrap justify-between gap-4 w-full"> 
            <div class="flex-grow bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6">
              <div class="mb-4">
                <h3 class="text-sm uppercase tracking-wider text-gray-500 mb-2">Code UE</h3>
                <p class="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ selectedUe.cod_ue }}</p>
              </div>
              <div class="mb-4">
                <p class="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ selectedUe.name_ue }}</p>
                <div class="mt-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Évolution :</span>
                  <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-1">
                    <div class="bg-blue-500 rounded-full h-4" :style="{ width: (selectedUe.avg_ue / 20) * 100 + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-grow bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-sm uppercase tracking-wider text-gray-500 mb-2">Moyenne</h3>
                  <p class="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ selectedUe.avg_ue }}/20</p>
                </div>
              </div>
            </div>
            <div class="flex-grow bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-sm uppercase tracking-wider text-gray-500 mb-2">Mention</h3>
                  <p class="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ selectedUe.men_ue }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="text-3xl font-bold text-blue-800 mb-6">Les matières de l'unité d'enseignements</h4>
      <table class="w-full text-left table-auto rounded-xl overflow-hidden">
        <thead>
          <tr class="bg-blue-900 text-white">
            <th class="py-3 px-4 text-lg font-semibold">Code/cod</th>
            <th class="py-3 px-4 text-lg font-semibold">Intitulé/Title</th>
            <th class="py-3 px-4 text-lg font-semibold">Coef</th>
            <th class="py-3 px-4 text-lg font-semibold">CC</th>
            <th class="py-3 px-4 text-lg font-semibold">SN</th>
            <th class="py-3 px-4 text-lg font-semibold">Moyenne</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="matiere in selectedUe.matieres" :key="matiere.cod_mat" class="text-gray-900 dark:text-white">
            <td class="border-b border-gray-300 dark:border-gray-700 py-2 px-4">{{ matiere.cod_mat }}</td>
            <td class="border-b border-gray-300 dark:border-gray-700 py-2 px-4">{{ matiere.title_mat }}</td>
            <td class="border-b border-gray-300 dark:border-gray-700 py-2 px-4">{{ matiere.coef_mat }}</td>
            <td class="border-b border-gray-300 dark:border-gray-700 py-2 px-4">{{ matiere.noteCC_mat }}</td>
            <td class="border-b border-gray-300 dark:border-gray-700 py-2 px-4">{{ matiere.noteSN_mat }}</td>
            <td class="border-b border-gray-300 dark:border-gray-700 py-2 px-4">{{ matiere.moy_mat }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowCourse',
  props: {
    selectedUe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
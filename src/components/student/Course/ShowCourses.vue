<template>
    <div class="show-course-container mt-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedUe.cod_ue }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ selectedUe.name_ue }}</p>
            <div class="mt-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Évolution :</span>
              <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-1">
                <div class="bg-blue-500 rounded-full h-4" :style="{ width: (selectedUe.avg_ue / 20) * 100 + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedUe.avg_ue }}/20</p>
            <p class="text-lg text-gray-600 dark:text-gray-400">{{ selectedUe.men_ue }}</p>
          </div>
        </div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Les matières de l'unité d'enseignement</h4>
        <table class="w-full text-left table-auto">
          <thead>
            <tr class="text-gray-600 dark:text-gray-400">
              <th class="border-b border-gray-300 dark:border-gray-700 py-2">Code/cod</th>
              <th class="border-b border-gray-300 dark:border-gray-700 py-2">Intitulé/Title</th>
              <th class="border-b border-gray-300 dark:border-gray-700 py-2">Coef</th>
              <th class="border-b border-gray-300 dark:border-gray-700 py-2">CC</th>
              <th class="border-b border-gray-300 dark:border-gray-700 py-2">SN</th>
              <th class="border-b border-gray-300 dark:border-gray-700 py-2">Moyenne</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="matiere in selectedUe.matieres" :key="matiere.cod_mat" class="text-gray-900 dark:text-white">
              <td class="border-b border-gray-300 dark:border-gray-700 py-2">{{ matiere.cod_mat }}</td>
              <td class="border-b border-gray-300 dark:border-gray-700 py-2">{{ matiere.title_mat }}</td>
              <td class="border-b border-gray-300 dark:border-gray-700 py-2">{{ matiere.coef_mat }}</td>
              <td class="border-b border-gray-300 dark:border-gray-700 py-2">{{ matiere.noteCC_mat }}</td>
              <td class="border-b border-gray-300 dark:border-gray-700 py-2">{{ matiere.noteSN_mat }}</td>
              <td class="border-b border-gray-300 dark:border-gray-700 py-2">{{ matiere.moy_mat }}</td>
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
  /* Vos styles CSS personnalisés peuvent être ajoutés ici */
  </style>
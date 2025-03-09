<template>
    <div class="profile-container w-full p-4 mb-4">
      <div class="flex justify-between items-center mb-4 bg-blue-900 text-white p-2 rounded-t-lg">
        <div class="font-bold text-xl">
          {{ student.name_std }} {{ student.subName_std }}
        </div>
        <div class="font-bold text-xl">N° {{ student.mat_std }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div v-for="(stat, index) in keyStatistics" :key="index" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group relative">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-sm uppercase tracking-wider text-gray-500 mb-2">{{ stat.label }}</h3>
                <p class="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ stat.value }}</p>
              </div>
            </div>
            <div v-if="stat.label !== 'Mention générale'" class="flex items-center">
              <span :class="stat.percentage < 50 ? 'text-red-500' : 'text-green-500'" class="font-semibold">
                <span v-if="stat.percentage < 50">&#9660;</span>
                <span v-else>&#9650;</span>
                {{ stat.percentage.toFixed(2) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import bulletinData from '@/data/studentsInfo.json';
  
  export default {
    data() {
      return {
        student: bulletinData[0].student,
        grades: bulletinData[0].grades,
        keyStatistics: [
          {
            label: 'Total général',
            value: bulletinData[0].grades.totalGen_std,
            percentage: (bulletinData[0].grades.totalGen_std / 200) * 100,
          },
          {
            label: 'Total crédit',
            value: `${bulletinData[0].grades.totalCredit_std}/60`,
            percentage: (bulletinData[0].grades.totalCredit_std / 60) * 100,
          },
          {
            label: 'Moyenne générale',
            value: `${bulletinData[0].grades.moyGen_std}/20`,
            percentage: (bulletinData[0].grades.moyGen_std / 20) * 100,
          },
          {
            label: 'Mention générale',
            value: bulletinData[0].grades.menGen_std,
            percentage: 0, // Mention générale n'a pas de pourcentage
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Vos styles CSS personnalisés peuvent être ajoutés ici */
  </style>
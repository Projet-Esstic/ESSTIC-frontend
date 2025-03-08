<template>
    <div class="px-5 py-4">
        <Profile></Profile>
      <div class="table-container rounded-lg overflow-hidden shadow-md">
        <table class="w-full text-left table-auto">
          <thead>
            <tr class="bg-blue-900 text-white">
              <th class="px-4 py-2 font-semibold">Code/Cod</th>
              <th class="px-4 py-2 font-semibold">Intitulé/Title</th>
              <th class="px-4 py-2 font-semibold">Moy</th>
              <th class="px-4 py-2 font-semibold">Coef</th>
              <th class="px-4 py-2 font-semibold">Men</th>
              <th class="px-4 py-2 font-semibold">Cred</th>
              <th class="px-4 py-2 font-semibold">Sem</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="ue in grades.ue_list" :key="ue.cod_ue">
              <tr class="border-b border-gray-200" :class="{ 'bg-yellow-100': ue.matieres.length > 0 }">
                <td class="px-4 py-3">{{ ue.cod_ue }}</td>
                <td class="px-4 py-3">{{ ue.name_ue }}</td>
                <td class="px-4 py-3">{{ ue.avg_ue }}</td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3">{{ ue.men_ue }}</td>
                <td class="px-4 py-3">{{ ue.cred_ue }}</td>
                <td class="px-4 py-3">{{ ue.sem_ue }}</td>
              </tr>
              <tr v-for="matiere in ue.matieres" :key="matiere.cod_mat" class="border-b border-gray-200">
                <td class="px-4 py-3"> > {{ matiere.cod_mat }}</td>
                <td class="px-4 py-3">{{ matiere.title_mat }}</td>
                <td class="px-4 py-3">{{ matiere.moy_mat }}</td>
                <td class="px-4 py-3">{{ matiere.coef_mat }}</td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3">{{ matiere.sem_mat }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
import bulletinData from '@/data/studentsInfo.json';
import Profile from '@/components/student/result/Profile.vue';

export default {
  components: {
    Profile,
  },
  data() {
    return {
      grades: bulletinData[0].grades,
    };
  },
};
</script>
  

  
  <style scoped>
  table {
    border-bottom: 2px solid #ddd;
  }
  </style>
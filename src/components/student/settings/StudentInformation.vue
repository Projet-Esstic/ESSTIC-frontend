<template>
    <div class="student-info-container flex">
      <div class="left-column w-1/4 p-4">
        <div class="avatar-container mb-4">
          <div class="avatar rounded-full bg-gray-300 w-24 h-24 mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.796 6.879 2.204M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
            </svg>
          </div>
        </div>
        <div class="student-name text-center mb-4">
          <h2 class="text-lg font-semibold">{{ student.name_std }}</h2>
          <p class="text-sm">{{ student.subName_std }}</p>
        </div>
        <div class="student-details bg-gray-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group relative">
          <p>Né le : {{ student.bornDate_std }}</p>
          <p>à : {{ student.lieuxBorn_std }}</p>
          <p>Nationalité : Camerounaise</p>
          <p>Statut : {{ student.quality_std }}</p>
          <p>Sexe : Masculin</p>
          <p>Niveau : {{ student.level_std }}</p>
          <p>Filière : {{ student.serie_std }}</p>
        </div>
      </div>
  
      <div class="right-column w-3/4 p-4 grid grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6 border-2 border-purple-600"></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6">
          <h3 class="text-lg font-semibold mb-2">Progression</h3>
          <div class="progress-bar bg-gray-200 rounded-full h-4 mb-2">
            <div class="bg-blue-500 rounded-full h-4 w-1/2"></div>
          </div>
          <div class="progress-bar bg-gray-200 rounded-full h-4">
            <div class="bg-blue-500 rounded-full h-4 w-3/4"></div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6"></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6"></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6"></div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group relative p-6"></div>
      </div>
    </div>
  </template>
  
  <script>
  import bulletinData from '@/data/studentsInfo.json';
  
  export default {
    name: 'StudentInformation',
    data() {
      return {
        student: bulletinData[0].student,
      };
    },
  };
  </script>
  
  <style scoped>
  
  </style>
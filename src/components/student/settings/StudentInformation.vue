<template>
  <div class="student-profile-container flex flex-col md:flex-row p-8 bg-gray-100 min-h-screen">
    <div class="left-column md:w-1/3 p-6 bg-white rounded-xl shadow-lg mb-6 md:mb-0 md:mr-6">
      <div class="avatar-container mb-6 text-center">
        <div class="avatar rounded-full bg-gray-300 w-32 h-32 mx-auto flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.796 6.879 2.204M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold mt-4">{{ student.user.fullName }}</h2>
        <p class="text-sm text-gray-600">{{ student.academicInfo.level_list[0].level }}</p>
      </div>

      <div class="student-details">
        <h3 class="text-lg font-semibold mb-4 border-b pb-2">Informations Personnelles</h3>
        <p class="mb-2"><span class="font-semibold">Date de naissance:</span> {{ student.user.dateOfBirth }}</p>
        <p class="mb-2"><span class="font-semibold">Genre:</span> {{ student.user.gender }}</p>
        <p class="mb-2"><span class="font-semibold">Email:</span> {{ student.user.email }}</p>
        <p class="mb-2"><span class="font-semibold">Identifiant Candidat:</span> {{ student.applicant.applicantId }}</p>
        <p class="mb-2"><span class="font-semibold">Niveau actuel:</span> {{ student.academicInfo.level_list[0].level }}</p>
        <p class="mb-2"><span class="font-semibold">Département:</span> {{ student.academicInfo.level_list[0].department }}</p>
      </div>
    </div>

    <div class="right-column md:w-2/3 p-6 bg-white rounded-xl shadow-lg">
      <h3 class="text-lg font-semibold mb-4 border-b pb-2">Progression Académique</h3>

      <div v-for="level in student.academicInfo.level_list" :key="level.level" class="mb-6">
        <h4 class="text-xl font-semibold mb-2">{{ level.level }}</h4>
        <div v-for="year in level.academicYears" :key="year.year" class="mb-4">
          <h5 class="text-lg font-semibold mb-2">{{ year.year }}</h5>
          <div v-for="semester in year.semesters" :key="semester.semesterInfo" class="mb-2">
            <div class="flex justify-between items-center bg-gray-50 rounded-md p-3 mb-2">
              <div>
                <p class="font-semibold">{{ semester.semesterInfo }}</p>
                <p>Moyenne: {{ semester.average }}</p>
              </div>
              <div class="text-right">
                <p>Crédits: {{ semester.credits }}</p>
                <p>Discipline: {{ semester.discipline }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentData from '@/data/studentInfo2.json';

export default {
  name: 'StudentProfile',
  data() {
    return {
      student: studentData.students[0].student,
    };
  },
};
</script>

<style scoped>
/* Ajoutez ici des styles personnalisés si nécessaire */
</style>
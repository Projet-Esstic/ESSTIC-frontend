<template>
  <div class="student-profile-edit-container p-8 bg-gray-100 min-h-screen">
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
      <h2 class="text-3xl font-semibold mb-8 text-center text-indigo-700">Modifier le Profil de l'Étudiant</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="border rounded-md p-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Informations Personnelles</h3>

            <div class="mb-4">
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
              <input type="text" id="fullName" v-model="editedStudent.user.fullName" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md" />
            </div>

            <div class="mb-4">
              <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 mb-1">Date de Naissance</label>
              <input type="date" id="dateOfBirth" v-model="editedStudent.user.dateOfBirth" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md" />
            </div>

            <div class="mb-4">
              <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select id="gender" v-model="editedStudent.user.gender" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md">
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" v-model="editedStudent.user.email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md" />
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="border rounded-md p-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Informations Académiques</h3>

            <div class="mb-4">
              <label for="applicantId" class="block text-sm font-medium text-gray-700 mb-1">Identifiant Candidat</label>
              <input type="text" id="applicantId" v-model="editedStudent.applicant.applicantId" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md" />
            </div>

            <div class="mb-4">
              <label for="level" class="block text-sm font-medium text-gray-700 mb-1">Niveau Actuel</label>
              <select id="level" v-model="editedStudent.academicInfo.level_list[0].level" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md">
                <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="department" class="block text-sm font-medium text-gray-700 mb-1">Département</label>
              <input type="text" id="department" v-model="editedStudent.academicInfo.level_list[0].department" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-shadow cursor-pointer hover:shadow-md" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <button @click="saveChanges" class="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg font-semibold">Enregistrer les Modifications</button>
      </div>
    </div>
  </div>
</template>

<script>
import studentData from '@/data/studentInfo2.json';

export default {
  name: 'StudentProfileEdit',
  data() {
    return {
      student: studentData.students[0].student,
      editedStudent: JSON.parse(JSON.stringify(studentData.students[0].student)),
      levels: ['1 LICENCE', '2 LICENCE', '3 LICENCE'],
    };
  },
  methods: {
    saveChanges() {
      console.log('Modifications enregistrées :', this.editedStudent);
      this.student = JSON.parse(JSON.stringify(this.editedStudent));
    },
  },
};
</script>

<style scoped>
/* Styles additionnels si nécessaire */
</style>
<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Document Request</h2>
    
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Type</label>
          <select v-model="selectedDocument" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Select Document</option>
            <option value="transcript">Transcript</option>
            <option value="id_card">ID Card</option>
            <option value="certificate">Certificate</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
          <select v-model="selectedSemester" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Select Semester</option>
            <option v-for="semester in semesters" :key="semester" :value="semester">{{ semester }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
          <select v-model="selectedYear" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Select Academic Year</option>
            <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <button @click="submitRequest" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Request</button>
    </div>

    <!-- Document Preview -->
    <div v-if="selectedDocument === 'transcript'" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-6">
      <h3 class="text-xl font-semibold mb-4">Transcript Preview</h3>
      <!-- Transcript Template -->
      <div class="transcript-content">
        <div class="flex flex-col md:flex-row justify-between items-start border-b pb-4 mb-4">
          <div class="flex items-center">
            <div class="mr-4 text-left">
              <img src="@/assets/images/logo.png" alt="ESSTIC Logo" class="w-50 h-20 bg-white p-1 mb-1" />
              <div class="text-xs text-gray-600 dark:text-gray-300">ECOLE SUPERIEURE DES SCIENCES ET</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">TECHNIQUES DE L'INFORMATION ET</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">DE LA COMMUNICATION</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">BP : 1328 Yaoundé Cameroun</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Tél :(+ 237) 242 16 08 80</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">E-mail : info@esstic.cm</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Site web : www.esstic.cm</div>
            </div>
          </div>
          <div class="mr-4">
            <img src="@/assets/images/logo.png" alt="ESSTIC Logo" class="w-50 h-20 bg-white p-1 mb-1" />
          </div>
          <div class="flex items-center mt-4 md:mt-0">
            <div class="text-center">
              <div class="font-bold">REPUBLIQUE DU CAMEROUN</div>
              <div class="text-xs text-gray-600 dark:text-gray-300">Paix - Travail - Patrie</div>
              <div class="text-sm">Université de Yaoundé II</div>
            </div>
          </div>
        </div>
        
        <div class="text-xl font-bold text-center my-6">RELEVE DE NOTES / TRANSCRIPT</div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
          <div>
            <div><span class="font-medium">Nom(s) et prénom(s)/ Name and Surname : </span>John Doe</div>
            <div><span class="font-medium">Né Le /Born on: </span>01/01/2000</div>
            <div><span class="font-medium">Nationalité /Nationality: </span>Cameroonian</div>
            <div><span class="font-medium">Statut / Quality: </span>Student</div>
          </div>
          <div>
            <div><span class="font-medium">A /at: </span>Yaoundé</div>
            <div><span class="font-medium">N° Matricule /Registration N°: </span>ESSTIC2021001</div>
            <div><span class="font-medium">Filière /Serie: </span>Journalisme / Journalism</div>
            <div><span class="font-medium">Année académique/Academic year: </span>{{ selectedYear }}</div>
            <div><span class="font-medium">Niveau/Level: </span>Licence 2</div>
          </div>
        </div>

        <table class="min-w-full border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-gray-500 text-white">
              <th class="py-2 px-3 border-b border-r border-gray-400 dark:border-gray-600 text-left text-sm font-medium">Code/Cod</th>
              <th class="py-2 px-3 border-b border-r border-gray-400 dark:border-gray-600 text-left text-sm font-medium">Intitulé/Title</th>
              <th class="py-2 px-3 border-b border-r border-gray-400 dark:border-gray-600 text-center text-sm font-medium">Moy</th>
              <th class="py-2 px-3 border-b border-r border-gray-400 dark:border-gray-600 text-center text-sm font-medium">Coef</th>
              <th class="py-2 px-3 border-b border-r border-gray-400 dark:border-gray-600 text-center text-sm font-medium">Men</th>
              <th class="py-2 px-3 border-b border-r border-gray-400 dark:border-gray-600 text-center text-sm font-medium">Crd</th>
              <th class="py-2 px-3 border-b border-gray-400 dark:border-gray-600 text-center text-sm font-medium">Semestre</th>
            </tr>
          </thead>
          <tbody>
            <!-- Example course data -->
            <tr class="hover:bg-gray-50 even:bg-gray-100 dark:hover:bg-gray-700 dark:even:bg-gray-750 dark:text-white">
              <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-left">JL3-101</td>
              <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-left">Introduction to Journalism</td>
              <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center font-medium">15.00</td>
              <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">3</td>
              <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">Bien</td>
              <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">6</td>
              <td class="py-1 px-3 border-b dark:border-gray-600 text-sm text-center">{{ selectedSemester }}</td>
            </tr>
            <!-- Add more courses as needed -->
          </tbody>
        </table>

        <div class="mt-6 text-right text-sm text-gray-600 dark:text-gray-300">
          <div>ACMA {{ getCurrentDate() }}</div>
          <div>{{ getCurrentTime() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DocumentRequest',
  setup() {
    const selectedDocument = ref('');
    const selectedSemester = ref('');
    const selectedYear = ref('');
    const semesters = ref(['Fall', 'Spring', 'Summer']);
    const academicYears = ref(['2021-2022', '2022-2023', '2023-2024']);

    const submitRequest = () => {
      if (!selectedDocument.value || !selectedSemester.value || !selectedYear.value) {
        alert('Please fill in all fields');
        return;
      }
      console.log('Request submitted:', {
        document: selectedDocument.value,
        semester: selectedSemester.value,
        year: selectedYear.value
      });
      alert('Request submitted successfully');
    };

    const getCurrentDate = () => {
      const date = new Date();
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    const getCurrentTime = () => {
      const date = new Date();
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return {
      selectedDocument,
      selectedSemester,
      selectedYear,
      semesters,
      academicYears,
      submitRequest,
      getCurrentDate,
      getCurrentTime
    };
  }
};
</script> 
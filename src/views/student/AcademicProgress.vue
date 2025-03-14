<template>
  <div class="text-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl text-left font-bold text-primary-light dark:text-white mb-8">
      ESSTIC Academic Progress Tracker
    </h1>

    <!-- Filters -->
    <div class="max-w-5xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label for="level-select" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Level:
          </label>
          <select
            id="level-select"
            v-model="selectedLevel"
            @change="updateFilteredStudents"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Levels</option>
            <option v-for="level in levels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>
        <div>
          <label for="department-select" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Filière/Serie:
          </label>
          <select
            id="department-select"
            v-model="selectedDepartment"
            @change="updateFilteredStudents"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Filières</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>
        <div>
          <label for="academic-year-select" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Academic Year:
          </label>
          <select
            id="academic-year-select"
            v-model="selectedAcademicYear"
            @change="updateFilteredStudents"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Years</option>
            <option v-for="year in academicYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="semester-select" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Semester:
          </label>
          <select
            id="semester-select"
            v-model="selectedSemester"
            @change="updateFilteredStudents"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Semesters</option>
            <option v-for="semester in semesters" :key="semester" :value="semester">
              {{ semester }}
            </option>
          </select>
        </div>
        <div class="col-span-2">
          <label for="student-search" class="block text-sm font-medium text-text-light dark:text-white mb-1">
            Search by Student Name:
          </label>
          <input
            id="student-search"
            v-model="searchName"
            @input="updateFilteredStudents"
            type="text"
            placeholder="Enter student name"
            class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>

    <!-- Student Records -->
    <div class="max-w-5xl mx-auto mb-6">
      <h2 class="text-2xl font-semibold text-text-light dark:text-white mb-4">
        Student Transcripts
      </h2>
      <div v-if="filteredStudents.length === 0" class="text-gray-500 dark:text-gray-400">
        No students match the selected filters.
      </div>
      <div v-else>
        <div v-for="student in filteredStudents" :key="student.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <!-- Save as PDF Button at Top Right -->
          <div class="flex justify-end mb-4">
            <button 
              @click="saveAsPDF(student)" 
              class="hover:text-white hover:bg-black border-2 text-black font-medium py-2 px-4 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Save as PDF
            </button>
          </div>
          
          <!-- Printable Transcript Area -->
          <div :id="'transcript-' + student.id" class="transcript-content">
            <!-- Header with ESSTIC Logo and Information -->
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
                <img src="@/assets/images/logo1.png" alt="ESSTIC Logo" class="w-50 h-20 bg-white p-1 mb-1" />
                </div>
              <div class="flex items-center mt-4 md:mt-0">
                <div class="text-center">
                  <div class="font-bold">REPUBLIQUE DU CAMEROUN</div>
                  <div class="text-xs text-gray-600 dark:text-gray-300">Paix - Travail - Patrie</div>
                  <div class="text-sm">Université de Yaoundé II</div>
                </div>
              </div>
            </div>
            
            <!-- Transcript Title -->
            <div class="text-xl font-bold text-center my-6">RELEVE DE NOTES / TRANSCRIPT</div>
            
            <!-- Student Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
              <div>
                <div><span class="font-medium">Nom(s) et prénom(s)/ Name and Surname : </span>{{ student.firstName }} {{ student.lastName }}</div>
                <div><span class="font-medium">Né Le /Born on: </span>{{ student.birthDate }}</div>
                <div><span class="font-medium">Nationalité /Nationality: </span>{{ student.nationality }}</div>
                <div><span class="font-medium">Statut / Quality: </span>{{ student.status }}</div>
              </div>
              <div>
                <div><span class="font-medium">A /at: </span>{{ student.birthPlace }}</div>
                <div><span class="font-medium">N° Matricule /Registration N°: </span>{{ student.registrationNumber }}</div>
                <div><span class="font-medium">Filière /Serie: </span>{{ student.department }} /{{ student.department === 'Journalisme' ? 'Journalism' : student.department }}</div>
                <div><span class="font-medium">Année académique/Academic year: </span>{{ student.academicYear }}</div>
                <div><span class="font-medium">Niveau/Level: </span>{{ student.level }}</div>
              </div>
            </div>

            <!-- Course Performance Table with Gray Header - Styled like the image -->
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
                <!-- Group courses by module code prefix (JF5, JF6, etc.) -->
                <template v-for="(group, groupIndex) in groupedCourses(student)" :key="groupIndex">
                  <!-- Module Header Row -->
                  <!-- <tr class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                    <td colspan="7" class="py-1 px-3 border-b dark:border-gray-600 text-left font-bold text-sm">{{ group.header }}</td>
                  </tr> -->
                  <!-- Course Rows -->
                  <tr 
                    v-for="course in group.courses" 
                    :key="`${student.id}-${course.code}-${course.semester}-${course.academicYear}`"
                    class="hover:bg-gray-50 even:bg-gray-100 dark:hover:bg-gray-700 dark:even:bg-gray-750 dark:text-white"
                  >
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-left">{{ course.code }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-left">{{ course.title }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center font-medium" 
                        :class="getGradeColorClass(course.grade)">
                      {{ course.grade.toFixed(2) }}
                    </td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">{{ course.coefficient }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">{{ course.mention }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">{{ course.credits }}</td>
                    <td class="py-1 px-3 border-b dark:border-gray-600 text-sm text-center">{{ course.academicYear }}</td>
                  </tr>
                </template>
              </tbody>
            </table>

            <!-- Footer with date and time -->
            <div class="mt-6 text-right text-sm text-gray-600 dark:text-gray-300">
              <div>ACMA {{ getCurrentDate() }}</div>
              <div>{{ getCurrentTime() }}</div>
            </div>
          </div>
          <!-- Summary - Only visible in the app, not in print view -->
          <div class="mt-6 print:hidden">
            <h3 class="text-lg font-semibold mb-4 text-left">Academic Summary</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p class="text-sm text-gray-500 dark:text-gray-400">Average Grade</p>
                <p class="text-lg font-bold text-primary-light dark:text-white">
                  {{ calculateAverageGrade(student).toFixed(2) }}
                </p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Credits</p>
                <p class="text-lg font-bold text-primary-light dark:text-white">
                  {{ calculateTotalCredits(student) }}
                </p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p class="text-sm text-gray-500 dark:text-gray-400">Passed Courses</p>
                <p class="text-lg font-bold text-primary-light dark:text-white">
                  {{ countPassedCourses(student) }}/{{ filteredStudentCourses(student).length }}
                </p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p class="text-sm text-gray-500 dark:text-gray-400">Overall Status</p>
                <p class="text-lg font-bold" :class="getOverallStatusClass(student)">
                  {{ getOverallStatus(student) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Filter states
      selectedLevel: "",
      selectedDepartment: "",
      selectedAcademicYear: "",
      selectedSemester: "",
      searchName: "",
      
      // Filter options
      levels: ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"],
      departments: ["Journalisme", "Communication", "Documentation", "Informatique"],
      academicYears: ["2023-2024", "2022-2023", "2021-2022"],
      semesters: ["Semestre 1", "Semestre 2", "Semestre 3", "Semestre 4", "Semestre 5", "Semestre 6"],
      
      // Students data
      students: [
        {
          id: 1,
          firstName: "Alice",
          lastName: "Nguema",
          registrationNumber: "ESSTIC2021001",
          birthDate: "15/04/2000",
          birthPlace: "Douala",
          nationality: "Camerounaise",
          status: "Etudiant",
          department: "Journalisme",
          level: "Licence 2",
          academicYear: "2022-2023",
          courses: [
            { code: "JL3-101", title: "Introduction au journalisme", grade: 15.75, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 3", academicYear: "2022-2023" },
            { code: "JL3-102", title: "Techniques d'écriture journalistique", grade: 17.25, coefficient: 4, credits: 8, mention: "A", semester: "Semestre 3", academicYear: "2022-2023" },
            { code: "JL3-103", title: "Éthique et déontologie", grade: 14.50, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 3", academicYear: "2022-2023" },
            { code: "JL3-104", title: "Presse écrite", grade: 16.00, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 3", academicYear: "2022-2023" },
            { code: "JL3-105", title: "Culture générale et actualité", grade: 13.50, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 3", academicYear: "2022-2023" },
            { code: "JL4-201", title: "Journalisme radio", grade: 14.75, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 4", academicYear: "2022-2023" },
            { code: "JL4-202", title: "Journalisme télévisé", grade: 16.50, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 4", academicYear: "2022-2023" },
            { code: "JL4-203", title: "Journalisme numérique", grade: 18.00, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 4", academicYear: "2022-2023" },
            { code: "JL4-204", title: "Photojournalisme", grade: 15.50, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 4", academicYear: "2022-2023" },
            { code: "JL4-205", title: "Recherche et vérification des faits", grade: 14.25, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 4", academicYear: "2022-2023" }
          ]
        },
        {
          id: 2,
          firstName: "Jean-Paul",
          lastName: "Meboulou",
          registrationNumber: "ESSTIC2021002",
          birthDate: "22/07/1999",
          birthPlace: "Yaoundé",
          nationality: "Camerounaise",
          status: "Etudiant",
          department: "Communication",
          level: "Licence 3",
          academicYear: "2022-2023",
          courses: [
            { code: "CO5-101", title: "Stratégies de communication", grade: 13.75, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 5", academicYear: "2022-2023" },
            { code: "CO5-102", title: "Communication d'entreprise", grade: 11.25, coefficient: 3, credits: 6, mention: "C", semester: "Semestre 5", academicYear: "2022-2023" },
            { code: "CO5-103", title: "Relations publiques", grade: 9.50, coefficient: 2, credits: 4, mention: "D", semester: "Semestre 5", academicYear: "2022-2023" },
            { code: "CO5-104", title: "Marketing digital", grade: 16.25, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 5", academicYear: "2022-2023" },
            { code: "CO5-105", title: "Gestion de crise", grade: 14.50, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 5", academicYear: "2022-2023" },
            { code: "CO6-201", title: "Communication politique", grade: 12.75, coefficient: 3, credits: 6, mention: "C", semester: "Semestre 6", academicYear: "2022-2023" },
            { code: "CO6-202", title: "Communication interculturelle", grade: 15.00, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 6", academicYear: "2022-2023" },
            { code: "CO6-203", title: "Création publicitaire", grade: 17.50, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 6", academicYear: "2022-2023" },
            { code: "CO6-204", title: "Mémoire de fin d'études", grade: 14.75, coefficient: 6, credits: 12, mention: "B", semester: "Semestre 6", academicYear: "2022-2023" },
            { code: "CO6-205", title: "Stage professionnel", grade: 16.00, coefficient: 4, credits: 8, mention: "B", semester: "Semestre 6", academicYear: "2022-2023" }
          ]
        },
        {
          id: 3,
          firstName: "Marie",
          lastName: "Ekambi",
          registrationNumber: "ESSTIC2022001",
          birthDate: "05/03/2001",
          birthPlace: "Bafoussam",
          nationality: "Camerounaise",
          status: "Etudiant",
          department: "Documentation",
          level: "Licence 1",
          academicYear: "2022-2023",
          courses: [
            { code: "DO1-101", title: "Introduction aux sciences de l'information", grade: 12.50, coefficient: 2, credits: 4, mention: "C", semester: "Semestre 1", academicYear: "2022-2023" },
            { code: "DO1-102", title: "Gestion documentaire", grade: 14.25, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 1", academicYear: "2022-2023" },
            { code: "DO1-103", title: "Recherche d'information", grade: 16.75, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 1", academicYear: "2022-2023" },
            { code: "DO1-104", title: "Archivistique", grade: 11.00, coefficient: 2, credits: 4, mention: "C", semester: "Semestre 1", academicYear: "2022-2023" },
            { code: "DO1-105", title: "Informatique documentaire", grade: 9.25, coefficient: 3, credits: 6, mention: "D", semester: "Semestre 1", academicYear: "2022-2023" },
            { code: "DO2-201", title: "Bibliothéconomie", grade: 13.50, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 2", academicYear: "2022-2023" },
            { code: "DO2-202", title: "Catalogage et indexation", grade: 15.25, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 2", academicYear: "2022-2023" },
            { code: "DO2-203", title: "Veille informationnelle", grade: 14.00, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 2", academicYear: "2022-2023" },
            { code: "DO2-204", title: "Gestion de contenu numérique", grade: 12.75, coefficient: 2, credits: 4, mention: "C", semester: "Semestre 2", academicYear: "2022-2023" },
            { code: "DO2-205", title: "Droit de l'information", grade: 10.50, coefficient: 2, credits: 4, mention: "D", semester: "Semestre 2", academicYear: "2022-2023" }
          ]
        },
        {
          id: 4,
          firstName: "Pierre",
          lastName: "Kamto",
          registrationNumber: "ESSTIC2021003",
          birthDate: "17/11/1998",
          birthPlace: "Kribi",
          nationality: "Camerounaise",
          status: "Etudiant",
          department: "Informatique",
          level: "Master 1",
          academicYear: "2023-2024",
          courses: [
            { code: "IN7-101", title: "Algorithmique avancée", grade: 18.25, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 1", academicYear: "2023-2024" },
            { code: "IN7-102", title: "Bases de données", grade: 17.50, coefficient: 4, credits: 8, mention: "A", semester: "Semestre 1", academicYear: "2023-2024" },
            { code: "IN7-103", title: "Développement web", grade: 16.75, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 1", academicYear: "2023-2024" },
            { code: "IN7-104", title: "Réseaux informatiques", grade: 15.00, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 1", academicYear: "2023-2024" },
            { code: "IN7-105", title: "Sécurité informatique", grade: 14.25, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 1", academicYear: "2023-2024" },
            { code: "IN8-201", title: "Intelligence artificielle", grade: 16.00, coefficient: 4, credits: 8, mention: "B", semester: "Semestre 2", academicYear: "2023-2024" },
            { code: "IN8-202", title: "Développement mobile", grade: 17.75, coefficient: 3, credits: 6, mention: "A", semester: "Semestre 2", academicYear: "2023-2024" },
            { code: "IN8-203", title: "Génie logiciel", grade: 15.50, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 2", academicYear: "2023-2024" },
            { code: "IN8-204", title: "Big Data", grade: 14.75, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 2", academicYear: "2023-2024" },
            { code: "IN8-205", title: "Cloud Computing", grade: 16.25, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 2", academicYear: "2023-2024" }
          ]
        },
        {
          id: 5,
          firstName: "Sophie",
          lastName: "Mbarga",
          registrationNumber: "ESSTIC2022002",
          birthDate: "30/09/2000",
          birthPlace: "Garoua",
          nationality: "Camerounaise",
          status: "Etudiant",
          department: "Journalisme",
          level: "Licence 2",
          academicYear: "2023-2024",
          courses: [
            { code: "JL3-101", title: "Introduction au journalisme", grade: 14.25, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 3", academicYear: "2023-2024" },
            { code: "JL3-102", title: "Techniques d'écriture journalistique", grade: 12.75, coefficient: 4, credits: 8, mention: "C", semester: "Semestre 3", academicYear: "2023-2024" },
            { code: "JL3-103", title: "Éthique et déontologie", grade: 8.50, coefficient: 2, credits: 4, mention: "E", semester: "Semestre 3", academicYear: "2023-2024" },
            { code: "JL3-104", title: "Presse écrite", grade: 11.00, coefficient: 3, credits: 6, mention: "C", semester: "Semestre 3", academicYear: "2023-2024" },
            { code: "JL3-105", title: "Culture générale et actualité", grade: 10.25, coefficient: 2, credits: 4, mention: "D", semester: "Semestre 3", academicYear: "2023-2024" },
            { code: "JL4-201", title: "Journalisme radio", grade: 13.50, coefficient: 3, credits: 6, mention: "B", semester: "Semestre 4", academicYear: "2023-2024" },
            { code: "JL4-202", title: "Journalisme télévisé", grade: 12.00, coefficient: 3, credits: 6, mention: "C", semester: "Semestre 4", academicYear: "2023-2024" },
            { code: "JL4-203", title: "Journalisme numérique", grade: 9.75, coefficient: 3, credits: 6, mention: "D", semester: "Semestre 4", academicYear: "2023-2024" },
            { code: "JL4-204", title: "Photojournalisme", grade: 13.25, coefficient: 2, credits: 4, mention: "B", semester: "Semestre 4", academicYear: "2023-2024" },
            { code: "JL4-205", title: "Recherche et vérification des faits", grade: 11.50, coefficient: 2, credits: 4, mention: "C", semester: "Semestre 4", academicYear: "2023-2024" }
          ]
        }
      ],
      
      // UI state
      filteredStudents: []
    };
  },
  
  mounted() {
    // Initialize the filtered students list
    this.updateFilteredStudents();
  },
  
  methods: {
    // Filter students based on selected criteria
    updateFilteredStudents() {
      this.filteredStudents = this.students.filter(student => {
        // Check if student matches all the filter criteria
        const levelMatch = !this.selectedLevel || student.level === this.selectedLevel;
        const departmentMatch = !this.selectedDepartment || student.department === this.selectedDepartment;
        const academicYearMatch = !this.selectedAcademicYear || student.academicYear === this.selectedAcademicYear;
        const semesterMatch = !this.selectedSemester || student.courses.some(course => course.semester === this.selectedSemester);
        
        // Check if student name matches the search query
        const nameMatch = !this.searchName || 
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.searchName.toLowerCase());
        
        return levelMatch && departmentMatch && academicYearMatch && semesterMatch && nameMatch;
      });
    },
    
    // Filter courses for a specific student based on selected semester
    filteredStudentCourses(student) {
      return student.courses.filter(course => {
        const semesterMatch = !this.selectedSemester || course.semester === this.selectedSemester;
        const yearMatch = !this.selectedAcademicYear || course.academicYear === this.selectedAcademicYear;
        return semesterMatch && yearMatch;
      });
    },
    
    // Group courses by module code prefix for better organization
    groupedCourses(student) {
      const courses = this.filteredStudentCourses(student);
      const groups = {};
      
      // Group courses by their code prefix (e.g., "JL3", "JL4")
      courses.forEach(course => {
        const codePrefix = course.code.split('-')[0];
        if (!groups[codePrefix]) {
          groups[codePrefix] = [];
        }
        groups[codePrefix].push(course);
      });
      
      // Convert the groups object to an array for template rendering
      return Object.keys(groups).map(key => {
        let headerText = "";
        
        // Generate appropriate headers based on department and level
        if (key.startsWith("JL")) {
          headerText = "Module Journalisme";
        } else if (key.startsWith("CO")) {
          headerText = "Module Communication";
        } else if (key.startsWith("DO")) {
          headerText = "Module Documentation";
        } else if (key.startsWith("IN")) {
          headerText = "Module Informatique";
        }
        
        // Add numerical identifier
        const moduleNumber = key.substring(2);
        headerText += ` Niveau ${moduleNumber}`;
        
        return {
          header: headerText,
          courses: groups[key].sort((a, b) => a.code.localeCompare(b.code))
        };
      });
    },
    
    // Calculate the average grade for a student
    calculateAverageGrade(student) {
      const courses = this.filteredStudentCourses(student);
      if (courses.length === 0) return 0;
      
      let totalWeightedGrade = 0;
      let totalCoefficients = 0;
      
      courses.forEach(course => {
        totalWeightedGrade += course.grade * course.coefficient;
        totalCoefficients += course.coefficient;
      });
      
      return totalWeightedGrade / totalCoefficients;
    },
    
    // Calculate total credits earned by a student
    calculateTotalCredits(student) {
      const courses = this.filteredStudentCourses(student);
      let earnedCredits = 0;
      
      courses.forEach(course => {
        // Count credits only for passed courses (grade >= 10)
        if (course.grade >= 10) {
          earnedCredits += course.credits;
        }
      });
      
      return earnedCredits;
    },
    
    // Count passed courses for a student
    countPassedCourses(student) {
      const courses = this.filteredStudentCourses(student);
      return courses.filter(course => course.grade >= 10).length;
    },
    
    // Determine overall status based on performance
    getOverallStatus(student) {
      const avgGrade = this.calculateAverageGrade(student);
      const passRate = this.countPassedCourses(student) / this.filteredStudentCourses(student).length;
      
      if (avgGrade >= 16) return "Excellent";
      if (avgGrade >= 14) return "Très Bien";
      if (avgGrade >= 12) return "Bien";
      if (avgGrade >= 10) return "Assez Bien";
      if (passRate >= 0.75) return "Admis";
      return "Non Admis";
    },
    
    // Get CSS class for overall status display
    getOverallStatusClass(student) {
      const status = this.getOverallStatus(student);
      
      if (status === "Excellent" || status === "Très Bien") return "text-green-600 dark:text-green-400";
      if (status === "Bien" || status === "Assez Bien") return "text-blue-600 dark:text-blue-400";
      if (status === "Admis") return "text-yellow-600 dark:text-yellow-400";
      return "text-red-600 dark:text-red-400";
    },
    
    // Get CSS class for grade color coding
    getGradeColorClass(grade) {
      if (grade >= 16) return "text-green-700 font-bold";
      if (grade >= 14) return "text-green-600";
      if (grade >= 12) return "text-blue-600";
      if (grade >= 10) return "text-blue-500";
      return "text-red-500";
    },
    
    // Print student transcript
    printTranscript(student) {
      const printContent = document.getElementById(`transcript-${student.id}`).innerHTML;
      const originalContents = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div class="print-container">
          <style>
            @media print {
              body { font-family: Arial, sans-serif; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              th { background-color: #f2f2f2; }
              .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            }
          </style>
          ${printContent}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContents;
      this.updateFilteredStudents(); // Refresh the UI after printing
    },
    
    // Get current date in DD/MM/YYYY format
    getCurrentDate() {
      const date = new Date();
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    },
    
    // Get current time in HH:MM format
    getCurrentTime() {
      const date = new Date();
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
  }
};
</script>
<template>
  <div class="text-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="max-w-5xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
    </div>

    <div class="max-w-5xl mx-auto mb-6">
      <div v-if="filteredStudents.length === 0" class="text-gray-500 dark:text-gray-400">
        No students match the selected filters.
      </div>
      <div v-else>
        <div v-for="student in filteredStudents" :key="student.student.user.fullName" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <div class="flex justify-end mb-4">
            <button
              @click="printTranscript(student)"
              class="hover:text-white hover:bg-black border-2 text-black font-medium py-2 px-4 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2-4h6m-6 8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              Save as PDF
            </button>
          </div>

          <div :id="'transcript-' + student.student.user.fullName" class="transcript-content">
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
                <div><span class="font-medium">Nom(s) et prénom(s)/ Name and Surname : </span>{{ student.student.user.fullName }}</div>
                <div><span class="font-medium">Né Le /Born on: </span>{{ student.student.user.dateOfBirth }}</div>
                <div><span class="font-medium">Nationalité /Nationality: </span>{{ student.generalInfo?.nationality }}</div>
                <div><span class="font-medium">Statut / Quality: </span>{{ student.generalInfo?.status }}</div>
              </div>
              <div>
                <div><span class="font-medium">A /at: </span>{{ student.generalInfo?.birthPlace }}</div>
                <div><span class="font-medium">N° Matricule /Registration N°: </span>{{ student.generalInfo?.registrationNumber }}</div>
                <div><span class="font-medium">Filière /Serie: </span>{{ student.academicInfo?.level_list[selectedLevelIndex(student)]?.department }} /{{ student.academicInfo?.level_list[selectedLevelIndex(student)]?.department === 'Journalisme' ? 'Journalism' : student.academicInfo?.level_list[selectedLevelIndex(student)]?.department }}</div>
                <div><span class="font-medium">Année académique/Academic year: </span>{{ student.academicInfo?.level_list[selectedLevelIndex(student)]?.academicYears[0]?.year }}</div>
                <div><span class="font-medium">Niveau/Level: </span>{{ student.academicInfo?.level_list[selectedLevelIndex(student)]?.level }}</div>
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
                <template v-for="(group, groupIndex) in groupedCourses(student)" :key="groupIndex">
                  <tr v-for="course in group.courses" :key="`${student.student.user.fullName}-${course.code}-${course.semester}-${student.academicInfo?.level_list[selectedLevelIndex(student)]?.academicYears[0]?.year}`" class="hover:bg-gray-50 even:bg-gray-100 dark:hover:bg-gray-700 dark:even:bg-gray-750 dark:text-white">
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-left">{{ course.code }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-left">{{ course.title }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center font-medium" :class="getGradeColorClass(course.grade)">
                      {{ course.grade.toFixed(2) }}
                    </td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">{{ course.coefficient }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">{{ course.mention }}</td>
                    <td class="py-1 px-3 border-b border-r dark:border-gray-600 text-sm text-center">{{ course.credits }}</td>
                    <td class="py-1 px-3 border-b dark:border-gray-600 text-sm text-center">{{ course.semester }}</td>
                  </tr>
                </template>
              </tbody>
            </table>

            <div class="mt-6 text-right text-sm text-gray-600 dark:text-gray-300">
              <div>ACMA {{ getCurrentDate() }}</div>
              <div>{{ getCurrentTime() }}</div>
            </div>
          </div>
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
import studentData from '@/data/studentInfo2.json';

export default {
  data() {
    return {
      selectedLevel: "",
      levels: ["1 LICENCE", "2 LICENCE", "3 LICENCE", "1 MASTER", "2 MASTER"],
      students: studentData.students,
      filteredStudents: [],
    };
  },

  mounted() {
    this.updateFilteredStudents();
  },

  methods: {
    updateFilteredStudents() {
      if (!this.selectedLevel) {
        this.filteredStudents = this.students;
      } else {
        this.filteredStudents = this.students.filter(student => {
          return student.student.academicInfo?.level_list?.some(level => level.level === this.selectedLevel);
        });
      }
    },

    filteredStudentCourses(student) {
      if(!this.selectedLevel){
          return student.student.academicInfo?.level_list?.flatMap(level => level.academicYears[0]?.courses) || [];
      }
      const levelData = student.student.academicInfo?.level_list?.find(level => level.level === this.selectedLevel);
      return levelData?.academicYears[0]?.courses || [];
    },

    groupedCourses(student) {
      const courses = this.filteredStudentCourses(student);
      const groups = {};

      courses.forEach(course => {
        const codePrefix = course.code.split('-')[0];
        if (!groups[codePrefix]) {
          groups[codePrefix] = [];
        }
        groups[codePrefix].push(course);
      });

      return Object.keys(groups).map(key => ({
        header: `Module ${key.startsWith("JL") ? "Journalisme" : key.startsWith("CO") ? "Communication" : key.startsWith("DO") ? "Documentation" : "Informatique"} Niveau ${key.substring(2)}`,
        courses: groups[key].sort((a, b) => a.code.localeCompare(b.code))
      }));
    },

    getGradeColorClass(grade) {
      if (grade >= 16) return "text-green-700 font-bold";
      if (grade >= 14) return "text-green-600";
      if (grade >= 12) return "text-blue-600";
      if (grade >= 10) return "text-blue-500";
      return "text-red-500";
    },

    printTranscript(student) {
      const printContent = document.getElementById(`transcript-${student.student.user.fullName}`).innerHTML;
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
      this.updateFilteredStudents();
    },

    getCurrentDate() {
      const date = new Date();
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    },

    getCurrentTime() {
      const date = new Date();
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },

    selectedLevelIndex(student){
        if(!this.selectedLevel){
            return 0;
        }
        return student.student.academicInfo?.level_list?.findIndex(level => level.level === this.selectedLevel)
    },

    calculateAverageGrade(student) {
      const courses = this.filteredStudentCourses(student);
      if (courses.length === 0) return 0;
      const totalGrade = courses.reduce((sum, course) => sum + course.grade, 0);
      return totalGrade / courses.length;
    },

    calculateTotalCredits(student) {
      const courses = this.filteredStudentCourses(student);
      return courses.reduce((sum, course) => sum + course.credits, 0);
    },

    countPassedCourses(student) {
      const courses = this.filteredStudentCourses(student);
      return courses.filter(course => course.grade >= 10).length;
    },

    getOverallStatus(student) {
      const average = this.calculateAverageGrade(student);
      if (average >= 10) return "Passed";
      return "Failed";
    },

    getOverallStatusClass(student) {
      return this.getOverallStatus(student) === "Passed" ? "text-green-600" : "text-red-600";
    },
  }
};
</script>
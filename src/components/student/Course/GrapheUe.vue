<template>
  <div class="graphe-ue-container p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-3xl font-bold text-blue-800 mb-6">Statistique par Unité d'enseignement</h3>
      <div class="h-96">
        <canvas ref="performanceChart"></canvas>
      </div>
    </div>
    <ShowCourses v-if="selectedUe" :selectedUe="selectedUe" />
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import bulletinData from '@/data/studentsInfo.json';
import ShowCourses from '@/components/student/Course/ShowCourses.vue'; 

export default {
  name: 'GrapheUe',
  components: {
    ShowCourses,
  },
  data() {
    return {
      selectedUe: null,
    };
  },
  mounted() {
    this.initChart();
  },
  beforeUnmount() {
    this.destroyChart();
  },
  methods: {
    destroyChart() {
      if (this.performanceChart) {
        this.performanceChart.destroy();
        this.performanceChart = null;
      }
    },
    getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    },
    initChart() {
      this.destroyChart();

      const performanceCtx = this.$refs.performanceChart.getContext('2d');
      const ueList = bulletinData[0].grades.ue_list;
      const labels = ueList.map(ue => ue.cod_ue);
      const data = ueList.map(ue => ue.avg_ue);
      const backgroundColors = labels.map(() => this.getRandomColor());
      const borderColors = backgroundColors.map(color => color.replace('0.7', '1'));

      this.performanceChart = new Chart(performanceCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Moyenne UE',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 20,
              ticks: { stepSize: 2 },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
            x: {
              grid: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `Moyenne UE: ${context.parsed.y}`,
              },
            },
          },
          onClick: (event, chartElements) => {
            if (chartElements && chartElements.length > 0) {
              const clickedIndex = chartElements[0].index;
              this.selectedUe = ueList[clickedIndex];
            }
          },
          onHover: (event, chartElements) => {  // Ajout de la gestion du survol
            if (chartElements && chartElements.length > 0) {
              event.native.target.style.cursor = 'pointer'; 
            } else {
              event.native.target.style.cursor = 'default'; 
            }
          },
        },
      });
    },
  },
};
</script>

<style scoped>
 /* Vos styles CSS personnalisés peuvent être ajoutés ici */
</style>
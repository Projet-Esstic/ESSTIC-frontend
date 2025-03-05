<template>
    <div class="h-screen p-8 overflow-auto">
      <div class="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 animate-fade-in">
        <!-- Progress Stepper -->
        <div class="mb-12 animate-fade-in-delay">
          <div class="flex justify-between items-center relative">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1">
              <!-- Step Circle -->
              <div class="relative z-10 flex-shrink-0">
                <div
                  :class="[
                    'step-indicator group',
                    {
                      'bg-blue-600 text-white shadow-lg shadow-blue-500/30': isStepComplete(index + 1),
                      'bg-primary-600 text-white shadow-lg shadow-primary-500/30': !isStepComplete(index + 1) && currentStep === index + 1,
                      'bg-gray-100 text-gray-400': !isStepComplete(index + 1) && currentStep !== index + 1
                    },
                    'relative flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold transition-all duration-500'
                  ]"
                  @mouseenter="animateStep(index)"
                >
                  <!-- Step Number -->
                  <span :class="[
                    'transition-transform duration-300',
                    {'scale-number': animatedStep === index},
                    {'text-blue-50': isStepComplete(index + 1)}
                  ]">
                    {{ index + 1 }}
                  </span>
  
                  <!-- Success Icon (when step is complete) -->
                  <span
                    v-if="isStepComplete(index + 1)"
                    class="absolute inset-0 flex items-center justify-center text-white animate-success"
                  >
                    <i class="material-icons text-2xl">check</i>
                  </span>
  
                  <!-- Tooltip -->
                  <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <div :class="[
                      'text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap',
                      isStepComplete(index + 1) ? 'bg-blue-700 text-white' : 'bg-gray-800 text-white'
                    ]">
                     Phase {{ step.label }}
                    </div>
                  </div>
                </div>
  
                <!-- Pulse Effect for Current Step -->
                <div
                  v-if="currentStep === index + 1"
                  class="absolute inset-0 z-0"
                >
                  <div class="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
                  <div class="absolute inset-0 rounded-full bg-primary-500 animate-pulse opacity-30"></div>
                </div>
              </div>
  
              <!-- Connection Line -->
              <div v-if="index < steps.length - 1" class="flex-1 mx-4 relative h-1">
                <!-- Background Line -->
                <div class="absolute inset-0 bg-gray-200 rounded-full"></div>
                
                <!-- Progress Line -->
                <div
                  :class="[
                    'absolute h-full rounded-full transition-all duration-1000 ease-out',
                    {
                      'bg-gradient-to-r from-blue-500 to-blue-600': isStepComplete(index + 1),
                      'bg-gradient-to-r from-primary-500 to-primary-600': !isStepComplete(index + 1) && currentStep === index + 1,
                      'bg-gray-200': !isStepComplete(index + 1) && currentStep !== index + 1
                    },
                    isStepComplete(index + 1) ? 'w-full' : 
                    currentStep === index + 1 ? 'w-1/2 animate-progress' : 'w-0'
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Form Steps -->
        <component
          :is="currentStepComponent"
          :formData="formData"
          @next-step="nextStep"
          @previous-step="previousStep"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'; 
  import PersonalInfo from './steps/PersonalInfo.vue';
  import EmploymentDetails from './steps/EmploymentDetails.vue';
  import SalaryInfo from './steps/SalaryInfo.vue';
  // import Documents from './steps/Documents.vue';
  // import PerformanceReviews from './steps/PerformanceReviews.vue';
  // import LeaveHistory from './steps/LeaveHistory.vue';
  // import EmergencyContact from './steps/EmergencyContact.vue';
  // import Education from './steps/Education.vue';
  // import ProfessionalExperience from './steps/ProfessionalExperience.vue';
  // import Certifications from './steps/Certifications.vue';
  // import Skills from './steps/Skills.vue';
  // import Projects from './steps/Projects.vue';
  // import ReviewAndSubmit from './steps/ReviewAndSubmit.vue';
  
  export default {
    components: {
      PersonalInfo,
      EmploymentDetails,
      SalaryInfo,
      // Documents,
      // PerformanceReviews,
      // LeaveHistory,
      // EmergencyContact,
      // Education,
      // ProfessionalExperience,
      // Certifications,
      // Skills,
      // Projects,
      // ReviewAndSubmit
    },
    setup() {
      const currentStep = ref(1);
      const completedSteps = ref([]);
      const animatedStep = ref(null);
  
      const formData = ref({
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        employmentStatus: 'active',
        hireDate: '',
        department: '',
        documents: {
          contract: {},
          idCard: {},
          degreeCertificate: {},
          other: {}
        },
        salary: {
          amount: 0,
          paymentMethod: 'bank',
          paidDate: ''
        },
        performanceReviews: [],
        trainingPrograms: [],
        leaveHistory: [],
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        highSchool: {
          schoolName: '',
          yearCompleted: 0,
          majorSubjects: []
        },
        university: {
          universityName: '',
          degree: '',
          yearCompleted: 0
        },
        professionalExperience: [],
        certifications: [],
        skills: [],
        projects: []
      });
      const updateFormData = (newData) => {
        formData.value = newData;
      };
      const steps = [
        { label: 'Personal Information', component: 'PersonalInfo' },
        { label: 'Employment Details', component: 'EmploymentDetails' },
        { label: 'Salary Information', component: 'SalaryInfo' },
        // { label: 'Documents', component: 'Documents' },
        // { label: 'Performance Reviews', component: 'PerformanceReviews' },
        // { label: 'Leave History', component: 'LeaveHistory' },
        // { label: 'Emergency Contact', component: 'EmergencyContact' },
        // { label: 'Education', component: 'Education' },
        // { label: 'Professional Experience', component: 'ProfessionalExperience' },
        // { label: 'Certifications', component: 'Certifications' },
        // { label: 'Skills', component: 'Skills' },
        // { label: 'Projects', component: 'Projects' },
        // { label: 'Review and Submit', component: 'ReviewAndSubmit' }
      ];
  
      const isStepComplete = (stepNumber) => {
        return completedSteps.value.includes(stepNumber);
      };
  
      const markStepComplete = (stepNumber) => {
        if (!completedSteps.value.includes(stepNumber)) {
          completedSteps.value.push(stepNumber);
        }
      };
  
      const nextStep = () => {
        if (currentStep.value < steps.length) {
          markStepComplete(currentStep.value);
          currentStep.value += 1;
        }
      };
  
      const previousStep = () => {
        if (currentStep.value > 1) {
          currentStep.value -= 1;
        }
      };
  
      const currentStepComponent = computed(() => {
        return steps[currentStep.value - 1].component;
      });
  
      const animateStep = (index) => {
        animatedStep.value = index;
        setTimeout(() => {
          animatedStep.value = null;
        }, 300);
      };
  
      return {
        currentStep,
        completedSteps,
        animatedStep,
        animateStep,
        steps,
        formData,
        updateFormData,
        currentStepComponent,
        isStepComplete,
        nextStep,
        previousStep
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Hero Section -->
    <header class="relative overflow-hidden">
      <nav class="absolute w-full z-50 p-6">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center">
            <img src="@/assets/images/esstic-logo.png" alt="ESSTIC Logo" class="h-16 w-auto"/>
            <h1 class="ml-4 text-2xl font-bold text-blue-900">ESSTIC</h1>
          </div>
        </div>
      </nav>

      <div class="container mx-auto px-6 pt-32 pb-24">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8 animate-fade-in">
            <h1 class="text-5xl font-bold text-gray-900 leading-tight">
              Façonnez votre avenir dans les TIC à l'ESSTIC
            </h1>
            <p class="text-xl text-gray-600">
              École Supérieure des Sciences et Techniques de l'Information et de la Communication
            </p>
            <div class="space-x-4">
              <router-link 
                to="/candidate-registration"
                class="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                S'inscrire au Concours
              </router-link>
              <a href="#learn-more" 
                 class="inline-block px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200">
                En savoir plus
              </a>
            </div>
          </div>
          <div class="relative animate-fade-in-delay">
            <div class="absolute inset-0 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <img src="@/assets/images/esstic-logo.png" alt="ESSTIC Building" class="relative z-10 w-full h-auto rounded-2xl shadow-2xl"/>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section class="py-20 bg-white" id="learn-more">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">Pourquoi choisir l'ESSTIC ?</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div v-for="(feature, index) in features" 
               :key="index"
               class="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <i class="material-icons text-blue-600 text-2xl">{{ feature.icon }}</i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-900 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">Prêt à commencer votre voyage avec l'ESSTIC ?</h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Rejoignez l'une des meilleures écoles de communication et des TIC en Afrique Centrale
        </p>
        <router-link 
          to="/candidate-registration"
          class="inline-block px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          S'inscrire maintenant
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      features: [
        {
          icon: 'school',
          title: 'Excellence Académique',
          description: 'Formation de qualité dispensée par des experts reconnus dans le domaine des TIC.'
        },
        {
          icon: 'business',
          title: 'Perspectives Professionnelles',
          description: 'Partenariats solides avec les entreprises leaders du secteur.'
        },
        {
          icon: 'devices',
          title: 'Infrastructure Moderne',
          description: 'Accès aux dernières technologies et équipements de pointe.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

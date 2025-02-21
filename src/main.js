import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/tailwind.css'

const app = createApp(App)

// Initialize theme on app creation
store.dispatch('initializeTheme')

app.use(router)
app.use(store)
app.mount('#app')

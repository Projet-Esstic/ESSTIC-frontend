import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App)
library.add(faEye, faEdit, faTrash);

app.component('font-awesome-icon', FontAwesomeIcon);


// Initialize theme on app creation
store.dispatch('initializeTheme')

app.use(router)
app.use(store)
app.mount('#app')

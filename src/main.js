import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import '@/assets/main.css';
import 'primeicons/primeicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Create and configure Pinia
const pinia = createPinia()
// Note: If you want to enable persistence, install pinia-plugin-persistedstate:
// npm install pinia-plugin-persistedstate
// Then uncomment the following line:
// pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.use(pinia)
app.use(router);
app.use(Toast);

app.mount('#app');

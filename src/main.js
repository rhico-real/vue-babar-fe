import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import '@/assets/main.css';
import 'primeicons/primeicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueCarousel from 'vue-carousel';

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(router);
app.use(Toast);
app.use(VueCarousel);

app.mount('#app');

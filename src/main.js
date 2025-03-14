import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '@/assets/main.css';
import 'primeicons/primeicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(PrimeVue, {
    zIndex: {
        modal: 1100,        
        overlay: 1000,      
        menu: 1000,        
        tooltip: 1100       
    }
});

app.mount('#app');

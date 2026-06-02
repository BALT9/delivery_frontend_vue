import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

import './style.css'
import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
});
app.use(router)
    .mount('#app')

import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from './router/index.ts'
import { useAuthStore } from './stores/auth.ts'

const app = createApp(App)

// 1. Pinia primero
const pinia = createPinia()
app.use(pinia)

// inicializar auth DESPUÉS de usar pinia
const auth = useAuthStore(pinia)
// auth.init()

// 2. Router
app.use(router)

// 3. PrimeVue
const OrangePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        }
    }
})

app.use(PrimeVue, {
    theme: {
        preset: OrangePreset,
        options: {
            darkModeSelector: false
        }
    }
})

app.mount('#app')
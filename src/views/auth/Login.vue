<script setup lang="ts">
import { onMounted } from 'vue';
import { loginNest } from '../../services/auth.service';
import { ref } from 'vue';
import { isAxiosError } from 'axios';

import { useRouter } from 'vue-router';

import { useAuthStore } from '../../stores/auth';

const auth = useAuthStore()

const credenciales = ref(
    {
        email: "",
        password: ""
    }
)

const errors = ref<any>({});

const router = useRouter();

onMounted(() => {

})

async function login() {
    try {
        const res = await loginNest(
            credenciales.value.email,
            credenciales.value.password
        )

        auth.setAuth(res.data)   // 👈 CLAVE

        const role = res.data.user.role

        if (role === 'ADMIN' || role === 'CUSTOMER') {
            router.push('/dashboard')
        }

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            errors.value = error.response?.data.message
        }
    }
}

</script>

<template>
    <div
        class="md:min-h-[80vh] lg:min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/30 flex flex-col justify-between font-sans text-gray-800">

        <!-- Encabezado / Regresar al Home -->
        <header class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2 cursor-pointer">
                <span class="text-2xl font-black tracking-wider text-orange-550 flex items-center gap-1">
                    <span class="text-orange-500">⚡</span>Flash<span class="text-gray-900">Eat</span>
                </span>
            </div>
            <RouterLink to="/"
                class="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-1">
                <span>←</span> Volver al inicio
            </RouterLink>
        </header>

        <!-- Contenedor Principal (Login) -->
        <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div
                class="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-orange-100/40 border border-gray-100 p-8 sm:p-10 relative overflow-hidden">

                <!-- Detalle decorativo sutil de fondo -->
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full filter blur-2xl opacity-50">
                </div>

                <!-- Encabezado del Formulario -->
                <div class="text-center space-y-2 mb-8 relative z-10">
                    <h2 class="text-3xl font-black text-gray-950 tracking-tight">¡Qué bueno verte!</h2>
                    <p class="text-sm text-gray-500">Ingresa tus datos para empezar a pedir</p>

                    <!-- <pre>
                        {{ JSON.stringify(credenciales, null, 2) }}
                    </pre> -->
                </div>

                <!-- Formulario -->
                <form @submit.prevent class="space-y-5 relative z-10">

                    <!-- Input Correo -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold uppercase tracking-wider text-gray-600 block">Correo
                            Electrónico</label>
                        <div class="relative">
                            <span class="absolute left-4 top-3.5 text-gray-400 text-sm">✉️</span>
                            <input type="email" v-model="credenciales.email" placeholder="tu@ejemplo.com"
                                class="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                                required />
                        </div>
                    </div>

                    <!-- Input Contraseña -->
                    <div class="space-y-1.5">
                        <div class="flex justify-between items-center">
                            <label
                                class="text-xs font-bold uppercase tracking-wider text-gray-600 block">Contraseña</label>
                            <a href="#" class="text-xs font-bold text-orange-500 hover:underline">¿La olvidaste?</a>
                        </div>
                        <div class="relative">
                            <span class="absolute left-4 top-3.5 text-gray-400 text-sm">🔒</span>
                            <input type="password" v-model="credenciales.password" placeholder="••••••••••••"
                                class="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                                required />
                        </div>
                    </div>

                    <!-- Recordarme -->
                    <!-- <div class="flex items-center">
                        <input id="remember-me" type="checkbox"
                            class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 accent-orange-500 cursor-pointer" />
                        <label id="remember-me"
                            class="ml-2 text-xs font-medium text-gray-500 cursor-pointer select-none">
                            Mantener sesión iniciada
                        </label>
                    </div> -->

                    <!-- Botón de Ingreso -->
                    <button type="button" @click="login()"
                        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-lg shadow-orange-500/20 block text-center mt-2">
                        Iniciar Sesión
                    </button>
                </form>

                <!-- Divisor -->
                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-100"></div>
                    </div>
                    <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-white px-3 text-gray-400 font-medium">O continuar con</span>
                    </div>
                </div>

                <!-- Botón de Redes Sociales (Google de ejemplo) -->
                <button
                    class="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <svg class="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#EA4335"
                            d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.72 0 3.29.63 4.51 1.66l2.42-2.42C17.385 1.524 14.94 1 12.24 1c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.523 0 10-4.477 10-10 0-.715-.074-1.412-.21-2.085H12.24z" />
                    </svg>
                    Ingresar con Google
                </button>

                <!-- Registro -->
                <p class="text-center text-xs text-gray-500 mt-8">
                    ¿No tienes una cuenta?
                    <a href="#" class="text-orange-500 font-bold hover:underline">Regístrate gratis</a>
                </p>

            </div>
        </main>

        <!-- Footer minimalista -->
        <footer class="py-3 text-center text-xs text-gray-400 border-t border-gray-100 bg-white">
            © 2026 FlashEat Delivery. Todos los derechos reservados.
        </footer>

    </div>
</template>
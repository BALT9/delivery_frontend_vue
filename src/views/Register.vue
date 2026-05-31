<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
    name: '',
    email: '',
    password: ''
})

const handleRegister = () => {
    // Aquí manejas el envío de datos a tu API
    console.log('Datos enviados:', formData.value)
}
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/30 flex flex-col justify-between font-sans text-gray-800">

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

        <!-- Contenedor Principal (Register) -->
        <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div
                class="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-orange-100/40 border border-gray-100 p-8 sm:p-10 relative overflow-hidden">

                <!-- Detalle decorativo sutil de fondo -->
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full filter blur-2xl opacity-50">
                </div>

                <!-- Encabezado del Formulario -->
                <div class="text-center space-y-2 mb-8 relative z-10">
                    <h2 class="text-3xl font-black text-gray-950 tracking-tight">Crea tu cuenta</h2>
                    <p class="text-sm text-gray-500">Regístrate para empezar a disfrutar del mejor delivery</p>
                </div>

                <!-- Formulario -->
                <form @submit.prevent="handleRegister" class="space-y-5 relative z-10">

                    <!-- Input Nombre (name) -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold uppercase tracking-wider text-gray-600 block">Nombre
                            Completo</label>
                        <div class="relative">
                            <span class="absolute left-4 top-3.5 text-gray-400 text-sm">👤</span>
                            <input v-model="formData.name" type="text" placeholder="Juan Perez"
                                class="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                                required />
                        </div>
                    </div>

                    <!-- Input Correo (email) -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold uppercase tracking-wider text-gray-600 block">Correo
                            Electrónico</label>
                        <div class="relative">
                            <span class="absolute left-4 top-3.5 text-gray-400 text-sm">✉️</span>
                            <input v-model="formData.email" type="email" placeholder="juan@gmail.com"
                                class="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                                required />
                        </div>
                    </div>

                    <!-- Input Contraseña (password) -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold uppercase tracking-wider text-gray-600 block">Contraseña</label>
                        <div class="relative">
                            <span class="absolute left-4 top-3.5 text-gray-400 text-sm">🔒</span>
                            <input v-model="formData.password" type="password" placeholder="••••••"
                                class="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                                required />
                        </div>
                    </div>

                    <!-- Términos y Condiciones sutiles -->
                    <p class="text-[11px] text-gray-400 text-center px-4 leading-relaxed">
                        Al registrarte, aceptas nuestros Términos de Servicio y Políticas de Privacidad.
                    </p>

                    <!-- Botón de Registro -->
                    <button type="submit"
                        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-lg shadow-orange-500/20 block text-center mt-2">
                        Crear Cuenta
                    </button>
                </form>

                <!-- Divisor -->
                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-100"></div>
                    </div>
                    <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-white px-3 text-gray-400 font-medium">O</span>
                    </div>
                </div>

                <!-- Ya tengo cuenta -->
                <p class="text-center text-xs text-gray-500">
                    ¿Ya tienes una cuenta?
                    <a href="#" class="text-orange-500 font-bold hover:underline">Inicia Sesión</a>
                </p>

            </div>
        </main>

        <!-- Footer -->
        <footer class="py-6 text-center text-xs text-gray-400 border-t border-gray-100 bg-white">
            © 2026 FlashEat Delivery. Todos los derechos reservados.
        </footer>

    </div>
</template>
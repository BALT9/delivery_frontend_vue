<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
    <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">

        <header class="sticky top-0 z-50 bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="text-2xl font-black tracking-wider text-orange-550 flex items-center gap-1">
                        <span class="text-orange-500">⚡</span>Flash<span class="text-gray-900">Eat</span>
                    </span>
                </div>

                <div class="hidden md:flex flex-1 max-w-md mx-8">
                    <div class="relative w-full">
                        <input type="text" placeholder="¿Qué se te antoja hoy?..."
                            class="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                        <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <button class="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
                        <span class="text-xl">🛒</span>
                        <span
                            class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
                    </button>
                    <RouterLink to="/register"
                        class="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-500 transition-colors shadow-sm">
                        Registrate
                    </RouterLink>

                    <RouterLink to="/login"
                        class="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-500 transition-colors shadow-sm">
                        Iniciar Sesión
                    </RouterLink>
                </div>
            </div>
        </header>

        <section class="relative bg-gradient-to-br from-orange-50 to-orange-100/50 py-12 md:py-20 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">

                <div class="space-y-6 text-center md:text-left z-10">
                    <span
                        class="inline-block bg-orange-200/60 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        🚀 Delivery gratis en tu primer pedido
                    </span>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 leading-tight">
                        Tu comida favorita, <br>
                        <span class="text-orange-500">caliente y a domicilio.</span>
                    </h1>
                    <p class="text-gray-600 text-base sm:text-lg max-w-md mx-auto md:mx-0">
                        Los mejores restaurantes de la ciudad directo a tu puerta en menos de 30 minutos. ¿Hacemos el
                        pedido?
                    </p>

                    <div
                        class="p-2 bg-white rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row gap-2 max-w-xl">
                        <div class="flex items-center gap-2 flex-1 px-3 py-2">
                            <span class="text-orange-500">📍</span>
                            <input type="text" placeholder="Ingresa tu dirección de entrega..."
                                class="w-full text-sm focus:outline-none bg-transparent" />
                        </div>
                        <button
                            class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl md:rounded-full text-sm transition-colors shadow-md shadow-orange-500/20 whitespace-nowrap">
                            Buscar Comida
                        </button>
                    </div>
                </div>

                <div class="relative flex justify-center items-center">
                    <div
                        class="absolute w-72 h-72 sm:w-96 sm:h-96 bg-orange-300 rounded-full filter blur-3xl opacity-30 animate-pulse">
                    </div>
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                        alt="Delicious Food"
                        class="rounded-3xl shadow-2xl object-cover w-full max-w-md aspect-[4/3] transform hover:scale-105 transition-transform duration-300" />
                </div>
            </div>
        </section>

        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 class="text-2xl font-extrabold text-gray-900 mb-6">Explora por categorías</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">

                <div
                    class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer group transition-all hover:-translate-y-1">
                    <div
                        class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:bg-orange-500 transition-colors">
                        🍔
                    </div>
                    <span class="font-bold text-sm text-gray-700 block">Hamburguesas</span>
                </div>

                <div
                    class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer group transition-all hover:-translate-y-1">
                    <div
                        class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:bg-orange-500 transition-colors">
                        🍕
                    </div>
                    <span class="font-bold text-sm text-gray-700 block">Pizzas</span>
                </div>

                <div
                    class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer group transition-all hover:-translate-y-1">
                    <div
                        class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:bg-orange-500 transition-colors">
                        🍣
                    </div>
                    <span class="font-bold text-sm text-gray-700 block">Sushi</span>
                </div>

                <div
                    class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer group transition-all hover:-translate-y-1">
                    <div
                        class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:bg-orange-500 transition-colors">
                        🌮
                    </div>
                    <span class="font-bold text-sm text-gray-700 block">Tacos</span>
                </div>

                <div
                    class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer group transition-all hover:-translate-y-1">
                    <div
                        class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:bg-orange-500 transition-colors">
                        🍦
                    </div>
                    <span class="font-bold text-sm text-gray-700 block">Postres</span>
                </div>

                <div
                    class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer group transition-all hover:-translate-y-1">
                    <div
                        class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:bg-orange-500 transition-colors">
                        🥗
                    </div>
                    <span class="font-bold text-sm text-gray-700 block">Saludable</span>
                </div>

            </div>
        </section>


        <footer class="bg-gray-900 text-gray-400 py-12 mt-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="col-span-2 md:col-span-1 space-y-3">
                    <span class="text-xl font-black tracking-wider text-white">⚡FlashEat</span>
                    <p class="text-xs">Llevando felicidad y buen sabor a tu mesa todos los días de la semana.</p>
                </div>
                <div>
                    <h4 class="text-white font-bold text-sm mb-3">Descubrir</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="#" class="hover:text-white transition-colors">Restaurantes cercanos</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Ofertas exclusivas</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Platos populares</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold text-sm mb-3">Soporte</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="#" class="hover:text-white transition-colors">Centro de ayuda</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Devoluciones</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Contáctanos</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold text-sm mb-3">Únete a nosotros</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="#"
                                class="hover:text-white transition-colors font-semibold text-orange-400">Registra tu
                                Restaurante</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Sé parte del Delivery Club</a></li>
                    </ul>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center text-xs">
                © 2026 FlashEat Delivery. Todos los derechos reservados.
            </div>
        </footer>

    </div>
</template>
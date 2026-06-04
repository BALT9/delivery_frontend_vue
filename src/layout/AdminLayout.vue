<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Divider from 'primevue/divider';
import Button from 'primevue/button';

import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const isSidebarOpen = ref(false);

const auth = useAuthStore()

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// Estructura de navegación profesional
const items = computed(() => {
    const role = auth.user?.role

    if (role === 'ADMIN') {
        return [
            {
                label: 'Principal',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-chart-line',
                        to: '/dashboard'
                    }
                ]
            },
            {
                label: 'Gestión',
                items: [
                    {
                        label: 'Productos',
                        icon: 'pi pi-box',
                        to: '/dashboard/products'
                    },
                    {
                        label: 'Pedidos',
                        icon: 'pi pi-shopping-bag',
                        to: '/dashboard/orders'
                    },
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-box',
                        to: '/dashboard/users'
                    },
                ]
            }
        ]
    }

    if (role === 'CUSTOMER') {
        return [
            {
                label: 'Principal',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-chart-line',
                        to: '/dashboard'
                    }
                ]
            },
            {
                label: 'Tienda',
                items: [
                    {
                        label: 'Productos',
                        icon: 'pi pi-shopping-cart',
                        to: '/dashboard/products'
                    },
                    {
                        label: 'Mis pedidos',
                        icon: 'pi pi-list',
                        to: '/dashboard/my-orders'
                    }
                ]
            }
        ]
    }

    return []
})


</script>

<template>
    <div class="flex h-screen bg-zinc-50 text-zinc-900 font-sans overflow-hidden relative">

        <!-- OVERLAY PARA MÓVILES (Cierra el sidebar al hacer click fuera) -->
        <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
            class="fixed inset-0 bg-zinc-950/40 z-40 lg:hidden transition-opacity duration-300"></div>

        <!-- SIDEBAR (Escritorio estático / Móvil flotante) -->
        <aside
            class="w-72 bg-zinc-900 text-zinc-300 flex flex-col border-r border-zinc-800 shrink-0 shadow-xl fixed inset-y-0 left-0 z-50 transform lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out"
            :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">

            <!-- Header Sidebar -->
            <div class="h-20 flex items-center justify-between px-6 border-b border-zinc-800/50">
                <div class="flex items-center gap-3">
                    <div class="bg-indigo-600 p-2 rounded">
                        <i class="pi pi-shield text-white text-xl"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold tracking-widest text-white uppercase">FlashEat</span>
                        <span class="text-[10px] text-zinc-500 font-medium tracking-tight">SISTEMA DE GESTIÓN</span>
                    </div>
                </div>
                <!-- Botón cerrar solo visible en móvil -->
                <Button icon="pi pi-times" severity="secondary" text rounded class="lg:hidden !text-zinc-400"
                    @click="isSidebarOpen = false" />
            </div>

            <!-- Menú de Navegación -->
            <div class="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
                <div v-for="section in items" :key="section.label" class="mb-6">
                    <h3 class="px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-[2px] mb-2">
                        {{ section.label }}
                    </h3>

                    <div class="space-y-1">
                        <router-link v-for="item in section.items" :key="item.label" :to="item.to"
                            v-slot="{ isExactActive }">
                            <div class="flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative"
                                :class="[
                                    isExactActive
                                        ? 'bg-indigo-600/10 text-indigo-400'
                                        : 'hover:bg-orange-500/10 text-zinc-400 hover:text-orange-400'
                                ]" @click="isSidebarOpen = false">

                                <div v-if="isExactActive"
                                    class="absolute left-[-16px] w-1 h-5 bg-indigo-500 rounded-r-full"></div>

                                <i :class="item.icon" class="text-sm"></i>
                                <span class="text-sm font-medium">{{ item.label }}</span>

                                <Badge v-if="item.badge" :value="item.badge"
                                    class="ml-auto !text-[10px] transition-colors" :class="[
                                        isExactActive
                                            ? '!bg-indigo-600 !text-white'
                                            : '!bg-zinc-800 !text-zinc-400 group-hover:!bg-orange-500/20 group-hover:!text-orange-400'
                                    ]" />
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Footer Sidebar -->
            <div class="p-4 border-t border-zinc-800 bg-zinc-900/20">
                <div class="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-[10px] text-zinc-500 font-bold uppercase">Estado</span>
                        <div class="flex items-center gap-1.5">
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            <span class="text-[10px] text-emerald-500 font-medium">Operativo</span>
                        </div>
                    </div>
                    <div class="text-[10px] text-zinc-600">
                        ID Instancia: FE-2026-AD
                    </div>
                </div>
            </div>
        </aside>

        <!-- CONTENEDOR DE CONTENIDO PRINCIPAL -->
        <div class="flex-1 flex flex-col min-w-0 w-full">

            <!-- HEADER / TOPBAR (Adaptado para móviles) -->
            <header
                class="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-8 z-10 shrink-0">

                <div class="flex items-center gap-2 sm:gap-4 flex-1">
                    <!-- Botón Hamburguesa (Solo móvil) -->
                    <Button icon="pi pi-bars" severity="secondary" text rounded class="lg:hidden !text-zinc-600"
                        @click="toggleSidebar" />

                    <!-- Buscador (Oculto en móviles muy pequeños para no romper la UI) -->
                    <div class="hidden xs:flex items-center gap-3 flex-1 max-w-xs md:max-w-sm">
                        <span class="text-zinc-400"><i class="pi pi-search"></i></span>
                        <input type="text" placeholder="Buscar..."
                            class="text-sm border-none focus:ring-0 w-full placeholder:text-zinc-400 bg-transparent">
                    </div>
                </div>

                <!-- Acciones del lado derecho -->
                <div class="flex items-center gap-2 sm:gap-4">
                    <Button icon="pi pi-bell" severity="secondary" text rounded aria-label="Notifications"
                        class="relative !w-10 !h-10">
                        <template #default>
                            <i class="pi pi-bell text-zinc-600"></i>
                            <span
                                class="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </template>
                    </Button>

                    <Divider layout="vertical" class="mx-0 h-8" />

                    <!-- Bloque de Usuario -->
                    <div class="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2">
                        <div class="text-right hidden md:block">
                            <p class="text-xs font-bold text-zinc-900 leading-none">
                                {{ auth.user?.name }}
                            </p>

                            <p class="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">
                                {{ auth.user?.role }}
                            </p>
                        </div>
                        <Avatar label="CR" class="!bg-zinc-900 !text-white !text-xs !w-8 !h-8 sm:!w-9 sm:!h-9"
                            shape="circle" size="normal" />
                    </div>
                </div>
            </header>

            <!-- ZONA DE CONTENIDO DINÁMICO -->
            <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-zinc-50/50">
                <router-view />
            </main>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #27272a;
    border-radius: 10px;
}

/* Soporte para breakpoint extra pequeño opcional si no usas librerías extendidas */
@media (max-width: 380px) {
    .xs\:hidden {
        display: none;
    }
}
</style>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Divider from 'primevue/divider';
import Button from 'primevue/button';

const route = useRoute();

// Estructura de navegación profesional
const items = ref([
    {
        label: 'Principal',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-chart-line',
                to: '/admin'
            },
            {
                label: 'Análisis',
                icon: 'pi pi-compass',
                to: '/admin/analytics'
            }
        ]
    },
    {
        label: 'Gestión',
        items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-users',
                to: '/admin/users',
                badge: 120
            },
            {
                label: 'Configuración',
                icon: 'pi pi-cog',
                to: '/admin/settings'
            }
        ]
    }
]);
</script>

<template>
    <div class="flex h-screen bg-zinc-50 text-zinc-900 font-sans overflow-hidden">

        <aside class="w-72 bg-zinc-900 text-zinc-300 flex flex-col border-r border-zinc-800 shrink-0 shadow-xl">

            <div class="h-20 flex items-center px-6 border-b border-zinc-800/50">
                <div class="flex items-center gap-3">
                    <div class="bg-indigo-600 p-2 rounded">
                        <i class="pi pi-shield text-white text-xl"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold tracking-widest text-white uppercase">FlashEat</span>
                        <span class="text-[10px] text-zinc-500 font-medium tracking-tight">SISTEMA DE GESTIÓN</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
                <div v-for="section in items" :key="section.label" class="mb-6">
                    <h3 class="px-3 text-[15px] font-semibold text-white-500 uppercase tracking-[2px] mb-2">
                        {{ section.label }}
                    </h3>

                    <div class="space-y-1">
                        <router-link v-for="item in section.items" :key="item.label" :to="item.to"
                            v-slot="{ isExactActive }">
                            <div class="flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative"
                                :class="[isExactActive ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100']">
                                <div v-if="isExactActive"
                                    class="absolute left-[-16px] w-1 h-5 bg-indigo-500 rounded-r-full"></div>

                                <i :class="item.icon" class="text-sm"></i>
                                <span class="text-sm font-medium">{{ item.label }}</span>

                                <Badge v-if="item.badge" :value="item.badge"
                                    class="ml-auto !bg-zinc-800 !text-zinc-400 !text-[10px]"
                                    :class="{ '!bg-indigo-600 !text-white': isExactActive }" />
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

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
                        ID Instancia: FE-2024-AD
                    </div>
                </div>
            </div>
        </aside>

        <div class="flex-1 flex flex-col min-w-0">

            <header class="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 z-10">
                <div class="flex items-center gap-4">
                    <span class="text-zinc-400"><i class="pi pi-search"></i></span>
                    <input type="text" placeholder="Buscar reporte o usuario..."
                        class="text-sm border-none focus:ring-0 w-64 placeholder:text-zinc-400">
                </div>

                <div class="flex items-center gap-4">
                    <Button icon="pi pi-bell" severity="secondary" text rounded aria-label="Notifications"
                        class="relative">
                        <template #default>
                            <i class="pi pi-bell text-zinc-600"></i>
                            <span
                                class="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </template>
                    </Button>

                    <Divider layout="vertical" class="mx-0 h-8" />

                    <div class="flex items-center gap-3 pl-2">
                        <div class="text-right hidden sm:block">
                            <p class="text-xs font-bold text-zinc-900 leading-none">Carlos Rodriguez</p>
                            <p class="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">Administrador Root</p>
                        </div>
                        <Avatar label="CR" class="!bg-zinc-900 !text-white !text-xs" shape="circle" size="normal" />
                    </div>
                </div>
            </header>

            <main class="flex-1 p-8 overflow-y-auto bg-zinc-50/50">
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
</style>
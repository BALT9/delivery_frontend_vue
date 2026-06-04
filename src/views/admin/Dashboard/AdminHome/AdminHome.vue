<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout, profile } from '../../../../services/auth.service';
import { useAuthStore } from '../../../../stores/auth';

// Componentes de PrimeVue
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Skeleton from 'primevue/skeleton';

const auth = useAuthStore();
const router = useRouter();
const miPerfil = ref<any>(null);
const loading = ref(true);

async function CerrarSesion() {
    await logout();
    auth.logout();
    router.push('/login');
}

async function getProfile() {
    try {
        loading.value = true;
        const perfil = await profile();
        miPerfil.value = perfil.data;
    } catch (error) {
        console.error("Error al obtener perfil", error);
    } finally {
        loading.value = false;
    }
}

// Métricas de negocio limpias usando los colores de acento de tu app
const metrics = ref([
    { title: 'Pedidos de Hoy', value: '42', icon: 'pi pi-shopping-bag', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Ingresos del Mes', value: '$1,240.50', icon: 'pi pi-money-bill', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Tiempo Promedio', value: '24 min', icon: 'pi pi-clock', color: 'text-indigo-500', bg: 'bg-indigo-50' },
]);

onMounted(() => {
    getProfile();
});
</script>

<template>
    <div class="space-y-6">

        <!-- BIENVENIDA -->
        <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200">

            <div class="flex items-center gap-4">

                <Skeleton v-if="loading" shape="circle" size="4rem" />

                <div v-else
                    class="w-16 h-16 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-xl font-bold">
                    {{ miPerfil?.name?.substring(0, 2).toUpperCase() || 'AD' }}
                </div>

                <div class="space-y-1">

                    <h2 class="text-xl sm:text-2xl font-bold text-zinc-900">
                        <span v-if="loading">
                            <Skeleton width="180px" height="2rem" />
                        </span>

                        <span v-else>
                            ¡Hola de nuevo, {{ miPerfil?.name || 'Administrador' }}!
                        </span>
                    </h2>

                    <div class="flex items-center gap-2 flex-wrap">

                        <span v-if="loading">
                            <Skeleton width="100px" />
                        </span>

                        <span v-else class="text-xs text-zinc-500">
                            {{ miPerfil?.email }}
                        </span>

                        <Tag v-if="!loading" :value="miPerfil?.role || 'Root'"  />
                    </div>
                </div>
            </div>

            <Button label="Cerrar Sesión" icon="pi pi-sign-out" iconPos="right"
                @click="CerrarSesion" />
        </div>

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <Card v-for="(metric, index) in metrics" :key="index">

                <template #content>

                    <div class="flex items-center justify-between">

                        <div class="space-y-1">
                            <span class="text-xs font-semibold text-zinc-400 uppercase block">
                                {{ metric.title }}
                            </span>

                            <span class="text-2xl font-bold text-zinc-900">
                                {{ metric.value }}
                            </span>
                        </div>

                        <div class="p-3 rounded-xl flex items-center justify-center text-xl"
                            :class="[metric.bg, metric.color]">

                            <i :class="metric.icon"></i>
                        </div>

                    </div>

                </template>

            </Card>

        </div>

        <!-- CUERPO PRINCIPAL -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- CUENTA -->
            <Card class="lg:col-span-1">

                <template #title>
                    <span class="text-xs font-bold text-zinc-400 uppercase">
                        Datos de Cuenta
                    </span>
                </template>

                <template #content>

                    <div class="space-y-4">

                        <div v-if="loading" class="space-y-3">
                            <Skeleton width="100%" height="2.5rem" />
                            <Skeleton width="100%" height="2.5rem" />
                        </div>

                        <div v-else class="space-y-4">

                            <div class="border-b border-zinc-100 pb-3">
                                <span class="text-[10px] font-bold text-zinc-400 uppercase block mb-1">
                                    ID de Usuario
                                </span>
                                <span class="text-sm font-mono text-zinc-600 select-all">
                                    {{ miPerfil?.id || 'N/A' }}
                                </span>
                            </div>

                            <div class="border-b border-zinc-100 pb-3">
                                <span class="text-[10px] font-bold text-zinc-400 uppercase block mb-1">
                                    Fecha de Registro
                                </span>

                                <span class="text-sm text-zinc-600">
                                    {{ miPerfil?.createdAt
                                        ? new Date(miPerfil.createdAt).toLocaleDateString()
                                        : '—'
                                    }}
                                </span>
                            </div>

                        </div>

                    </div>

                </template>

            </Card>

            <!-- PANEL OPERATIVO -->
            <Card class="lg:col-span-2">

                <template #title>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-zinc-400 uppercase">
                            Monitoreo de Operaciones
                        </span>
                        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    </div>
                </template>

                <template #content>

                    <div class="flex flex-col items-center justify-center text-center py-12 px-4">

                        <div
                            class="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-3 border border-zinc-100">
                            <i class="pi pi-chart-bar text-zinc-400"></i>
                        </div>

                        <h4 class="text-sm font-bold text-zinc-700 mb-1">
                            Todo listo para gestionar la plataforma
                        </h4>

                        <p class="text-xs text-zinc-400 max-w-sm">
                            Utiliza la barra de navegación lateral para gestionar usuarios, reportes y configuraciones.
                        </p>

                    </div>

                </template>

            </Card>

        </div>

    </div>
</template>

<style scoped>
/* Reseteos mínimos para amalgamar márgenes con Tailwind sin pisar tus colores configurados */
:deep(.p-card-body) {
    padding: 1.5rem !important;
}

:deep(.p-card-title) {
    margin-bottom: 0px !important;
}
</style>
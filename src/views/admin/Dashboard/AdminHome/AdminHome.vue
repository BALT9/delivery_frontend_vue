<script setup lang="ts">
import { Button, Column, DataTable } from 'primevue';
import { ref } from 'vue';
import { logout } from '../../../../services/auth.service';

import { useRouter } from 'vue-router';

import { useAuthStore } from '../../../../stores/auth';

const auth = useAuthStore()

const router = useRouter();

async function CerrarSesion() {
    await logout()
    auth.logout()
    router.push('/login')
}


const products = ref([{
    name: "pepe",
    
}])

</script>

<template>
    <div>
        <h2 class="text-2xl font-bold">Dashboard</h2>

        <!-- <div class="mt-4 grid grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded shadow">Homepage Dashboard</div>
        </div> -->
        

        <Button label="Cerrar Sesion" @click="CerrarSesion()" />
    </div>
</template>
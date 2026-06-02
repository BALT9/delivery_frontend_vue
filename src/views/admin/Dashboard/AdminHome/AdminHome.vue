<script setup lang="ts">
import { Column, DataTable } from 'primevue';
import { ref } from 'vue';


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
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <!-- <Column field="code" header="Code"></Column> -->
            <Column field="name" header="Name"></Column>
            <!-- <Column field="category" header="Category"></Column> -->
            <!-- <Column field="quantity" header="Quantity"></Column> -->
        </DataTable>
    </div>
</template>
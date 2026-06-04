<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

import type { ProductInterface } from '../../../../interface/Product.interface'
import productsService from '../../../../services/products.service'
import { useAuthStore } from '../../../../stores/auth'

const auth = useAuthStore()

const productos = ref<ProductInterface[]>([])
const loading = ref(false)

async function listarProductos() {
    try {
        loading.value = true

        const res = await productsService.index()

        console.log(res.data)

        productos.value = res.data.data
    } catch (error) {
        console.error('Error al listar productos', error)
    } finally {
        loading.value = false
    }
}

function editarProducto(producto: ProductInterface) {
    console.log('Editar', producto)
}

function eliminarProducto(producto: ProductInterface) {
    console.log('Eliminar', producto)
}

function agregarAlCarrito(producto: ProductInterface) {
    console.log('Agregar al carrito', producto)
}

onMounted(() => {
    listarProductos()
})
</script>

<template>
    <div class="space-y-6">

        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">
                Productos
            </h1>

            <Button v-if="auth.isAdmin" label="Nuevo Producto" icon="pi pi-plus" />
        </div>

        <div v-if="productos.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card v-for="producto in productos" :key="producto.id">
                <template #header>
                    <img :src="producto.image" :alt="producto.name" class="w-full h-52 object-cover" />
                </template>

                <template #title>
                    {{ producto.name }}
                </template>

                <template #subtitle>
                    <div class="flex items-center justify-between">
                        <span>
                            Stock: {{ producto.stock }}
                        </span>

                        <Tag :value="producto.is_available ? 'Disponible' : 'Agotado'"
                            :severity="producto.is_available ? 'success' : 'danger'" />
                    </div>
                </template>

                <template #content>
                    <p class="text-sm text-gray-600 mb-4">
                        {{ producto.description }}
                    </p>

                    <div class="text-xl font-bold">
                        Bs. {{ producto.price }}
                    </div>
                </template>

                <template #footer>
                    <div class="flex gap-2">

                        <!-- ADMIN -->
                        <template v-if="auth.isAdmin">

                            <Button icon="pi pi-pencil" label="Editar" severity="info" outlined class="w-full"
                                @click="editarProducto(producto)" />

                            <Button icon="pi pi-trash" label="Eliminar" severity="danger" outlined class="w-full"
                                @click="eliminarProducto(producto)" />

                        </template>

                        <!-- CUSTOMER -->
                        <template v-else-if="auth.isCustomer">

                            <Button icon="pi pi-shopping-cart" label="Agregar al carrito" severity="success"
                                class="w-full" :disabled="!producto.is_available" @click="agregarAlCarrito(producto)" />

                        </template>

                    </div>
                </template>
            </Card>
        </div>

        <div v-else-if="!loading" class="text-center py-10 text-gray-500">
            No hay productos disponibles.
        </div>

    </div>
</template>
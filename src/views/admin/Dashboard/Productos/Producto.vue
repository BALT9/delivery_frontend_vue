<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

import type { ProductInterface } from '../../../../interface/Product.interface'
import productsService from '../../../../services/products.service'
import { useAuthStore } from '../../../../stores/auth'
import { Checkbox, Dialog, IconField, InputIcon, InputNumber, InputText, Paginator } from 'primevue'

const auth = useAuthStore()

const visible = ref<boolean>(false);

const productos = ref<ProductInterface[]>([])
const loading = ref(false)

const productDataBlank = {
    name: '',
    description: '',
    price: 0,
    image: '',
    stock: 0,
    is_available: false
}

const product = ref<ProductInterface>({
    ...productDataBlank
});

// paginacion 
const page = ref(1)
const total = ref(0)
const rows = ref(10)
const first = ref(0)
const search = ref('')

async function listarProductos() {
    try {
        loading.value = true

        const res = await productsService.index(page.value, rows.value, search.value)

        productos.value = res.data.data
        page.value = res.data.page
        total.value = res.data.total
    } catch (error) {
        console.error('Error al listar productos', error)
    } finally {
        loading.value = false
    }
}

function editarProducto(producto: ProductInterface) {
    visible.value = true;
    product.value = producto;
}

function eliminarProducto(producto: ProductInterface) {
    console.log('Eliminar', producto)
}

function agregarAlCarrito(producto: ProductInterface) {
    console.log('Agregar al carrito', producto)
}

function onPageChange(event: any) {
    page.value = event.page + 1   // PrimeVue usa base 0
    rows.value = event.rows
    first.value = event.first

    listarProductos()
}

async function crearProducto() {
    try {
        if (product.value.id) {
            const payload: any = {
                name: product.value.name,
                description: product.value.description,
                price: Number(product.value.price),
                image: product.value.image,
                stock: product.value.stock,
                is_available: product.value.is_available
            }

            const res = await productsService.update(product.value.id, payload);
            console.log(res);
            listarProductos();
            visible.value = false;
            product.value = { ...productDataBlank };

        } else {
            const res = await productsService.store(product.value);
            console.log(res);
            listarProductos();
            visible.value = false;
            product.value = { ...productDataBlank };
        }
    } catch (error) {

    }
}

onMounted(() => {
    listarProductos()
})

function onSearchEnter() {
    page.value = 1
    first.value = 0
    listarProductos()
}

// function clearFilter() {
//     search.value = ''
//     page.value = 1
//     listarProductos()
// }

</script>

<template>
    <div class="space-y-6">

        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">
                Productos
            </h1>

            <Button v-if="auth.isAdmin" @click="visible = true" label="Nuevo Producto" icon="pi pi-plus" />
        </div>
        <div class="flex justify-between items-center mb-4">
            <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter" /> -->

            <span class="p-input-icon-left">
                <!-- <i class="pi pi-search" /> -->
                <InputText v-model="search" placeholder="Buscar productos..." @keydown.enter="onSearchEnter" />
            </span>
        </div>

        <Dialog v-model:visible="visible" modal header="Producto" :style="{ width: '30rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">
                Ingresa la información del producto.
            </span>

            <div class="flex items-center gap-4 mb-4">
                <label for="name" class="font-semibold w-24">Nombre</label>
                <InputText id="name" v-model="product.name" class="flex-auto" autocomplete="off" />
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label for="description" class="font-semibold w-24">Descripción</label>
                <InputText id="description" v-model="product.description" class="flex-auto" autocomplete="off" />
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label for="price" class="font-semibold w-24">Precio</label>
                <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" />
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label for="stock" class="font-semibold w-24">Stock</label>
                <InputNumber id="stock" v-model="product.stock" class="flex-auto" />
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label for="image" class="font-semibold w-24">Imagen</label>
                <InputText id="image" v-model="product.image" class="flex-auto" placeholder="URL de la imagen" />
            </div>

            <div class="flex items-center gap-4 mb-8">
                <label for="available" class="font-semibold w-24">Disponible</label>
                <Checkbox id="available" v-model="product.is_available" binary />
            </div>

            {{ product }}

            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false" />

                <Button type="button" label="Crear" @click="crearProducto()" />
            </div>
        </Dialog>

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

        <Paginator v-model:first="first" :rows="rows" :totalRecords="total" :rowsPerPageOptions="[2, 10, 20, 30]"
            @page="onPageChange"></Paginator>

    </div>
</template>
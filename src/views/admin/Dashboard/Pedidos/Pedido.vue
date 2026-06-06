<script setup lang="ts">

type OrderItem = {
    productId: string
    name: string
    price: number
    quantity: number
}

import { onMounted, ref } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'

import ordersService from '../../../../services/orders.service'
import { useAuthStore } from '../../../../stores/auth'
import usersService from '../../../../services/users.service'
import productsService from '../../../../services/products.service'

import type { ProductInterface } from '../../../../interface/Product.interface'

const auth = useAuthStore()

const orders = ref([])
const loading = ref(false)

const toast = useToast()

const visible = ref(false);

// clientes (solo admin)
const products = ref<ProductInterface[]>([])
const orderItems = ref<OrderItem[]>([])
const selectedProduct = ref<string | null>(null)
const quantity = ref<number>(1)

const customers = ref([])
const selectedCustomer = ref(null)


const statuses = [
    { label: 'Pendiente', value: 'PENDING' },
    { label: 'Preparando', value: 'PREPARING' },
    { label: 'En camino', value: 'ON_THE_WAY' },
    { label: 'Entregado', value: 'DELIVERED' },
    { label: 'Cancelado', value: 'CANCELLED' }
]

async function listarPedidos() {
    try {
        loading.value = true

        const res = auth.isAdmin
            ? await ordersService.index()
            : await ordersService.myOrders()

        orders.value = res.data

    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

async function cambiarEstado(order: any, status: string) {
    try {

        await ordersService.updateStatus(
            order.id,
            status
        )

        toast.add({
            severity: 'success',
            summary: 'Pedido actualizado',
            detail: `Estado cambiado a ${status}`,
            life: 3000
        })

        await listarPedidos()

    } catch (error) {

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el estado',
            life: 3000
        })

        console.error(error)
    }
}

function getStatusSeverity(status: string) {
    switch (status) {
        case 'PENDING':
            return 'warn'

        case 'PREPARING':
            return 'info'

        case 'ON_THE_WAY':
            return 'contrast'

        case 'DELIVERED':
            return 'success'

        case 'CANCELLED':
            return 'danger'

        default:
            return 'secondary'
    }
}

async function cargarDatos() {
    // clientes (solo admin)
    if (auth.isAdmin) {
        const resUsers = await usersService.index();
        customers.value = resUsers.data;
    }

    // productos
    const resProducts = await productsService.index();
    products.value = resProducts.data.data;
}

function agregarProducto() {
    const product = products.value.find(
        (p) => p.id === selectedProduct.value
    )

    if (!product) return

    const existing = orderItems.value.find(
        (i) => i.productId === product.id
    )

    if (existing) {
        existing.quantity += quantity.value
    } else {
        orderItems.value.push({
            productId: product.id!,
            name: product.name,
            price: Number(product.price),
            quantity: quantity.value
        })
    }

    selectedProduct.value = null
    quantity.value = 1
}

async function crearPedido() {
    try {
        const payload = {
            userId: auth.isAdmin && selectedCustomer.value
                ? selectedCustomer.value
                : undefined,

            items: orderItems.value.map(i => ({
                productId: i.productId,
                quantity: i.quantity
            }))
        }

        const res = await ordersService.store(payload);
        console.log(res)

        toast.add({
            severity: 'success',
            summary: 'Pedido creado',
            life: 3000
        })

        visible.value = false
        orderItems.value = []
        await listarPedidos()

    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    listarPedidos()
    cargarDatos()
})
</script>

<template>
    <div>

        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">
                {{ auth.isAdmin ? 'Todos los Pedidos' : 'Mis Pedidos' }}
            </h1>

            <Button label="Nuevo Pedido" icon="pi pi-plus" @click="visible = true" />
        </div>

        <DataTable :value="orders" :loading="loading" tableStyle="min-width: 50rem">

            <Column field="id" header="Pedido">
                <template #body="{ data }">
                    {{ data.id.slice(0, 8) }}
                </template>
            </Column>

            <Column v-if="auth.isAdmin" field="user.name" header="Cliente" />

            <Column header="Estado">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
                </template>
            </Column>

            <Column header="Productos">
                <template #body="{ data }">
                    <div class="flex flex-col text-sm gap-1">
                        <div v-for="item in data.items" :key="item.id">
                            • {{ item.product.name }} (x{{ item.quantity }})
                        </div>
                    </div>
                </template>
            </Column>

            <Column header="Total">
                <template #body="{ data }">
                    Bs. {{ data.total }}
                </template>
            </Column>

            <Column header="Fecha">
                <template #body="{ data }">
                    {{ new Date(data.created_at).toLocaleDateString() }}
                </template>
            </Column>

            <Column v-if="auth.isAdmin" header="Cambiar Estado">
                <template #body="{ data }">

                    <Select :modelValue="data.status" :options="statuses" optionLabel="label" optionValue="value"
                        class="w-48" @update:modelValue="(value) => cambiarEstado(data, value)" />

                </template>
            </Column>

        </DataTable>

        <Dialog v-model:visible="visible" modal header="Nuevo Pedido" style="width: 50rem">

            <!-- CLIENTE (solo admin) -->
            <Select v-if="auth.isAdmin" v-model="selectedCustomer" :options="customers" optionLabel="name"
                optionValue="id" placeholder="Seleccionar cliente" class="w-full mb-3" />

            <!-- PRODUCTOS -->
            <Select v-model="selectedProduct" :options="products" optionLabel="name" optionValue="id"
                placeholder="Seleccionar producto" class="w-full mb-2" />

            <InputNumber v-model="quantity" :min="1" class="w-full mb-2" />

            <Button label="Agregar producto" @click="agregarProducto" class="mb-4" />

            <!-- ITEMS -->
            <DataTable :value="orderItems" class="mb-3">
                <Column field="name" header="Producto" />
                <Column field="quantity" header="Cantidad" />
                <Column header="Subtotal">
                    <template #body="{ data }">
                        Bs. {{ data.quantity * data.price }}
                    </template>
                </Column>
            </DataTable>

            <!-- TOTAL -->
            <div class="text-right font-bold mb-3">
                Total: Bs. {{
                    orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
                }}
            </div>

            <!-- ACCIONES -->
            <div class="flex justify-end gap-2">
                <Button label="Cancelar" severity="secondary" @click="visible = false" />
                <Button label="Crear Pedido" @click="crearPedido" />
            </div>

        </Dialog>
    </div>
</template>
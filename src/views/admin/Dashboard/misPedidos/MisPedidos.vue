<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

import { useCartStore } from '../../../../stores/cart'
import ordersService from '../../../../services/orders.service'
import { useAuthStore } from '../../../../stores/auth'

const orders = ref<any[]>([])
const loadingOrders = ref(false)

const cart = useCartStore()
const auth = useAuthStore()
const toast = useToast()

const total = computed(() =>
    cart.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
)

async function crearPedido() {
    if (!cart.items.length) return

    try {
        const payload = {
            items: cart.items.map(i => ({
                productId: i.product.id!,
                quantity: i.quantity
            }))
        }

        await ordersService.store(payload)

        cart.clear()

        toast.add({
            severity: 'success',
            summary: 'Pedido creado',
            life: 3000
        })

    } catch (error) {
        console.error(error)
    }
}

function removerItem(id: string) {
    cart.remove(id)
}

async function listarMisPedidos() {
    try {
        loadingOrders.value = true

        const res = await ordersService.myOrders()
        orders.value = res.data

    } catch (error) {
        console.error(error)
    } finally {
        loadingOrders.value = false
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

onMounted(() => {
    listarMisPedidos()
})
</script>

<template>
    <div class="space-y-6">

        <!-- HEADER -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">
                Mis Pedidos
            </h1>

            <Button label="Vaciar carrito" icon="pi pi-trash" severity="secondary" :disabled="!cart.items.length"
                @click="cart.clear()" />
        </div>

        <!-- ========================= -->
        <!-- 🛒 CARRITO -->
        <!-- ========================= -->
        <Card>
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-shopping-cart"></i>
                    Carrito
                </div>
            </template>

            <template #content>

                <div v-if="!cart.items.length" class="text-gray-500 py-4">
                    No tienes productos en el carrito
                </div>

                <DataTable v-else :value="cart.items" class="p-datatable-sm">

                    <Column header="Producto">
                        <template #body="{ data }">
                            <div class="font-medium">
                                {{ data.product.name }}
                            </div>
                        </template>
                    </Column>

                    <Column header="Cantidad">
                        <template #body="{ data }">
                            {{ data.quantity }}
                        </template>
                    </Column>

                    <Column header="Subtotal">
                        <template #body="{ data }">
                            <span class="font-semibold">
                                Bs. {{ data.product.price * data.quantity }}
                            </span>
                        </template>
                    </Column>

                </DataTable>

                <!-- TOTAL -->
                <div class="flex justify-end mt-4 text-xl font-bold">
                    Total: Bs. {{ total }}
                </div>

                <!-- BOTÓN -->
                <div class="flex justify-end mt-4">
                    <Button label="Crear Pedido" icon="pi pi-check" :disabled="!cart.items.length"
                        @click="crearPedido" />
                </div>

            </template>
        </Card>

        <!-- ========================= -->
        <!-- 📦 HISTORIAL -->
        <!-- ========================= -->
        <Card>
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-box"></i>
                    Mis pedidos
                </div>
            </template>

            <template #content>

                <DataTable :value="orders" :loading="loadingOrders" class="p-datatable-sm">

                    <Column header="Pedido">
                        <template #body="{ data }">
                            <span class="font-mono">
                                {{ data.id.slice(0, 8) }}
                            </span>
                        </template>
                    </Column>

                    <Column header="Estado">
                        <template #body="{ data }">
                            <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
                        </template>
                    </Column>

                    <Column header="Productos">
                        <template #body="{ data }">
                            {{ data.items.length }} productos
                        </template>
                    </Column>

                    <Column header="Total">
                        <template #body="{ data }">
                            <span class="font-semibold">
                                Bs. {{ data.total }}
                            </span>
                        </template>
                    </Column>

                    <Column header="Fecha">
                        <template #body="{ data }">
                            {{ new Date(data.created_at).toLocaleDateString() }}
                        </template>
                    </Column>

                </DataTable>

            </template>
        </Card>

    </div>
</template>
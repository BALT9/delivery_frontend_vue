import api from './api/api'

export default {
    index() {
        return api.get('/orders')
    },

    myOrders() {
        return api.get('/orders/my-orders')
    },

    updateStatus(id: string, status: string) {
        return api.patch(`/orders/${id}/status`, { status })
    },

    store(payload: {
        userId?: string
        items: {
            productId: string
            quantity: number
        }[]
    }) {
        return api.post('/orders', payload)
    }
}
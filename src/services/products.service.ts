import type { ProductInterface } from '../interface/Product.interface'
import api from './api/api'

export default {
    async index() {
        return await api.get(`/products`)
    },

    async store(data: ProductInterface) {
        return await api.post(`/products`, data)
    },

    async show(id: string,) {
        return await api.get(`/products/` + id);
    },

    async update(id: string, data: ProductInterface) {
        return await api.patch(`/products/` + id, data);
    },

    async delete(id: string,) {
        return await api.delete(`/products/` + id);
    },
}
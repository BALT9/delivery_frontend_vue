import { defineStore } from 'pinia'
import type { ProductInterface } from '../interface/Product.interface'

type CartItem = {
    product: ProductInterface
    quantity: number
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[]
    }),

    actions: {
        add(product: ProductInterface) {
            const existing = this.items.find(
                i => i.product.id === product.id
            )

            if (existing) {
                existing.quantity++
            } else {
                this.items.push({
                    product,
                    quantity: 1
                })
            }
        },

        remove(productId: string) {
            this.items = this.items.filter(
                i => i.product.id !== productId
            )
        },

        clear() {
            this.items = []
        }
    }
})
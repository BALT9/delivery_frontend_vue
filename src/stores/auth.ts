import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        token: localStorage.getItem('access_token')
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 'ADMIN',
        isCustomer: (state) => state.user?.role === 'CUSTOMER'
    },

    actions: {
        setAuth(data: any) {
            this.user = data.user
            this.token = data.access_token

            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('access_token', data.access_token)
        },

        logout() {
            this.user = null
            this.token = null

            localStorage.removeItem('user')
            localStorage.removeItem('access_token')
        },

        init() {
            const user = localStorage.getItem('user')
            const token = localStorage.getItem('access_token')

            if (user && token) {
                this.user = JSON.parse(user)
                this.token = token
            }
        }
    }
})
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import AdminLayout from '../layout/AdminLayout.vue'
import AdminHome from '../views/admin/Dashboard/AdminHome/AdminHome.vue'
import User from '../views/admin/Dashboard/Users/User.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        // meta: { redirectIfAuth: true }
    },

    {
        path: '/register',
        name: 'register',
        component: Register
    },

    // ADMIN (con layout)
    {
        path: '/dashboard',
        component: AdminLayout,
        meta: { requiredAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: AdminHome
            },
            {
                path: 'users',
                name: 'users',
                meta: { role: 'ADMIN' },
                component: User
            }
        ]
    },
    // {
    //     path: '/products',
    //     name: 'products',
    //     component: Products,
    //     meta: { requiredAuth: true, role: 'CUSTOMER' }
    // },
    // {
    //     path: '/cart',
    //     name: 'cart',
    //     component: Cart,
    //     meta: { requiredAuth: true, role: 'CUSTOMER' }
    // },
    // {
    //     path: '/my-orders',
    //     name: 'my-orders',
    //     component: MyOrders,
    //     meta: { requiredAuth: true, role: 'CUSTOMER' }
    // }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const token = localStorage.getItem('access_token')

    let user = null
    try {
        user = JSON.parse(localStorage.getItem('user') || 'null')
    } catch {
        user = null
    }

    // 1. bloquear rutas privadas
    if (to.meta.requiredAuth && !token) {
        return '/login'
    }

    // 2. bloquear login si ya estás logueado
    if (to.path === '/login' && token) {
        return '/dashboard'
    }

    // 3. control de roles
    if (to.meta.role) {
        const roles = Array.isArray(to.meta.role)
            ? to.meta.role
            : [to.meta.role]

        if (!user || !roles.includes(user.role)) {
            return '/dashboard'
        }
    }

    return true
})

export default router
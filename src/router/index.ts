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
        meta: { redirectIfAuth: true }
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
        meta: { requiredAuth: true, role: 'ADMIN' },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: AdminHome
            },
            {
                path: 'users',
                name: 'users',
                component: User
            }
        ]
    }
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
    } catch (e) {
        user = null
    }

    // 🔒 requiere login
    if (to.meta.requiredAuth && !token) {
        return '/login'
    }

    // 🚫 role check
    if (to.meta.role && user?.role !== to.meta.role) {
        return '/'
    }

    // 🔁 si ya está logueado no entra a login
    if (to.meta.redirectIfAuth && token) {
        return '/dashboard'
    }

    return true
})

export default router
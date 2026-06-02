import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import AdminLayout from '../layout/AdminLayout.vue'
import AdminHome from '../views/admin/Dashboard/AdminHome/AdminHome.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },

    {
        path: '/login',
        name: 'login',
        component: Login
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
        children: [
            {
                path: '',
                name: 'dashboard',
                component: AdminHome
            },

            // {
            //     path: 'users',
            //     name: 'admin-users',
            //     component: () => import('../views/admin/Users.vue')
            // }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import { useAuthStore } from '../stores/auth.ts'

import AdminLayout from '../layout/AdminLayout.vue'
import AdminHome from '../views/admin/Dashboard/AdminHome/AdminHome.vue'
import User from '../views/admin/Dashboard/Users/User.vue'
import Producto from '../views/admin/Dashboard/Productos/Producto.vue'
import Pedido from '../views/admin/Dashboard/Pedidos/Pedido.vue'

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
                path: 'products',
                name: 'products',
                meta: { role: 'ADMIN' },
                component: Producto
            },
            {
                path: 'orders',
                name: 'orders',
                meta: { role: 'ADMIN' },
                component: Pedido
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
    const auth = useAuthStore()

    const isAuth = auth.token !== null && auth.token !== '' && auth.token !== 'null'

    console.log({
        to: to.name,
        path: to.path,
        token: auth.token,
        user: auth.user,
        isAuth
    })

    if (to.meta.requiredAuth && !isAuth) {
        return { name: 'login' }
    }

    if (to.name === 'login' && isAuth) {
        return { name: 'dashboard' }
    }

    if (to.meta.role) {
        const roles = Array.isArray(to.meta.role)
            ? to.meta.role
            : [to.meta.role]

        if (!auth.user || !roles.includes(auth.user.role)) {
            return { name: 'dashboard' }
        }
    }

    return true
})

export default router
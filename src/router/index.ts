import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// import LoginView from '@/views/LoginView.vue'
// import RegisterView from '@/views/RegisterView.vue'
// import ProductsView from '@/views/ProductsView.vue'
// import CartView from '@/views/CartView.vue'
// import OrdersView from '@/views/OrdersView.vue'

// import AdminProductsView from '@/views/admin/AdminProductsView.vue'
// import AdminOrdersView from '@/views/admin/AdminOrdersView.vue'

// import NotFoundView from '@/views/NotFoundView.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        // redirect: '/',
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
    // {
    //     path: '/products',
    //     name: 'products',
    //     component: ProductsView
    // },
    // {
    //     path: '/cart',
    //     name: 'cart',
    //     component: CartView
    // },
    // {
    //     path: '/orders',
    //     name: 'orders',
    //     component: OrdersView
    // },
    // {
    //     path: '/admin/products',
    //     name: 'admin-products',
    //     component: AdminProductsView
    // },
    // {
    //     path: '/admin/orders',
    //     name: 'admin-orders',
    //     component: AdminOrdersView
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'not-found',
    //     component: NotFoundView
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
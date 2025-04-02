
// createRouter: 创建router实例对象
// createWebHashHistory: 创建history 模式的路由

import { createRouter, createWebHashHistory } from "vue-router";
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import Category from '../views/Category/index.vue';
import Layout from '@/views/Layout/index.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Home
                },
                {
                    path: 'category',
                    component: Category
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ]
})

export default router
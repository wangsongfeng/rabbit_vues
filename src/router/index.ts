
// createRouter: 创建router实例对象
// createWebHashHistory: 创建history 模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import Category from '../views/Category/index.vue';
import Layout from '@/views/Layout/index.vue';
import CategorySub from '@/views/CategorySub/index.vue'
import Member from '@/views/Member/index.vue'
import UserOrder from "@/views/Member/components/UserOrder.vue";
import UserInfo from "@/views/Member/components/UserInfo.vue";
import GoodDetail from '@/views/GoodDetail/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
                    path: '/category/:id',
                    name: 'category',
                    component: Category
                },
                {
                    path: '/category/sub/:id',
                    name:'categorysub',
                    component: CategorySub
                },
                {
                    path: '/detail/:id',
                    component: GoodDetail,
                },
                {
                    path:'/member',
                    component: Member,
                    children: [
                        {
                            path: '',
                            component: UserInfo,
                        },
                        {
                            path: 'order',
                            component: UserOrder
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ],
    scrollBehavior() {
        return {
            top: 0
        }
    }
})

export default router
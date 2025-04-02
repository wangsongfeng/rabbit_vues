<template>
    <header class="app-header">
        <div class="container">

            <h1 class="logo">
                <RouterLink to="/">小兔鲜</RouterLink>
            </h1>

            <ul class="app-header-nav">
                <li class="home">
                    <RouterLink to="/">首页</RouterLink>
                </li>
                <li class="home" v-for="item in categoryStores.categoryList" :key="item.id">
                    <RouterLink active-class="active" :to="`/category/${item.id}`">
                        {{ item.name }}
                    </RouterLink>
                </li>
            </ul>

            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="搜一搜">
            </div>

            <HeaderCart/>
        </div>
    </header>
</template>

<script lang="ts" setup>

import {useCategoryStore} from '../../../stores/categoryStores'
import HeaderCart from '@/views/Layout/components/HeaderCart.vue';

const categoryStores = useCategoryStore()

</script>

<style lang="scss" scoped>

.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width:  200px;
        
        a {
            display: block;
            height:  132px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }

        //元素拥有一个背景图像，该图像仅显示一次，在水平方向上居中，距离顶部 18 像素，并且会按比例缩放以完全适应元素。
    }

    .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e4e7;
        border-radius: 6px;
        line-height: 32px;

        .icon-search {
            font-size: 18px;
            margin-left: 5px;
        }

        input {
            width: 140px;
            padding-left: 6px;
            color: #666;
        }
    }
    
}

.app-header-nav {
    width:  820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;

            &:hover {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }

        .active {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
        }
    }
}

</style>
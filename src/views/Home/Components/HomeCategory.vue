<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="item in categoryStore.categoryList" :key="item.id">
                <RouterLink to="/">{{ item.name }}</RouterLink>
                <RouterLink v-for="i in item.children.slice(0,2)" :key="i" to="/"> {{ i.name }} </RouterLink>
                <!-- 弹出层layer -->
                 <div class="layer">
                    <div class="innercate">
                        <div class="cate-product-header">
                            <span>分类推荐</span>
                        </div>
                        <div class="cate-product-content">
                            <div v-for="(i,index) in item.goods" :key="i.id">
                                <IndexProduct :product-data="i"></IndexProduct>
                            </div>
                        </div>
                    </div>
                 </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

import { useCategoryStore } from '../../../stores/categoryStores';

import IndexProduct from '@/views/Home/Components/IndexProduct.vue';


const categoryStore = useCategoryStore()

</script>

<style lang="scss" scoped>
.home-category {
    width: 210px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;
    border-radius: 6px;
    .menu {
        li {
            padding-left: 20px;
            height: 55px;
            line-height: 55px;

            &:hover {
                background: $xtxColor;
            }

            a {
                margin-right: 4px;
                color: #fff;

                &:first-child {
                    font-size: 15px;
                }
            }

            .layer {
                height: 500px;
                width: 1062px;
                position: absolute;
                background: rgba(255,255,255,1.0);
                left: 220px;
                top: 0;
                display: none;
                padding: 15px;
                box-sizing: border-box;
                border-radius: 8px;
                .innercate {
                    margin-left: 10px;
                    background-color: #fff;
                }

                .cate-product-header {
                    span {
                        font-size: 18px;
                        font-weight: bold;
                    }
                }

                .cate-product-content {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 0px;
                }
            }

            &:hover {
                .layer {
                    display: block;
                }
            }
        }
    }
}

</style>
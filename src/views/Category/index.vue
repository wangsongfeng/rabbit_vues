<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
             <div class="bread-container">
                <WBread>
                    <div class="r-bread-item">
                        <router-link :to="{ path:'/' }"><slot>首页</slot></router-link>
                    </div>
                    <div class="r-bread-item">
                        <router-link :to="`/category/${categoryData.id}`"><slot>{{categoryData.name}}</slot></router-link>
                    </div>
                </WBread>
             </div>
             <!-- 轮播图 -->
              <div class="home-banner">
                <el-carousel height = "500px">
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
              </div>

              <!-- 全部分类 -->
              <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="item in categoryData.children" :key="item.id">
                        <RouterLink :to="`/category/sub/${item.id}`">
                            <img :src="item.picture" alt="">
                            <p> {{ item.name }} </p>
                        </RouterLink>
                    </li>
                </ul>
              </div>

              <!-- 品类列表 -->
               <div class="ref-ggods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }} -</h3>
                    <div class="product-content">
                        <div v-for="(product,index) in item.goods" :key="product.id">
                            <HomeProList :product-data="product"></HomeProList>
                        </div>
                    </div>
                </div>
               </div>
        </div>
    </div>
</template>

<script lang="ts" setup>


import WBread from '@/components/WBread.vue';
import { useBanner } from './RequestGet/useBanner';
import { useCategory } from './RequestGet/useCategory';

import HomeProList from '@/views/Home/Components/HomeProList.vue'

const {bannerList} = useBanner()
const {categoryData} = useCategory()


</script>

<style lang="scss" scoped>

.top-category {
    background-color: #f5f5f5;

    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }


    .bread-container {
        padding: 25px 0;
    }

    .home-banner {
        width: 1240px;
        height: 500px;
        margin: 0 auto;


        img {
            width: 100%;
            height: 500px;
        }
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;

                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }
                    p {
                        line-height: 40px;
                    }
                }
            }
        }
    }


    .ref-ggods {
        background-color: #fff;
        margin-top: 20px;

        .product-content {
            display: flex;
            justify-content: space-around;
            padding: 10px 10px;
        }

    }
}
</style>
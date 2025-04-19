<template>
    <div class="index-main-product-area">
        <div v-for="(item,index) in goodsProduct" :key="item.id">
            <!-- main -->
             <div class="r-indexmainproduct-components">
                <!-- top -->
                 <div class="r-indexmainproduct-title">
                    <div class="left-title">
                        <h3> {{ item.name }} </h3>
                    </div>
                    <!-- right -->
                     <div class="right-content">
                        <div class="right-more">
                            <span>查看全部</span>
                            <i class="iconfont icon-next-icon"></i>
                        </div>
                     </div>
                 </div>

                 <!-- bottom -->
                  <div class="r-indexmainproduct-product">
                    <!-- 左边的图片 -->
                     <RouterLink class="r-indexmainproduct-product-left" to="/">
                        <img v-img-lazy="item.picture">
                        <strong class="label">
                            <span> {{ item.name }} </span>
                            <span> {{ item.saleInfo }} </span>
                        </strong>
                     </RouterLink>

                     <div class="r-indexmainproduct-product-right">
                        <div v-for="(product,index) in item.goods" :key="product.id">
                            <RouterLink :to="`/detail/${product.id}`">
                                <HomeProList :product-data="product"></HomeProList>
                            </RouterLink>
                        </div>
                     </div>
                  </div>

             </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {onMounted,ref}  from 'vue'
import {getGoodsAPI} from '@/apis/home'
import HomeProList from './HomeProList.vue'

const goodsProduct = ref([] as any)

const getGoods = async () => {
    const res = await getGoodsAPI() as any
    goodsProduct.value = res.result
}

onMounted(() => {
    getGoods()
})


</script>

<style lang="scss" scoped>
.index-main-product-area {
    background-color: #fff;
    border-radius: 8px;
}

.r-indexmainproduct-components {
    padding: 20px;
    width: 100%;
    margin-top: 20px;
    .r-indexmainproduct-title {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .left-title{
            font-size: 20px;
            color: #333;
            h3 {
                font-weight: normal;
            }
        }

        .right-content {
            display: flex;
            align-items: center;

            .right-more {
                span {
                    font-size: 14px;
                    color: #999;
                }

                .icon-next-icon {
                    color: #999;
                    font-size: 15px;
                }

            }
        }
    }


// bottom
    .r-indexmainproduct-product {
        display: flex;
        align-items: center;
        margin-top: 24px;

        .r-indexmainproduct-product-left {
            width: 240px;
            height: 600px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }

            .label {
                height: 66px;
                display: flex;
                font-size: 14px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                transform: translate3d(0,-50%,0);

                span {

                    &:first-child {
                        text-align: center;
                        width: 76px;
                        background: rgba(0,0,0,0.9);
                    }

                    &:last-child {
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                        padding-left: 10px;
                        padding-right: 10px;
                        box-sizing: border-box;
                        flex: 1;
                        background: rgba(0,0,0,0.7);
                    }
                }
            }
        }


        .r-indexmainproduct-product-right {
            flex: 1;
            height: 610px;
            margin-left: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            text-align: center;
        }
    }
}

</style>
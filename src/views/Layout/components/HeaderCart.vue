<template>
    <div class="cart">
        <a class="curr" href="javascript:;">
            <i class="icon-cart">
                <em> {{ cartStore.cartList.length }}</em>
            </i>
        </a>

        <!--  -->
        <div class="layer">
            <div class="list">
                <div class="item" v-for="i in cartStore.cartList" :key="i">
                    <RouterLink to="">
                        <img :src="i.picture" alt="" />
                        <div class="center">
                            <p class="name ellipsis-2">
                                {{ i.name }}
                            </p>
                            <p class="attr ellipsis">{{ i.attrsText }}</p>
                        </div>
                        <div class="right">
                            <p class="price">&yen;{{ i.price }}</p>
                            <p class="count">x{{ i.count }}</p>
                        </div>
                    </RouterLink>
                    <i class="iconfont icon-close-new" @click="cartStore.delCart(i.skuId)"></i>
                </div>
            </div>
            <div class="foot">
                <div class="total">
                    <p>共 {{ cartStore.allCount }} 件商品</p>
                    <p>&yen; {{ cartStore.allPrice.toFixed(2) }} </p>
                </div>
                <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore()

</script>

<style lang="scss" scoped>

.cart {
    width: 50px;
    position: relative;
    z-index: 600;

    .curr {
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        display: block;

        .icon-cart {
            font-size: 22px;
            background: url("@/assets/images/gouwuche.png") no-repeat center / cover;
        }

        em {
            font-style: normal;
            position: absolute;
            right: 0;
            top: 0;
            padding: 1px 6px;
            line-height: 1;
            background: $helpColor;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            font-family: Arial;
        }
    }

    &:hover {
        .layer {
            opacity: 1;
            transform: none;
        }
    }

    .layer {
        opacity: 0;
        transition: all 0.4s 0.2s;
        transform: translateY(-200px) scale(1,0);
        width: 400px;
        height: 400px;
        position: absolute;
        top: 50px;
        right: 0;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background: #fff;
        border-radius: 4px;
        padding-top: 10px;

        &::before {
            content: "";
            position: absolute;
            right: 14px;
            top: -10px;
            width: 20px;
            height: 20px;
            background: #fff;
            transform: scale(0.6, 1) rotate(45deg);
            box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
        }

        .foot {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 70px;
            width: 100%;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            align-items: center;

            .total {
                padding-left: 10px;
                color: #999;

                p {
                    &:last-child {
                        font-size: 18px;
                        color: $priceColor;
                    }
                }
            }
        }
    }

    .list {
        height: 310px;
        overflow: auto; //当内容超出容器尺寸时，会根据需要自动显示滚动条。
        padding:  0 10px;

        &::-webkit-scrollbar {
            width: 10px; /* 垂直滚动条宽度 */
            height: 10px; /* 水平滚动条高度 */
        }

        &::-webkit-scrollbar-track {
            background: #f8f8f8;   /* 轨道背景色 */
            border-radius: 2px;  /* 轨道圆角 */
        }

        &::-webkit-scrollbar-thumb {
            background: #eee;  /* 滑块颜色 */
            border-radius: 10px;  /* 滑块圆角 */
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #ccc;  /* 鼠标悬停时滑块颜色 */
        }

        .item {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px 0;
            position: relative;

            i {
                position: absolute;
                bottom: 38px;
                right: 0;
                opacity: 0;
                color: #666;
                transition: all 0.5s;
            }

            &:hover {
                i {
                    opacity: 1;
                    cursor: pointer;
                }
            }

            a {
                display: flex;
                align-items: center;

                img {
                    height: 80px;
                    width: 80px;
                }

                .center {
                    padding: 0 10px;
                    width: 200px;

                    .name {
                        font-size: 16px;
                    }

                    .attr {
                        color: #999;
                        padding-top: 5px;
                    }
                }

                .right {
                    width: 100px;
                    padding-right: 20px;
                    text-align: center;

                    .price {
                        font-size: 16px;
                        color: $priceColor;
                    }

                    .count {
                        color: #999;
                        margin-top: 5px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>
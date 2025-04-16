<template>
    <div class="r-mainproduct-components">
        <!-- 商品图片 -->
        <div class="product-img">
            <img v-img-lazy="productData.picture" alt="">
        </div>
        <!-- 商品标题 -->
         <div class="product-title">
            <p class="ellipsis"> {{ productData.name }} </p>
         </div>
         <!-- 描述标题 -->
          <div class="product-desc">
            <p class="ellipsis"> {{ productData.desc }} </p>
          </div>
          <!-- 商品价格 -->
           <div class="product-price">
            <WPrice :price="productData.price" bold="700" size="16"></WPrice>
           </div>
           <!-- <div class="findsame">
             <p>找相似</p>
             <p>发现更多宝贝</p>
            </div> -->
    </div>
</template>

<script lang="ts" setup>

import WPrice from "@/components/WPrice.vue";

const props = defineProps({
    productData: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

</script>

<style lang="scss" scoped>

.r-mainproduct-components {
    width: 210px;
    height: 300px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 20px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    border: 1px solid #fff;
    transition: all .3s;
    overflow: hidden;

    .product-img {
        width: 160px;
        height: 160px;
        img{
        display: block;
        width: 100%;
        height: 100%;
        transition: all .3s;
        }
    }

    .product-title {
        width: 90%;
        margin-top: 15px;
        font-size: 16px;
        color: #333;
    }

    .product-desc {
        width: 90%;
        padding-top: 10px;
        color: #999;
        height: 29px;

    }
    .product-price {
        padding-top: 10px;
    }

    &:hover{

        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
        .findsame{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            height: 84px;
            width: 100%;
            background-color: $xtxColor;
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 999;
            transform: translate3d(0,100%,0);
            transition: all .5s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            p{
                text-align: center;
                &:first-child{
                    font-size: 16px;
                    color: #fff;
                    &:after{
                    content: '';
                    display: block;
                    width: 123px;
                    height: 1px;
                    background-color: rgba(255,255,255,.5);
                    margin: 10px 0;
                    }
                }
                &:last-child{
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
}
</style>
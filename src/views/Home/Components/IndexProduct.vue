<template>
    <div class="r-cateproduct-components">
        <!-- 左边的图片 -->
         <div class="r-cateproduct-img">
            <img :src="productData.picture" alt="">
         </div>
         <div class="r-cateproduct-info">
            <div class="r-cateproduct-title"> {{ productData.name }}</div>
            <div class="r-cateproduct-desc ellipsis"> {{ productData.desc }}</div>
            <div class="r-cateproduct-price">
                <WPrice :price="productData.price" bold="500" size="14"></WPrice>
            </div>
         </div>
    </div>
</template>

<script lang="ts" setup>

import WPrice from "@/components/WPrice.vue";

const props = defineProps({
    productData: {
        type: Object,
        default: {}
    }
})

</script>

<style lang="scss" scoped>
.r-cateproduct-components {
    cursor: pointer;
    display: flex;
    margin-right: 16px;
    margin-bottom: 38px;
    align-items: center;

    .r-cateproduct-img {
        img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
            transition: all .3s;
        }
    }

    &:hover {
        img {
            transform: translateY(-3px);
        }
        .r-cateproduct-title {
            color: $xtxColor
        }
    }

    .r-cateproduct-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 200px;
        height: 100px;
        margin-left: 20px;

        .r-cateproduct-title {
            font-size: 13px;
            transition: all .3s;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            line-height: 1.5;
            color: black;
        }

        .r-cateproduct-desc {
            font-size: 12px;
            color: #999;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 1.5;
        }

    }
}

</style>
<template>
    <div class="r-newspace-components" ref="newProduct">
        <div class="r-newspace-title">
            <div class="r-newspace-title-left">最新专题</div>
            <div class="r-newspace-title-right">
                <span>查看更多</span>
                <i class="iconfont icon-next-icon"></i>
            </div>
        </div>

        <!-- 内容 -->
         <div class="spce-content">
            <div v-for="(item,index) in indexState.newSpaceData" :key="item.id">
                <div class="r-newspec-components">
                    <div class="newspec-top">
                        <img v-img-lazy="item.cover" class="specimg">
                        <div class="mask">
                            <div class="mask-left">
                                <p class="ellipsis" :title="item.title">{{ item.title }}</p>
                                <p class="ellipsis" :title="item.summary">{{ item.summary }}</p>
                            </div>

                            <div class="mask-price">
                                <div class="inner-price">
                                    <WPrice :price="item.lowestPrice" autofix></WPrice>
                                    <span>起</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script lang="ts" setup>

import useLazyData from '@/directives/useLazyData'
import { getNewsSpaceAPI } from "@/apis/home";
import { reactive, ref,onMounted } from 'vue';

import WPrice from "@/components/WPrice.vue";

const newProduct = ref(null)

const indexState = reactive({
    newSpaceData: [] as any
})

onMounted(() => {
    
})

indexState.newSpaceData = useLazyData(newProduct,getNewsSpaceAPI,res => res.result)

console.log(indexState.newSpaceData)

</script>

<style lang="scss" scoped>
.r-newspace-components {
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    border-radius: 8px;
    background-color: #fff;

    .r-newspace-title {
        // padding-top: 40px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .r-newspace-title-left {
            font-size: 20px;
            color: #333;
        }

        .r-newspace-title-right {
            span {
                font-size: 14px;
                color: #999;
            }

            i {
                color: #999;
                font-size: 15px;
            }
        }
    }


    .spce-content {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;

        .r-newspec-components {
            width: 380px !important;
            background-color: #fff;
            cursor: pointer;
            position: relative;
            transition: all .3s;
            height: 287px;

            .newspec-top {
                width: 100%;
                height: 100%;
                position: relative;
                .specimg{
                    width: 100%;
                    object-fit: cover;
                    height: 287px;
                }
                .mask {
                    width: 100%;
                    height: 287px;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background-image: linear-gradient(0deg,rgba(0,0,0,.8),transparent 50%);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .mask-left{
                        width:250px;
                        height: 70px;
                        position: absolute;
                        bottom: 0;
                        margin-left: 20px;
                        display: flex;
                        flex-direction: column;
                        p{
                            &:first-child{
                                font-size: 18px;
                                color: #fff;
                            }
                            &:last-child{
                                font-size: 14px;
                                color: #999999;
                            }
                        }
                    }

                    .mask-price{
                        height: 70px;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        margin-right: 15px;
                        display: flex;
                        align-items: center;
                        border-radius: 3px;
                        justify-content: flex-end;
                        padding: 0 5px;
                        .inner-price{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 27px;
                            background-color: #fff;
                            border-radius: 3px;
                            padding: 0 5px;
                        }
                        span{
                            margin-left: 5px;
                            color: $priceColor;
                        }
                    }
                }
            }
        }

    }
}

</style>
<template>
    <div class="r-indexproduct-components">
        <!-- top -->
         <div class="r-indexproduct-top">
            <!-- 昨天 -->
             <div class="r-indexproduct-title">
                <h3> {{ title }} </h3>
                <span> {{ subTitle }} </span>
             </div>
             <!-- 右边 -->
              <div class="r-indexproduct-more">
                <span>查看更多</span>
                <i class="iconinfo icon-jiantou"></i>
              </div>
         </div>

         <!-- list -->
          <div class="r-indexproduct-list">
            <div v-for="(item,index) in newsList" :key="item.id">

                <div class="r-product-components">
                    <div class="r-product-img">
                        <img :src="item.picture" alt="">
                    </div>
                    <div class="r-product-info">
                        <h4 class="ellipsis" :title="item.name"> {{ item.name }}</h4>
                        <WPrice size="16" :price="item.price"/>
                    </div>
                </div>
            </div>
          </div>
    </div>
</template>

<script lang="ts" setup>

import { findNewsAPI } from '@/apis/home';
import { onMounted, ref } from "vue";

import WPrice from "@/components/WPrice.vue";


const newsList = ref([] as any)

const getNewsAPI = async () => {
    const res = await findNewsAPI() as any
    newsList.value = res.result
}

onMounted(() => {
    getNewsAPI()
})


const props = defineProps({
    productInfo: {
        type: Object,
        default: () => {
            return []
        }
    },

    //商品模块标题
    title: {
        type: String,
        default: '请填写内容'
    },

    subTitle: {
        type: String,
        default: '请填写副标题'
    }
}) 


</script>

<style lang="scss" scoped>

.r-indexproduct-components {
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    border-radius: 8px;
    background-color: #fff;
    .r-indexproduct-top {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .r-indexproduct-title {
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            h3 {
                font-size: 20px;
                margin-right: 10px;
            }

            span {
                font-size: 14px;
                color: #999;
            }
        }

        .r-indexproduct-more {
            display: flex;
            align-items: center;
            cursor: pointer;

            span{
                font-size: 14px;
                color: #999;
            }
            .icon-jiantou{
                font-size: 10px !important;
                color: #999;
                margin-left: 5px;
            }

        }

    }

    .r-indexproduct-list{
        display: flex;
        justify-content: space-between;

        .r-product-components {
            cursor: pointer;
            width: 290px;

            transition: all .5s;

            &:hover {
                transform: translate3d(0, -3px, 0);
                box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
            }

            .r-product-img {
                img {
                    width: 100%;
                    height: 260px;
                }
            }

            .r-product-info {
                height: 98px;
                background-color: #f0f9f4;
                padding: 10px 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                h4 {
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 10px;
                    width: 80%;
                }
            }
        }

    }
}

</style>
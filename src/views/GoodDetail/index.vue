<template>
    <div class="r-good-components">
        <div class="container" v-if="goods.details">
            <!-- 标签 -->
             <div class="bread-container">
                <WBread>
                    <div class="r-bread-item">
                        <router-link :to="{ path:'/' }"><slot>首页</slot></router-link>
                    </div>
                    <div class="r-bread-item">
                        <router-link :to="`/category/${goods.categories[1].id}`"><slot>{{goods.categories[1].name}}</slot></router-link>
                    </div>
                    <div class="r-bread-item">
                        <router-link :to="`/category/sub/${goods.categories[0].id}`"><slot>{{goods.categories[0].name}}</slot></router-link>
                    </div>
                    <div class="r-bread-item">
                        {{ goods.name }}
                    </div>
                </WBread>
             </div>
             <!-- 商品信息 -->

             <div class="info-container">
                <div class="goods-info">
                    <!-- 左边大图+下面的信息条 -->
                     <div class="media">
                        <WImageView :image-list="goods.mainPictures"></WImageView>
                        <!-- 人气评价 -->
                         <ul class="goods-sales">
                            <li>
                                <p>销量人气</p>
                                <p> {{ goods.salesCount }}+ </p>
                                <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                            </li>
                            <li>
                                <p>商品评价</p>
                                <p> {{ goods.commentCount }}+ </p>
                                <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                            </li>
                            <li>
                                <p>收藏人气</p>
                                <p> {{ goods.collectCount }}+ </p>
                                <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                            </li>
                            <li>
                                <p>品牌信息</p>
                                <p> {{ goods.brand.name }} </p>
                                <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                            </li>
                         </ul>
                         
                     </div>


                     <!-- 右边的商品信息 -->

                     <div class="spec">
                        <p class="good-name"> {{ goods.name }} </p>
                        <p class="good-desc"> {{ goods.desc }} </p>
                        <p class="good-price"> 
                            <span> {{ goods.price }} </span>
                            <span> {{ goods.oldPrice }} </span>
                        </p>

                        <div class="good-service">
                            <dl>
                                <dt>促销</dt>
                                <dd>12月好物放送，App领券购买直降120元</dd>
                            </dl>
                            <dl>
                                <dt>服务</dt>
                                <dd>
                                    <span>无忧退货</span>
                                    <span>快速退款</span>
                                    <span>免费包邮</span>
                                    <a href="javascript:;">了解详情</a>
                                </dd>
                            </dl>
                        </div>

                        <WGoodsSel :goods="goods" @change="skuChange"></WGoodsSel>
                     </div>
                </div>
             </div>
        </div>

        <div class="container" v-else>
            <div v-loading="true" element-loading-text="Loading..." class="r-goods-skeleton">
\            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { getDetail } from '@/apis/detail';
import WBread from '@/components/WBread.vue';
import WGoodsSel from '@/components/WGoodsSel.vue';
import WImageView from '@/components/WImageView.vue';
import { ElSkeleton } from 'element-plus';
import { ref , onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()

const goods = ref({} as any)

const getGoods = async () => {
   try {
    const res = await getDetail(Number(route.params.id)) as any
    goods.value = res.result
   } catch (error) {
    console.log(error)
   }
    
}

onMounted(() => {
  getGoods()  
})

const skuChange = (sku: any) => {

}

</script>

<style lang="scss" scoped>
.r-good-components{

    .bread-container {
        padding: 25px 0;
    }
}

.info-container {

    .goods-info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .goods-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: $priceColor;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: $xtxColor;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: $xtxColor;
                        cursor: pointer;
                    }
                }
            }
        }
    }


    .good-name {
        font-size: 22px;
    }

    .good-desc {
        color: #999;
        margin-top: 10px;
    }

    .good-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: $priceColor;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .good-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: $xtxColor;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: $xtxColor;
                    }
                }
            }

        }

    }
}

.r-goods-skeleton {
    width: 100%;
    height: 360px;

    padding: 20px;
    margin-top: 20px;
    background: #fff;

    .r-goods-skeleton-one {
        width: 80%;
        margin-bottom: 20px;
    }
}

</style>
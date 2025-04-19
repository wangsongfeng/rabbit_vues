<template>
    <div class="container">
        <!-- 面包屑 -->
        <div class="bread-container">
            <WBread>
                <div class="r-bread-item">
                    <router-link :to="{ path:'/' }"><slot>首页</slot></router-link>
                </div>
                <div class="r-bread-item">
                    <router-link :to="`/category/${categoryData.parentId}`"><slot>{{categoryData.parentName}}</slot></router-link>
                </div>
                <div class="r-bread-item">
                    <router-link :to="`/category/${categoryData.id}`"><slot>{{categoryData.name}}</slot></router-link>
                </div>
            </WBread>
        </div>

        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>

            <div class="body" v-infinite-scroll="loadMore" :infinite-scroll-disabled="disabled">
                <div v-for="(product,index) in goodList" :key="product.id">
                    <RouterLink :to="`/detail/${product.id}`">
                                <HomeProList :product-data="product"></HomeProList>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { getSubCategoryAPI,getCategoryFilterAPI } from '@/apis/category';
import WBread from '@/components/WBread.vue';
import HomeProList from '@/views/Home/Components/HomeProList.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// 获取面包屑数据
const categoryData = ref({} as any)
const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id) as any
    categoryData.value = res.result
}

const goodList = ref([] as any)

const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField:'publishTime'
})

const getGoodlist = async () => {
    const res = await getSubCategoryAPI(reqData.value) as any
    goodList.value = res.result.items
}

onMounted(() => {
    getCategoryData()
    getGoodlist()
})

//tab切换
const tabChange = () => {
    reqData.value.page = 1
    getGoodlist()
}

//加载更多
const disabled = ref(false)

const loadMore = async () => {
    reqData.value.page ++;
    const res = await getSubCategoryAPI(reqData.value) as any
    goodList.value = [...goodList.value, ...res.result.items]
    if (res.result.items.length === 0) {
        disabled.value = true
    }
}


</script>

<style lang="scss" scoped>

.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
        justify-content: space-between;
    }
}


</style>
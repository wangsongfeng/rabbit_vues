<template>
    <div class="home-banner">
        <el-carousel height = "500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang="ts" setup>

import { getBannerAPI } from '@/apis/home';
import { onMounted,ref } from 'vue';

const bannerList = ref([] as any)

const getBanner = async () => {
    const res = await getBannerAPI() as any
    bannerList.value = res.result
}

onMounted( () => getBanner())

</script>

<style lang="scss" scoped>

.home-banner {
    height: 500px;
    position: absolute;
    left: 220px;
    right: 0;
    top: 0;
    z-index: 98;
    border-radius: 8px;

    img {
        width: 100%;
        height: 500px;
        border-radius: 8px;
    }
}
</style>
<template>
    <div class="container">
        <HomeCategory/>
        <HomeBanner/>

        <HomeNews title="新鲜好物" sub-title="新鲜出炉 品质靠谱"/>
        <HomeHots title="人气推荐" sub-title="人气爆款 不容错过"/>

        <HomeProduct/>

        <HomeNewProduct/>

    </div>
</template>

<script lang="ts" setup>

import HomeCategory from './Components/HomeCategory.vue';
import HomeBanner from './Components/HomeBanner.vue';
import HomeNews from "./Components/HomeNews.vue";
import HomeHots from './Components/HomeHots.vue';
import HomeProduct from './Components/HomeProduct.vue';
import HomeNewProduct from './Components/HomeNewProdu.vue';

</script>

<style lang="scss" scoped>
.container {
    margin-top: 30px;
}
</style>
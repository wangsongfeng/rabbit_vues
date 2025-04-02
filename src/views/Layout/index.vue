
<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue';
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import  LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue';

import { useCategoryStore } from "@/stores/categoryStores";
import { onMounted } from "vue";

const categoryStore = useCategoryStore()

onMounted(() => {
    categoryStore.getCategory()
})


</script>

<template>
    <div>
        <LayoutFixed/>
        <LayoutNav/>
        <LayoutHeader/>
        <!-- 二级路由出口 -->
        <RouterView/>
        <LayoutFooter/>
    </div>
</template>
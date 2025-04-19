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
        </div>
    </div>
</template>

<script lang="ts" setup>

import { getDetail } from '@/apis/detail';
import WBread from '@/components/WBread.vue';
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

</script>

<style lang="scss" scoped>
.r-good-components{

    .bread-container {
        padding: 25px 0;
    }
}

</style>
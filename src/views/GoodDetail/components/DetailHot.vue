<template>
    <div class="goods-hot">
        <h3> {{ title }} </h3>
        <div class="goods-item" v-for="product in hotList" :key="product.id">
            <RouterLink :to="`/detail/${product.id}`">
                 <HomeProList :product-data="product"></HomeProList>
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getHotGoodsAPT } from '@/apis/detail';
import HomeProList from '@/views/Home/Components/HomeProList.vue';
import { computed, onMounted, ref } from 'vue';

//这个接口定义表示：
// 这是一个可以用任意字符串作为键访问的对象（[key: string]: string）
// 但明确知道它必须有 "1" 和 "2" 这两个键
// 所有值都必须是字符串类型
interface TYPEAP {
    [key: string]: string; //字符串索引签名
    "1": string,
    "2": string,
}

/**
 * validator: (value: string) => ["1","2"].includes(value)
 * 这是 Vue 的 prop 验证器，表示：

    这个验证器函数接收一个字符串值 value
    检查这个值是否包含在数组 ["1","2"] 中
    返回 true 表示验证通过，false 表示验证失败
 */

const props = defineProps({
    hotType: {
        type: String,
        default: "1",
        validator: (value: string) => ["1","2"].includes(value)
    },
    id: {
        type: Number,
        default: 0
    }
})

const TypeAP: TYPEAP = {
    "1": '24小时热榜',
    "2": '周热榜'
}
const title = computed(() => TypeAP[props.hotType])

const hotList = ref([] as any)
const getHotList = async () => {
    const res = await getHotGoodsAPT({
        id: props.id,
        type: props.hotType,
        limit: 2
    }) as any
    hotList.value = res.result as any
    console.log(res)
}
onMounted(() => {
  getHotList()  
})



</script>

<style lang="scss" scoped>
.goods-hot {

    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 0px 34px;
        text-align: center;
        background: #fff;
    }
}

</style>



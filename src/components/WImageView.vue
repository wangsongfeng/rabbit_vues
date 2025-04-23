<template>
    <div class="goods-image">
        <!-- 左侧大图 -->
         <div class="middle" ref="target">
            <img :src="imageList[activeIndex]" alt="">
         </div>
         <!-- 小图列表 -->
          <ul class="small">
            <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandler(i)" :class="{active : i == activeIndex}">
                <img :src="img" alt="">
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


defineProps({
    imageList: {
        type: Array,
        default: () => []
    } as any
})

const activeIndex = ref(0)

const enterhandler = (i: any) => {
    activeIndex.value = i
}

</script>

<style lang="scss" scoped>
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;

    }


    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}

</style>
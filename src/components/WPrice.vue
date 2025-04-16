<template>
    <div class="r-price-components" :class="isLine?'lineclass':''">
        <span class="priceunit" :style="priceStyle"> {{ unit }} </span>
        <span class="pricenum" :style="priceStyle"> {{ priceNum }} </span>
    </div>
</template>

<script lang="ts" setup>

import { computed } from "vue";

const props = defineProps({
    //符号
    unit: {
        type: String,
        default: "¥"
    },
    //字体大小
    size: {
        type: String,
        default: '12'
    },
    //字体粗细
    bold: {
        type: String,
        value: '500'
    },
    price: {
        type:[Number,String],
        default: 100
    },

    autofix: {
        type: Boolean,
        default: false
    },

    //是否划线价格
    isLine: {
        type: Boolean,
        default: false
    }
})

 //价格的样式
 const priceStyle = computed( () => {
    return {
        'font-size': `${props.size}px`,
        'font-weight': `${props.bold}`
    }
 })

 //是否自动tofix
 const priceNum = computed ( () => {
    if (props.autofix) {
        return props.price
    } else {
        return props.price
    }
 })

</script>

<style lang="scss" scoped>
.r-price-components {
    color: $priceColor;
    line-height: 1.5;
}

.lineclass {
    text-decoration: line-through;
    color: #999;
}

</style>
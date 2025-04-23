<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.id">
            <dt> {{ item.name }} </dt>
            <dd>
                <template v-for="val in item.values" :key="val.name">
                    <img :class="{selected: val.selected, disabled: val.disabled}" 
                    @click="clickSpecs(item,val)" v-if="val.picture" :src="val.picture" alt="">
                    <span :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)" v-else>{{
                        val.name
                    }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<script lang="ts" setup>
import bwPowerSet from '@/utils/power_set';
import { watchEffect } from 'vue';

const emit = defineEmits(['change'])

const props = defineProps({
    goods: {
        type: Object,
        default: () => ({ specs: [], skus: [] })
    }
})


const spliter = '★'
//根据skus数据得到字典对象
const getPathMap = (skus: any) => {
    const pathMap: {[key: string]: any[]} = {}
    if (skus && skus.length > 0) {
        skus.forEach((sku: any) => {
            // 1. 过滤出有库存有效的sku
            if (sku.inventory) {
                // 2. 得到sku属性值数组
                const specs = sku.specs.map((spec: { valueName: any; }) => spec.valueName)
                // 3. 得到sku属性值数组的子集
                const powerSet = bwPowerSet(specs)
                // 4. 设置给路径字典对象
                powerSet.forEach(set => {
                    const key = set.join(spliter)
                    // 如果没有就先初始化一个空数组
                    if (!pathMap[key]) {
                        pathMap[key] = []
                    }
                    pathMap[key].push(sku.id)
                })
            }
        })
    }

    return pathMap
}

let pathMap : {[key: string]: any[]}= {}
watchEffect(() => {
    // 得到所有字典集合
    console.log(props.goods)
    pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
})

const clickSpecs = (item: any, val: any) => {

}


</script>

<style lang="scss" scoped>
@mixin sku-state-mixin {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
        border-color: $xtxColor;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                margin-bottom: 4px;
                @include sku-state-mixin;
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                margin-bottom: 4px;

                @include sku-state-mixin;
            }
        }
    }
}

</style>
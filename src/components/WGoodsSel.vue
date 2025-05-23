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
                // 2. 得到sku属性值数组 const specs = sku.specs.map(spec => spec.valueName)
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
// 初始化禁用状态
function initDisabledStatus (specs: any, pathMap: any) {
  if (specs && specs.length > 0) {
    specs.forEach((spec: { values: any[]; }) => {
      spec.values.forEach(val => {
        // 设置禁用状态
        val.disabled = !pathMap[val.name]
      })
    })
  }
}


let pathMap : {[key: string]: any[]}= {}
watchEffect(() => {
    // 得到所有字典集合
    console.log(props.goods.skus)
    pathMap = getPathMap(props.goods.skus)

    // 组件初始化的时候更新禁用状态
    initDisabledStatus(props.goods.specs, pathMap)
})

const clickSpecs = (item: any, val: any) => {
    if (val.disabled) return false
      // 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach((bv: { selected: boolean; }) => { bv.selected = false })
        val.selected = true
      }
      // 点击之后再次更新选中状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 把选择的sku信息传出去给父组件
      // 触发change事件将sku数据传递出去
      const selectedArr = getSelectedArr(props.goods.specs).filter((value: any) => value)
      // 如果选中得规格数量和传入得规格总数相等则传出完整信息(都选择了)
      // 否则传出空对象
      if (selectedArr.length === props.goods.specs.length) {
        // 从路径字典中得到skuId
        const skuId = pathMap[selectedArr.join(spliter)][0]
        const sku = props.goods.skus.find((sku: { id: any; }) => sku.id === skuId)
        // 传递数据给父组件
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p: any, n: { name: any; valueName: any; }) => `${p} ${n.name}：${n.valueName}`, '').trim()
        })
      } else {
        emit('change', {})
      }
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs: any, pathMap: any) => {
  // 遍历每一种规格
  specs.forEach((item: { values: any[]; }, i: string | number) => {
    // 拿到当前选择的项目
    const selectedArr = getSelectedArr(specs)
    // 遍历每一个按钮
    item.values.forEach(val => {
      if (!val.selected) {
        selectedArr[i as any] = val.name
        // 去掉undefined之后组合成key
        const key = selectedArr.filter(value => value).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}

// 得到当前选中规格集合
const getSelectedArr = (specs: any[]) => {
  const selectedArr: undefined[] = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find((val: { selected: any; }) => val.selected)
    if (selectedVal) {
      selectedArr[index] = selectedVal.name
    } else {
      selectedArr[index] = undefined
    }
  })
  return selectedArr
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
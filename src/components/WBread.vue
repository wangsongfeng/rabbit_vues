

<script>
import { h } from 'vue';
export default {
    name: 'WBread', //// 组件名为"wbread"
    render () { // 使用render函数进行渲染
        // 1. 获取默认插槽内容
        const slotArr = this.$slots.default()
        
        // 2. 准备渲染数据数组
        const renderData = []
        // 3. 处理每个插槽项
        slotArr.forEach ((item,index) => {
            renderData.push(item)
            if (index < slotArr.length - 1) {
                renderData.push(h('i', { class: 'iconfont icon-next-icon' }))
            }
        })
        return h('div', { class: 'r-bread-components' }, renderData)
    }
}

</script>

<style lang="scss">

.r-bread-components{
  display: flex;
  align-items: center;
  .r-bread-item{
    display: flex;
    align-items: center;
    span{
      font-size: 13px;
      color: #666;
    }
    a{
      font-size: 14px;
      color: #333;
      display: block;
      &:hover{
        color: $xtxColor;
      }
    }
    &:last-child{
      a{
        color: $xtxColor;
      }

    }
  }
  .icon-next-icon{
    font-size: 15px;
    margin: 0 5px;
  }
}
</style>
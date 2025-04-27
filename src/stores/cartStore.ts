import { CartItem, Goods, SkuObject } from './../utils/power_set';
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStores";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";


export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    //1、定义state- cartList
    const cartList = ref([] as any)
    //获取最新购物车列表action
    const updateNewList = async () => {
        const res = await findNewCartListAPI() as any
        cartList.value = res.result as any
        console.log(res)
    }

    // 定义 action - addCart
const addCart = async (goods: any) => {
    const { skuId, count } = goods;
    console.log(goods)
    if (isLogin.value) {
      // 登录之后的加入购物车逻辑
      await insertCartAPI({ skuId, count } as Goods);
      updateNewList();
    } else {
      
      // 未登录状态的本地购物车操作
      const item = cartList.value.find((item: CartItem) => goods.skuId === item.skuId);
      console.log(item)
      if (item) {
        // 商品已存在，数量+1
        item.count += count; // 这里改为 += count 更合理，可以支持添加多个
      } else {
        // 新商品，添加到购物车
        cartList.value.push({
          ...goods,
          selected: true // 默认选中状态
        });
      }
    }
  };


   // 删除购物车 -> 登录状态下
   const delCart = async (skuId: any) => {
      if (isLogin.value) {
          // 调用接口实现接口购物车中的删除功能
          await delCartAPI([skuId])
          updateNewList()
      } else {
          // 思路：
          // 1. 找到要删除项的下标值 - splice
          // 2. 使用数组的过滤方法 - filter
          const idx = cartList.value.findIndex((item: CartItem) => skuId === item.skuId)
          cartList.value.splice(idx, 1)
      }
  }

  // 清除购物车
  const clearCart = () => {
      cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId: any, selected: any) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item: CartItem) => item.skuId == skuId)
      item.selected = selected
  }

  // 全选功能
  const allCheck = (selected : any) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item: { selected: any; }) => item.selected = selected)
  }


  // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a: any, c: { count: any; }) => a + c.count, 0))
  // 2. 总价 所以项的count * price之和
  const allPrice = computed(() => cartList.value.reduce((a: number, c: { count: number; price: number; }) => a + c.count * c.price, 0))

  // 3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter((item: { selected: any; }) => item.selected).reduce((a: any, c: { count: any; }) => a + c.count, 0))
  // 4. 已选择商品价格合计
  const selectedPrice = computed(() => cartList.value.filter((item: { selected: any; }) => item.selected).reduce((a: number, c: { count: number; price: number; }) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item: { selected: any; }) => item.selected))


  return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      updateNewList
  }
},{
    persist: true
})
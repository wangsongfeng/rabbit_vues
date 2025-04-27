
//管理用户数据
import { mergeCartAPI } from '@/apis/cart';
import { loginAPI, LoginParams } from '@/apis/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCartStore } from './cartStore';


export const useUserStore = defineStore('user', ()=>{

    const cartStore = useCartStore()

    const userInfo = ref({} as any)

    const getUserInfo = async ({account,password}: LoginParams) => {
        const res = await loginAPI({account,password}) as any
        userInfo.value = res.result

        // 合并购物车的操作
        await mergeCartAPI(cartStore.cartList.map((item: { skuId: any; selected: any; count: any; }) => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewList()

    }

    //退出登录
    const clearuserInfo = () => {
        userInfo.value = {}
    }

    return {
        userInfo,
        getUserInfo,
        clearuserInfo
    }
},{
    persist: true //// 开启当前store.js模块的持久化，效果就是会将仓库中的全部state数据存储在本地
})
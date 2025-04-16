import httpInstance from "@/utils/http";

//获取banner
export function getBannerAPI(params = {} as any) {
    //默认为1 商品为2
    const { distributionSite = '1' } = params

    return httpInstance({
        url: '/home/banner',
        params : {
            distributionSite
        }
    })
}

//获取新鲜好物
export const findNewsAPI = () => {
    return httpInstance( {
        url: '/home/new'
    })
}

//获取人气推荐
export const findHotsAPI = () => {
    return httpInstance( {
        url: '/home/hot'
    })
}

//获取商品列表模块
export const getGoodsAPI = () => {
    return httpInstance({
        url: '/home/goods'
    })
}

//获取最新专题
export const getNewsSpaceAPI = () => {
    return httpInstance({
        url:'/home/special'
    })
}
import httpInstance from "@/utils/http";

// 1. 定义请求参数类型 
export interface HotGoodParmas {
    id: number,
    type: string,
    limit: number,
}

export const getDetail = (id: any) => {
    return httpInstance({
        url: '/goods',
        params: {
            id
        }
    })
}

export const getHotGoodsAPT = ({id,type,limit = 3}: HotGoodParmas) => {
    return httpInstance({
        url: '/goods/hot',
        params: {
            id,
            type,
            limit
        }
    })
}
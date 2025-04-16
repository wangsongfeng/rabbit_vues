import httpInstance from "@/utils/http"

// 1. 定义请求参数类型 
export interface LoginParams {
    account: string
    password: string
}

export const loginAPI = ({account, password}: LoginParams) => {
    return httpInstance({
        url: '/login',
        method: 'POST',
        data: {
            account,password
        }
    })
}

//获取喜欢列表
export const getLikeListAPI = ({limit = 4}) => {
    return httpInstance({
        url: '/goods/relevant',
        params: {
            limit
        }
    })
}
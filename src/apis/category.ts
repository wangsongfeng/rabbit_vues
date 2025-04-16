import httpInstance from '@/utils/http';

export function getCategoryAPI(id: any) {
    return httpInstance({
        url: "/category",
        params: {
            id
        }
    })
}

// 获取二级分类列表数据

export const getCategoryFilterAPI = (id: any) => {
    return httpInstance({
        url: '/category/sub/filter',
        params: {
            id
        }
    })
}

//获取导航数据

export const getSubCategoryAPI = (data: any) => {
    return httpInstance({
        url: '/category/goods/temporary',
        method: 'POST',
        data
    })
}
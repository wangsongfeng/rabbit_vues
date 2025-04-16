import { ref } from 'vue';
import { defineStore } from "pinia";
import { getCategoryAPI } from '../apis/layout'

export const useCategoryStore = defineStore('category', () => {
    
    const categoryList = ref([] as any)

    const getCategory = async () => {
        const res = await getCategoryAPI() as any
        categoryList.value = res.result
    }

    return {
        categoryList,
        getCategory,
    }
})
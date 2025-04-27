import router from "@/router";
import { useUserStore } from "@/stores/userStores";
import axios from "axios";
import { ElMessage } from "element-plus";

//axios基础的封装
 const httpInstance = axios.create({
    baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout: 5000
 })

 //请求拦截器

 httpInstance.interceptors.request.use(config => {
   const userStore = useUserStore()
   const token = userStore.userInfo.token
   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }
    return config
 },e => Promise.reject(e))

 //响应拦截器

 httpInstance.interceptors.response.use(res => res.data,e => {
   // 从pinia里面获取token数据
   const userStore = useUserStore()
   // 统一错误提示
   ElMessage({
       type: 'warning',
       message: e.response.data.message
   })
   // 401 token失效处理
   // 1. 清除本地用户数据
   // 2. 跳转到登录页
   if (e.response.status == 401) {
       userStore.clearuserInfo()
       router.push('/login')
   }
    return Promise.reject(e)
 })

 export default httpInstance



//useIntersectionObserver：来自 @vueuse/core，用于检测目标元素是否进入视口。
import { useIntersectionObserver } from '@vueuse/core';

import {  Ref,ref } from "vue";

type MaybeElement = HTMLElement | SVGElement | null | undefined

//target：要观察的 DOM 元素（通常是模板中的 ref）。
//apiFn：一个返回 Promise 的函数，用于请求数据（如 Axios 请求）。

/**
 * 
 * 使用 useIntersectionObserver 监听 target 是否进入视口。
当 isIntersecting 为 true（即元素进入视口）时：
调用 stop() 停止观察（避免重复触发）。
调用 apiFn 获取数据，并将结果赋值给 result.value。
 */

const useLazyData = <T = any, R = { data: T }>(
    target: Ref<MaybeElement> | MaybeElement,
    apiFn: () => Promise<R>,
    dataSelector: (res: any) => T = (res: any) => res.data as any// 默认从 data 属性获取
  ): Ref<T> => {
    const result = ref<T>([] as T) as Ref<T>
    
    const { stop } = useIntersectionObserver(target,([{ isIntersecting }],observerElement) => {
        if (isIntersecting) {
            console.log("isIntersecting")
            stop()
            apiFn().then((res) => {
                result.value = dataSelector(res as any)
            })
        }
      }
    )
  
    return result
  }

  export default useLazyData
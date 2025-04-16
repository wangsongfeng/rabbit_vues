//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core';
import { App, DirectiveBinding } from 'vue';

export const lazyPlugin = {
    install(app: App): void {
        app.directive('img-lazy', {
            mounted(el: HTMLImageElement, binding: DirectiveBinding<string>): void {
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            el.src = binding.value;
                            stop();
                        }
                    }
                );
            },
        });
    },
};
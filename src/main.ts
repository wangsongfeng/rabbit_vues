import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import {createPinia} from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import '@/styles/common.scss'
import '@/styles/iconfont.scss'

//懒加载插件
import { lazyPlugin } from '@/directives/index'

const app= createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)

app.use(lazyPlugin)

app.mount('#app')

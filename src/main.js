//引入初始化样式
import '@/styles/common.scss'

import { createApp } from 'vue'
//持久化store配置
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { componentPlugin } from './components'
//引入懒加载插件
import { lazyPlugin } from './directives'
//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

const app = createApp(App)

//注册持久化Store插件并use
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(componentPlugin)
app.use(lazyPlugin)

app.mount('#app')


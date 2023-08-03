//引入初始化样式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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

app.use(createPinia())
app.use(router)
app.use(componentPlugin)
app.use(lazyPlugin)

app.mount('#app')


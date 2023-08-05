import axios from "axios";
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { userInfoStore } from "@/stores/userStore";
import router from "@/router";
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000

})

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = userInfoStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

//token过期会报401


// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {  //  res=>res.data:执行res,快捷获取data。e=>用于处理错误响应的回调
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  const userStore = userInfoStore()
  if (e.response.status === 401) {
    userStore.clearUser()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance
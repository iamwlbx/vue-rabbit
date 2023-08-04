//管理用户相关数据
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user'
export const userInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({})
  const getuserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
  const clearUser = (() => {
    userInfo.value = {}
  })
  return { userInfo, getuserInfo, clearUser }
}, {
  // 默认存入localstorage，优先从本地取
  // 始终让pinia和loaclstorage保持一致
  persist: true
})
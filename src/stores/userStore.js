//管理/存储 用户相关数据
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from "@/apis/cart";
import { usecartStore } from "./cartStore";
export const userInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({})
  const cartStore = usecartStore()
  //登录并返回用户数据
  const getuserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //合并购物车,后,获取列表
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }
  const clearUser = (() => {
    userInfo.value = {}
    cartStore.clearCart()
  })
  return { userInfo, getuserInfo, clearUser }
}, {
  // 默认存入localstorage，优先从本地取
  // 始终让pinia和loaclstorage保持一致
  persist: true
})
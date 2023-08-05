//购物车数据

import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { userInfoStore } from "./userStore";
import { findNewCartListAPI, insertCartAPI, delCartAPI } from "@/apis/cart";

export const usecartStore = defineStore('cart', () => {
  //存储购物车列表state
  const cartList = ref([])
  const userStore = userInfoStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 或者

  // 封装获取列表和覆盖
  const updateNewList = async () => {
    const res = await findNewCartListAPI()  //获取列表
    cartList.value = res.result //覆盖
  }

  //加入购物车=>判断本地/服务器
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //已登录，则调用加入购物车接口，再获取最新的购物车列表，再覆盖本地
      await insertCartAPI(skuId, count) //登陆状态时的加入
      updateNewList() //获取和覆盖
    } else {
      //未登录，加入本地购物车
      const item = cartList.value.find(item => goods.skuId === item.skuId)
      if (item) {
        //已添加 => skuId,count+1
        item.count++
      } else {
        //未添加,push
        cartList.value.push(goods)
      }
    }
  }

  //删除购物车列表
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    } else {
      //  1.splice
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
      //  2.filter
      // const idx1 = cartList.value.filter((item) => item.skuId !== skuId)
      // cartList.value = idx1
    }
  }

  //清除购物车
  const clearCart = () => {
    cartList.value = []
  }


  const changeCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => skuId === item.skuId)
    item.selected = selected
  }
  const changeAll = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }


  const allCount = computed(() => cartList.value.reduce((a, item) => a + item.count, 0))//  a:每次累加完后交给a ; item:每一项
  const allPrice = computed(() => cartList.value.reduce((a, item) => a + item.count * item.price, 0))
  const isAll = computed(() => cartList.value.every((item) => item.selected)) //every:测试每一项，是否都能满足条件
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, item) => a + item.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, item) => a + item.count * item.price, 0))


  return {
    cartList,

    addCart,
    delCart,
    changeAll,
    changeCheck,
    clearCart,
    updateNewList,

    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true
})
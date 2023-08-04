//购物车数据

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usecartStore = defineStore('cart', () => {
  //state
  const cartList = ref([])


  const addCart = (goods) => {
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      //已添加 => skuId,count+1
      item.count = item.count + goods.count
    } else {
      //未添加,push
      cartList.value.push(goods)
    }
  }
  const delCart = (skuId) => {
    //  1.splice
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
    //  2.filter
    // const idx1 = cartList.value.filter((item) => item.skuId !== skuId)
    // cartList.value = idx1
  }

  const allCount = computed(() => cartList.value.reduce((a, item) => a + item.count, 0))//  a:每次累加完后交给a ; c:每一项
  const allPrice = computed(() => cartList.value.reduce((a, item) => a + item.count * item.price, 0))
  return { cartList, addCart, delCart, allCount, allPrice }
}, {
  persist: true
})
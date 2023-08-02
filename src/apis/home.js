//获取轮播图数据
import httpInstance from "@/utils/http";
export function getBannerAPI() {
  return httpInstance({
    url: '/home/banner'
  })
}
//规范注释
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */

export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */

export const findHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}
/**
 * @description: 获取产品列表
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
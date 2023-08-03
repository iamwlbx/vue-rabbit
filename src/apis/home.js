
import httpInstance from "@/utils/http";

//获取轮播图数据
export function getBannerAPI(params = {}) {
  const { distributionSite = '1' } = params //解构赋值，默认给 1 。传值则为2，不传为默认1
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
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
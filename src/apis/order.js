//订单相关
import httpInstance from "@/utils/http";

//获取详情页
export const getCheckInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre',
  })
}
export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}
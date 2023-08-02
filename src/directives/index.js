//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install(app) {
    //懒加载指令
    app.directive('img-lazy', {
      mounted(el, binding) {  //el:指令绑定的元素对象（img），binding:指令对象=>binding.value:等于号 后面绑定的表达式的值=>url
        // console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          el, ([{ isIntersecting }]) => { //isIntersecting判断是否进入可视区域
            // console.log(isIntersecting)
            if (isIntersecting) {
              //进入视口区域
              el.src = binding.value
              stop()
            }
          }
        )
      },
    })
  }
}
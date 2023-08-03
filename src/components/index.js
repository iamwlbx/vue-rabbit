//把components中所有组件进行全局化注册,省去引用的步骤
//通过插件的方式，定义index.js文件，再在main.js注册

import ImgView from './ImgView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin = {
  install(app) {
    //app.component('组件名字'，组件配置对象)

    app.component('XtxImgView', ImgView)
    app.component('XtxSku', Sku)
  }
}
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import icon from './components/icon/index'

// 全局挂载 状态栏的高度
Vue.prototype.$statusBarHeight = uni.getSystemInfoSync().statusBarHeight;

// 全局注册注册my-icon组件
Vue.component("myIcon",icon)

const app = new Vue({
    ...App
})
app.$mount()

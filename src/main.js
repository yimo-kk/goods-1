// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
// import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import ElementUI from 'element-ui'
import Avue from '@smallwei/avue'
import fullCalendar from 'vue-fullcalendar'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import '@/assets/style/conmon.less'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@smallwei/avue/lib/theme-chalk/index.css'
import { dateFilter, dateTimeFilter } from '@/libs/filters' // 日期解析
import BaiduMap from 'vue-baidu-map'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView)
Vue.use(Avue);
Vue.use(ElementUI);
Vue.use(TreeTable)
Vue.use(VOrgTree)
Vue.use(fullCalendar);
Vue.use(require('vue-moment'));
Vue.use(require('moment'));
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'cXLOs7CRZ1SmVQI9HBSvDAnY1U3oXQnn'
})
Vue.filter('dateTimeFilter', dateTimeFilter)
Vue.filter('dateFilter', dateFilter)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  store,
  render: h => h(App)
})

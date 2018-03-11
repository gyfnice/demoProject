import Vue from 'vue'
import VueRouter from 'vue-router'

import AppView from './components/App.vue'

Vue.use(VueRouter);

import routes from './routes'
//import lodash from 'lodash';
import store from './store'

//import echarts from 'echarts'
//Vue.prototype.$echarts = echarts

//Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

//import WechatAuth from './utils/auth';
//import wxConfig from './utils/wx.config';

//import wx from './utils/weixin';

// Import Helpers for filters
//import { prettyDate, minSecond } from './filters'

// Import Install and register helper items
//Vue.filter('prettyDate', prettyDate)
//Vue.filter('minSecond', minSecond)


//const FastClick = require('fastclick')
//FastClick.attach(document.body)

//Vue.use(require('vue-wechat-title'))

import Api from '~/App/api'

Api.interceptors(store)
//require('./utils/weixin')

//require('es6-promise').polyfill()

// Routing logic
var router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

//微信jssdk插件初始化
//wxConfig.init(store)

//确认页面间的加载策略（先数据再加载页面）
router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
      // 我们只关心之前没有渲染的组件
      // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
   // store.commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在加载'})
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        })
      }
    })).then(() => {
      console.log('加载成功');
      // 停止加载指示器(loading indicator)
      //store.commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在加载'})

      next()
    }).catch(next)
})


router.afterEach(routes => {
  if(typeof routes.meta.description !== undefined) {
      //console.log('-->', routes.meta.description);
  }
})

Api.request('get', 'system/login', {

}).then((res) => {
    store.commit('getLoginInfo', {
        name: "admin",
        password: 123456
    })
})

new Vue({
  el: "#root",
  store,
  router: router,
  render: h => h(AppView)
})


/**
* @param {String}  errorMessage   错误信息
* @param {String}  scriptURI      出错的文件
* @param {Long}    lineNumber     出错代码的行号
* @param {Long}    columnNumber   出错代码的列号
* @param {Object}  errorObj       错误的详细信息，Anything
*//*
function error(msg,url,line){
   var REPORT_URL = "/static/img/error_log.gif"; // 收集上报数据的信息
   var m =[msg, url, line, navigator.userAgent, +new Date];// 收集错误信息，发生错误的脚本文件网络地址，用户代理信息，时间
   var url = REPORT_URL + m.join('||');// 组装错误上报信息内容URL
   var img = new Image;
   img.onload = img.onerror = function(){
      img = null;
   };
   console.log(url);
   img.src = url;// 发送数据到后台cgi
}
// 监听错误上报
window.onerror = function(msg,url,line){
   error(msg,url,line);
}*/
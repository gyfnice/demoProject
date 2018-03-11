import Api from '~/App/api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let Tinfo = {
	name: 'testName',
	data: [{
		age:1
	}, {
		age: 2
	}]
}
export default new Vuex.Store({
	state: {
		//它的数据模型
		houseList: {
			title: 'detail'
		},
		houseDetail: {

		},
		loginInfo: {

		}
	},
	actions: {
	      loadDetail({commit, state}, info) {
	      	//执行异步代码
	      	console.log('gyf-store-phone', info.phone)
	      	return Api.request('get', 'system/login', {
	      		name: '1'
	      	}).then((res)=>{
	      		
		           console.log('java return object', res)
		 }).catch((res) => {
		 	console.log('error')
		 })
	      },
	      loadList({commit, state}, info) {
	      	console.log(info.phone)
      	      	return Api.request('get', 'system/list', {
      	      		name: '1'
      	      	}).then((res) => {
      	      		if(!res) {
      	      			//alert('error')
      	      			//return
      	      			//假设获取数据成功
      	      			console.log('---', Tinfo)
      	      			commit('getList', Tinfo)
      	      		}
      		           console.log('java return object', res)
      		 }).catch((res) => {
      		 	console.log('error')
      		 })
	      }
	},
	mutations: {
		getList(state, data) {
			Vue.set(state, 'houseList',  data)
		},
		getLoginInfo(state, data) {
			Vue.set(state, 'loginInfo', data)
		}
		//通过commit执行mutation里面的方法，注意是同步的
	},
	getters: {
		
	}
})
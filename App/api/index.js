import axios from 'axios'

const devMode = true;

//接口的集中配置中心
const router = {
    system: {
        login: '/system/login',
        logout: '/system/logout',
        list: 'system/list'
    },
    common: {
        findRegionlist: '/common/findRegionlist'
    }
}

function interceptorsMethod(store) {
    //全局Ajax监控
    axios.interceptors.response.use((response) => {
     
      return response
    }, (error) => {
        console.log('test-error')
        console.log(error.response);
        Promise.resolve(error.response)
    })

    axios.interceptors.request.use((request) => {
      //console.log('---0---');
      //store.commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在加载'})
      return request
    }, (error) => {
        //store.dispatch('displayErrorLoad');
        console.log(error);
        Promise.reject(error)
    })
}


function requestMethod(method, url, data = null) {
    if (!method) {
        console.error('API function call requires method argument')
        return
    }

    if (!url) {
        console.error('API function call requires url argument')
        return
    }
   const [path, subPath] = url.match(/\w+/g);

    if(devMode && path !== 'api') {
        method = 'get';
        return new Promise((resolve, reject) => {
              setTimeout(() => {
                axios({
                    method,
                    url,
                    data,
                    timeout: 5000
                }).then((res) => {
                    resolve(res)
                })
              }, 1000)
        })
    }
    return axios({
              method,
              url,
              data,
              timeout: 3000
           })
}
export default  {
     serverURI: '',
     getURL: (url) => {
         url = url.replace(/^\//, "");
         const [path, subPath] = url.match(/\w+/g);
         //console.log('path--->', path);
         if(devMode && path !== 'api') {
            var webroot = "/test/";
            let devPath = url.replace(/\//g, ""); //test/systemlogin.json
            return webroot + devPath + ".json";
         }
         return router[path][subPath]
     },
     request:requestMethod,
     interceptors: interceptorsMethod

 };
import Vue from 'vue'
import App from './App'

import store from './store'

/*
api.js
    export const Login = (params) => {
        return fly.post('/api/TokenAuth/Authenticate', params)
    }
...	
import * as API from '@/libs/ajax/api.js'
Vue.prototype.$api = API
// 调用 this.$api.Login(data);
*/

Vue.config.productionTip = false

Vue.prototype.$store = store
//Vue.prototype.$eventHub = new Vue(); 
App.mpType = 'app'

import router from './router/uni-app-router.js'
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
Vue.component('router-link',routerLink)

const app = new Vue({
    store,
	router,
    ...App	
})
app.$mount()

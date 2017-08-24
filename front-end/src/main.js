import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
 import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import func from "./public/func";
import api from "./api/api";

Vue.use(ElementUI);

Vue.prototype.$http = axios;
Vue.prototype.api = api;
Vue.prototype.func = func;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');




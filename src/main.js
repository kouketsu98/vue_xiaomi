//ES6 导入导出语法
import Vue from 'vue';
import  router from './router';
import './assets/reset.css';
import './assets/public.css';
import './assets/fonts/iconfont.css';
import http from "./utils/http.js";

Vue.prototype.$http = http;

new Vue({
        el: "#app",
        router,
        template: "<router-view></router-view>"

});
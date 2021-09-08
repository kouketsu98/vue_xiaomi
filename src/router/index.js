import Vue from 'vue';
import  VueRouter from 'vue-router';
import Category from "../views/Category";
import  Home from '../views/Home';
import Cart from '../views/Cart';
import Profile from '../views/Profile';
import Login from '../views/Login';
Vue.use(VueRouter);

export default new VueRouter({
        linkActiveClass: "active",
        routes:[
                {path:"/",redirect: "/home"},
                {path:'/category',component: Category},
                {path:'/home',component: Home},
                {path: "/cart",component: Cart},
                {path: "/profile", component: Profile},
                {path: "/login",component: Login},
        ]
});
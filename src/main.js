import Vue from 'vue';
import App from './app.vue';

const Home = () => import('./components/home/home.vue');
const Member = () => import('./components/member/member.vue');
const Shoptcart = () => import('./components/shopcart/shopcart.vue');
const Search = () => import('./components/search/search.vue');
const NewsList = () => import('./components/news/newslist.vue');
const NewsDetail = () => import('./components/news/newsdetail.vue');
const PhotoList = () => import('./components/photo/photolist.vue');
const PhotoDetail = () => import('./components/photo/photodetail.vue');
const ProductList = () => import('./components/product/productlist.vue');
const ProductDetail = () => import('./components/product/productdetail.vue');
// import Home from './components/home/home.vue';
// import Member from './components/member/member.vue';
// import Shoptcart from './components/shopcart/shopcart.vue';
// import Search from './components/search/search.vue';
// import NewsList from './components/news/newslist.vue';
// import NewsDetail from './components/news/newsdetail.vue';
// import PhotoList from './components/photo/photolist.vue';
// import PhotoDetail from './components/photo/photodetail.vue';
// import ProductList from './components/product/productlist.vue';
// import ProductDetail from './components/product/productdetail.vue';
import VueRouter from 'vue-router';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import Axios from 'axios';
import './static/css/mui.css';
import './static/css/icon.css';
import './static/fonts/mui.ttf';
import './static/css/global.css';
import './iconfont.js';
import jquery from 'jquery';
import moment from 'moment';
import NavBar from './components/common/navBar.vue';
import Comment from './components/common/comment.vue';
import Swipe from './components/common/swipe.vue';
import VuePreview from 'vue-preview';

window.$ = jquery;
window.moment = moment;
Vue.prototype.$axios = Axios;
Vue.prototype.moment = moment;
Axios.defaults.baseURL = 'http://localhost:8080/MobileAPI/api/';
Axios.interceptors.request.use(function (config){
    Mint.Indicator.open({
        text: 'Loading',
        spinnerType: 'fading-circle'
    });
    return config
});
Axios.interceptors.response.use(function (config){
    Mint.Indicator.close();
    return config
});
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VuePreview);

let router = new VueRouter({
    mode: 'history',
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:{name:'home'}},
        {name:'home',path:'/home',component:Home},
        {name:'member',path:'/member',component:Member},
        {name:'shopcart',path:'/shopcart',component:Shoptcart},
        {name:'search',path:'/search',component:Search},
        {name:'news.list',path:'/news/list',component:NewsList},
        {name:'news.detail',path:'/news/detail',component:NewsDetail},
        {name:'photo.list',path:'/photo/list',component:PhotoList},
        {name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail},
        {name:'product.list',path:'/product/list',component:ProductList},
        {name:'product.detail',path:'/product/detail',component:ProductDetail}
    ]
});

//global component
Vue.component('navBar',NavBar);
Vue.component('comment',Comment);
Vue.component('swipe',Swipe);

new Vue({
    el: '#app',
    router,
    render: c => c(App)
});
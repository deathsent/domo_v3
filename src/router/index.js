import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import Stock from "../components/Manage/Stock.vue"
import Account from "../components/Manage/Account.vue"
import Product from "../components/Product.vue"

Vue.use(VueRouter);

// const Userinfo = JSON.parse(localStorage.getItem("usertoken"))
// console.log('55555666555',Userinfo);
// let userRole = Userinfo.role
// console.log('7775544', userRole);
// if (userRole ==='')

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/stock",
    name: "Stock",
    component: Stock,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

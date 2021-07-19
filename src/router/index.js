import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Register.vue"),
  },
  {
    path: "/listing",
    name: "Listing",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Listing.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

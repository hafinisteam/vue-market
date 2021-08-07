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
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/listing",
    name: "Listing",
    component: () =>
      import(/* webpackChunkName: "listing" */ "../views/Listing.vue"),
  },
  {
    path: "/listing/:post_id",
    name: "Listing details",
    component: () =>
      import(
        /* webpackChunkName: "listing-details" */ "../views/ListingDetails.vue"
      ),
  },
  {
    path: "/community/create",
    name: "Create community",
    component: () =>
      import(
        /* webpackChunkName: "create-community" */ "../views/CreateCommunity.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

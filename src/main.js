import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/styles/main.scss";
import PortalVue from "portal-vue";
import Vuelidate from "vuelidate";
import Axios from "axios";
import VueCarousel from "vue-carousel";
import dayjs from "dayjs";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(PortalVue);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.use(VueCarousel);
Vue.config.$dayjs = dayjs;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

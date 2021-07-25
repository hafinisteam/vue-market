import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  mutations: {
    saveToken(state, payload) {
      state.token = payload.token;
    },
    logOut(state) {
      state.token = "";
      state.user = "";
    },
  },
  actions: {},
  modules: {},
});

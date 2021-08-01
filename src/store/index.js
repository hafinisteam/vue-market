import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    communityData: [],
    communityId: "",
    postId: "",
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    communityId: (state) => {
      return state.communityId;
    },
    communityData: (state) => {
      return state.communityData;
    },
    postId: (state) => {
      return state.postId;
    },
  },
  mutations: {
    saveToken(state, payload) {
      state.token = payload.token;
    },
    logOut(state) {
      state.token = "";
      state.user = "";
    },
    saveCommunityData(state, payload) {
      state.communityData = payload.communityData;
    },
    saveCommunityId(state, payload) {
      state.communityId = payload.communityId;
    },
    savePostId(state, payload) {
      state.postId = payload.postId;
    },
  },
  actions: {},
  modules: {},
});

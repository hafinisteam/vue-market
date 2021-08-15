import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    communityData: JSON.parse(localStorage.getItem("communityData")) || [],
    communityId: localStorage.getItem("communityId") || "",
    currentCommunity:
      JSON.parse(localStorage.getItem("currentCommunity")) || {},
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
    getUser: (state) => {
      return state.user;
    },
    currentCommunity: (state) => {
      return state.currentCommunity;
    },
  },
  mutations: {
    saveToken(state, payload) {
      state.token = payload.token;
    },
    saveUser(state, payload) {
      state.user = payload.user;
    },
    logOut(state) {
      state.token = "";
      state.user = "";
    },
    saveCommunityData(state, payload) {
      state.communityData = payload.communityData;
    },
    saveCurrentCommunityId(state, payload) {
      state.communityId = payload.communityId;
    },
    saveCurrentCommunity(state, payload) {
      state.currentCommunity = payload.currentCommunity;
    },
    savePostId(state, payload) {
      state.postId = payload.postId;
    },
  },
  actions: {},
  modules: {},
  plugins: [new VuexPersistence().plugin],
});

<template>
  <div id="listing">
    <Header />
    <Sidebar />
    <div class="bazaar-list">
      <div
        v-if="getCurrentCommunity"
        class="community-header textd-flex align-items-center flex-column"
      >
        <div
          class="bazaar-logo d-flex align-items-center justify-content-center"
        >
          <img class="w-100" :src="getCurrentCommunity.imageUrl" alt="" />
        </div>
        <div class="mt-2 text-center">
          <div class="mb-1 community-name">{{ getCurrentCommunity.name }}</div>
          <div class="d-inline-block member-count">
            {{ getCurrentCommunity.membersCount }} members
          </div>
        </div>
      </div>
      <div v-if="posts.length > 0">
        <div
          class="community-post"
          v-for="(post, index) in posts"
          :key="index.postId"
        >
          <router-link class="to-details" :to="'/listing/' + post.postId">
            <div class="d-flex justify-content-between">
              <div class="item-info mb-3">{{ post.title }}</div>
              <div class="created">{{ parseDay(post.createdAt) }}</div>
            </div>
            <div
              class="item-thumb"
              v-bind:class="{
                'single-item': getPostImages(post).length == 1,
                'double-item': getPostImages(post).length == 2,
                'triple-item': getPostImages(post).length == 3,
              }"
            >
              <div
                v-for="(image, index) in getPostImages(post)"
                :key="index"
                class="thumb"
              >
                <img :src="image" alt="" />
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="rounded-circle overflow-hidden">
                <img v-if="post.imageUrl" :src="post.imageUrl" alt="" />
                <img v-else src="../assets/icon_user.svg" alt="" />
              </div>
              <div class="info-wrapper">
                <div class="name">{{ post.firstName }} {{ post.lastName }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <img src="../assets/data_placeholder.png" alt="" />
        <div>No post yet :)</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import { BASE_URL } from "@/assets/urls/config";
import request from "../services/requests";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs().format();

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    Header,
    Sidebar,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    getCommunityData: function () {
      return this.$store.getters.communityData;
    },
    getCurrentCommunity: function () {
      return this.$store.getters.currentCommunity;
    },
    currentId: function () {
      return this.$store.getters.communityId;
    },
  },
  watch: {
    currentId() {
      this.getCommunityPost();
    },
  },
  methods: {
    parseDay(date) {
      return dayjs().to(dayjs(date));
    },
    getPostImages(post) {
      return post.items
        .map((item) => {
          return item.images;
        })
        .flat();
    },
    getCommunityPost: async function () {
      const id = this.$store.getters.communityId;
      try {
        const response = await request.get(
          `${BASE_URL}/community-listings/${id}`
        );
        this.posts = response.data;
        this.$store.commit("savePostId", {
          postId: response.data.postId,
        });
      } catch (e) {
        console.log(e);
      }
    },
    handleRedirect() {
      if (this.isLoggedIn == false) {
        return this.$router.push({ path: "/" });
      }
    },
  },
  mounted: function () {
    this.handleRedirect();
    this.getCommunityPost();
  },
};
</script>

<style></style>

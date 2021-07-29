<template>
  <div id="listing">
    <div
      class="header-inner w-100 d-flex align-items-center justify-content-end"
    >
      <div class="logo">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </div>
      <Header />
    </div>
    <div class="bazaar-list">
      <div
        v-if="getCommunityData.length > 0"
        class="community-header textd-flex align-items-center flex-column"
      >
        <div
          class="bazaar-logo d-flex align-items-center justify-content-center"
        >
          <img class="w-100" :src="getCommunityData[0].imageUrl" alt="" />
        </div>
        <div class="mt-2 text-center">
          <div class="mb-1 community-name">{{ getCommunityData[0].name }}</div>
          <div class="d-inline-block member-count">
            {{ getCommunityData[0].membersCount }} members
          </div>
        </div>
      </div>
      <div v-if="posts.length > 0">
        <div
          class="community-post"
          v-for="(post, index) in posts"
          :key="index.postId"
        >
          <div class="d-flex justify-content-between">
            <div class="item-info">{{ post.title }}</div>
            <div class="created">{{ post.createdAt }}</div>
          </div>
          <div class="item-thumb double-item">
            <div class="thumb">
              <img :src="post.items[0].images[0]" alt="" />
            </div>
            <div class="thumb">
              <img :src="post.items[0].images[1]" alt="" />
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="d-flex text-center align-items-center"></div>
            <div class="rounded-circle overflow-hidden">
              <img v-if="post.imageUrl" :src="post.imageUrl" alt="" />
              <img v-else src="../assets/icon_user.svg" alt="" />
            </div>
            <div class="info-wrapper">
              <div class="name">{{ post.firstName }} {{ post.lastName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { BASE_URL } from "@/assets/urls/config";
import axios from "axios";
import dayjs from "dayjs";
dayjs().format();
const currentDate = dayjs();
const createdDate = dayjs("2021-01-25");
let df = currentDate.diff(createdDate, "month");
console.log(df);

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    Header,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    getCommunityData: function () {
      return this.$store.getters.communityData;
    },
  },
  methods: {
    getCommunities() {
      const token = localStorage.getItem("token");
      axios
        .get(`${BASE_URL}/communities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$store.commit("saveCommunityData", {
            communityData: response.data,
          });
          this.$store.commit("saveCommunityId", {
            communityId: response.data[0].communityId,
          });
          this.getCommunityPost();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCommunityPost() {
      const token = localStorage.getItem("token");
      const id = this.$store.getters.communityId;
      axios
        .get(`${BASE_URL}/community-listings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleRedirect() {
      if (this.isLoggedIn == false) {
        return this.$router.push({ path: "/" });
      }
    },
  },
  mounted: function () {
    this.handleRedirect();
    this.getCommunities();
  },
};
</script>

<style></style>

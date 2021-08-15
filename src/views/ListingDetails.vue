<template>
  <div id="listing-details">
    <Header />
    <Sidebar />
    <div class="text-center mb-4 mt-4">
      <div class="item-info mb-2">
        {{ listingDetails.title }}
      </div>
      <div v-if="listingDetails.items" class="item-count">
        {{ listingDetails.items.length }} items
      </div>
    </div>
    <div class="d-flex align-items-center flex-column text-center mb-4">
      <div class="rounded-circle details-circle overflow-hidden mb-1">
        <img
          v-if="listingDetails.imageUrl"
          :src="listingDetails.imageUrl"
          alt=""
        />
        <img v-else src="../assets/icon_user.svg" alt="" />
      </div>
      <div class="info-wrapper">
        <div class="name">
          {{ listingDetails.firstName }} {{ listingDetails.lastName }}
        </div>
      </div>
    </div>
    <div
      class="details-wrapper"
      v-for="(details, index) in listingDetails.items"
      :key="index.itemId"
    >
      <div class="details-inner">
        <div class="d-flex justify-content-between item-details mb-3">
          <div>
            <div class="fs-14 weight-800 text-left">
              {{ details.name }}
            </div>
            <div class="fs-12 weight-800 color-gray text-left">
              {{ parseDay(listingDetails.createdAt) }}
            </div>
          </div>
          <div class="price fs-14 weight-800">${{ details.price }}</div>
        </div>
        <carousel class="slider" :per-page="1">
          <slide
            v-for="(image, index) in details.images"
            :key="index"
            class="slide"
          >
            <img :src="image" alt="" />
          </slide>
        </carousel>
        <div class="fs-14 p-18 text-left">{{ details.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import { BASE_URL } from "@/assets/urls/config";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs().format();

export default {
  data() {
    return {
      listingDetails: [],
    };
  },
  components: {
    Header,
    Sidebar,
  },
  methods: {
    parseDay(date) {
      return dayjs().to(dayjs(date));
    },
    getListingDetails() {
      axios
        .get(`${BASE_URL}/listing/` + this.$route.params.post_id)
        .then((response) => {
          this.listingDetails = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.getListingDetails();
  },
};
</script>

<style></style>

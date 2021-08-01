<template>
  <div id="listing-details">
    <div
      class="header-inner w-100 d-flex align-items-center justify-content-end"
    >
      <div class="logo">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </div>
      <Header />
    </div>
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
    <div class="details-wrapper">
      <div class="details-inner">
        <div class="d-flex justify-content-between item-details mb-3">
          <div>
            <div class="fs-14 weight-800 text-left">
              {{ listingDetails.items[0].name }}
            </div>
            <div class="fs-12 weight-800 color-gray">
              {{ listingDetails.createdAt }}
            </div>
          </div>
          <div class="price fs-14 weight-800">
            ${{ listingDetails.items[0].price }}
          </div>
        </div>
        <carousel class="slider" :per-page="1">
          <slide class="slide">
            <img :src="listingDetails.items[0].images[0]" alt="" />
          </slide>
          <slide class="slide">
            <img :src="listingDetails.items[0].images[1]" alt="" />
          </slide>
        </carousel>
        <div class="fs-14 p-18 text-left">How much is this gear?</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { BASE_URL } from "@/assets/urls/config";
import axios from "axios";
export default {
  data() {
    return {
      listingDetails: {},
    };
  },
  components: {
    Header,
  },
  methods: {
    getListingDetails() {
      axios
        .get(`${BASE_URL}/listing/` + this.$route.params.post_id)
        .then((response) => {
          this.listingDetails = response.data;
          console.log(response.data);
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

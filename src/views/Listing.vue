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
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted: function () {
    if (this.isLoggedIn == false) {
      return this.$router.push({ path: "/" });
    }
  },
};
</script>

<style></style>

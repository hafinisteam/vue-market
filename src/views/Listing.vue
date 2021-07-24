<template>
  <div id="listing">
    <div
      class="header-inner w-100 d-flex align-items-center justify-content-end"
    >
      <div class="logo">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </div>
      <div class="user-area">
        <b-dropdown class="account">
          <template #button-content>
            <img src="../assets/icon_user.svg" class="user-avatar" alt="" />
          </template>
          <b-dropdown-item href="#">
            <span v-on:click="logout" class="menuItem" role="menuitem">
              <img src="../assets/icon_logout.svg" alt="" />
              Logout
            </span></b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    logout: function () {
      this.$store.commit("logOut");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>

<template>
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
</template>

<script>
export default {
  methods: {
    logout: function () {
      this.$store.commit("logOut");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-area {
  width: 180px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}

.account {
  .user-avatar {
    cursor: pointer;
    width: 28px;
    height: 28px;
    border: 3px solid rgb(230, 230, 230);
    border-radius: 50%;
  }

  .dropdown-toggle {
    color: #fff;
    background-color: white;
    border-color: white;
    box-shadow: none;

    &:hover,
    &:focus {
      color: #fff;
      background-color: white;
      border-color: white;
      box-shadow: none;
    }
  }

  .menuItem {
    img {
      width: 20px;
      margin-right: 15px;
    }
  }
}
</style>

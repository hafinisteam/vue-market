<template>
  <div class="header-inner w-100 d-flex align-items-center justify-content-end">
    <div class="logo">
      <router-link to="/listing">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </router-link>
    </div>
    <div class="user-area">
      <span class="squad-icon fs-12">
        <router-link to="/community/create"> New Community </router-link>
      </span>
      <div class="btn-sell">Sell</div>
      <b-dropdown class="dropdown-btn">
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

<style lang="scss">
.user-area {
  width: 200px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}
.user-avatar {
  cursor: pointer;
  width: 28px;
  height: 28px;
  border: 3px solid rgb(230, 230, 230);
  border-radius: 50%;
}

.dropdown-btn {
  .btn-secondary {
    color: #fff !important;
    background-color: white !important;
    border-color: white !important;
    box-shadow: none;

    &:hover,
    &:focus {
      color: #fff;
      background-color: white;
      border-color: white;
      box-shadow: none;
    }

    &::after {
      display: none;
    }
  }
}

.menuItem {
  img {
    width: 20px;
    margin-right: 15px;
  }
}
.btn-sell {
  font-weight: 800;
  font-size: 16px;
  color: rgb(103, 78, 255);
  cursor: pointer;
}
</style>

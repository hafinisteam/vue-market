<template>
  <div class="header-inner w-100 d-flex align-items-center justify-content-end">
    <div class="logo">
      <router-link to="/listing">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </router-link>
    </div>
    <div class="user-area">
      <span class="squad-icon fs-12" v-b-toggle.communities-sidebar>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.46203 0H1.32878C1.01055 0 0.705361 0.126415 0.480341 0.351434C0.255321 0.576454 0.128906 0.881647 0.128906 1.19987V8.33312C0.128906 8.65135 0.255321 8.95654 0.480341 9.18156C0.705361 9.40658 1.01055 9.533 1.32878 9.533H8.46203C8.78025 9.533 9.08545 9.40658 9.31047 9.18156C9.53549 8.95654 9.6619 8.65135 9.6619 8.33312V1.19987C9.6619 0.881647 9.53549 0.576454 9.31047 0.351434C9.08545 0.126415 8.78025 0 8.46203 0ZM7.26215 7.13025H2.52865V2.39975H7.26215V7.13025Z"
            fill="current"
          />
          <path
            d="M12.5358 9.533H19.6691C19.9873 9.533 20.2925 9.40658 20.5175 9.18156C20.7425 8.95654 20.8689 8.65135 20.8689 8.33312V1.19987C20.8689 0.881647 20.7425 0.576454 20.5175 0.351434C20.2925 0.126415 19.9873 0 19.6691 0H12.5358C12.2176 0 11.9124 0.126415 11.6874 0.351434C11.4624 0.576454 11.3359 0.881647 11.3359 1.19987V8.33312C11.3359 8.65135 11.4624 8.95654 11.6874 9.18156C11.9124 9.40658 12.2176 9.533 12.5358 9.533ZM13.7357 2.40275H18.4692V7.13325H13.7357V2.40275Z"
            fill="current"
          />
          <path
            d="M12.5983 20.8028H19.7316C20.0498 20.8028 20.355 20.6764 20.58 20.4513C20.805 20.2263 20.9314 19.9211 20.9314 19.6029V12.4696C20.9314 12.1514 20.805 11.8462 20.58 11.6212C20.355 11.3962 20.0498 11.2698 19.7316 11.2698H12.5983C12.2801 11.2698 11.9749 11.3962 11.7499 11.6212C11.5249 11.8462 11.3984 12.1514 11.3984 12.4696V19.6029C11.3984 19.9211 11.5249 20.2263 11.7499 20.4513C11.9749 20.6764 12.2801 20.8028 12.5983 20.8028ZM13.7982 13.6725H18.5317V18.403H13.7982V13.6725Z"
            fill="current"
          />
          <path
            d="M8.33312 11.2698H1.19987C0.881647 11.2698 0.576454 11.3962 0.351434 11.6212C0.126415 11.8462 0 12.1514 0 12.4696V19.6029C0 19.9211 0.126415 20.2263 0.351434 20.4513C0.576454 20.6764 0.881647 20.8028 1.19987 20.8028H8.33312C8.65135 20.8028 8.95654 20.6764 9.18156 20.4513C9.40658 20.2263 9.533 19.9211 9.533 19.6029V12.4696C9.533 12.1514 9.40658 11.8462 9.18156 11.6212C8.95654 11.3962 8.65135 11.2698 8.33312 11.2698ZM7.13325 18.4H2.39975V13.6695H7.13325V18.4Z"
            fill="current"
          />
        </svg>
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

.squad-icon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  svg {
    transition: fill 0.3s ease 0s;
    fill: rgb(223, 223, 223);
    &:hover {
      fill: rgb(103, 78, 255);
    }
  }
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
    padding: 0;

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

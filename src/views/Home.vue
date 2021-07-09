<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo_welcome.svg" />
    <div class="login-register">
      <router-link to="/login">
        <DefaultButton class="login" title="Login" variant="primary" />
      </router-link>
      <router-link to="/register">
        <DefaultButton class="register" title="Sign up" variant="secondary" />
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DefaultButton from "@/components/DefaultButton.vue";
export default {
  name: "Home",
  components: {
    DefaultButton,
  },
};
</script>
<style lang="scss">
.home {
  padding: 90px 24px 60px;
  max-width: 526px;
  margin: 0px auto;
}
</style>

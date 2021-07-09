<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo_welcome.svg" />
    <div class="login-register">
      <router-link to="/login">
        <Button class="login" title="Login" variant="primary" />
      </router-link>
      <router-link to="/register">
        <Button class="register" title="Sign up" variant="secondary" />
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue";
export default {
  name: "Home",
  components: {
    Button,
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

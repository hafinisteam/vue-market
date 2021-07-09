<template>
  <div id="login">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </router-link>
    </div>
    <div class="welcome-txt">
      <h5>Welcome back</h5>
      <span class="d-block">Login with your email</span>
    </div>
    <div class="login-form">
      <form action="" novalidate>
        <DefaultInput type="email" name="email" placeholder="Email" />
        <DefaultInput type="password" name="password" placeholder="Password" />
        <DefaultButton title="Login" variant="secondary" />
      </form>
    </div>
  </div>
</template>
<script>
import DefaultInput from "@/components/DefaultInput.vue";
import DefaultButton from "@/components/DefaultButton.vue";
export default {
  components: {
    DefaultInput,
    DefaultButton,
  },
};
</script>

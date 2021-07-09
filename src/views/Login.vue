<template>
  <div id="login">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </router-link>
    </div>
    <div class="title">
      <h5>Welcome back</h5>
      <span class="d-block">Login with your email</span>
    </div>
    <div class="login-form">
      <form action="" novalidate>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button title="Login" variant="secondary" />
      </form>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
export default {
  components: {
    Input,
    Button,
  },
};
</script>

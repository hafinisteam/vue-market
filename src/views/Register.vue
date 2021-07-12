<template>
  <div id="register">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </router-link>
    </div>
    <div class="title">
      <h5>Register</h5>
    </div>
    <div class="register-form">
      <form v-if="isStep1 == true" action="" novalidate>
        <label for="Name">What's your name?</label>
        <Input type="text" name="firstName" placeholder="First" />
        <Input type="text" name="lastName" placeholder="Last" />
        <Button @click="isStep1 = false" title="Next" variant="secondary" />
      </form>
      <form v-if="isStep1 == false" action="" novalidate>
        <label for="Username">Pick a username</label>
        <Input
          type="text"
          name="userName"
          placeholder="What should everyone call you?"
        />
        <label for="Account">Account</label>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button
          :disabled="true"
          title="Create an account"
          variant="secondary"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
export default {
  data() {
    return {
      isStep1: true,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
    };
  },
  components: {
    Input,
    Button,
  },
};
</script>

<style></style>

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
      <form action="" novalidate>
        <label for="Name">What's your name?</label>
        <DefaultInput type="text" name="firstName" placeholder="First" />
        <DefaultInput type="email" name="email" placeholder="Email" />
        <label for="Username">Pick a username</label>
        <DefaultInput
          type="text"
          name="userName"
          placeholder="What should everyone call you?"
        />
        <label for="Account">Account</label>
        <DefaultInput type="email" name="email" placeholder="Email" />
        <DefaultInput type="password" name="password" placeholder="Password" />
        <DefaultButton
          :disabled="true"
          title="Create an account"
          variant="secondary"
        />
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

<style></style>

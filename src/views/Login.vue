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
        <Input type="email" name="email" placeholder="Email" v-model="email" />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
        />
        <Button :disabled="$v.$invalid" title="Login" variant="secondary" />
      </form>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  components: {
    Button,
    Input,
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
  },
};
</script>

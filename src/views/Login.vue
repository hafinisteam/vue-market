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
      <form novalidate>
        <Input type="email" name="email" placeholder="Email" v-model="email" />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
        />
        <Button
          :disabled="$v.$invalid"
          @onclick="login"
          title="Login"
          variant="secondary"
        />
      </form>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";
import { BASE_URL } from "@/assets/urls/config";

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
    login: function () {
      this.handleSubmit();
      let email = this.email;
      let password = this.password;
      const that = this;
      axios
        .post(`${BASE_URL}/login`, {
          email,
          password,
        })
        .then(function (response) {
          that.$store.commit("saveToken", {
            token: response.data.token,
          });
          localStorage.setItem("token", response.data.token);
          that.$router.push({ path: "/listing" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

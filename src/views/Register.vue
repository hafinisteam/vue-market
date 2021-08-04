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
        <Input
          v-model="firstName"
          type="text"
          name="firstName"
          placeholder="First"
        />
        <Input
          v-model="lastName"
          type="text"
          name="lastName"
          placeholder="Last"
        />
        <Button @onclick="handleNext" title="Next" variant="secondary" />
      </form>
      <form v-if="isStep1 == false" action="" novalidate>
        <label for="Username">Pick a username</label>
        <Input
          type="text"
          name="userName"
          placeholder="What should everyone call you?"
          v-model="username"
        />
        <label for="Account">Account</label>
        <Input v-model="email" type="email" name="email" placeholder="Email" />
        <div class="password-form">
          <Input
            :type="type"
            name="password"
            placeholder="Password"
            v-model="password"
          />
          <div v-on:click="showPassword" class="icon-wrapper">
            <img
              v-if="type === 'password'"
              src="../assets/icon_eye.svg"
              class="icon"
              alt=""
            />
            <img
              v-else
              src="../assets/icon_eye_closed.svg"
              class="icon"
              alt=""
            />
          </div>
        </div>
        <Button
          :disabled="$v.$invalid"
          title="Create an account"
          variant="secondary"
          @onclick="signup"
          :loading="true"
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
      isStep1: true,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
      type: "password",
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
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    username: {
      required,
    },
  },
  components: {
    Input,
    Button,
  },
  methods: {
    handleNext() {
      this.isStep1 = false;
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    signup: function () {
      this.handleSubmit();
      let email = this.email;
      let password = this.password;
      let confirmPassword = this.password;
      let firstName = this.firstName;
      let lastName = this.lastName;
      let username = this.username;
      const that = this;
      axios
        .post(`${BASE_URL}/signup`, {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          country: "",
          phoneNumber: "",
          username,
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

<style></style>

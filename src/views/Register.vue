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
            <img :src="getPasswordIcon()" class="icon" alt="" />
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
import request from "../services/requests";
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
    getPasswordIcon() {
      return this.type === "password"
        ? require("../assets/icon_eye.svg")
        : require("../assets/icon_eye_closed.svg");
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    signup: async function () {
      this.handleSubmit();
      let email = this.email;
      let password = this.password;
      let confirmPassword = this.password;
      let firstName = this.firstName;
      let lastName = this.lastName;
      let username = this.username;
      try {
        const response = await request.post(`${BASE_URL}/signup`, {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          country: "",
          phoneNumber: "",
          username,
        });
        this.$store.commit("saveToken", {
          token: response.data.token,
        });
        this.$store.commit("saveUser", {
          user: response.data.user,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.getCommunities();
      } catch (e) {
        console.log(e);
      }
    },
    getCommunities: async function () {
      try {
        const response = await request.get(`${BASE_URL}/communities`);
        this.$store.commit("saveCommunityData", {
          communityData: response.data,
        });
        this.$store.commit("saveCurrentCommunityId", {
          communityId: response.data[0].communityId,
        });
        this.$store.commit("saveCurrentCommunity", {
          currentCommunity: response.data[0],
        });
        localStorage.setItem("communityData", JSON.stringify(response.data));
        localStorage.setItem(
          "currentCommunity",
          JSON.stringify(response.data[0])
        );
        localStorage.setItem("communityId", response.data[0].communityId);
        this.$router.push({ path: "/listing" });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>

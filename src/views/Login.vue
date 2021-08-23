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
          @onclick="login"
          title="Login"
          variant="secondary"
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
import { BASE_URL } from "@/assets/urls/config";
import request from "../services/requests";

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
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
  },
  components: {
    Button,
    Input,
  },
  methods: {
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
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
    login: async function () {
      this.handleSubmit();
      let email = this.email;
      let password = this.password;
      try {
        const response = await request.post(`${BASE_URL}/login`, {
          email,
          password,
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

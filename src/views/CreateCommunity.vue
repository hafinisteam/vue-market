<template>
  <div class="create-community">
    <div class="logo">
      <router-link to="/listing">
        <img src="../assets/bazaar_logo.svg" alt="" />
      </router-link>
    </div>
    <div class="create-form text-center">
      <form v-on:submit.prevent="createCommunity">
        <div v-if="isStep1 === true" class="form-step step-1">
          <div class="form-header">
            <div class="first-title fs-20 weight-800 mb-2">
              Create your community
            </div>
            <div class="second-title fs-14 weight-800 color-gray">
              Your community is where you and your friends buy and sell
              eachothers stuff
            </div>
          </div>
          <div class="avatar-wrapper d-flex justify-content-center">
            <div v-if="file === null">
              <div class="inner">
                <div
                  class="
                    placeholder
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <img src="../assets/icon_camera.svg" alt="" />
                  <div class="add">
                    <svg
                      width="11"
                      height="12"
                      viewBox="0 0 11 12"
                      fill="current"
                      stroke="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.50046 0.400146V11.6001M0.133789 6.00015H10.8671"
                        fill="current"
                        stroke-width="1.7875"
                      />
                    </svg>
                  </div>
                </div>
                <input class="avatar" type="file" @change="onFileSelected" />
              </div>
            </div>
            <div v-else class="text-center">
              <div class="preview">
                <img :src="imageUrl" alt="" />
              </div>
              <div class="change-photo fs-12 weight-800">
                Change photo
                <input class="avatar" type="file" @change="onFileSelected" />
              </div>
            </div>
          </div>
          <div class="community-name">
            <label for="communityName">Pick a community name</label>
            <Input
              v-model="name"
              type="text"
              name="communityName"
              placeholder="What is your community called?"
            />
          </div>
          <div class="form-footer">
            <Button
              :disabled="$v.$invalid"
              title="Next"
              variant="secondary"
              :loading="true"
              type="submit"
            />
          </div>
        </div>
        <div v-else class="form-step step-2">
          <div class="form-header">
            <div class="first-title fs-20 weight-800 mb-2">Invite</div>
            <div class="second-title fs-14 weight-800 color-gray">
              Share this invite link with people to join your community.
            </div>
          </div>
          <div class="avatar-wrapper d-flex justify-content-center">
            <div class="text-center">
              <div class="preview">
                <img :src="imageUrl" alt="" />
              </div>
            </div>
          </div>
          <div class="community-link">
            <input type="text" :value="inviteUrl" readonly disabled />
            <div v-on:click="handleCopy" class="icon-wrapper">
              <img :src="getCopyIcon()" class="icon" alt="" />
            </div>
          </div>
          <div class="form-footer">
            <router-link to="/listing">
              <Button title="Skip" variant="secondary" />
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "../urls/config";
import request from "../services/requests";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import copy from "copy-to-clipboard";
export default {
  mixins: [validationMixin],

  data() {
    return {
      file: null,
      name: "",
      imageUrl: "",
      isStep1: true,
      inviteUrl: "",
      isCopy: false,
    };
  },
  validations: {
    file: {
      required,
    },
    name: {
      required,
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
    onFileSelected(e) {
      const url = e.target.files[0];
      this.imageUrl = URL.createObjectURL(url);
      this.file = e.target.files[0];
    },
    getCopyIcon() {
      return this.isCopy === true
        ? require("../assets/icon_tick.svg")
        : require("../assets/icon_copy.svg");
    },
    handleCopy() {
      copy(this.inviteUrl);
      this.isCopy = true;
    },
    createCommunity: async function () {
      this.handleSubmit();
      const fd = new FormData();
      fd.append("file", this.file, this.file.name);
      fd.append("name", this.name);
      try {
        const response = await request.post(`${BASE_URL}/create-community`, fd);
        this.isStep1 = false;
        const slug = response.data.communitySlug;
        const user = this.$store.getters.getUser;
        const { username } = user;
        this.inviteUrl = `${window.location.origin}/community/invite?slug=${slug}&inviter=${username}`;
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
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>

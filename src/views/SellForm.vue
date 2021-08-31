<template>
  <div id="sell-page">
    <Header :defaultLogo="false" :title="headerTitle" />
    <span
      v-if="isStep1 == false"
      @click="handlePreviousStep()"
      class="btn-edit fs-12"
      >Edit</span
    >
    <Sidebar />
    <div class="sell-form">
      <form action="">
        <div class="form-step step-1" v-if="isStep1 == true">
          <label for="Sale Name">Sale Name</label>
          <Input
            v-model="$v.title.$model"
            type="text"
            name="title"
            placeholder="What is your sale called?"
          />
          <div class="invalid" v-if="$v.title.$error">
            <span v-if="!$v.title.required">Sale name is required</span>
          </div>
          <Button @onclick="handleNextStep" title="Next" variant="secondary" />
        </div>
        <div class="form-step step-2" v-else>
          <div
            v-for="(sellField, sellFieldIndex) in items"
            :key="sellFieldIndex"
            :set="(v = $v.items.$each[sellFieldIndex])"
            class="sell-field-array"
          >
            <div class="avatar-wrapper d-flex justify-content-center">
              <div class="d-flex" v-if="sellField.images.length > 0">
                <div
                  v-for="(imageFile, imageFileIndex) in sellField.images"
                  :key="imageFileIndex"
                  class="thumb"
                >
                  <div
                    class="thumb-remove"
                    @click="handleRemoveThumb(sellFieldIndex, imageFileIndex)"
                  >
                    <img src="../assets/icon_close.svg" alt="" />
                  </div>
                  <div class="preview">
                    <img :src="renderImageFromFile(imageFile)" alt="" />
                  </div>
                </div>
              </div>
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
                <input
                  class="avatar"
                  type="file"
                  @change="onFileSelected($event, sellFieldIndex)"
                />
                <div class="invalid" v-if="v.images.$error">
                  <span v-if="!v.images.required">Please upload images</span>
                </div>
              </div>
            </div>
            <div class="form-group item-name">
              <label for="Item Name">Item Name</label>
              <Input
                v-model="sellField.name"
                type="text"
                name="name"
                placeholder="What are you selling?"
              />
              <div class="invalid" v-if="v.name.$error">
                <span v-if="!v.name.required">Please upload images</span>
              </div>
            </div>
            <div class="form-group description">
              <label for="Description">Description</label>
              <textarea
                name="description"
                v-model="sellField.description"
                placeholder="Do tell"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group price">
              <label for="Price">Price</label>
              <input v-model="sellField.price" type="number" name="price" />
              <div class="invalid" v-if="v.price.$error">
                <span v-if="!v.price.required">Please upload images</span>
              </div>
            </div>
            <button
              @click="deleteSellField()"
              class="btn-delete bordered"
              :disabled="items.length < 2"
            >
              Delete
            </button>
          </div>
          <div class="form-action d-flex">
            <Button
              class="btn-add bordered"
              title="Add Another"
              variant="outline-secondary"
              @onclick="addSellField"
            />
            <Button
              class="btn-post"
              title="Post"
              variant="secondary"
              @onclick="handleValidations"
              :disabled="$v.$invalid"
            />
            <b-modal hide-header hide-footer id="community-list">
              <template #default="{ hide }">
                <div
                  v-for="(item, index) in getCommunityData"
                  :key="index"
                  class="community-item d-flex align-items-center"
                  @click="handleSelectedCommunity(item, index)"
                >
                  <img class="rounded-circle" :src="item.imageUrl" alt="" />
                  <div class="community-info">
                    <div class="name weight-800">{{ item.name }}</div>
                    <div class="members fs-12 weight-800 color-gray">
                      {{ item.membersCount }} members
                    </div>
                  </div>
                  <div
                    class="
                      community-checkbox
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                    :class="{ selected: item.communityId === getCurrentId }"
                  >
                    <img
                      v-if="item.communityId === getCurrentId"
                      src="../assets/icon_community_checked.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div class="button-footer d-flex">
                  <button class="bordered" @click="hide()">Cancel</button>
                  <button class="submit" @click="createPost()">OK</button>
                </div>
              </template>
            </b-modal>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import { BASE_URL, ROUTES } from "../urls/config";
import request from "../services/requests";
export default {
  mixins: [validationMixin],
  data() {
    return {
      headerTitle: "Sell",
      isStep1: true,
      title: "",
      communityId: "",
      items: [
        {
          images: [],
          name: "",
          description: "",
          price: 0,
        },
      ],
    };
  },
  components: {
    Header,
    Sidebar,
    Input,
    Button,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    getCommunityData: function () {
      return this.$store.getters.communityData;
    },
    getCurrentId: function () {
      return this.$store.getters.communityId;
    },
  },
  validations: {
    title: {
      required,
    },
    items: {
      $each: {
        name: {
          required,
        },
        price: {
          minValue: minValue(1),
        },
        images: {
          required,
        },
      },
    },
  },
  methods: {
    handleRedirect() {
      if (this.isLoggedIn == false) {
        return this.$router.push({ path: "/" });
      }
    },
    handleNextStep() {
      this.$v.title.$touch();
      if (this.$v.title.$invalid) {
        return;
      } else {
        this.isStep1 = false;
        this.headerTitle = this.title;
      }
    },
    handlePreviousStep() {
      this.isStep1 = true;
      this.headerTitle = "Sell";
    },
    onFileSelected(e, index) {
      const file = e.target.files[0];
      this.items[index].images.push(file);
    },
    renderImageFromFile(imageFile) {
      return URL.createObjectURL(imageFile);
    },
    handleRemoveThumb(fieldIndex, imageIndex) {
      this.items[fieldIndex].images.splice(imageIndex, 1);
    },
    handleValidations() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$root.$emit("bv::show::modal", "community-list");
    },
    handleSelectedCommunity(item) {
      this.$store.commit("saveCurrentCommunityId", {
        communityId: item.communityId,
      });
    },
    addSellField() {
      this.items.push({
        images: [],
        name: "",
        description: "",
        price: 0,
      });
    },
    deleteSellField(fieldIndex) {
      this.items.splice(fieldIndex, 1);
    },
    createPost: async function () {
      this.handleValidations();
      const formData = new FormData();
      formData.append("title", this.title);
      this.items.forEach((item, index) => {
        formData.append("name[]", item.name);
        formData.append("price[]", parseInt(item.price));
        formData.append("description[]", item.description);
        item.images.forEach((img) => {
          formData.append(`images${index}[]`, img);
        });
      });
      formData.append("communityId", this.communityId);
      try {
        await request.post(`${BASE_URL}/post`, formData);
        this.$router.push(ROUTES.LISTING);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.handleRedirect();
  },
  beforeMount() {
    this.communityId = this.$store.getters.communityId;
  },
};
</script>

<style></style>

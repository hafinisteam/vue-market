<template>
  <div v-if="loading === false">
    <b-button
      class="btn-default"
      :variant="variant"
      @click="handleClick"
      :disabled="disabled"
      >{{ title }}</b-button
    >
  </div>
  <div v-else>
    <b-overlay
      :show="busy"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
      <b-button
        class="btn-default"
        :variant="variant"
        :disabled="disabled"
        @click="onClick"
      >
        {{ title }}
      </b-button>
    </b-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busy: false,
      timeout: null,
    };
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  props: {
    title: {
      type: String,
    },
    variant: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit("onclick");
    },
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    setTimeout(callback) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        callback();
      }, 3000);
    },
    onClick() {
      this.$emit("onclick");
      this.busy = true;
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-default {
  display: block;
  width: 100%;
  font-size: 14px;
  font-family: Arial;
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
  max-width: 327px;
  background: rgb(103, 78, 255);
  border: 1px solid rgb(103, 78, 255);
  border-radius: 12px;
  height: 49px;
  color: rgb(255, 255, 255);
  text-align: center;
  min-width: 67px;
  font-weight: bold;
  transition: all 0.3s ease-in-out 0s;
  &:hover {
    background: rgb(91, 68, 226);
  }
  &:focus {
    background: rgb(103, 78, 255) !important;
    border: 1px solid rgb(103, 78, 255) !important;
    box-shadow: none !important;
  }
  &.btn-primary {
    background-color: rgb(255, 225, 243);
    border-color: rgb(255, 225, 243);
    color: rgb(103, 78, 255);
    &:hover {
      background-color: rgb(243, 197, 224);
      border-color: rgb(243, 197, 224);
    }
  }
}
</style>

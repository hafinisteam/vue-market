<template>
  <div>
    <b-form-input
      class="default-input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      v-model="content"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: this.value,
    };
  },
  props: {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  watch: {
    content() {
      this.$emit("input", this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.default-input {
  width: 327px;
  margin: 0 auto;
  height: calc(1.5em + 0.75rem + 14px);
  border: 1px solid rgb(249, 249, 249);
  border-radius: 12px;
  background: rgb(249, 249, 249);
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 14px;
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
}
</style>

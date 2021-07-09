<template>
  <div>
    <b-button class="btn-default" :variant="variant" :disabled="disabled">{{
      title
    }}</b-button>
  </div>
</template>

<script>
export default {
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

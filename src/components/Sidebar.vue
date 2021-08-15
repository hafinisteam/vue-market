<template>
  <div>
    <b-sidebar id="communities-sidebar" lazy no-header v-model="visible">
      <template>
        <div v-if="getCommunityData.length > 0" class="community-thumblist">
          <img
            v-for="(item, index) in getCommunityData.slice(0, 4)"
            :key="index.communityId"
            :src="item.imageUrl"
            :style="{ zIndex: 20 - index }"
            alt=""
          />
        </div>
        <div
          v-if="getCommunityData.length > 0"
          class="community-button-wrapper"
        >
          <div
            v-for="(item, index) in getCommunityData"
            :key="index.communityId"
            class="btn-community"
            :class="{ active: item.communityId === getCurrentId }"
            v-on:click="handleCurrentId(item, index)"
          >
            <img :src="item.imageUrl" alt="" />
          </div>
        </div>
        <div class="community-sidebar-footer">
          <router-link to="/community/create">
            <button class="btn-add-community">
              <span>
                <svg
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  fill="current"
                  stroke="current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.50046 0.400146V11.6001M0.133789 6.00015H10.8671"
                    fill="current"
                    stroke-width="1.7875"
                  />
                </svg>
              </span>
            </button>
          </router-link>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    getCommunityData: function () {
      return this.$store.getters.communityData;
    },
    getCurrentId: function () {
      return this.$store.getters.communityId;
    },
  },
  methods: {
    handleCurrentId(item) {
      this.$store.commit("saveCurrentCommunityId", {
        communityId: item.communityId,
      });
      this.$store.commit("saveCurrentCommunity", {
        currentCommunity: item,
      });
    },
  },
};
</script>

<style lang="css">
#communities-sidebar {
  border-radius: 0px 24px 24px 0px;
  width: 106px;
  height: 100vh;
  box-shadow: 0px -10px 66px rgb(0 0 0 / 23%);
  background: rgb(255, 255, 255) !important;
}
.b-sidebar-body {
  padding: 70px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.community-thumblist {
  position: relative;
  display: flex;
}
.community-thumblist img {
  width: 23px;
  height: 23px;
  margin-right: -12px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
}
.community-button-wrapper {
  margin-top: 45px;
  flex: 1 1 0%;
  overflow: auto;
  text-align: center;
  width: 100%;
}
.community-button-wrapper::-webkit-scrollbar {
  display: none;
}
.btn-community {
  cursor: pointer;
  margin-bottom: 2rem;
  position: relative;
}
.btn-community.active:after {
  content: "";
  width: 3px;
  height: 100%;
  right: 0px;
  top: 0px;
  background-color: rgb(103, 78, 255);
  position: absolute;
}
.btn-community img {
  box-shadow: rgb(0 0 0 / 6%) 0px 6px 12px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.community-sidebar-footer {
  min-height: 70px;
}
.btn-add-community {
  background: rgb(243, 243, 243);
  box-shadow: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border: none;
}
.btn-add-community span {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
}
.btn-add-community svg {
  stroke: rgb(64, 56, 69);
}
</style>

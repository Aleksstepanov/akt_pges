<template>
  <div class="btn" @click="checkClickHandler()">
    <i class="material-icons">check</i>
  </div>
  <div class="btn" @click="clearChipHandler()">
    <i class="material-icons">clear</i>
  </div>
</template>

<script>
export default {
  name: "Chips",

  emits: ["check", "clear"],

  methods: {
    checkClickHandler() {
      this.$emit("check");
    },

    clearChipHandler() {
      this.$emit("clear");
    },
  },
};
</script>

<style scoped>
.btn {
  cursor: pointer;
  margin: 5px;
}
</style>

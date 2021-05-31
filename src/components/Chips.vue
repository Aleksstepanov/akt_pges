<template>
  <div class="chip" @click="checkClickHandler()">
    <i class="material-icons">check</i>
  </div>
  <div class="chip" @click="clearChipHandler()">
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

<style>
.chip {
  cursor: pointer;
}
</style>

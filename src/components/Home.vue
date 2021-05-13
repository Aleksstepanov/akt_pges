<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./NavBar.vue";

export default {
  name: "Home",

  components: {
    Navbar,
  },
};
</script>

<style></style>

<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./NavBar.vue";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default {
  name: "Home",

  components: {
    Navbar,
  },

  async created() {
    const db = firebase.database();
    await db
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .on("value", async (snapshot) => {
        const data = snapshot.val();
        localStorage.setItem("AKT_PGES_USER", JSON.stringify(data));
      });
    await db
      .ref(`akts/${firebase.auth().currentUser.uid}`)
      .on("value", async (snapshot) => {
        const data = snapshot.val();
        localStorage.setItem("AKT_PGES_AKTS", JSON.stringify(data));
      });
  },
};
</script>

<style></style>

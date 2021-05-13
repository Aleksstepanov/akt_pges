<template>
  <h4>Мои акты</h4>
  <hr />
  <table v-if="isLoading">
    <thead>
      <tr>
        <th>№ п/п</th>
        <th>Наименование объекта</th>
        <th>Номер акта</th>
        <th>Дата составления</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(el, idx) in getAktsList" :key="idx">
        <td>{{ idx + 1 }}</td>
        <td>{{ el.object }}</td>
        <td>{{ el.numberAkt }}</td>
        <td>{{ el.dateCreateAkt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default {
  name: "DashBoard",

  data() {
    return {
      akts: null,
      quantity: 0,
      isLoading: false,
    };
  },

  async created() {
    const db = firebase.database();
    await db
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .on("value", async (snapshot) => {
        const data = await snapshot.val();
        const { quantity } = await data;
        this.quantity = quantity;
        localStorage.setItem("AKT_PGES_USER", JSON.stringify(data));
      });
    await db
      .ref(`akts/${firebase.auth().currentUser.uid}`)
      .on("value", async (snapshot) => {
        const data = await snapshot.val();
        localStorage.setItem("AKT_PGES_AKTS", JSON.stringify(data));
        this.akts = data;
        this.isLoading = true;
      });
  },

  computed: {
    getAktsList() {
      if (this.akts) {
        return Object.values(...Object.values(this.akts));
      }
      return null;
    },

    getAktsValue() {
      return 1;
    },
  },
};
</script>

<style></style>

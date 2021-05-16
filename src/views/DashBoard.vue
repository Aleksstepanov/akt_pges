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
        <th>Удалить</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(el, idx) in getAktsList" :key="idx">
        <td>{{ idx + 1 }}</td>
        <td>{{ el.object }}</td>
        <td>{{ el.numberAkt }}</td>
        <td>{{ el.dateCreateAkt }}</td>
        <td>
          <button @click="deleteClickHanlder" class="btn" :data="el.numberAkt">
            <i class="material-icons">delete</i>
          </button>
        </td>
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

  methods: {
    deleteClickHanlder(event) {
      const objDOM = event.target;
      if (objDOM.parentNode.className === "btn") {
        this.deleteElemInAktsList(objDOM.parentNode.getAttribute("data"));
      } else {
        this.deleteElemInAktsList(objDOM.getAttribute("data"));
      }
    },

    async deleteElemInAktsList(dataAttr) {
      const [, , , year, number] = dataAttr.split("-");
      const RecordYear = Object.keys(this.akts).find((el) => el === year);
      await firebase
        .database()
        .ref(`akts/${firebase.auth().currentUser.uid}/${RecordYear}/${number}`)
        .remove();
      await firebase
        .database()
        .ref(`akts/${firebase.auth().currentUser.uid}/${RecordYear}`)
        .on("value", async (snaphot) => {
          const data = await snaphot.val();
          this.akts[RecordYear] = data;
          console.log(data);
          console.log(this.akts);
        });
    },
  },
};
</script>

<style></style>

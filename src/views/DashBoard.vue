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
      <tr v-for="(el, idx) in paginateData" :key="idx">
        <td>{{ idx + 1 + this.page * this.size }}</td>
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
  <ul class="pagination">
    <li class="waves-effect" :class="{ disabled: page === 0 }">
      <a href="#!" @click="prevPage"
        ><i class="material-icons">chevron_left</i></a
      >
    </li>
    <li
      v-for="(link, idx) in pageCount"
      :key="idx"
      :class="page === idx ? 'active orange darken-1' : 'waves-effect'"
      @click="page = idx"
    >
      <a href="#">{{ idx }}</a>
    </li>

    <li class="waves-effect" :class="{ disabled: page >= pageCount - 1 }">
      <a @click="nextPage" href="#!"
        ><i class="material-icons">chevron_right</i></a
      >
    </li>
  </ul>
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
      page: 0,
      filter: "",
      hasNextPage: true,
      size: 5,
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

    pageCount() {
      if (this.akts) {
        return Math.ceil(this.getAktsList.length / this.size);
      }
      return null;
    },

    paginateData() {
      const start = this.page * this.size;
      const end = start + this.size;
      return this.getAktsList.slice(start, end);
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
      this.quantity -= 1;
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}`)
        .update({
          quantity: this.quantity.toString(),
        });
      await firebase
        .database()
        .ref(`akts/${firebase.auth().currentUser.uid}/${RecordYear}`)
        .on("value", async (snaphot) => {
          const data = await snaphot.val();
          if (data) {
            this.akts[RecordYear] = data;
          } else this.akts[RecordYear] = null;
        });
    },

    nextPage() {
      if (this.page < this.pageCount - 1) {
        this.page += 1;
      }
    },

    prevPage() {
      if (this.page !== 0) {
        this.page -= 1;
      }
    },
  },

  watch: {
    filter() {
      this.page = 1;
      const { pathname } = window.location;
      window.history.pushState(
        null,
        document.title,
        `${pathname}?filter=${this.filter}&page=${this.page}`
      );
    },

    page() {
      const { pathname } = window.location;
      window.history.pushState(
        null,
        document.title,
        `${pathname}?filter=${this.filter}&page=${this.page}`
      );
    },
  },
};
</script>

<style></style>

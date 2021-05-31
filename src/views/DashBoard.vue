<template>
  <Loader v-if="showLoader" />
  <template v-if="!showLoader">
    <div class="row">
      <h4 class="col s2">Мои акты</h4>
      <div class="input-field col s6 offset-s4">
        <input placeholder="Поиск" id="filterd" type="text" v-model="filter" />
        <label for="filtered">Поиск</label>
      </div>
    </div>
    <hr />
    <template v-if="akts">
      <table>
        <thead>
          <tr>
            <th>№ п/п</th>
            <th>Наименование объекта</th>
            <th>Номер акта</th>
            <th>Дата составления</th>
            <td>Ред.</td>
            <th>Удалить</th>
          </tr>
        </thead>

        <tbody v-if="akts">
          <tr v-for="(el, idx) in paginateData" :key="idx">
            <td>{{ idx + 1 + this.page * this.size }}</td>
            <td class="object">
              <input
                :disabled="!el.editing"
                :value="el.object"
                id="disabled"
                type="text"
                class="input-table"
              />
            </td>
            <td>{{ el.numberAkt }}</td>
            <td>{{ el.dateCreateAkt }}</td>
            <td>
              <button
                @click="editClickHandler(el)"
                data-target="modal1"
                class="btn modal-trigger"
                :data="el.numberAkt"
                ref="modal"
                v-if="!el.editing"
              >
                <i class="material-icons">border_color</i>
              </button>
              <Chips
                v-if="el.editing"
                @check="chipsCheckHandler(el)"
                @clear="chpsClearHandler(el)"
              />
            </td>
            <td>
              <button
                @click="deleteClickHanlder"
                class="btn"
                :data="el.numberAkt"
              >
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination" v-if="getAktsList.length > size">
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
  </template>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Loader from "@/components/Loader.vue";
import Chips from "@/components/Chips.vue";

export default {
  name: "DashBoard",

  components: {
    Loader,
    Chips,
  },

  data() {
    return {
      akts: null,
      quantity: 0,
      page: 0,
      filter: "",
      hasNextPage: true,
      size: 5,
      isLoading: true,
      isEditing: false,
    };
  },

  async created() {
    const db = firebase.database();
    try {
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
          this.getAktsList.forEach((akt) => (akt.editing = false));
          this.isLoading = false;
        });
    } catch (e) {
      console.log(e);
    }
  },

  computed: {
    getAktsList() {
      return Object.values(...Object.values(this.akts));
    },

    getReverseAktList() {
      const reverseAktList = this.getAktsList;
      return reverseAktList.reverse();
    },

    pageCount() {
      return Math.ceil(this.getAktsList.length / this.size);
    },

    paginateData() {
      if (this.akts) {
        const start = this.page * this.size;
        const end = start + this.size;
        const filterAkts = this.getReverseAktList.filter((akt) => {
          return (
            akt.object.toUpperCase().includes(this.filter.toUpperCase()) ||
            akt.numberAkt.toUpperCase().includes(this.filter.toUpperCase())
          );
        });
        return filterAkts.slice(start, end);
      } else return [];
    },

    showLoader() {
      return this.isLoading;
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
      this.isLoading = true;
      const [, , , year, number] = dataAttr.split("-");
      const RecordYear = Object.keys(this.akts).find((el) => el === year);
      try {
        await firebase
          .database()
          .ref(
            `akts/${firebase.auth().currentUser.uid}/${RecordYear}/${number}`
          )
          .remove();
        this.quantity -= 1;
        await firebase
          .database()
          .ref(`users/${firebase.auth().currentUser.uid}`)
          .update({
            quantity: this.quantity.toString(),
          })
          .then(() => (this.isLoading = false));
        await firebase
          .database()
          .ref(`akts/${firebase.auth().currentUser.uid}/${RecordYear}`)
          .on("value", async (snaphot) => {
            const data = await snaphot.val();
            if (data) {
              this.akts[RecordYear] = data;
            } else this.akts[RecordYear] = null;
          });
      } catch (err) {
        console.log(err);
      }
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

    editClickHandler(el) {
      el.editing = true;
    },

    chipsCheckHandler(el) {
      el.editing = false;
    },

    chpsClearHandler(el) {
      el.editing = false;
    },
  },

  watch: {
    filter() {
      this.page = 0;
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

<style>
@media screen and (max-width: 600px) {
  th,
  td {
    font-size: 10px;
  }
  h4 {
    font-size: 1.5rem;
  }
}
.object .input-table {
  border: none !important;
  color: inherit !important;
}
</style>

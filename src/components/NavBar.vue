<template>
  <nav>
    <a href="#" data-target="slide-out" class="sidenav-trigger"
      ><i class="material-icons">menu</i></a
    >
    <div class="nav-wrapper orange darken-1">
      <a href="#" class="logo black-text">{{ date }}</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link to="/home/profile" class="black-text">{{
            user
          }}</router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/home/dashboard" class="black-text"
            >Мои акты</router-link
          >
        </li>
        <li>
          <router-link to="/home/add" class="black-text"
            >Добавить акт</router-link
          >
        </li>
        <li>
          <router-link to="/login" class="black-text" @click="ExitClickHandler"
            >Выход</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
  <ul id="slide-out" class="sidenav orange darken-1" ref="sidenav">
    <li>
      <router-link to="/home/profile" class="black-text">{{
        user
      }}</router-link>
    </li>
    <li class="divider"></li>
    <li>
      <router-link to="/home/dashboard" class="black-text"
        >Мои акты</router-link
      >
    </li>
    <li>
      <router-link to="/home/add" class="black-text">Добавить акт</router-link>
    </li>
    <li>
      <router-link to="/login" class="black-text" @click="ExitClickHandler"
        >Выход</router-link
      >
    </li>
  </ul>
</template>

<script>
import * as M from "../../node_modules/materialize-css/dist/js/materialize.min";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "NavBar",

  data() {
    return {
      user: "",
      date: new Date(),
      interval: null,
      sidenav: null,
    };
  },

  async created() {
    this.user = firebase.auth().currentUser.displayName;
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    }, 1000);
    this.sidenav = M.Sidenav.init(this.$refs.sidenav);
  },

  methods: {
    async ExitClickHandler() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          M.toast({ html: "Вы вышли из системы" });
        });
    },
  },

  unmounted() {
    clearInterval(this.interval);
    if (this.sidenav && this.sidenav.destroy) {
      this.sidenav.destroy();
    }
  },
};
</script>

<style>
.user-name {
  font-size: 1rem;
  margin-left: 1rem;
}
.date {
  font-size: 1rem;
}
.logo {
  margin-left: 1rem;
}
</style>

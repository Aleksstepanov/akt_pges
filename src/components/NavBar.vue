<template>
  <ul id="dropdown1" class="dropdown-content orange lighten-3">
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
    <li><a href="#!" class="black-text" @click="ExitClickHandler">Выход</a></li>
  </ul>
  <nav>
    <div class="nav-wrapper orange darken-1">
      <a href="#!" class="logo">{{ date }}</a>
      <ul class="right">
        <li>
          <a
            class="dropdown-trigger"
            href="#!"
            data-target="dropdown1"
            ref="dropdown"
            ><i class="material-icons right">arrow_drop_down_circle</i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
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
      dropdown: null,
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
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      closeOnClick: false,
      hover: true,
    });
  },

  methods: {
    async ExitClickHandler() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
      M.toast({ html: "Вы вышли из системы" });
    },
  },

  unmounted() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
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
</style>

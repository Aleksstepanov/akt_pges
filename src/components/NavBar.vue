<template>
  <nav>
    <div class="nav-wrapper orange darken-1">
      <a href="#!" class="user-name">{{ user }}</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        <li><a @click="ExitClickHandler">Выход</a></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav orange darken-1" id="mobile-demo" ref="sidenav">
    <li>
      <a class="white-text">{{ user }}</a>
    </li>
    <li class="divider"></li>
    <li><a href="sass.html">Sass</a></li>
    <li><a href="#" @click.stop="ExitClickHandler">Выход</a></li>
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
    };
  },

  async created() {
    this.user = firebase.auth().currentUser.displayName;
  },

  mounted() {
    M.Sidenav.init(this.$refs.sidenav);
    M.Modal.init(this.$refs.modalUser);
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
};
</script>

<style>
.user-name {
  font-size: 1rem;
  margin-left: 1rem;
}
</style>

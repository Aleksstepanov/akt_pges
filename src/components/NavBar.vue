<template>
  <nav>
    <div class="nav-wrapper orange darken-1">
      <a href="#!" class="brand-logo">Logo</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        <li>
          <a
            class="waves-effect waves-light modal-trigger"
            href="#modal1"
            ref="modalUser"
            >{{ user }}</a
          >
        </li>
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
    <li><a href="collapsible.html">Javascript</a></li>
  </ul>

  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat"
        >Agree</a
      >
    </div>
  </div>
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
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style></style>

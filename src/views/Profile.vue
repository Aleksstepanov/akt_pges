<template>
  <h4>Пользователь</h4>
  <div class="row">
    <div class="col s12 m6">
      <div class="card orange darken-1">
        <div class="card-content white-text">
          <span class="card-title">Карточка пользователя</span>
          <p>
            Фамилия, имя: <span class="black-text">{{ userName }}</span>
          </p>
          <p>
            email: <a v-bind:href="`mailto:${userEmail}`">{{ userEmail }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Profile",
  data() {
    return {
      userName: "",
      userEmail: "",
    };
  },
  async created() {
    const { displayName, email } = await firebase.auth().currentUser;
    this.userName = displayName;
    this.userEmail = email;
  },
};
</script>

<style></style>

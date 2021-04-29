import { createApp } from "vue";
import firebase from "firebase/app";
import firebaseConfig from "@/config/firebase/firebase.config.js";
import App from "./App.vue";
import router from "./router";

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");

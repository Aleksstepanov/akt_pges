import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/forgot_password",
    name: "Forgot",
    component: () => import("../views/ForgotPassword.vue"),
  },
  {
    path: "/dashboard",
    name: "DashBoard",
    component: () => import("../components/DashBoard.vue"),
    meta: {
      authRequres: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequres)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else if (!router.getRoutes().find((record) => record.path === to.path)) {
    next({ path: "/login" });
  } else {
    next();
  }
});
export default router;

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/forgot_password",
    name: "Frogot",
    component: () => import("../views/ForgotPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

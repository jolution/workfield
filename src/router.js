import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@/views/Notfound.vue";
import AddUser from "@/views/AddUser.vue";
import AddWork from "@/views/AddWork.vue";
import ListUsers from "@/views/ListUsers.vue";
import ListWork from "@/views/ListWork.vue";
import Login from "@/views/Login.vue";

import store from "./store.js";

const routes = [
  {
    path: "/login",
    name: "Einloggen",
    component: Login,
  },
  {
    path: "/login/:logout",
    name: "Ausloggen",
    component: Login,
  },
  {
    path: "/",
    name: "Start",
    component: Home,
  },
  {
    path: "/add-user",
    name: "Benutzer hinzufügen",
    component: AddUser,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/list-users",
    name: "Benutzer auflisten",
    component: ListUsers,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/add-work",
    name: "Arbeit eintragen",
    component: AddWork,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/list-work",
    name: "Arbeit anzeigen",
    component: ListWork,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href; // '/not/found'

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.username
  ) {
    // Redirect to the login page if the user is not logged in
    // and the route meta record is requires auth
    next("/login");
  } else if (
    to.matched.some((record) => record.meta.requiresAdmin) &&
    store.state.rights == 1 &&
    store.state.username
  ) {
    // Redirect to the homepage page if the user is logged in
    // and the route meta record is requires guest
    next();
  } else if (
    to.matched.some(
      (record) =>
        // Redirect to the preview page if the user is logged in
        // but has no role assigned or the role is user
        record.meta.requiresAuth && record.meta.requiresAdmin
    ) &&
    store.state.rights != 1
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;

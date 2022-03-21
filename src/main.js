"use strict";
//exports.__esModule = true;

import { createApp } from "vue";
import { createI18n } from "vue-i18n"; // Manual: https://vue-i18n.intlify.dev/installation.html
import App from "./App.vue";
import router from "./router";
import store from "./store.js";

/**
 * TODO: Isn't there some lazy loading i18n for view? The implementation looks a lot like i18next. 
 * It doesnt make a lot of sense to hard embed translations. 
 */

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
const messages = {
  en: {
    date: "Date",
    filterby: "Filter By",
    work: "Work",
    worker: "Worker",
    no: "No",
    employees: "Employees",
    users: "Users",
    user: "User",
    cancel: "Cancel",
    loggedout: "You just logged out.",
    add: "Add",
    addworkfor: "Add Work for",
    hours: "Hours",
    holiday: "Holiday",
    worktime: "Worktime",
    month: "Month",
    adduser: "Add User",
    filloutform: "Fill up the form below to add a user.",
    username: "Username",
    password: "Password",
    password__placeholder: "I like Pizza with 4 cheese and spicy",
    about: "About",
    home: "Home",
    login: "Login",
    logout: "Logout",
  },
  de: {
    date: "Datum",
    filterby: "Filtern nach",
    work: "Arbeit",
    worker: "Mitarbeiter",
    no: "Keine",
    employees: "Mitarbeiter",
    users: "Benutzer",
    user: "Benutzer",
    cancel: "Abbrechen",
    loggedout: "Sie haben sich ausgeloggt.",
    add: "Hinzufügen",
    addworkfor: "Füge Arbeit hinzu für",
    hours: "Stunden",
    holiday: "Urlaub",
    worktime: "Arbeitszeit",
    month: "Monat",
    adduser: "Benutzer hinzufügen",
    filloutform: "Füllen Sie bitte das Formular aus.",
    username: "Benutzername",
    password: "Passwort",
    password__placeholder: "Ich mag Pizza mit 4 Käse und scharf",
    about: "Über",
    home: "Start",
    login: "Einloggen",
    logout: "Ausloggen",
  },
};

// 2. Create i18n instance with options
const i18n = createI18n({
  locale: "de", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");

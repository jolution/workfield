<template>
  <div class="flex items-center bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Login {{ username }}
          </h1>
          <p class="text-gray-400 dark:text-gray-400">
            <span v-if="$route.params.logout === ':logout'"
              ><i18n-t keypath="loggedout"
            /></span>
            <span v-else><i18n-t keypath="filloutform" /></span>
          </p>
        </div>
        <div class="m-7">
          <Form>
            <div class="mb-6">
              <label
                for="username"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                ><i18n-t keypath="username"
              /></label>
              <input
                id="username"
                v-model="username"
                type="text"
                name="username"
                placeholder="john.doe"
                required
                autocomplete="username"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                ><i18n-t keypath="password" />
              </label>
              <div class="relative">
                <Field id="password" v-slot="{ field }" name="password">
                  <input
                    v-model="password"
                    :rules="{ min: passwordminlength }"
                    :minlength="passwordminlength"
                    v-bind="field"
                    :type="passwordFieldType"
                    required
                    autocomplete="current-password"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-4"
                    @click="switchVisibilityPassword()"
                  >
                    <div v-if="passwordFieldType === 'text'">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div v-else-if="passwordFieldType === 'password'">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </div>
                  </div>
                </Field>
              </div>
              <ErrorMessage as="p" name="password" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="mb-6">
                <button
                  type="button"
                  class="inline-flex text-center items-center w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                  @click="login"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <i18n-t keypath="login" />
                </button>
              </div>
              <div class="mb-6">
                <router-link
                  type="button"
                  class="inline-flex text-center items-center w-full px-3 py-4 text-white bg-gray-500 rounded-md focus:bg-gray-600 focus:outline-none"
                  to="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <i18n-t keypath="cancel" />
                </router-link>
              </div>
            </div>

            <p v-if="msg">{{ msg }}</p>
          </Form>
        </div>
      </div>
    </div>
    <modal :showing="modalShowing" @close="modalShowing = false">
      <h2 class="text-xl font-bold text-gray-900">Example modal</h2>
      <p class="mb-6">
        This is example text passed through to the modal via a slot.
      </p>
      <button
        class="bg-blue-600 text-white px-4 py-2 text-sm uppercase tracking-wide font-bold rounded-lg"
        @click="modalShowing = false"
      >
        Close
      </button>
    </modal>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import qs from "qs";
import router from "@/router";
import { computed } from "vue";
import * as vuex from "vuex";
import Modal from "@/components/Modal.vue";

export default {
  name: "Login",
  components: {
    Field,
    Form,
    ErrorMessage,
    Modal,
  },
  setup() {
    const store = vuex.useStore();
    return {
      myUserName: computed(() => store.state.username),
      myUserRights: computed(() => store.state.rights),
    };
  },
  data() {
    return {
      modalShowing: false,
      username: undefined,
      user_id: undefined,
      password: "",
      msg: "",
      rights: 0,
      passwordFieldType: "password",
      passwordminlength: 2,
    };
  },
  mounted() {
    this.checkLogout();
  },
  methods: {
    checkLogout() {
      if (this.$route.params.logout === ":logout") {
        // logout
        // alert("logout");
        this.deleteUserId();
        this.deleteUserName();
        this.deleteUserRights();

        //console.log("Router clear");
        //this.$router.push(this.$route.path);
        this.$router.push("/login");
      }
      return null;
    },
    setUserId() {
      this.$store.commit("myUserId", this.user_id);
      return null;
    },
    deleteUserId() {
      this.$store.commit("myUserId");
      return null;
    },
    setUserName() {
      this.$store.commit("myUserName", this.username);
      return null;
    },
    deleteUserName() {
      this.$store.commit("myUserName");
      return null;
    },
    setUserRights() {
      this.$store.commit("myUserRights", this.rights);
      return null;
    },
    deleteUserRights() {
      this.$store.commit("myUserRights");
      return null;
    },
    switchVisibilityPassword() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    login(e) {
      e.preventDefault();
      if (this.password.length >= this.passwordminlength) {
        axios
          .post(
            "php/auth.php",

            qs.stringify({
              request: 1,
              username: this.username,
              password: this.password,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            console.log(response.data[0].status);
            if (response.data[0].status === 1) {
              if (response.data[0].msg) {
                this.msg = response.data[0].msg;
              }

              if (response.data) {
                if (response.data.rights) {
                  this.rights = response.data.rights;
                  this.username = response.data.username;
                  this.user_id = response.data.user_id;

                  this.setUserName();
                  this.setUserId();
                  this.setUserRights();
                  // normal users
                  if (this.rights === 0) {
                    router.push("/add-work");

                    // admins
                  } else if (this.rights === 1) {
                    router.push("/list-work");

                    // guests
                  } else {
                    router.push("/");
                  }
                }
              }
            } else {
              console.log("Login fehlgeschlagen");
              this.msg = "Login fehlgeschlagen";
            }
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      } else {
        this.msg = "Insert Password";
      }
    },
  },
};
</script>

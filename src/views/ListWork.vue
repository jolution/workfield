<!--suppress ALL -->
<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">
          <span>
            <i18n-t keypath="work"/>
          </span>
        </h2>
        <div v-if="myUserRights == 1">
          <h3>
            <i18n-t keypath="filterby"/>
            <span v-if="users"><i18n-t keypath="user"/> {{ users }}</span
            ><span v-else><i18n-t keypath="users"/></span>
          </h3>
          <select v-model="users">
            <option v-for="employee in employees" :key="employee.id">
              {{ employee.username }}
            </option>
            <option value="">Alle</option>
          </select>
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <p v-if="works.length < 1" class="empty-table p-4">
            <i18n-t keypath="no"/>
            <i18n-t keypath="work"/>
          </p>
          <table v-else class="min-w-full leading-normal">
            <thead>
            <tr>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Mitarbeiter
              </th>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                <i18n-t keypath="date"/>
              </th>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                <i18n-t keypath="work"/>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="work in filterWorksByUsers" :key="work.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p
                        v-if="work.username"
                        class="text-gray-900 whitespace-no-wrap"
                    >
                      {{ work.username }}
                    </p>
                    <p v-else class="text-gray-600 whitespace-no-wrap">
                      Benutzer entfernt
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ work.date_month_name }} {{ work.date_year }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p v-if="work.worktime > 0">
                  {{ work.worktime }}
                  <i18n-t keypath="hours"/>
                </p>
                <p v-else>
                  <i18n-t keypath="holiday"/>
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import {computed} from "vue";
import * as vuex from "vuex";

export default {
  name: "ListWork",

  setup() {
    const store = vuex.useStore();
    return {
      myUserName: computed(() => store.state.username),
      myUserId: computed(() => store.state.user_id),
      myUserRights: computed(() => store.state.rights),
    };
  },
  data() {
    return {
      users: "",
      works: {},
      work: {
        id: "",
        username: "",
        user_id: "",
        date: "",
        date_month_name: "",
        date_month: "",
        date_year: "",
        worktime: 0,
      },
      employees: {
        name: "",
        username: "",
        email: "",
        pwd: "",
        rights: 0,
      },
    };
  },
  computed: {
    filterWorksByUsers: function () {
      if (this.myUserRights === 1 && this.users !== "") {
        return this.works.filter((work) => !work.username.indexOf(this.users));
      } else {
        return this.works;
      }
    },
  },
  mounted() {
    if (this.myUserRights === 1) this.getEmployees();
    this.getworks();
  },
  methods: {
    getEmployees: function () {

      try {
        if (this.myUserId !== "" && this.myUserRights >= 0) {
          axios
              .post(
                  "php/listusers.php",
                  qs.stringify({
                    request: 1,
                    user_id: this.myUserId,
                    user_rights: this.myUserRights,
                  }),
                  {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  }
              )
              .then((response) => {
                console.log(response);
                if (response.data) {
                  console.log(response.data);
                  console.log("Data recieved");

                  this.employees = response.data;
                  console.log(error.response.status);
                  console.log(response.data);
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
                  //console.log("Error", error.message);
                }
              });
        } else {
          alert("Please enter username & password");
        }
      } catch (error) {
        //this.msg = error.response.data.msg;
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
          //console.log("Error", error.message);
        }
      }
    },
    getworks: function () {
      /*console.log("User ID : " + this.myUserId );
          console.log("Worktime: " + this.work.worktime);
          console.log("Date    : " + this.work.date);*/

      try {
        if (this.myUserId !== "" && this.myUserRights >= 0) {
          axios
              .post(
                  "php/listwork.php",
                  qs.stringify({
                    request: 1,
                    user_id: this.myUserId,
                    user_rights: this.myUserRights,
                    /*date: this.work.date,
                      worktime: this.work.worktime,*/
                  }),
                  {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  }
              )
              .then((response) => {
                console.log(response);
                if (response.data) {
                  console.log(response.data);
                  console.log("Data recieved");

                  this.works = response.data;
                  console.log(error.response.status);
                  console.log(response.data);
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
                  //console.log("Error", error.message);
                }
              });
        } else {
          alert("Please enter username & password");
        }
      } catch (error) {
        //this.msg = error.response.data.msg;
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
          //console.log("Error", error.message);
        }
      }
    }
  }
}
</script>

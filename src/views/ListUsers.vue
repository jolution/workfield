<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">
          {{ employees.length }} &nbsp;
          <span v-if="employees.length > 1">
            <i18n-t keypath="users" />
          </span>
          <span v-else>
            <i18n-t keypath="user" />
          </span>
        </h2>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <p v-if="employees.length < 1" class="empty-table p-4">
            <i18n-t keypath="no" /> <i18n-t keypath="employees" />
          </p>
          <table v-else class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Benutzername
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Rechte
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Aktion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10" />
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.username }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="text-gray-900 whitespace-no-wrap" />
                  <div v-if="employee.rights == 0">
                    <span
                      class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                      ><i18n-t keypath="worker"
                    /></span>
                  </div>
                  <div v-if="employee.rights == 1">
                    <span
                      class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs"
                      >Admin</span
                    >
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex item-center">
                    <div
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <div
                        :title="employee.id"
                        @click="delEmployee(employee.id)"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
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

export default {
  name: "ListUsers",
  data() {
    return {
      employee: {
        name: "",
        username: "",
        email: "",
        pwd: "",
        rights: 0,
        worktime: 0,
      },
      employees: {
        name: "",
        username: "",
        email: "",
        pwd: "",
        rights: 0,
      },
      users: "",
      user_id: 0,
    };
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    delEmployee: function (user_id) {
      try {
        axios
          .post(
            "php/deluser.php",
            qs.stringify({
              request: 1,
              user_id: user_id,
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

              this.getEmployees();
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
    getEmployees: function () {
      try {
        axios
          .post(
            "php/listusers.php",
            qs.stringify({
              request: 1,
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
    toFormData() {
      let formData = new FormData();
      for (let key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },
    recordByID() {
      if (this.user_id > 0) {
        axios
          .get("php/get.php", {
            params: {
              request: 1,
              user_id: this.user_id,
            },
          })
          .then((response) => (this.users = response))
          .catch(function (error) {
            console.log(error);
          });
      }
      return null;
    },
    allRecords() {
      axios
        .get("php/get.php", {
          params: {
            request: 1,
          },
        })
        .then((response) => (this.users = response))

        .catch(function (error) {
          console.log(error);
        });
      return null;
    },
  },
};
</script>

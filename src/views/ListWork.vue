<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">
          <span>
            <i18n-t keypath="work" />
          </span>
        </h2>
        <div v-if="myUserRights == 1">
          <h3>
            <i18n-t keypath="filterby" /> <span v-if="users"><i18n-t keypath="user" /> {{ users }}</span><span v-else><i18n-t keypath="users" /></span>
          </h3>
          <select v-model="users">
            <option v-for="employee in employees" :key="employee.id">{{
              employee.username
            }}</option>
            <option value="">Alle</option>
          </select>
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <p v-if="works.length < 1" class="empty-table p-4">
            <i18n-t keypath="no" /> <i18n-t keypath="work" />
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
                  <i18n-t keypath="date" />
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <i18n-t keypath="work" />
                </th>
                <!--<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aktion
                </th>-->
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
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ work.username }}
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
                  <p v-if="work.worktime > 0">{{ work.worktime }} <i18n-t keypath="hours" /></p>
                  <p v-else><i18n-t keypath="holiday" /></p>
                </td>
                <!--<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="text-gray-900 whitespace-no-wrap" />
                  <div v-if="work.rights == 0">
                    <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Worker</span>
                  </div>
                  <div v-if="work.rights == 1">
                    <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Admin</span>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex item-center">
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <div @click="editMode(work.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <div :title="work.id" @click="delwork(work.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </td>-->
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
//TODO: Unused import causes build optimization issues
import router from "@/router";
import { computed } from 'vue'
import * as vuex from 'vuex'

export default {
    name: "ListWork",

    setup () {
      const store = vuex.useStore()
      return {
        myUserName: computed(() => store.state.username),
        myUserId: computed(() => store.state.user_id),
        myUserRights: computed(() => store.state.rights),
      }
    },
    data() {
      // TODO: Why don't you treat undefined as undefined? Does vue really need empty strings??
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
          rights: 0
        },
      };
    },
    computed: {
      filterWorksByUsers: function(){
        // TODO: Type safe checks... Truethy checks
        if (this.myUserRights == 1 && this.users != "") {
          return this.works.filter(work => !work.username.indexOf(this.users));
          //return this.works.filter(work => !work.username.indexOf("julian.kasimir"));
          //return Object.values(this.works).filter(work => !work.username.indexOf(this.users))
        }else{
          return this.works;
        }
      },
    },
    mounted() {
      // TODO: Can be truethy check. Or is this an enum? If it is an enum, why not using string identifiers?
      // TODO: A great example why you should use typescript by the way. 
      if (this.myUserRights == 1) this.getEmployees();
      this.getworks();
    },
    methods: {
      getEmployees: function () {

          /*console.log("User ID : " + this.myUserId );
          console.log("User Rights : " + this.myUserRights );
          console.log("Worktime: " + this.employee.worktime);
          console.log("Date    : " + this.employee.date);*/

          try {
            // TODO: Type safety
            if (this.myUserId != "" && this.myUserRights >= 0) {
            axios
              .post("php/listusers.php",
              qs.stringify({
                request: 1,
                user_id: this.myUserId,
                user_rights: this.myUserRights,
                /*date: this.employee.date,
                worktime: this.employee.worktime,*/
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
              .then((response) => {
                console.log(response);
                if (response.data) {
                  console.log(response.data);
                  console.log("Data recieved");

                  this.employees = response.data;
                  console.log(error.response.status);
                  console.log(response.data);
                }
                /*
                if (response.data[0].status == 1) {
                  alert("Login Successfully");
                } else {
                  alert("User does not exist");
                }*/
              })
              .catch(function(error) {
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

          /*axios
            .get("php/get.php")
            .then((response) => {
                //Perform Success Action
                //console.log("then");
                //response = JSON.parse(response);
                this.employees = response.data;
                console.log(error.response.status);
                console.log(response.data);
            })
            .catch((error) => {
                // error.response.status Check status code
                //console.log("catch");
                if (error.response){
                  console.log(error.response.status);
                }
            })
            .finally(() => {
                //Perform action in always
            });*/
        },
        /*delwork: function (user_id) {

          try {
            axios
              .post("php/deluser.php",
              qs.stringify({
                user_id: user_id,
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
              .then((response) => {
                console.log(response);
                if (response.data) {
                  console.log(response.data);
                  console.log("Data recieved");

                  this.getworks();
                  console.log(error.response.status);
                  console.log(response.data);
                }
                /*
                if (response.data[0].status == 1) {
                  alert("Login Successfully");
                } else {
                  alert("User does not exist");
                }* /
              })
              .catch(function(error) {
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


            /*this.user_id = user_id;
            axios
                .get("php/del.php", {
                    params: {
                        user_id: this.user_id,
                    },
                })
                .then((response) => {
                    //Perform Success Action
                    console.log("work " + user_id + " entfernt");
                    this.getworks();
                    //this.works = response.data;
                    //console.log(response.data);
                })
                .catch((error) => {
                    // error.response.status Check status code
                    //console.log("catch");
                    console.log(error.response.status);
                })
                .finally(() => {
                    //Perform action in always
                });* /

        },*/
        getworks: function () {

          /*console.log("User ID : " + this.myUserId );
          console.log("Worktime: " + this.work.worktime);
          console.log("Date    : " + this.work.date);*/

          try {
            if (this.myUserId != "" && this.myUserRights >= 0) {
              axios
                .post("php/listwork.php",
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
                })
                .then((response) => {
                  console.log(response);
                  if (response.data) {
                    console.log(response.data);
                    console.log("Data recieved");

                    this.works = response.data;
                    console.log(error.response.status);
                    console.log(response.data);
                  }
                  /*
                  if (response.data[0].status == 1) {
                    alert("Login Successfully");
                  } else {
                    alert("User does not exist");
                  }*/
                })
                .catch(function(error) {
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
        toFormData() {
            let formData = new FormData();
            for (let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },
        sendIdentity() {
          // TODO: Please, please, please, JSON...
            let newworkForm = this.toFormData(this.newwork);
            console.log(newworkForm);

            axios
                .post("php/push.php", newworkForm)
                .then((response) => {
                    //Perform Success Action
                    console.log("then");
                    console.log(response.data);
                })
                .catch((error) => {
                    // error.response.status Check status code
                    console.log("catch");
                    console.log(error.response.status);
                })
                .finally(() => {
                    //Perform action in always
                });
            return null;
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
                    request: 1
                  },
                })
                .then((response) => (this.users = response))
                /*.then(function (response) {
                                    data.users = response.data;})*/
                .catch(function (error) {
                    console.log(error);
                });
            return null;
        },
    },
};
</script>

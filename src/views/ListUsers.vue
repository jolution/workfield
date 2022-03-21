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
                <!--<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mitarbeiter
                </th>-->
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Benutzername
                </th>
                <!--<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>-->
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rechte
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aktion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <!--<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.name }}
                      </p>
                    </div>
                  </div>
                </td>-->
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
                <!--<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.email }}
                      </p>
                    </div>
                  </div>
                </td>-->
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="text-gray-900 whitespace-no-wrap" />
                  <div v-if="employee.rights == 0">
                    <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"><i18n-t keypath="worker" /></span>
                  </div>
                  <div v-if="employee.rights == 1">
                    <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Admin</span>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex item-center">
                    <!--<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <div @click="editMode(employee.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                    </div>-->
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <div :title="employee.id" @click="delEmployee(employee.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                rights: 0
            },
            users: "",
            user_id: 0,
        };
    },
    mounted() {
        this.getEmployees();
    },
    methods: {
        // TODO: You should not shortcut method names. deleteEmployee
        delEmployee: function (user_id) {

          try {
            axios
              .post("php/deluser.php",
              qs.stringify({
                request: 1,
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

                  this.getEmployees();
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
                    console.log("Employee " + user_id + " entfernt");
                    this.getEmployees();
                    //this.employees = response.data;
                    //console.log(response.data);
                })
                .catch((error) => {
                    // error.response.status Check status code
                    //console.log("catch");
                    console.log(error.response.status);
                })
                .finally(() => {
                    //Perform action in always
                });*/

        },
        getEmployees: function () {

          /*console.log("User ID : " + this.myUserId );
          console.log("Worktime: " + this.employee.worktime);
          console.log("Date    : " + this.employee.date);*/

          try {
            axios
              .post("php/listusers.php",
              qs.stringify({
                request: 1
                /*user_id: this.myUser_Id,
                date: this.employee.date,
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
        toFormData() {
          //TODO: See other comment on formdata
            let formData = new FormData();
            for (let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },
        /*sendIdentity() {
            let newEmployeeForm = this.toFormData(this.newEmployee);
            console.log(newEmployeeForm);

            axios
                .post("php/push.php", newEmployeeForm)
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
        },*/
        recordByID() {
          // TODO: Can be simplified with a truethy check
          // TODO: User IDs should NEVER be numeric for security reasons. Use UUIDs instead.
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

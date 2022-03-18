<template>
  <div class="flex items-center  bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            <i18n-t keypath="addworkfor" /> {{ new Date().getFullYear() }}
          </h1>
          <p class="text-gray-400 dark:text-gray-400">
            <i18n-t keypath="filloutform" />
          </p>
        </div>
        <div class="m-7">
          <!--<form id="form" @submit.prevent="onSubmit">-->
          <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400"><i18n-t keypath="username" /></label>
              {{ myUserName }} ({{ myUserId }})
            </div>
            <div class="mb-6">
              <label
                for="month"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ><i18n-t keypath="month" /> *</label>
              <!-- DONT: ⛔️  v-model on input tag -->
              <!-- DO: ✅  v-model on field tag -->
              <!--:value="getYearMonthNow()"-->
              <Field
                v-slot="{ field }"
                v-model.lazy="employee.date"
                name="employee.date"
              >
                <input
                  v-bind="field"
                  type="month"
                  :min="getYearMonthFirst()"
                  :max="getYearMonthNow()"
                  :rules="isRequired"
                >
              </Field>
              <ErrorMessage as="p" name="month" />
            </div>
            <div class="mb-6">
              <label
                for="worktime"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ><i18n-t keypath="worktime" /> *</label>
              <Field
                v-slot="{ field }"
                v-model="employee.worktime"
                name="employee.worktime"
              >
                <input
                  v-bind="field"
                  type="number"
                  :rules="ruleWorkTime"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                >
              </Field>
              <ErrorMessage as="p" name="worktime" />
            </div>

            <div class="mb-6">
              <button
                type="submit"
                class="disabled:opacity-50 w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                :disabled="isButtonDisabled()"
              >
                <span v-if="employee.worktime > 0">
                  {{ button.text }} {{ employee.worktime }}
                  <i18n-t keypath="hours" /></span>
                <span v-else-if="employee.worktime == 0">{{ button.text }} <i18n-t keypath="holiday" /></span>
                <span v-else>{{ button.text }}</span>
              </button>
            </div>
            <p id="result" class="text-base text-center text-gray-400" />
            <p>{{ errors.field }}</p>

            <div
              v-if="msg.length"
              class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
              role="alert"
            >
              <svg
                class="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
                />
              </svg>
              <p>{{ msg }}</p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import qs from "qs";
import { computed } from "vue";
import * as vuex from "vuex";

export default {
  name: "AddWork",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
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
      button: {
        text: "Add",
      },
      msg: "",
      msg_type: "info",
      m: new Date().getMonth() + 1,
      employee: {
        worktime: undefined,
        date: this.getYearMonthNow(),
      },
    };
  },
  /*computed: {
    // Manual: https://next.vuex.vuejs.org/guide/state.html#single-state-tree
    user_id () {
      return store.state.user_id
    },
    username () {
      return store.state.username
    }
  },*/
  watch: {
    "employee.date": function(value) {
      //console.log(value);
      this.getWorkTime();
    },
  },
  mounted() {
    this.getWorkTime();
    return null;
  },
  methods: {
    isButtonDisabled() {
      // Stackoverflow: https://stackoverflow.com/a/67073622/14331711
      // If isButtonDisabled has the value of null, undefined, or false, the disabled attribute will not even be included in the rendered <button> element.
      return this.employee.worktime >= 0 ? undefined : "disabled";
    },
    ruleWorkTime(value) {
      // min 0
      // max 192
      return value >= 0 && value <= 192
        ? true
        : "Min: 0 / Max: 192 hours a month";
    },
    isRequired(value) {
      return value ? true : "This field is required";
    },
    /*isRequired(value) {
      if (value && value.trim()) {
        return true;
      }

      return 'This is required';
    },*/
    getYearMonthFirst() {
      return new Date().getFullYear() + "-01";
    },
    getYearMonthNow() {
      const month = new Date().getMonth() + 1;
      //return new Date().getFullYear() + "-" + new Date().getMonth();
      return (
        new Date().getFullYear() + "-" + (month < 10 ? "0" + month : "" + month)
      );
    },
    toFormData() {
      let formData = new FormData();
      for (let key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },
    getWorkTime() {
      console.log("User ID : " + this.myUserId);
      console.log("Worktime: " + this.employee.worktime);
      console.log("Date    : " + this.employee.date);

      try {
        if (this.myUserId != "" && this.employee.date != "") {
          //&& this.employee.worktime != "") {
          axios
            .post(
              "php/getwork.php",
              qs.stringify({
                request: 1,
                user_id: this.myUserId,
                date: this.employee.date,
                worktime: this.employee.worktime,
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((response) => {
              console.log(response);
              this.button.text = "Add";
              if (response.data) {
                console.log(response.data);
                console.log("Data recieved");
                if (response.data.worktime) {
                  //alert("Worktime saved already, you can overrite");
                  this.employee.worktime = response.data.worktime;
                  this.button.text = "Save";
                }
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
                console.log("Error", error.message);
              }
            });
        } else {
          alert("Please enter username & password");
        }
      } catch (error) {
        if (error.response.data.msg) this.msg = error.response.data.msg;
      }
    },
    onSubmit() {
      //let newEmployeeForm = this.toFormData(this.newEmployee);
      //console.log(newEmployeeForm);
      //console.log("Start add work");
      //console.clear();
      /*
      console.log("User ID : " + this.myUserId );
      console.log("Worktime: " + this.employee.worktime);
      console.log("Date    : " + this.employee.date);
      */

      try {
        if (
          this.myUserId != "" &&
          this.employee.date != "" &&
          this.employee.worktime != ""
        ) {
          axios
            .post(
              "php/addwork.php",
              qs.stringify({
                request: 1,
                user_id: this.myUserId,
                date: this.employee.date,
                worktime: this.employee.worktime,
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
                console.log("Data recieved");
              }

              //if (response.data.status === 0) {
              if (response.data[0].msg) {
                this.msg = response.data[0].msg;
                this.msg_type = response.data[0].msg_type;
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
                console.log("Error", error.message);
              }
            });
        } else {
          alert("Please enter username & password");
        }
      } catch (error) {
        if (error.response.data.msg) this.msg = error.response.data.msg;
      }
    },
    recordByID() {
      if (this.userid > 0) {
        axios
          .get("php/get.php", {
            params: {
              request: 1,
              userid: this.userid,
            },
          })
          .then((response) => (this.users = response))
          .catch(function(error) {
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
        /*.then(function (response) {
                            data.users = response.data;})*/
        .catch(function(error) {
          console.log(error);
        });
      return null;
    },
  },
};
</script>

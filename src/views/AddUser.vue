<template>
  <div class="flex items-center  bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto bg-white p-5 rounded-md shadow-sm">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            <i18n-t keypath="adduser" />
          </h1>
          <p class="text-gray-400 dark:text-gray-400">
            <i18n-t keypath="filloutform" />
          </p>
        </div>
        <div class="m-7">
          <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="mb-6">
              <label
                for="username"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              > <i18n-t keypath="username" /></label>
              <input
                id="username"
                v-model="employee.username"
                type="text"
                name="username"
                placeholder="john.doe"
                required
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              >
            </div>
            <!--<div class="mb-6">
              <label
                for="name"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >Full Name</label>
              <input
                id="name"
                v-model="employee.name"
                type="text"
                name="name"
                placeholder="John Doe"
                required
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              >
            </div>-->
            <div class="mb-6">
              <label
                for="employee.password"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ><i18n-t keypath="password" /></label>
              <div class="relative">
                <Field id="employee.password" v-slot="{ field }" name="employee.password">
                  <input
                    v-model="employee.password"
                    :rules="{ min: passwordminlength }"
                    :minlength="passwordminlength"
                    v-bind="field"
                    :type="passwordFieldType"
                    :placeholder="$t('password__placeholder')"
                    required
                    autocomplete="current-password"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  >
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-4"
                    @click="switchVisibilityPassword()"
                  >
                    <div v-if="passwordFieldType == 'text'">
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
                    <div v-else-if="passwordFieldType == 'password'">
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
                <ErrorMessage as="p" name="employee.password" />
              </div>
            </div>
            <!--<div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >Email Address</label>
              <input
                id="email"
                v-model="employee.email"
                type="email"
                name="email"
                placeholder="you@henico.de"
                required
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              >
            </div>-->
            <div class="flex items-center mb-6">
              <input id="rights" v-model="employee.rights" name="rights" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" value="1">
              <label for="rights" class="ml-2 block text-sm text-gray-900">
                Admin
              </label>
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                <i18n-t keypath="adduser" /> {{ employee.username }}
              </button>
            </div>
            <p id="result" class="text-base text-center text-gray-400" />
            <p>{{ errors.field }}</p>

            <div v-if="msg.length" class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
              <p>{{ msg }}</p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import qs from "qs";

export default {
  name: "AddUser",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      passwordFieldType: "password",
      passwordminlength: 4,
      password:"",
      msg: "",
      msg_type: 'info',
      employee: {
        //name: undefined,
        username: undefined,
        //email: undefined,
        password: undefined,
        rights: 0,
      },
    };
  },
  methods: {
    switchVisibilityPassword() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    onSubmit() {

      // checkbox return value = "true", so replace it with boolean value
      if (this.employee.rights === true || this.employee.rights == 1){
        this.employee.rights = 1;
      }else{
        this.employee.rights = 0;
      }
      
      console.log("Worktime: " + this.employee.username);
      console.log("Password: " + this.employee.password);
      console.log("Rights  : " + this.employee.rights);
     
      try {
        if (this.employee.username != "" && this.employee.password != "") {
          axios
            .post("php/adduser.php", 
            qs.stringify({
              request: 1,
              username: this.employee.username,
              password: this.employee.password,
              rights: this.employee.rights,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((response) => {
              console.log(response);
              if (response.data) {
                console.log("Data recieved");
              }

              //if (response.data.status === 0) {
              if (response.data[0].msg){
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
          alert("Please enter username");
        }

      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    isRequired(value) {
      return value ? true : 'This field is required';
    },
    /*
    toFormData() {
      let formData = new FormData();
      for (let key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },
    sendIdentity() {
      let employeeForm = this.toFormData(this.employee);
      console.log(employeeForm);

      axios
        .post("php/adduser.php", employeeForm)
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
              user_id: this.user_id,
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
        .get("php/get.php")
        .then((response) => (this.users = response))
        /*.then(function (response) {
                            data.users = response.data;})* /
        .catch(function(error) {
          console.log(error);
        });
      return null;
    },*/
  },
};
</script>

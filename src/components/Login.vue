<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="handleSubmit">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              name="email"
              placeholder="Enter Email"
             :class="{ 'is-invalid': submitted && $v.email.$error }"
            />
            <div
              v-if="submitted && $v.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.email.required">Email is required</span>
              <span v-if="!$v.email.email">Email is invalid</span>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              name="password"
              placeholder="Enter Password"
            :class="{
                'is-invalid': submitted && $v.password.$error,
              }"
            />
            <div
              v-if="submitted && $v.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.required">Password is required</span>
              <span v-if="!$v.minLength"
                >, Please enter the password</span
              >
            </div>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit" @click="login()">
            Sign in
          </button>
          <br>
          <h5>Admin User for test</h5>
          <a>Email:test@mail.com</a><br>
          <a>Password:asdasd</a>
          <br><br>
          <h5>Member User for test</h5>
          <a>Email:member@mail.com</a><br>
          <a>Password:asdasd</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import EventBus from "./EvenBus";
import jwtDecode from "jwt-decode";
import { required, minLength, email } from "vuelidate/lib/validators";
// const jwt = require("jsonwebtoken")
// process.env.SECRET_KEY = 'secret'
export default {
  data() {
    return {
      email: "",
      password: "",
      isLogin: "",
      submitted: false,
    };
  },
   validations: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
  },
  methods: {
    login() {
      axios
        .post("http://localhost:5000/api/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("usertoken", JSON.stringify(jwtDecode(res.data)));
          // console.log('111', jwtDecode(res.data));
          this.isLogin = jwtDecode(res.data).role
          console.log('ssss',this.isLogin);
          // ใช้อันนี้นะ
          // let user_Role = JSON.parse(localStorage.getItem("usertoken"))
          // console.log("axios/login2>>>", x.role);


          this.email = "";
          this.password = "";
          res.data.message ? "" : router.push({ name: "Profile" })
          this.emitMethod();
          

        })
        .catch((err) => {
          console.log(err);
        });
      
    },
    emitMethod() {
      EventBus.$emit("logged-in", this.isLogin);
    },
    handleSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
  },
};
</script>

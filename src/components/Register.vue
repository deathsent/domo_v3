<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form @submit.prevent="handleSubmit">
          <div class="alert alert-danger" role="alert" id="failRegis" style="display:none">
          Email ถูกใช้แล้วกรุณาใช้ Email อื่น
        </div>
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input
              type="text"
              v-model="user.first_name"
              class="form-control"
              placeholder="Enter Fist Name"
              :class="{
                    'is-invalid': submitted && $v.user.first_name.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.user.first_name.required"
                  class="invalid-feedback"
                >
                  First Name is required
                </div>
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              v-model="user.last_name"
              class="form-control"
              placeholder="Enter Last Name"
              :class="{
                'is-invalid': submitted && $v.user.last_name.$error,
              }"
            />
            <div
              v-if="submitted && !$v.user.last_name.required"
              class="invalid-feedback"
            >
              Last Name is required
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              v-model="user.email"
              class="form-control"
              placeholder="Enter Email"
              :class="{ 'is-invalid': submitted && $v.user.email.$error }"
            />
            <div
              v-if="submitted && $v.user.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.email.required">Email is required</span>
              <span v-if="!$v.user.email.email">Email is invalid</span>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              id="password"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.user.password.$error,
              }"
            />
            <div
              v-if="submitted && $v.user.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.required">Password is required</span>
              <span v-if="!$v.user.minLength"
                >Password must be at least 6 characters</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              v-model="user.confirmPassword"
              id="confirmPassword"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.user.confirmPassword.$error,
              }"
            />
            <div
              v-if="submitted && $v.user.confirmPassword.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.confirmPassword.required"
                >Confirm Password is required</span
              >
              <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                >Passwords must match</span
              >
            </div>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      role: "Member",
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },
  methods: {
    register()
    {
      let newUser = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        role: this.role,
      };
      axios.post("http://localhost:5000/api/users/register", newUser)
      // console.log('7777',newUser)
      .then(res => {
        if (res.data.err){
          document.getElementById("failRegis").style.display = "block"
          return
          
        }else{
          router.push({ name: 'Login' })
        }
        
      })
      
      //   console.log(res);
      //   router.push({ name: "Login" });
      // })
      // .catch((err) => {
      //   document.getElementById("failLogin").style.display = "block";
      //     console.log("999", err);
      //   });
      //   console.log(err);

    },
    handleSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }else {
           this.register()
          //  router.push({ name: "Login" });
      }
    },
  },
};
</script>

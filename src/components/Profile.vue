<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div
        class="alert alert-success"
        role="alert"
        id="passChanged"
        style="display: none"
      >
        เปลี่ยนผ่านเรียบร้อยแล้ว
      </div>
      <div
        class="alert alert-danger"
        role="alert"
        id="failChange"
        style="display: none"
      >
        รหัสผ่านเดิมไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง
      </div>
      <div class="jumbotron mt-5">
        <div class="col-sm-8 mx-auto">
          <h1 class="text-center">Profile</h1>
        </div>
        <table class="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{{ first_name }}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{{ last_name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ email }}</td>
            </tr>
            <tr>
              <td>Change Password</td>

              <td>
                <div class="form-group">
                  <input
                    type="password"
                    v-model="oldPassword"
                    placeholder="Old Passwod"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && $v.oldPassword.$error,
                    }"
                  />
                  <div
                    v-if="submitted && $v.oldPassword.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.oldPassword.required"
                      >Password is required</span
                    >
                    <span v-else-if="!$v.oldPassword.minLength"
                      >Password must be at least 6 characters</span
                    >
                  </div>
                </div>
              </td>
              <td>
                <input
                  type="password"
                  v-model="newPassword"
                  placeholder="New Password"
                />
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
// import jwtDecode from 'jwt-decode'
export default {
  data() {
    let profile = JSON.parse(localStorage.getItem("usertoken"));
    return {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      role: profile.role,
      oldPassword: "",
      newPassword: "",
      submitted : false,
      alert: false,
    };

  },
  validations: {
    oldPassword: { required, minLength: minLength(6) },
  },

  methods: {
    changePass() {
      axios
        .post("http://localhost:5000/api/users/changepassword", {
          email: this.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((res) => {
          if (res.data.code === 999) {
            document.getElementById("failChange").style.display = "block";
          } else {
            document.getElementById("passChanged").style.display = "block";
          }
        });
      // .catch((res) => {
      //   if(res.data.err){
      //   document.getElementById("failChange").style.display = "block";
      //   return
      //   }
    },
    handleSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.changePass();
        //  router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style></style>

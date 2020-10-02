<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">Profile</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{{first_name}}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{{last_name}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import jwtDecode from 'jwt-decode'
export default {
    data() {
      let profile = JSON.parse(localStorage.getItem("usertoken"))
        return {
            first_name:profile.first_name,
            last_name:profile.last_name,
            email:profile.email,
            role:profile.role
        }
    },
    methods:{
      checkRole(){

      }
    }
};
</script>

<style></style>

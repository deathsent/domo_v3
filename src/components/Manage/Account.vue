<template>
  <div class="container">
    <br />
    <button
      type="submit"
      class="btn btn-primary"
      style="margin-right:0px"
      data-toggle="modal"
      data-target="#addAccount"
    >
      เพิ่มบัญชีผู้ใช้ใหม่
    </button>
         <div
      class="btn-group btn-group-lg"
      role="group"
      aria-label="Basic example"
    >
      <router-link to="stock" type="button" class="btn btn-secondary"
        >Stock</router-link
      >
      <router-link to="account" type="button" class="btn btn-secondary"
        >Account</router-link
      >
    </div>
    <br /><br />
    <div class="modal fade bd-example-modal-lg" id="addAccount" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
                
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มบัญชีผู้ใช้ใหม่</h5>
          </div>
          <table class="table table-striped md-3 text-center">
            <thead>
              <tr>
                <td>Firstname</td>
                <td>Lastname</td>
                <td>E-mail</td>
                <td>Password</td>
                <td>Role</td>
              </tr>
              <td>
                <input type="text" class="form-control" v-model="first_name" />
              </td>
              <td>
                <input type="text" class="form-control" v-model="last_name" />
              </td>
              <td>
                <input type="email" class="form-control" v-model="email" />
              </td>
              <td>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </td>
              <td>
                <select v-model="role">
                  <!-- inline object literal -->
                  <option v-bind:role="{ role: Admin }">Admin</option>
                  <option v-bind:role="{ role: Member }">Member</option>
                </select>
              </td>
            </thead>
          </table>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addUser(index)"
            >
              เพิ่มข้อมูล
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
              aria-label="Close"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-striped md-3 text-center">
      <thead>
        <tr>
          <td>ID</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>Role</td>
          <td>Setting</td>
        </tr>
      </thead>
      <tbody id="accountInfo">
        <tr v-for="(users, index) in $store.getters.users" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="index !== editIndex">{{ users.first_name }}</td>
          <td v-if="index !== editIndex">{{ users.last_name }}</td>
          <td v-if="index !== editIndex">{{ users.email }}</td>
          <td v-if="index !== editIndex">{{ users.role }}</td>
          <td v-if="index !== editIndex">
            <button
              type="button"
              class="btn btn-danger mr-2"
              v-on:click="deleteUser(index, users._id)"
            >
              ลบ
            </button>
            <button
              type="button"
              class="btn btn-warning"
              v-on:click="openEdit(index, users)"
            >
              แก้ไข
            </button>
          </td>

          <td v-if="index === editIndex">
            <input
              type="text"
              :value="users.first_name"
              class="form-control"
              v-on:change="firstName = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <input
              type="text"
              :value="users.last_name"
              class="form-control"
              v-on:change="lastName = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <input
              type="text"
              :value="users.email"
              class="form-control"
              v-on:change="email = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <select v-model="role" v-on:change="role = $event.target.value">
              <!-- inline object literal -->
              <option v-bind:role="{ role: Admin }">Admin</option>
              <option v-bind:role="{ role: Member }">Member</option>
            </select>
          </td>
          <td v-if="index === editIndex">
            <button
              type="button"
              class="btn btn-success mr-2"
              v-on:click="editUser(users._id)"
            >
              ยืนยัน
            </button>
            <br />
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="closeEdit()"
            >
              ยกเลิก
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editIndex: -1,
      first_mame: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.$store.dispatch("fetchUser");
    },
    deleteUser(index, _id) {
      let payload = { index: index, _id: _id };
      this.$store.dispatch("deleteUser", payload);
    },
    openEdit(index, users) {
      this.editIndex = index;
      this.first_name = users.first_name;
      this.last_name = users.last_name;
      this.email = users.email;
      this.role = users.role;
    },
    closeEdit(index) {
      (this.editIndex = index), (this.editIndex = -1);
      this.editIndex = index;
      this.first_name = "";
      this.last_name = "";
      this.password = "";
      this.email = "";
      this.role = "";
    },
    editUser(_id) {
      let payload = {
        index: this.editIndex,
        _id: _id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        role: this.role,
      };
      this.$store.dispatch("editUser", payload).then(this.reloadPage());
    },
    addUser(index) {
      let payload = {
        index: index + 1,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        email: this.email,
        role: this.role,
      };
      this.$store.dispatch("addUser", payload).then(this.reloadPage());
    },
    reloadPage() {
      this.$forceUpdate();
      this.closeEdit();
      // window.location.reload();
    },
  },
};
</script>

<style>
.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
</style>

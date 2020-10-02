import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
// import jwtDecode from 'jwt-decode'

Vue.use(Vuex);

let mongo_api = "http://localhost:5000/api/stock/";
let mongo_api_users = "http://localhost:5000/api/users/";
let mongo_api_new_users = "http://localhost:5000/api/users/register";

export const state = () => ({
  counter: 0,
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
};

export default new Vuex.Store({
  state: {
    product: [],
    users: [],
  },
  mutations: {
    fetchProduct(state, { res }) {
      state.product = res.data;
    },
    addProduct(state, { payload }) {
      state.product.push(payload);
    },
    deleteProduct(state, { payload }) {
      state.product.splice(payload.index, 1);
    },
    editProduct(state, { payload }) {
      state.product[payload.index].productName = payload.productName;
      state.product[payload.index].productDetail = payload.productDetail;
      state.product[payload.index].productPrice = payload.productPrice;
      state.product[payload.index].productQuantity = payload.productQuantity;
      state.product[payload.index].productImage = payload.productImage;
    },
    fetchUser(state, { res }) {
      state.users = res.data;
    },
    addUser(state, { payload }) {
      state.users.push(payload);
    },
    deleteUser(state, { payload }) {
      state.users.splice(payload.index, 1);
    },
    editUser(state, { payload }) {
      state.users[payload.index].first_name = payload.first_name;
      state.users[payload.index].last_name = payload.last_name;
      state.users[payload.index].email = payload.email;
      state.users[payload.index].role = payload.role;
    },
  },
    actions: {
      async fetchProduct({ commit }) {
        await Axios.get(mongo_api)
          .then((res) => commit("fetchProduct", { res }))
          .catch((err) => alert(err));
      },
      async addProduct({ commit }, payload) {
        await Axios.post(mongo_api, payload)
          .then(() => commit("addProduct", { payload }))
          .catch((err) => alert(err));
      },
      async deleteProduct({ commit }, payload) {
        alert(payload._id);
        await Axios.delete(mongo_api + payload._id)
          .then(() => commit("deleteProduct", { payload }))
          .catch((err) => alert(err));
      },
      async editProduct({ commit }, payload) {
        await Axios.put(mongo_api + payload._id, payload)
          .then(() => commit("editProduct", { payload }))
          .catch((err) => alert(err));
      },
      async fetchUser({ commit }) {
        await Axios.get(mongo_api_users)
          .then((res) => commit("fetchUser", { res }))
          .catch((err) => alert(err));
      },
      async addUser({ commit }, payload) {
        await Axios.post(mongo_api_new_users, payload)
          .then(() => commit("addUser", { payload }))
          .catch((err) => alert(err));
      },
      async deleteUser({ commit }, payload) {
        alert(payload._id);
        await Axios.delete(mongo_api_users + payload._id)
          .then(() => commit("deleteUser", { payload }))
          .catch((err) => alert(err));
      },
      async editUser({ commit }, payload) {
        await Axios.put(mongo_api_users + payload._id, payload)
          .then(() => commit("editUser", { payload }))
          .catch((err) => alert(err));
      },
    },
    getters: {
      product: (state) => state.product,
      users: (state) => state.users,
    },
    modules: {},
  
});

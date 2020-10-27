import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from "vue-axios";
// import Vuex from 'vuex';
import Vuelidate from 'vuelidate'
import VueBus from 'vue-bus';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
// Vue.use(Vuex);
Vue.use(VueBus);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

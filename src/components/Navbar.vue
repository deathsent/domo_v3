<template>
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li v-if= "!role" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if= "!role" class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li v-if= "role" class="nav-item">
                    <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li v-if= "role" class="nav-item">
                    <a class="nav-link" href="" v-on:click= "logout">Logout</a>
                </li>
                <li v-if= "role==='Admin'" class="nav-item">
                    <router-link class="nav-link" to="/stock">Manage Store</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import router from '../router'
import EventBus from './EvenBus'
// EventBus.$on('logged-in', test => {
//   console.log(test)
// })
export default {
  data () {
    // let userData = JSON.parse(localStorage.getItem("usertoken").role)
    return {
      role: '',
      auth: '',
      user: ''
    }
  },
  async created(){
    let userData = await JSON.parse(localStorage.getItem("usertoken"))
    this.role = userData.role
    
  },
  methods: {
    logout () {
      localStorage.removeItem('usertoken',router.push({ name: 'Home' }))
    }
  },
  mounted () {
    EventBus.$on('logged-in', status => {
      this.role = status
      // console.log('55',this.role);
      // console.log('asss',status);
    })
  },
  
}
</script>
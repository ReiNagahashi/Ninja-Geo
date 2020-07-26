<template>
  <div class="navbar">
      <nav class="deep-purple darken-1">
          <div class="container">
              <router-link :to="{ name:'GMap' }" class="brand-logo left">GeoNinjas</router-link>
              <ul class="right">
                  <li v-if="!user"><router-link :to="{ name:'Signup' }">Sign Up</router-link></li>
                  <li v-if="!user"><router-link :to="{ name:'Signin' }">Sign In</router-link></li>
                  <li v-if="user"><a @click="signout">{{ user.email }}</a></li>
                  <li v-if="user"><a @click="signout">sign Out</a></li>
                  <li><a class="modal-trigger" data-target="modal1">New Post</a></li>
              </ul>
          </div>
        <!-- Modal Structure -->
        <div id="modal1" class="modal black-text">
            <div class="modal-content">
                <h2>Hello from Modal</h2>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
      </nav>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'Navbar',
    data(){
        return {
            user:null
        }
    },
    methods:{
        signout(){
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({ name:'Signin' })
            })
        }
    },
    created(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.user = user
            }else{
                this.user = null
            }
        })
        // Modal
        document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.modal');
          var instances = M.Modal.init(elems);
        });
    }
}
</script>

<style>

</style>
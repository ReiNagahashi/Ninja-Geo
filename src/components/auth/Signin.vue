<template>
    <div class="signin container">
        <form class="card-panel" @submit.prevent="signin">
            <h2 class="center deep-purple-text">Signin</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field center">
                <p class="red-text" v-if="alert">{{ alert }}</p>
                <button class="btn deep-purple">Signin</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name:'Signin',
    data(){
        return{
            email:null,
            password:null,
            alert:null,
        }
    },
    methods:{
        signin(){
            if(this.email && this.password){

                firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(cred => {
                    this.$router.push({ name:'GMap' })
                }).catch(err => {
                    this.alert = err.message
                })
                this.alert = null
            }else{
                this.alert = 'Type all field'
            }
        }
    }
}
</script>

<style>
    .signin{
        max-width: 400px;
        margin-top: 60px;
    }

    .signin h2{
        font-size: 2.4rem;
    }
    .signin .field{
        margin-bottom: 16px;
    }
</style>
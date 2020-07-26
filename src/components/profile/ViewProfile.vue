<template>
  <div class="view-profile container">
      <div class="card">
          <h2 class="deep-purple-text center" v-if="profile">{{ profile.alias }}User's Wall</h2>
          <ul class="comments collection">
              <li v-for="(comment,index) in comments" :key="index">
                    <div class="deep-purple-text">{{ comment.from }}</div>    
                    <div class="grey-text text-darken-2">{{ comment.content }}</div>
              </li>
          </ul>
          <form @submit.prevent="addComment">
              <div class="field">
                  <label for="comment">Add a comment</label>
                  <input type="text" name="comment" v-model="newComment">
                  <p class="red-text center">{{ alert }}</p>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name:'ViewProfile',
    data(){
        return {
            profile:null,
            newComment:null,
            alert:null,
            loginUser:null,
            comments:[]
        }
    },
    created(){
        let ref = db.collection('users')
        let com = db.collection('comments')

        // Get current user
        ref.where('user_id','==',firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.loginUser = doc.data()
                this.loginUser.id = doc.id
            })
        })
        
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data()
        })

        com.where('to','==',this.$route.params.id)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    this.comments.unshift({
                        from: change.doc.data().from,
                        content:change.doc.data().content
                    })
                }
            })
        })
    },
    methods:{
        addComment(){
            if(this.newComment){
                db.collection('comments').add(
                    {
                        to:this.$route.params.id,
                        from: this.loginUser.alias,
                        content:this.newComment,
                        time:Date.now()
                    }
                )
                .then(() => {
                    this.newComment = null
                })
                this.alert = null
            }else{
                this.alert = 'Type something into the form'
            }
        }
    }
}
</script>

<style>
    .view-profile{
        padding: 20px;
        margin-top: 60px;
    }
    .view-profile h2{
        font-size: 2rem;
        margin-top: 0;
    }

    .view-profile li{
        padding: 10px;
        border-bottom: 1px solid #eee;
    }

</style>
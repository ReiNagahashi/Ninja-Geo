import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import firebase from 'firebase'
import Profile from '@/components/profile/ViewProfile'

Vue.use(Router)

const router = new Router({
  mode:'history',
   routes: [
      {
        path: '/',
        name: 'GMap',
        component: GMap,
        meta:{
          requireAuth:true
        }
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '/signin',
        name: 'Signin',
        component: Signin
      },
      {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile,
        meta:{
          requireAuth:true
        }
      }
    ]
})

router.beforeEach((to,from,next) => {
  //check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requireAuth)){
    //check auth state of use
    let user = firebase.auth().currentUser
    if(user){
      // user signed in, proceed to route
      next()
    }else{
      // no user signed in, redirect to login
      next({name:'Signin'})
    }
  }else{
    next()
  }
})

export default router
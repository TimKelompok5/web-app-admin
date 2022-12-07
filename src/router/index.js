import Vue from 'vue'
import VueRouter from 'vue-router'
import {useFirebase} from "@/composables/useFirebase"

Vue.use(VueRouter)


const routess = [
  {
    path: '',
    redirect: {name:'dashboard'},
  },
  {
    path:'/main',
    component:()=>import("@/layouts/Content.vue"),
    meta:{
      requiresAuth:true
    },
    children:[
      {
        path: "/",
        redirect:{name: "dashboard"},
      },
      {
        path:'dashboard',
        name:'dashboard',
        component:()=>import("@/pages/dashboard/Dashboard.vue"),
        meta:{
          requiresAuth:true
        },
      },
      {
        path:'podcast',
        name:'podcast',
        component:()=>import("@/pages/podcast/Podcast.vue"),
        meta:{
          requiresAuth:true
        },
      },
      {
        path:'episode/:podcastId',
        name:'episode',
        component:()=>import("@/pages/episode/Episode.vue"),
        meta:{
          requiresAuth:true
        },
      },
      {
        path:'user',
        name:'user',
        component:()=>import("@/pages/user/User.vue"),
        meta:{
          requiresAuth:true
        },
      },
      {
        path:'account-setting',
        name:'account-setting',
        component:()=>import("@/pages/account-settings/AccountSettings.vue"),
        meta:{
          requiresAuth:true
        },
      }
    ]
  },
  {
    path:'/auth',
    component:()=>import("@/layouts/Blank.vue"),
    meta:{
      requiresAuth:false
    },
    children:[
      {
        path: "",
        redirect:{name: "login"},
      },
      {
        path:'login',
        name:'login',
        component: () => import('@/pages/auth/Login.vue'),
        meta:{
          requiresAuth:false
        },
      },
      {
        path:'register',
        name:'register',
        component: () => import('@/pages/auth/Register.vue'),
        meta:{
          requiresAuth:false
        },
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routess,
})

router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    const {auth} = useFirebase()
    auth.onAuthStateChanged((user)=>{
      if(user){
        next()
      }else{
        next({name:'login'})
      }
    })
  }else{
    next()
  }
})

export default router

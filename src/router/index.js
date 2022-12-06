import Vue from 'vue'
import VueRouter from 'vue-router'
import {useSession} from "@/utils"

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
        component: () => import('@/pages/login/Login.vue'),
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
    const user = useSession().getUser()
    if(user){
      next()
    }else{
      next({name:'login'})
    }
  }else{
    next()
  }
})

export default router

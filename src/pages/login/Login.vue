  
  <script>
  // eslint-disable-next-line object-curly-newline
  import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
  import { onMounted,onDeactivated, reactive, ref ,defineComponent} from 'vue'
  import {ACTION_LOGIN} from "@/store/module/auth"
  import {useStore} from "@/store/index"
  import { useRouter } from "vue-router/composables"
  
  export default defineComponent({
    setup(_,ctx) {
      const store = useStore()
      const router = useRouter()
      
      const loading = ref(false)
      const isPasswordVisible = ref(false)
      const email = ref('')
      const password = ref('')
      const alert = reactive({
        show:false,
        message:"",
        type:"success"
      })
  
  
      const socialLink = [
        {
          icon: mdiFacebook,
          color: '#4267b2',
          colorInDark: '#4267b2',
        },
        {
          icon: mdiTwitter,
          color: '#1da1f2',
          colorInDark: '#1da1f2',
        },
        {
          icon: mdiGithub,
          color: '#272727',
          colorInDark: '#fff',
        },
        {
          icon: mdiGoogle,
          color: '#db4437',
          colorInDark: '#db4437',
        },
      ]
  
     
  
     async function signIn(){
        loading.value = true
        if(!email.value || !password.value){
          alert.show = true,
          alert.message = "Password or Email cannot empty",
          alert.type ='error'
          
          loading.value = false
          return
        }
        const {success,message} = await store.dispatch(ACTION_LOGIN,{
          email:email.value,
          password:password.value
        })
  
        alert.show = true,
        alert.message= message,
        alert.type = success ?'success':'error'
  
        loading.value = false
  
        if(success){
          router.push({name:'dashboard'})
        }
        
     }
  
     const onEnter = window.addEventListener('keydown',(ev)=>{
        if(ev.keyCode == 13){
          signIn()
        }
     })
  
     onMounted(()=>{
      window.addEventListener('keydown',onEnter)
     })
     onDeactivated(()=>{
      window.removeEventListener(onEnter)
     })
  
      return {
        isPasswordVisible,
        email,
        password,
        socialLink,
        icons: {
          mdiEyeOutline,
          mdiEyeOffOutline,
        },
        alert,
        signIn,
        loading
      }
    },
  })
  </script>
<template>
    <div class="auth-wrapper auth-v1">
      
      <div class="auth-inner">
        <v-alert
        :value="alert.show"
        dense
        dismissible
        :type="alert.type"
      >
       {{alert.message}}
      </v-alert>
        <v-card class="auth-card">
        
          <!-- logo -->
          <v-card-title class="d-flex align-center justify-center py-7">
            <router-link
              to="/"
              class="d-flex align-center"
            >
              <v-img
                :src="require('@/assets/images/logos/logo_cexup.webp')"
                max-height="30px"
                max-width="30px"
                alt="logo"
                contain
                class="me-3 "
              ></v-img>
  
              <h2 class="text-2xl font-weight-semibold">
                Cexup
              </h2>
            </router-link>
          </v-card-title>
  
          <!-- title -->
          <v-card-text>
            <p class="text-2xl font-weight-semibold text--primary mb-2">
              Welcome to Medical Record! 👋🏻
            </p>
            <p class="mb-2">
              Please sign-in to your account and start the adventure
            </p>
          </v-card-text>
  
          <!-- login form -->
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                outlined
                label="Email"
                placeholder="john@example.com"
                hide-details
                class="mb-3"
              ></v-text-field>
  
              <v-text-field
                v-model="password"
                outlined
                :type="isPasswordVisible ? 'text' : 'password'"
                label="Password"
                placeholder="Enter password"
                :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                hide-details
                @click:append="isPasswordVisible = !isPasswordVisible"
              ></v-text-field>
  
        
  
              <v-btn
                :loading="loading"
                :disabled="loading"
                block
                color="primary"
                class="mt-6"
                @click="signIn"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
  
          
        </v-card>
      </div>
  
      <!-- background triangle shape  -->
      <img
        class="auth-mask-bg"
        height="173"
        :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
      >
  
      <!-- tree -->
      <v-img
        class="auth-tree"
        width="247"
        height="185"
        src="@/assets/images/misc/tree.png"
      ></v-img>
  
      <!-- tree  -->
      <v-img
        class="auth-tree-3"
        width="377"
        height="289"
        src="@/assets/images/misc/tree-3.png"
      ></v-img>
    </div>
  </template>

  
  <style lang="scss">
  @import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
  </style>
  
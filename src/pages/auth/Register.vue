<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from 'vue'
import { useStore } from "@/store/index"
import { ACTION_REGISTER } from "@/store/module/auth"
import { useRouter } from 'vue-router/composables'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isPasswordVisible = ref(false)
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const socialLink = [
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    async function signInWithEmailAndAPssword() {
      if (email.value || password.value || name.value) {
        const {success}=await store.dispatch(ACTION_REGISTER, {
          email: email.value,
          password: password.value,
          name: name.value
        })
        if(success){
          router.push('/main/dashboard')
        }
        return
      }

    }

    return {
      isPasswordVisible,
      name,
      email,
      password,
      socialLink,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      signInWithEmailAndAPssword
    }
  },
}
</script>
<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img :src="require('@/assets/images/logos/logo.svg')" max-height="30px" max-width="30px" alt="logo"
              contain class="me-3 "></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Materio
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Adventure starts here 🚀
          </p>
          <p class="mb-2">
            Make your app management easy and fun!
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field v-model="name" outlined label="Name" placeholder="JohnDoe" hide-details
              class="mb-3"></v-text-field>

            <v-text-field v-model="email" outlined label="Email" placeholder="john@example.com" hide-details
              class="mb-3"></v-text-field>

            <v-text-field v-model="password" outlined :type="isPasswordVisible ? 'text' : 'password'" label="Password"
              placeholder="············" :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details @click:append="isPasswordVisible = !isPasswordVisible"></v-text-field>

            <v-checkbox hide-details class="mt-1">
              <template #label>
                <div class="d-flex align-center flex-wrap">
                  <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                </div>
              </template>
            </v-checkbox>

            <v-btn @click="signInWithEmailAndAPssword" block color="primary" class="mt-6">
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Already have an account?
          </span>
          <router-link :to="{ name: 'login' }">
            Sign in instead
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social link -->
        <v-card-actions class="d-flex justify-center">
          <v-btn block color="primary" class="mt-6" >
            Continue With Google
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)">

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

  
<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
  
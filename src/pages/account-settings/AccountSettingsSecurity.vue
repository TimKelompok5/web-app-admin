<script>
// eslint-disable-next-line object-curly-newline
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import { ref,defineComponent } from 'vue'
import {ACTION_RESET_PASSWORD} from "@/store/module/user"
import { showError } from '@/plugins/notification'
import {useStore} from "@/store/index"
import {useRouter} from "vue-router/composables"

export default defineComponent({
  setup() {

    const store = useStore()
    const router = useRouter()
    

    const isCurrentPasswordVisible = ref(false)
    const isNewPasswordVisible = ref(false)
    const isCPasswordVisible = ref(false)
    const currentPassword = ref('')
    const newPassword = ref('')
    const cPassword = ref('')
    const loading = ref(false)

    async function submit(){
      loading.value = true
      if(!user.id){
        showError("User not loggedin!")
        loading.value = false
        router.push("/auth/login")
        return
      }
      if(newPassword.value != cPassword.value){
        showError("Password didn't match!")
        loading.value = false
        return
      }
      await store.dispatch(ACTION_RESET_PASSWORD,{
        currentPassword:currentPassword.value,
        newPassword:newPassword.value,
        userId:user.id
      })
      loading.value = false
    }
    return {
      isCurrentPasswordVisible,
      isNewPasswordVisible,
      currentPassword,
      isCPasswordVisible,
      newPassword,
      cPassword,
      loading,
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
      submit
    }
  },
})
</script>
<template>
  <v-card flat class="mt-5">
    <v-form>
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col cols="12" sm="8" md="6">
              <!-- current password -->
              <v-text-field v-model="currentPassword" :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                label="Current Password" outlined dense
                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"/>

              <!-- new password -->
              <v-text-field v-model="newPassword" :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline" label="New Password"
                outlined dense hint="Make sure it's at least 8 characters." persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"/>

              <!-- confirm password -->
              <v-text-field v-model="cPassword" :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                label="Confirm New Password" outlined dense class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"/>
            </v-col>

            <v-col cols="12" sm="4" md="6" class="d-none d-sm-flex justify-center position-relative">
              <v-img contain max-width="170" src="@/assets/images/3d-characters/pose-m-1.png"
                class="security-character"/>
            </v-col>
            <v-col cols="12">
            <v-btn
            :disabled="loading"
            :loading="loading"
            @click="submit"
              color="primary"
              class="me-3 mt-4"
            >
              Save changes
            </v-btn>
          </v-col>
          </v-row>
        </v-card-text>
      </div>

    </v-form>
  </v-card>
</template>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}

.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>

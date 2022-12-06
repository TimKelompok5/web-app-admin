<script>
import { useStore } from '@/store'
import { ACTION_LOGOUT } from "@/store/module/auth"
import { useSession } from '@/utils'
import {useRouter,useRoute} from "vue-router/composables"
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from '@mdi/js'

import { defineComponent } from 'vue'

export default defineComponent({
  setup(_, ctx) {
    const store = useStore(ctx)
    const router = useRouter()
    const route = useRoute()
    const user = useSession().getUser()

    async function signOut() {
      const success = await store.dispatch(ACTION_LOGOUT)
      if (success) {
        router.push("/auth/login")
      }
    }
    function goto(name) {
      if(route.name == name) return 
      router.push({name:name})
    }

    return {
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
      },
      signOut,
      user,
      goto
    }
  },
})
</script>

<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
        <v-avatar size="40px" v-bind="attrs" v-on="on">
          <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
          <v-avatar size="40px">
            <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
          </v-avatar>
        </v-badge>
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align:middle">
          <span class="text--primary font-weight-semibold mb-n1">
            {{user.email ? user.email : 'Unknown'}}
          </span>
          <small class="text--disabled text-capitalize">{{user.levelUser ? user.levelUser : 'Unknown'}}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link  @click="goto('account-setting')">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <!-- Settings -->
      <v-list-item link @click="goto('account-setting')">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCogOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>




      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item link @click="signOut">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>

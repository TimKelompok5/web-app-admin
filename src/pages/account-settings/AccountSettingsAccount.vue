<script>
import { ACTION_GET_PROFILE } from '@/store/module/user'
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { onMounted } from 'vue'
import {useStore} from "@/store/index"

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()

    onMounted(async ()=>{
      await store.dispatch(ACTION_GET_PROFILE)
    })

    return {
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
      
    }
  },
}
</script>
<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >

    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
            
              label="Email"
              disabled
              dense
              outlined
            ></v-text-field>
          </v-col>

          <!-- alert -->
          <v-col cols="12">
            <v-alert
              color="warning"
              text
              class="mb-0"
            >
              <div class="d-flex align-start">
                <v-icon color="warning">
                  {{ icons.mdiAlertOutline }}
                </v-icon>

                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Anda tidak dapat merubah email,hubungi admin jika ingin merubah.
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>



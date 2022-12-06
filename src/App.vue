<template>
  <!-- <component :is="resolveLayout"> -->
  <v-app>
    <notifications group="cexup" />
    <router-view></router-view>
    <!-- <upgrade-to-pro></upgrade-to-pro> -->
  </v-app>
  <!-- </component> -->
</template>
<script>
import { useRoute } from 'vue-router/composables'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'
import UpgradeToPro from './components/UpgradeToPro.vue'
import {computed,onMounted,defineComponent,getCurrentInstance} from "vue"


export default defineComponent({
  components: {
    LayoutBlank,
    LayoutContent,
    UpgradeToPro,
  },
  setup(_,ctx) {
    const  route  = useRoute()
   

    //should be remove
    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.name === null) return null

      if (route.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    onMounted(async ()=>{
      
      getCurrentInstance().proxy.$vuetify.theme.isDark = true
      
      //ctx.root.$vuetify.theme.isDark = true
    })

    return {
      resolveLayout,
    }
  },
})
</script>

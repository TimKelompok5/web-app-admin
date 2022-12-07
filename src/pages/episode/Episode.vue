
<script>
// demos
import EpisodeHeader from './EpisodeHeader.vue'
import EpisodeDatatable from './EpisodeDatatable.vue'
import { computed, onMounted, ref, reactive,defineComponent } from 'vue'
import { useStore } from '@/store'
import { ACTION_GET_EPISODE, ACTION_DELETE_EPISODE } from '@/store/module/episode'
import FormEpisode from './FormEpisode.vue'
import { useRoute } from 'vue-router/composables'

export default defineComponent({
  components: {
    EpisodeHeader,
    EpisodeDatatable,
    FormEpisode,
  },
  setup(_, ctx) {

    const store = useStore()
    const route = useRoute()

    const formAdd = ref(false)

    const dialogDelete = reactive({
      show: false,
      title: "",
      data: null
    })

   
    function hideFormAdd() {
      formAdd.value = false
    }

    function showFormAdd() {
      formAdd.value = true
    }

  
    function showDelete(data) {
      dialogDelete.show = true
      dialogDelete.title = data.email
      dialogDelete.data = data
    }

    async function submitDelete() {

      await store.dispatch(ACTION_DELETE_EPISODE, dialogDelete.data)
      dialogDelete.data = null
      dialogDelete.show = false
      dialogDelete.title = ""
    }

    onMounted(async () => {
      
      if(route.params.podcastId){
        await store.dispatch(ACTION_GET_EPISODE, route.params.podcastId)
      }
      
    })
    return {
      formAdd,
      dialogDelete,
      showFormAdd,
      hideFormAdd,
      showDelete,
      submitDelete,
      dataEpisode: computed(() => store.state.episode.dataEpisode)
    }
  },
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <episode-header :total="dataEpisode.totalPages" />
    </v-col>

    <v-col cols="12">
      <episode-datatable :items="dataEpisode.items" :loading="dataEpisode.loading" @add="showFormAdd"
         @remove="showDelete" />
    </v-col>
    <form-episode :show="formAdd" @cancel="hideFormAdd" />
   
    <dialog-delete-confirmation :title="dialogDelete.title" :show="dialogDelete.show"
      @cancel="dialogDelete.show = false" @submit="submitDelete" />
  </v-row>
</template>


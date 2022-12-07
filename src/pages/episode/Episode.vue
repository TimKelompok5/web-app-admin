
<script>
// demos
import EpisodeHeader from './EpisodeHeader.vue'
import EpisodeDatatable from './EpisodeDatatable.vue'
import { computed, onMounted, ref, reactive,defineComponent } from 'vue'
import { useStore } from '@/store'
import { ACTION_GET_PODCAST, ACTION_DELETE_PODCAST } from '@/store/module/podcast'
import FormEpisode from './FormEpisode.vue'

export default defineComponent({
  components: {
    EpisodeHeader,
    EpisodeDatatable,
    FormEpisode,
  },
  setup(_, ctx) {

    const store = useStore()

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

      await store.dispatch(ACTION_DELETE_PODCAST, dialogDelete.data)
      dialogDelete.data = null
      dialogDelete.show = false
      dialogDelete.title = ""
    }

    onMounted(async () => {
        await store.dispatch(ACTION_GET_PODCAST, {})
      
    })
    return {
      formAdd,
      dialogDelete,
      showFormAdd,
      hideFormAdd,
      showDelete,
      submitDelete,
      dataPodcast: computed(() => store.state.podcast.dataPodcast)
    }
  },
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <episode-header />
    </v-col>

    <v-col cols="12">
      <episode-datatable :items="dataPodcast.items" :loading="dataPodcast.loading" @add="showFormAdd"
         @remove="showDelete" />
    </v-col>
    <form-episode :show="formAdd" @cancel="hideFormAdd" />
   
    <dialog-delete-confirmation :title="dialogDelete.title" :show="dialogDelete.show"
      @cancel="dialogDelete.show = false" @submit="submitDelete" />
  </v-row>
</template>


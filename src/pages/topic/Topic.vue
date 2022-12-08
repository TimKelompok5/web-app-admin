
<script>
// demos
import TopicHeader from './TopicHeader.vue'
import TopicDatatable from './TopicDatatable.vue'
import { computed, onMounted, ref, reactive,defineComponent } from 'vue'
import { useStore } from '@/store'
import { ACTION_GET_TOPIC, ACTION_DELETE_TOPIC } from '@/store/module/topic'
import FormTopic from './FormTopic.vue'

export default defineComponent({
  components: {
    TopicHeader,
    TopicDatatable,
    FormTopic,
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

      await store.dispatch(ACTION_DELETE_TOPIC, dialogDelete.data)
      dialogDelete.data = null
      dialogDelete.show = false
      dialogDelete.title = ""
    }

    onMounted(async () => {
        await store.dispatch(ACTION_GET_TOPIC, {})
      
    })
    return {
      formAdd,
      dialogDelete,
      showFormAdd,
      hideFormAdd,
      showDelete,
      submitDelete,
      dataTopic: computed(() => store.state.topic.dataTopic)
    }
  },
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <topic-header :total="dataTopic.totalPages" />
    </v-col>

    <v-col cols="12">
      <topic-datatable :items="dataTopic.items" :loading="dataTopic.loading" @add="showFormAdd"
         @remove="showDelete" />
    </v-col>
    <form-topic :show="formAdd" @cancel="hideFormAdd" />
   
    <dialog-delete-confirmation :title="dialogDelete.title" :show="dialogDelete.show"
      @cancel="dialogDelete.show = false" @submit="submitDelete" />
  </v-row>
</template>


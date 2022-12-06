
<script>
// demos
import UserHeader from './UserHeader.vue'
import UserDatatable from './UserDatatable.vue'
import { computed, onMounted, ref, reactive,defineComponent } from 'vue'
import { useStore } from '@/store'
import { ACTION_GET_USER, ACTION_DELETE_USER } from '@/store/module/user'
import FormUser from './FormUser.vue'

export default defineComponent({
  components: {
    UserHeader,
    UserDatatable,
    FormUser,
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

      await store.dispatch(ACTION_DELETE_USER, dialogDelete.data)
      dialogDelete.data = null
      dialogDelete.show = false
      dialogDelete.title = ""
    }

    onMounted(async () => {
        await store.dispatch(ACTION_GET_USER, {})
      
    })
    return {
      formAdd,
      dialogDelete,
      showFormAdd,
      hideFormAdd,
      showDelete,
      submitDelete,
      dataUser: computed(() => store.state.user.dataUser)
    }
  },
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <user-header />
    </v-col>

    <v-col cols="12">
      <user-datatable :items="dataUser.items" :loading="dataUser.loading" @add="showFormAdd"
         @remove="showDelete" />
    </v-col>
    <form-user :show="formAdd" @cancel="hideFormAdd" />
   
    <dialog-delete-confirmation :title="dialogDelete.title" :show="dialogDelete.show"
      @cancel="dialogDelete.show = false" @submit="submitDelete" />
  </v-row>
</template>


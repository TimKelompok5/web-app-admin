<script>
import header from "./header-table"
import {useTableProps,useDataTable} from "@/composables/useDataTable"
import {defineComponent} from "vue"
export default defineComponent({
  props:{
    ...useTableProps()
  },
  setup(_,ctx) {
    
    return {
      headers: header,
      ...useDataTable(ctx)
    }
  },
})
</script>

<template>
  <v-card>
    <v-card-title>
      <v-btn data-testid="button" outlined small @click="add">Tambah</v-btn>
      <v-spacer></v-spacer>
      <v-text-field label="Cari" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :loading="loading" item-key="id" class="table-rounded">
      <template v-slot:[`item.links`]="{ item }">
        <router-link :to="'/main/user-hospital/' + item.id">Users</router-link>
      </template>

      <template #[`item.action`]="{ item }">

        <v-icon @click="remove(item)">
          {{ icons.mdiDelete }}
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>


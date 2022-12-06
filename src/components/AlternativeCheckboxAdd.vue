<script>
import { defineComponent } from 'vue';

export default defineComponent({
    emits:['add','other']
})
</script>
<template>
    <v-row class="mx-2">
      <v-checkbox value="false">
        <template v-slot:label>
  
          <a href="#" class="success--text" @click="$emit('add',true)">
            Tambahkan opsi
          </a>
          &nbsp;
          atau
          &nbsp;
          <a class="primary--text" @click="$emit('other', true)">
            tambahkan "Lainnya"
          </a>
  
        </template>
      </v-checkbox>
    </v-row>
  </template>
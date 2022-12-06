<script>
import { defineComponent } from 'vue';

export default defineComponent({
    emits:['add','other'],
})
</script>
<template>
    <v-row class="mx-2">
        <v-radio >
            <template v-slot:label>
                <a class="success--text" @click="$emit('add', true)">
                    Tambahkan opsi
                </a>
                &nbsp;
                atau
                &nbsp;
                <a class="primary--text" @click="$emit('other', true)">
                    Tambahkan "Lainnya"
                </a>

            </template>
        </v-radio>

    </v-row>
</template>
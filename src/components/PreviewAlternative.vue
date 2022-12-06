<script>
import { defineComponent, ref, watch } from 'vue';
import { mdiCalendar } from "@mdi/js"

export default defineComponent({
    props: ['type', 'alternatives'],
    setup(props, ctx) {
        const selected = ref([])
        const radioSelected = ref()
        const showOther = ref(false)
        const other = ref("")

        watch(() => radioSelected.value, (val) => {
            const index = props.alternatives.map(a => a.key)
                .indexOf(val.key)

            let data = props.alternatives[index]
            if (data) {
                if (data.type == "other") {
                    other.value = ""
                    showOther.value = true
                    return
                } 
            }
            showOther.value = false
            
        })

        watch(() => selected.value, (val) => {
            
            if (val) {
                const exist = val.some(a => a.type == "other")
                if (exist) {
                    other.value = ""
                    showOther.value = true
                    return
                }
            }
            showOther.value = false
        })
        return {
            other,
            selected,
            radioSelected,
            showOther,
            mdiCalendar
        }
    }
})
</script>
<template>
    <v-container>
        <v-col cols="12" sm="12" md="12" lg="12" v-if="type === 'radio'">
            <v-radio-group v-model="radioSelected">
                <v-row v-for="(item, index) in alternatives" :key="index">
                    <v-radio :value="item" dense />
                    <v-text-field v-model="item.text" dense disabled />
                </v-row>
            </v-radio-group>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12" v-else-if="type === 'checkbox'">
            <v-col cols="12" sm="12" md="12" lg="12">
                <v-row v-for="(item, index) in alternatives" :key="index">
                    <v-checkbox v-model="selected" :value="item" dense />
                    <v-text-field v-model="item.text" disabled />
                </v-row>
            </v-col>
        </v-col>
        <v-text-field v-else-if="type === 'essay'" label="Text jawaban essay" />
        <v-file-input v-else-if="type === 'image'" label="File input" outlined dense="" />
        <v-text-field v-else-if="type === 'date'" label="Picker in menu"
         :prepend-icon="mdiCalendar" readonly />
        <v-text-field v-show="showOther" v-model="other" label="Lainnya" />
    </v-container>
</template>
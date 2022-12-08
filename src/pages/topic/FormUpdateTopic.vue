<script>
import { useStore } from '@/store';
import { reactive, ref, defineComponent, watch } from 'vue';
import { mdiEye, mdiEyeOff } from "@mdi/js"
import { ACTION_PUT_TOPIC } from '@/store/module/topic'
import { useFormProps, useForms } from "@/composables/useForm"


export default defineComponent({
    props: {
        ...useFormProps()
    },
    setup(props, ctx) {
        const store = useStore(ctx)

        const showPassword = ref(false)
        const form = reactive({
            name: "",
            image: null,
            color: null,
            id:""
        })

        watch(props.body, (newVal) => {
            if(newVal){
                form.name = newVal.name
                // form.image = newVal.image
                form.color = newVal.color
                form.id = newVal.id
            }
        })

        return {
            form,
            showPassword,
            levels: [],
            mdiEye,
            mdiEyeOff,
            action: ACTION_PUT_TOPIC,
            ...useForms(ctx, store)
        }
    }
})
</script>
<template>
    <v-dialog v-model="show" max-width="600" persistent transition="dialog-bottom-transition">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="secondary" dark>Tambah Topic</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row mt="6">

                            <v-col cols="12">
                                <v-text-field v-model="form.name" cols="12" label="Title*" dense outlined required
                                    type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="form.image" label="Thumbnail" outlined dense></v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-color-picker v-model="form.color" dot-size="11" swatches-max-height="100" />
                            </v-col>

                        </v-row>
                    </v-container>
                    <small> * indicates required field </small>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-spacer></v-spacer>
                    <v-btn :disabled="loading" @click="cancel" color="blue darken-1" text>
                        Cancel
                    </v-btn>
                    <v-btn :loading="loading" :disabled="loading" @click="onSubmit(action, form)" color="blue darken-1"
                        text> Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

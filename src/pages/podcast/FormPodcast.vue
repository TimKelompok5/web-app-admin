<script>
import { useStore } from '@/store';
import { reactive, ref, defineComponent } from 'vue';
import { mdiEye, mdiEyeOff } from "@mdi/js"
import { ACTION_POST_PODCAST } from '@/store/module/podcast'
import { useFormProps, useForms } from "@/composables/useForm"

export default defineComponent({
    props: {
        ...useFormProps()
    },
    setup(_, ctx) {
        const store = useStore(ctx)

        const showPassword = ref(false)
        const form = reactive({
            title: "",
            description: "",
            thumbnail: null,
        })


        return {
            form,
            showPassword,
            levels: [],
            mdiEye,
            mdiEyeOff,
            action:ACTION_POST_PODCAST,
            ...useForms(ctx, store)
        }
    }
})
</script>
<template>
    <v-dialog v-model="show" max-width="600" persistent transition="dialog-bottom-transition">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark>Create Podcast</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row mt="6">

                            <v-col cols="12">
                                <v-text-field v-model="form.title" cols="12" label="Title*" dense outlined required
                                    type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.description" cols="12" label="Description*" dense outlined required
                                    type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="form.thumbnail" label="Thumbnail" outlined dense></v-file-input>
                            
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
                    <v-btn :loading="loading" :disabled="loading" @click="onSubmit(action, form)"
                        color="blue darken-1" text> Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

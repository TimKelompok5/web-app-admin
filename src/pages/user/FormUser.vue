<script>
import { useStore } from '@/store';
import { reactive, ref, defineComponent } from 'vue';
import { mdiEye, mdiEyeOff } from "@mdi/js"
import { levelUserAdmin } from "@/utils"
import { ACTION_POST_USER } from '@/store/module/user'
import { useFormProps, useForms } from "@/composables/useForm"

export default defineComponent({
    props: {
        ...useFormProps()
    },
    setup(_, ctx) {
        const store = useStore(ctx)

        const showPassword = ref(false)
        const form = reactive({
            email: "",
            password: "",
            levelUser: ""
        })


        return {
            form,
            showPassword,
            levels: levelUserAdmin,
            mdiEye,
            mdiEyeOff,
            ACTION_POST_USER,
            ...useForms(ctx, store)
        }
    }
})
</script>
<template>
    <v-dialog v-model="show" max-width="600" persistent transition="dialog-bottom-transition">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark>Form User</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row mt="6">

                            <v-col cols="12">
                                <v-text-field v-model="form.email" cols="12" label="Email*" dense outlined required
                                    type="email" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.password" cols="12"
                                    :append-icon="showPassword ? mdiEye : mdiEyeOff" label="Password*"
                                    @click:append="showPassword = !showPassword" dense outlined required
                                    :type="showPassword ? 'text' : 'password'" />
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="form.levelUser" :items="levels" item-text="text"
                                    item-value="value" auto-select-first label="Level*" dense outlined required />
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
                    <v-btn :loading="loading" :disabled="loading" @click="onSubmit(ACTION_POST_USER, form)"
                        color="blue darken-1" text> Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

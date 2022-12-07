<script>
import { useStore } from '@/store';
import { reactive, ref, defineComponent } from 'vue';
import { mdiEye, mdiEyeOff,mdiMicrophone } from "@mdi/js"
import { ACTION_POST_USER } from '@/store/module/user'
import { useFormProps, useForms } from "@/composables/useForm"
import { showError } from '@/plugins/notification';

export default defineComponent({
    props: {
        ...useFormProps()
    },
    setup(_, ctx) {
        const store = useStore(ctx)

        const showPassword = ref(false)

        const mediaRecorder = ref(null)
        const audioBlobs = ref([])
        const stream = ref(null)

        const form = reactive({
            title: "",
            description: "",
            thumbnail: "",
        })

        const isRecording =ref(false)


        async function startRecordAudio(){
            if(!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)){
                showError("Browser not supported media!!")
                return
            }

            navigator.mediaDevices.getUserMedia({
                audio:true
            })
            .then((st)=>{
               stream.value = st

                mediaRecorder.value = new MediaRecorder(st)
                

                audioBlobs.value = []

                
                mediaRecorder.value.addEventListener('dataavailable',event=>{
                    audioBlobs.value.push(event.data)
                    console.log(event)
                })

                mediaRecorder.value.start()

            })
        }

        async function stopRecording(){
            stream.value.getTracks().forEach(track=>track.stop())

            const audio = URL.createObjectURL(new Blob(audioBlobs.value))
            const pl = new Audio(audio)

            pl.play()
            console.log(stream.value)
        }

        async function toggle(){
            if(isRecording.value){
                stopRecording()
            }else{
                startRecordAudio()
            }

            isRecording.value = !isRecording.value
        }
        return {
            form,
            showPassword,
            levels: [],
            mdiEye,
            mdiEyeOff,
            mdiMicrophone,
            ACTION_POST_USER,
            ...useForms(ctx, store),
            stopRecording,
            startRecordAudio,
            toggle
        }
    }
})
</script>
<template>
    <v-dialog v-model="show" max-width="600" persistent transition="dialog-bottom-transition">
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="primary" dark>Create audio podcast</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row mt="6">

                            <v-col cols="12">
                                <v-text-field v-model="form.title" cols="12" label="Title*" dense outlined required
                                    type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.email" cols="12" label="Description*" dense outlined
                                    required type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.email" cols="12" label="Thumbnail*" dense outlined required
                                    type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn cols="12" @click="toggle" fab dark color="indigo">
                                    <v-icon dark>
                                    {{mdiMicrophone}}
                                    </v-icon>
                                </v-btn>
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

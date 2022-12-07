<script>
import { useStore } from '@/store';
import { reactive, ref, defineComponent, onMounted } from 'vue';
import { mdiEye, mdiEyeOff, mdiMicrophone } from "@mdi/js"
import { ACTION_POST_EPISODE } from '@/store/module/episode'
import { useFormProps, useForms } from "@/composables/useForm"
import { showError } from '@/plugins/notification';
import { useRoute } from 'vue-router/composables';

export default defineComponent({
    props: {
        ...useFormProps()
    },
    setup(_, ctx) {
        const store = useStore(ctx)
        const route = useRoute()

        const showPassword = ref(false)

        const mediaRecorder = ref(null)
        const audioBlobs = ref([])
        const stream = ref(null)

        const form = reactive({
            title: "",
            description: "",
            thumbnail: null,
            audioUrl:null,
            podcastId:""
        })

        const isRecording = ref(false)


        async function startRecordAudio() {
            if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
                showError("Browser not supported media!!")
                return
            }

            navigator.mediaDevices.getUserMedia({
                audio: true
            })
                .then((st) => {
                    stream.value = st

                    mediaRecorder.value = new MediaRecorder(st)


                    audioBlobs.value = []


                    mediaRecorder.value.addEventListener('dataavailable', event => {
                        audioBlobs.value.push(event.data)
                    })

                    mediaRecorder.value.addEventListener("stop", () => {
                        stopRecording()
                    })

                    mediaRecorder.value.start()

                })
        }

        async function stopRecording() {
            stream.value.getTracks().forEach(track => track.stop())

            const audioBlob = new Blob(audioBlobs.value,{type:"audio/mp3"})
            form.audioUrl = audioBlob
            // const audio = URL.createObjectURL(audioBlob)
            // const pl = new Audio(audio)
        }

        async function toggle() {
            if (isRecording.value) {
                mediaRecorder.value.stop()
            } else {
                startRecordAudio()
            }

            isRecording.value = !isRecording.value
        }

        onMounted(()=>{
            form.podcastId = route.params.podcastId
        })
        
    
        return {
            form,
            showPassword,
            levels: [],
            mdiEye,
            mdiEyeOff,
            mdiMicrophone,
            act:ACTION_POST_EPISODE,
            ...useForms(ctx, store),
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
                                <v-text-field v-model="form.description" cols="12" label="Description*" dense outlined
                                    required type="text" />
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="form.thumbnail" label="Thumbnail" outlined dense></v-file-input>
                            
                            </v-col>
                            <v-col cols="12">
                                <v-btn cols="12" @click="toggle" fab dark color="indigo">
                                    <v-icon dark>
                                        {{ mdiMicrophone }}
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
                    <v-btn :loading="loading" :disabled="loading" @click="onSubmit(act, form)"
                        color="blue darken-1" text> Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

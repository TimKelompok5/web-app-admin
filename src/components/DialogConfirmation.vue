<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                   {{title}}
                </v-card-title>
                <v-card-text>
                    {{message}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="cancel">
                        Batal
                    </v-btn>
                    <v-btn color="green darken-1" text @click="submit">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title:{
            type:String,
            default:()=>""
        },
        message:{
            type:String,
            default:()=>""
        }
    },
    setup(props, ctx) {
        function cancel(){
            ctx.emit("cancel",true)
        }
        function submit(){
            ctx.emit("submit",true)
        }
        return{
            cancel,
            submit
        }
    }
}
</script>
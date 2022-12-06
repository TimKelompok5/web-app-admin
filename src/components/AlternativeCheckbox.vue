<script>
import { defineComponent, watch,ref,onMounted } from 'vue';
import { mdiClose } from "@mdi/js"

export default defineComponent({
    emits:['delete'],
    props:['text','point','index'],
    setup(props,{emit}){
        const name = ref("")
        const point = ref(0)

        function onChange(){
            emit('change',{
                text:name.value,
                point:point.value,
                index:props.index
            })
        }

        onMounted(()=>{
            if(props.text){
                name.value = props.text
            }
            if(props.point){
                point.value = props.point
            }
        })
        watch(()=>props.text,(val)=>{
            if(val){
                name.value = val
            }
        })
        watch(()=>props.point,(val)=>{
            if(val){
                point.value = val
            }
        })

        return{
            name,
            point,
            mdiClose,
            onChange
        }
    }
})
</script>
<template>
    <v-row class="mx-2 py-0 d-flex align-center">
        <v-col cols="1">
            <v-checkbox disabled/>
        </v-col>
        <v-col cols="8">
            
            <v-text-field v-model="name" @change="onChange" />

        </v-col>
        <v-col cols="1">
            <v-text-field v-model="point" @change="onChange" />


        </v-col>
        <v-col cols="2">
            <v-btn icon small @click="$emit('delete', index)">
                <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
        </v-col>

    </v-row>
  </template>
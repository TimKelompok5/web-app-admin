import { ref } from 'vue'

export const useFormProps = () => {
    return {
        show: {
            type: Boolean,
            default: false
        },
        body:{
            type:Object
        }
    }
}

export const useForms=(ctx,store)=>{
    const loading = ref(false)

    function cancel() {
        ctx.emit('cancel', true)
    }

    async function onSubmit(act,data){
        loading.value = true
        const success = await store.dispatch(act,data)
        loading.value = false
        if(success){
            cancel()
        }

    }


    return {
        cancel,
        loading,
        onSubmit
    }

}
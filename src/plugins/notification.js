import Vue from "vue"

export const showSuccess=(message)=>{
    Vue.notify({
        group:"cexup",
        title:"Berhasil",
        type:"success",
        text:message
    })
}

export const showWarning=(message)=>{
    Vue.notify({
        group:"cexup",
        title:"Peringatan!",
        type:"warning",
        text:message
    })
}

export const showError=(message)=>{
    Vue.notify({
        group:"cexup",
        title:"Error!",
        type:"error",
        text:message
    })
}

export const showInfo=(message)=>{
    Vue.notify({
        group:"cexup",
        title:"Informasi",
        type:"info",
        text:message
    })
}
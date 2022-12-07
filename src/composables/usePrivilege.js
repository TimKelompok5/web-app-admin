import { useFirebase } from "./useFirebase"

export const usePrivilege = ()=>{
    function hasAccess(visible){
        const havePublicAccess =  visible.includes("PUBLIC")
        
        if(havePublicAccess) return true

        if(!visible) return false
        const level = sessionStorage.getItem('level')
        if(!level){
            return false
        } 

        return visible.includes(level)
    }
    return{
        hasAccess
    }
}
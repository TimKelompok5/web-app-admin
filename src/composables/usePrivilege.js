import { useSession } from "@/utils"

export const usePrivilege = ()=>{
    function hasAccess(visible){
        const havePublicAccess =  visible.includes("PUBLIC")
        if(havePublicAccess) return true

        if(!visible) return false
        const {levelUser} = useSession().getUser()
        if(!levelUser){
            return false
        } 

        return visible.includes(levelUser)
    }
    return{
        hasAccess
    }
}
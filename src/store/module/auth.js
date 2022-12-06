import { showSuccess } from "@/plugins/notification"
import { useSession } from "@/utils"
import {useApi} from "@/utils/api"

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'


export const ACTION_LOGIN = `auth/${LOGIN}`
export const ACTION_LOGOUT = `auth/${LOGOUT}`


export const MUTATION_LOGIN = `auth/${LOGIN}`
export const MUTATION_LOGOUT = `auth/${LOGOUT}`


const state ={
    
}

const actions = {
    [LOGIN]({commit},body){
        return new Promise(async(resolve)=>{
            
            const api = useApi()
            const session = useSession()

            const {success,message,data} = await api.post('api/admin/sign-in',{
                email:body.email,
                password:body.password
            })

            if(success){
                showSuccess("heheh")
               session.setUser(data)
            }
            resolve({
                success:success,
                message:message
            })
        })
    },
    [LOGOUT]({commit},body){
        return new Promise((resolve)=>{

            const session = useSession()
            session.signOut()
            resolve(true)
        })
    }
}

const mutations = {
    [LOGIN](){}
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}
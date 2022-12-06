import { showError, showSuccess } from "@/plugins/notification"
import {useApi} from "@/utils/api"

const GET_API_KEY = 'GET_API_KEY'
const POST_API_KEY = 'POST_API_KEY'
const DELETE_API_KEY = 'DELETE_API_KEY'

export const ACTION_GET_API_KEY = `apikey/${GET_API_KEY}`
export const ACTION_POST_API_KEY = `apikey/${POST_API_KEY}`
export const ACTION_DELETE_API_KEY = `apikey/${DELETE_API_KEY}`

export const MUTATION_GET_API_KEY = `apikey/${GET_API_KEY}`


const state ={
    dataApiKey:{
        items:[],
        loading:true,
        error:null,
        currentPage:1,
        totalPages:1
    },
    
}

const actions = {
    [GET_API_KEY]({commit},body){
        return new Promise(async(resolve)=>{
            
            const api = useApi()

            const {success,message,data} = await api.get(`api/admin/api-keys?page=0&size=100`)

            if(success){
                commit(GET_API_KEY,data)
            }
            resolve(success)
        })
    },
    [POST_API_KEY]({commit},body){
        return new Promise(async (resolve)=>{
            const api = useApi()

            const {success,message,data} = await api.post(`api/admin/api-key`,body)

            if(success){
                showSuccess(message)
                commit(POST_API_KEY,data)
            }else{
                showError(message)
            }
            resolve(success)
        })
    },
    [DELETE_API_KEY]({commit},body){
        return new Promise(async (resolve)=>{
            const api = useApi()

            const { success,message, data  } = await api.del(`api/admin/api-key/${body.id}`)
            if(success){
                showSuccess(message)
                commit(DELETE_API_KEY,data)
            }else{
                showError(message)
            }
            resolve(success)
        })
    }
}

const mutations = {
    [GET_API_KEY](state,{items,page,totalPages}){
        state.dataApiKey = {
            items: items,
            loading:false,
            error:null,
            currentPage:page,
            totalPages:totalPages
        }
        
    },
    [POST_API_KEY](state,data){
        const exist = state.dataApiKey.items
            .some(api=>api.id == data.id)
        
            if(!exist){
                state.dataApiKey.items.push(data)
            }else{
                const index = state.dataApiKey.items
                    .map(v=>v.id)
                    .indexOf(data.id)
                Object.assign(state.dataApiKey.items[index],data)
            }
    },
    [DELETE_API_KEY](state,data){
        const index = state.dataApiKey.items
            .map(v=>v.id)
            .indexOf(data.id)
        
            state.dataApiKey.items.splice(index,1)
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}
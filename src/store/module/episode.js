import { showError, showSuccess } from "@/plugins/notification"
import { useFirebase } from "@/composables/useFirebase"
import { collection,doc,getDoc, getDocs,addDoc ,where,query} from "firebase/firestore"

const GET_EPISODE = 'GET_EPISODE'

const POST_EPISODE = 'POST_EPISODE'

const PUT_EPISODE = 'PUT_EPISODE'

const DELETE_EPISODE = 'DELETE_EPISODE'

const RESET_PASSWORD = 'RESET_PASSWORD'

const GET_PROFILE = 'GET_PROFILE'



export const ACTION_GET_EPISODE = `episode/${GET_EPISODE}`

export const ACTION_GET_PROFILE = `episode/${GET_PROFILE}`

export const MUTATION_GET_EPISODE = `episode/${GET_EPISODE}`

export const ACTION_POST_EPISODE = `episode/${POST_EPISODE}`

export const ACTION_PUT_EPISODE = `episode/${PUT_EPISODE}`

export const ACTION_DELETE_EPISODE = `episode/${DELETE_EPISODE}`

export const ACTION_RESET_PASSWORD = `episode/${RESET_PASSWORD}`

const state = {
    dataEpisode: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },
    profile:{}

}

const actions = {
    [GET_EPISODE]({ commit }, id) {
        return new Promise(async (resolve) => {

            
            const { db } = useFirebase()
            const userRef = query(collection(db, "EPISODE"),where("podcastId","==",id))

            const data = await getDocs(userRef)
        
            const convert = data.docs.map((v) => {
                
                const res = v.data()
        
                return{
                    id:v.id,
                    title: res.title != undefined ? res.title : "",
                    description:res.description != undefined ? res.description : "",
                    thumbnail:res.thumbnail != undefined ? res.thumbnail :"",
                    likes:res.likes != undefined ? res.likes : 0,
                    createdAt:res.createdAt != undefined ? res.createdAt : 0,
                    createdBy:res.createdBy != undefined ? res.createdBy : "",
                    podcastId:res.podcastId != undefined ? res.podcastId : "",
                }
            })
            commit(GET_EPISODE, convert)

            resolve(true)
        })
    },
    [POST_EPISODE]({ commit }, body) {
        return new Promise(async (resolve) => {
            const {auth,db} = useFirebase()
            auth.onAuthStateChanged(async(user)=>{
                if(user){
                    
                    const prepareData = {
                            createdBy:user.uid,
                            createdAt: new Date().getTime(),
                            ...body
                    }
                    
                   
                   const data =  await addDoc(collection(db,"PODCAST"),prepareData)
                    prepareData.id = data.id
                    commit(POST_EPISODE,prepareData)
                }
            })
            resolve(true)
        })
    },
    [PUT_EPISODE]({ commit }, body) {
        return new Promise(async (resolve) => {



            resolve(false)
        })
    },
    [DELETE_EPISODE]({ commit }, body) {
        return new Promise(async (resolve) => {



            resolve(false)
        })
    },
    [RESET_PASSWORD]({ }, body) {
        return new Promise(async (resolve) => {

            resolve(false)
        })
    }
}

const mutations = {
    [GET_EPISODE](state, items) {
        state.dataEpisode = {
            items: items,
            loading: false,
            error: null,
            currentPage: 0,
            totalPages: 0
        }

    },
    [GET_PROFILE](state,data){
        state.profile = data
    },
    [POST_EPISODE](state, data) {
        const exist = state.dataPodcast.items
            .some(pd => pd.id == data.id)

        if (!exist) {
            state.dataPodcast.items.push(data)
        } else {
            const index = state.dataPodcast.items
                .map(v => v.id)
                .indexOf(data.id)
            Object.assign(state.dataPodcast.items[index], data)
        }
    },
    [DELETE_EPISODE](state, data) {

        const index = state.dataUser.items
            .map(v => v.id)
            .indexOf(data.id)

        state.dataUser.items.splice(index, 1)

    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
import { showError, showSuccess } from "@/plugins/notification"
import { useFirebase } from "@/composables/useFirebase"
import { collection,doc,getDoc, getDocs } from "firebase/firestore"

const GET_USER = 'GET_USER'

const POST_USER = 'POST_USER'

const PUT_USER = 'PUT_USER'

const DELETE_USER = 'DELETE_USER'

const RESET_PASSWORD = 'RESET_PASSWORD'

const GET_PROFILE = 'GET_PROFILE'



export const ACTION_GET_USER = `user/${GET_USER}`

export const ACTION_GET_PROFILE = `user/${GET_PROFILE}`

export const MUTATION_GET_USER = `user/${GET_USER}`

export const ACTION_POST_USER = `user/${POST_USER}`

export const ACTION_PUT_USER = `user/${PUT_USER}`

export const ACTION_DELETE_USER = `user/${DELETE_USER}`

export const ACTION_RESET_PASSWORD = `user/${RESET_PASSWORD}`

const state = {
    dataUser: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },
    profile:{}

}

const actions = {
    [GET_USER]({ commit }, id) {
        return new Promise(async (resolve) => {

            const { db } = useFirebase()
            const userRef = collection(db, "USER", "")

            const data = await getDocs(userRef)
            const convert = data.docs.map((v) => {
                const res = v.data()
                return{
                    name: res.name,
                    email:res.email != undefined ? res.email : "",
                    level:res.level != undefined ? res.level :""
                }
            })
            commit(GET_USER, convert)

            resolve(true)
        })
    },
    [GET_PROFILE]({commit}){
        return new Promise(async (resolve)=>{
            const {db,auth} = useFirebase()
            auth.onAuthStateChanged(async user=> {
                const ref = doc(db,"USER",user.uid)
                const data = await getDoc(ref)
                console.log(data.data())
                if(data.exists()){
                    commit(GET_PROFILE,data.data())
                }
            })
          
        })
    },
    [POST_USER]({ commit }, body) {
        return new Promise(async (resolve) => {
         
            resolve(false)
        })
    },
    [PUT_USER]({ commit }, body) {
        return new Promise(async (resolve) => {



            resolve(false)
        })
    },
    [DELETE_USER]({ commit }, body) {
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
    [GET_USER](state, items) {
        state.dataUser = {
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
    [POST_USER](state, data) {
        const exist = state.dataUser.items
            .some(user => user.id == data.id)

        if (!exist) {
            state.dataUser.items.push(data)
        } else {
            const index = state.dataUser.items
                .map(v => v.id)
                .indexOf(data.id)
            Object.assign(state.dataUser.items[index], data)
        }
    },
    [DELETE_USER](state, data) {

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
import { useFirebase } from "@/composables/useFirebase"
import { collection, doc, setDoc, getDocs,deleteDoc ,query,where} from "firebase/firestore"
import {ref,uploadBytes,getDownloadURL,deleteObject} from "firebase/storage"


const GET_PODCAST = 'GET_PODCAST'

const POST_PODCAST = 'POST_PODCAST'

const PUT_PODCAST = 'PUT_PODCAST'

const DELETE_PODCAST = 'DELETE_PODCAST'

const RESET_PASSWORD = 'RESET_PASSWORD'

const GET_PROFILE = 'GET_PROFILE'



export const ACTION_GET_PODCAST = `podcast/${GET_PODCAST}`

export const ACTION_GET_PROFILE = `podcast/${GET_PROFILE}`

export const MUTATION_GET_PODCAST = `podcast/${GET_PODCAST}`

export const ACTION_POST_PODCAST = `podcast/${POST_PODCAST}`

export const ACTION_PUT_PODCAST = `podcast/${PUT_PODCAST}`

export const ACTION_DELETE_PODCAST = `podcast/${DELETE_PODCAST}`

export const ACTION_RESET_PASSWORD = `podcast/${RESET_PASSWORD}`

const state = {
    dataPodcast: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },
    profile: {}

}

const actions = {
    [GET_PODCAST]({ commit }, id) {
        return new Promise(async (resolve) => {

            const { auth,db } = useFirebase()
            auth.onAuthStateChanged(async (user) => {
                const userRef = query(collection(db, "PODCAST"),where('createdBy','==',user.uid))

                const data = await getDocs(userRef)
                const convert = data.docs.map((v) => {

                    const res = v.data()

                    return {
                        id: v.id,
                        title: res.title != undefined ? res.title : "",
                        description: res.description != undefined ? res.description : "",
                        thumbnail: res.thumbnail != undefined ? res.thumbnail : "",
                        likes: res.likes != undefined ? res.likes : 0,
                        createdAt: res.createdAt != undefined ? res.createdAt : 0,
                        createdBy: res.createdBy != undefined ? res.createdBy : ""
                    }
                })
                commit(GET_PODCAST, convert)

            })
            resolve(true)
        })
    },
    [POST_PODCAST]({ commit }, body) {
        return new Promise(async (resolve) => {
            const { auth, db,bucket } = useFirebase()
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const podcastRef = collection(db,"PODCAST")
                    const uuid = doc(podcastRef)

                    const thumbRef = ref(bucket,`PODCAST/${uuid.id}.jpg`)
                    await uploadBytes(thumbRef,body.thumbnail)
                    const thumbUrl = await getDownloadURL(thumbRef)


                    const prepareData = {
                        id:uuid.id,
                        createdBy: user.uid,
                        createdAt: new Date().getTime(),
                        title:body.title,
                        likes:0,
                        description:body.description,
                        thumbnail:thumbUrl
                    }


                    await setDoc(uuid, prepareData)
                    commit(POST_PODCAST, prepareData)
                    resolve(true)
                    return
                }
                resolve(false)
            })
        })
    },
    [PUT_PODCAST]({ commit }, body) {
        return new Promise(async (resolve) => {
            
        })
    },
    [DELETE_PODCAST]({ commit }, body) {
        return new Promise(async (resolve) => {

            const {db,bucket} = useFirebase()
            await deleteDoc(doc(db,"PODCASR",body.id))
            await deleteObject(ref(bucket,`PODCAST/${body.id}.jpg`))

            commit(DELETE_PODCAST,body)
            resolve(true)
        })
    },
    [RESET_PASSWORD]({ }, body) {
        return new Promise(async (resolve) => {

            resolve(false)
        })
    }
}

const mutations = {
    [GET_PODCAST](state, items) {
        state.dataPodcast = {
            items: items,
            loading: false,
            error: null,
            currentPage: 0,
            totalPages: items.length
        }

    },
    [GET_PROFILE](state, data) {
        state.profile = data
    },
    [POST_PODCAST](state, data) {
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
    [DELETE_PODCAST](state, data) {

        const index = state.dataPodcast.items
            .map(v => v.id)
            .indexOf(data.id)

        state.dataPodcast.items.splice(index, 1)
        state.dataPodcast.totalPages = (state.dataPodcast.totalPages -1)

    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
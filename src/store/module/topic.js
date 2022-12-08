import { useFirebase } from "@/composables/useFirebase"
import { collection, doc, getDocs, setDoc, where, query, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"


const GET_TOPIC = 'GET_TOPIC'

const POST_TOPIC = 'POST_TOPIC'

const PUT_TOPIC = 'PUT_TOPIC'

const DELETE_TOPIC = 'DELETE_TOPIC'


const SET_LOADING = 'SET_LOADING'



export const ACTION_GET_TOPIC = `topic/${GET_TOPIC}`

export const MUTATION_GET_TOPIC = `topic/${GET_TOPIC}`

export const ACTION_POST_TOPIC = `topic/${POST_TOPIC}`

export const ACTION_PUT_TOPIC = `topic/${PUT_TOPIC}`

export const ACTION_DELETE_TOPIC = `topic/${DELETE_TOPIC}`


const state = {
    dataTopic: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },
    profile: {}

}

const actions = {
    [GET_TOPIC]({ commit }, id) {
        return new Promise(async (resolve) => {


            const { db } = useFirebase()
            const userRef = collection(db, "TOPICS")

            const data = await getDocs(userRef)

            const convert = data.docs.map((v) => {

                const res = v.data()

                return {
                    id: v.id,
                    name: res.name != undefined ? res.name : "",
                    image: res.image != undefined ? res.image : "",
                    key: res.key != undefined ? res.key : "",
                    color: res.color != undefined ? res.color : 0
                }
            })
            commit(GET_TOPIC, convert)

            resolve(true)
        })
    },
    [POST_TOPIC]({ commit }, body) {
        return new Promise(async (resolve) => {

            const { db, bucket } = useFirebase()


            //generate id 
            const topicRef = collection(db, "TOPICS")
            const uuid = doc(topicRef)

            //upload thumbnail
            const thumbnailRef = ref(bucket, `TOPICS/${uuid.id}.jpg`)
            await uploadBytes(thumbnailRef, body.image)
            const thumbUrl = await getDownloadURL(thumbnailRef)


            const prepareData = {
                name: body.name,
                image: thumbUrl,
                key: new Date().getTime(),
                color: body.color.hex,
                id: uuid.id,
            }


            await setDoc(uuid, prepareData)

            commit(POST_TOPIC, prepareData)
            resolve(true)


        })
    },
    [PUT_TOPIC]({ commit }, body) {
        return new Promise(async (resolve) => {
            const { db, bucket } = useFirebase()


            //generate id 
            const topicRef = collection(db, "TOPICS", body.id)

            if (body.image != null) {
                //upload thumbnail
                const thumbnailRef = ref(bucket, `TOPICS/${body.id}.jpg`)
                await uploadBytes(thumbnailRef, body.image)
                const thumbUrl = await getDownloadURL(thumbnailRef)


                const prepareData = {
                    name: body.name,
                    image: thumbUrl,
                    key: new Date().getTime(),
                    color: body.color.hex,
                    id: uuid.id,
                }
                await setDoc(topicRef, prepareData)
                commit(POST_TOPIC, prepareData)
            }else{
                const prepareData = {
                    name: body.name,
                    key: new Date().getTime(),
                    color: body.color.hex,
                    id: uuid.id,
                }
                await setDoc(topicRef, prepareData)
                commit(POST_TOPIC, prepareData)
            }

            
            resolve(true)

        })
    },
    [DELETE_TOPIC]({ commit }, body) {
        return new Promise(async (resolve) => {
            const { db, bucket } = useFirebase()

            await deleteDoc(doc(db, "TOPICS", body.id))
            await deleteObject(ref(bucket, `TOPICS/${body.id}.jpg`))
            commit(DELETE_TOPIC, body)
            resolve(true)
        })
    }
}

const mutations = {
    [GET_TOPIC](state, items) {
        state.dataTopic = {
            items: items,
            loading: false,
            error: null,
            currentPage: 0,
            totalPages: items.length
        }

    },
    [POST_TOPIC](state, data) {
        const exist = state.dataTopic.items
            .some(pd => pd.id == data.id)

        if (!exist) {
            state.dataTopic.items.push(data)
        } else {
            const index = state.dataTopic.items
                .map(v => v.id)
                .indexOf(data.id)
            Object.assign(state.dataTopic.items[index], data)
        }
    },
    [DELETE_TOPIC](state, data) {

        const index = state.dataTopic.items
            .map(v => v.id)
            .indexOf(data.id)

        state.dataTopic.items.splice(index, 1)
        state.dataTopic.totalPages = (state.dataTopic.totalPages - 1)

    },
    [SET_LOADING](state, isLoading) {
        state.dataTopic.loading = isLoading
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
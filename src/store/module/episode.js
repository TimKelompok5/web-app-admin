import { useFirebase } from "@/composables/useFirebase"
import { collection, doc, getDocs, setDoc, where, query, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"


const GET_EPISODE = 'GET_EPISODE'

const POST_EPISODE = 'POST_EPISODE'

const PUT_EPISODE = 'PUT_EPISODE'

const DELETE_EPISODE = 'DELETE_EPISODE'

const RESET_PASSWORD = 'RESET_PASSWORD'

const SET_LOADING = 'SET_LOADING'



export const ACTION_GET_EPISODE = `episode/${GET_EPISODE}`

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
    profile: {}

}

const actions = {
    [GET_EPISODE]({ commit }, id) {
        return new Promise(async (resolve) => {


            const { db } = useFirebase()
            const userRef = query(collection(db, "EPISODE"), where("podcastId", "==", id))

            const data = await getDocs(userRef)

            const convert = data.docs.map((v) => {

                const res = v.data()

                return {
                    id: v.id,
                    title: res.title != undefined ? res.title : "",
                    description: res.description != undefined ? res.description : "",
                    thumbnail: res.thumbnail != undefined ? res.thumbnail : "",
                    likes: res.likes != undefined ? res.likes : 0,
                    audioUrl: res.audioUrl != undefined ? res.audioUrl : "",
                    createdAt: res.createdAt != undefined ? res.createdAt : 0,
                    updatedAt: res.updatedAt != undefined ? res.updatedAt : 0,
                    createdBy: res.createdBy != undefined ? res.createdBy : "",
                    podcastId: res.podcastId != undefined ? res.podcastId : "",
                }
            })
            commit(GET_EPISODE, convert)

            resolve(true)
        })
    },
    [POST_EPISODE]({ commit }, body) {
        return new Promise(async (resolve) => {

            const { auth, db, bucket } = useFirebase()

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    //generate id 
                    const episodeRef = collection(db, "EPISODE")
                    const uuid = doc(episodeRef)

                    //upload thumbnail
                    const thumbnailRef = ref(bucket, `EPISODE/${uuid.id}/thumb.jpg`)
                    await uploadBytes(thumbnailRef, body.thumbnail)
                    const thumbUrl = await getDownloadURL(thumbnailRef)

                    //upload audio
                    const audioRef = ref(bucket, `EPISODE/${uuid.id}/audio.mp3`)
                    const uploadAudio = () => {
                        if (body.isFile) {
                            //upload audio
                            return body.audioFile
                        } else {
                            return body.audioUrl
                        }
                    }

                    await uploadBytes(audioRef, uploadAudio())
                    const audioUrl = await getDownloadURL(audioRef)
                    const prepareData = {
                        createdBy: user.uid,
                        createdAt: new Date().getTime(),
                        updatedAt: new Date().getTime(),
                        title: body.title,
                        description: body.description,
                        thumbnail: thumbUrl,
                        audioUrl: audioUrl,
                        podcastId: body.podcastId,
                        id: uuid.id,
                        likes: 0
                    }


                    await setDoc(uuid, prepareData)

                    commit(POST_EPISODE, prepareData)
                    resolve(true)
                    return
                }
                resolve(false)

            })
        })
    },
    [PUT_EPISODE]({ commit }, body) {
        return new Promise(async (resolve) => {
            resolve(false)
        })
    },
    [DELETE_EPISODE]({ commit }, body) {
        return new Promise(async (resolve) => {
            const { db, bucket } = useFirebase()

            await deleteDoc(doc(db, "EPISODE", body.id))
            try {
                await deleteObject(ref(bucket, `EPISODE/${body.id}/audio.mp3`))
                await deleteObject(ref(bucket, `EPISODE/${body.id}/thumb.jpg`))
            } catch (error) {

            }

            commit(DELETE_EPISODE, body)
            resolve(true)
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
            totalPages: items.length
        }

    },
    [POST_EPISODE](state, data) {
        const exist = state.dataEpisode.items
            .some(pd => pd.id == data.id)

        if (!exist) {
            state.dataEpisode.items.push(data)
        } else {
            const index = state.dataEpisode.items
                .map(v => v.id)
                .indexOf(data.id)
            Object.assign(state.dataEpisode.items[index], data)
        }
    },
    [DELETE_EPISODE](state, data) {

        const index = state.dataEpisode.items
            .map(v => v.id)
            .indexOf(data.id)

        state.dataEpisode.items.splice(index, 1)
        state.dataEpisode.totalPages = (state.dataEpisode.totalPages - 1)

    },
    [SET_LOADING](state, isLoading) {
        state.dataEpisode.loading = isLoading
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
import { showError, showSuccess } from "@/plugins/notification"
import { useApi } from "@/utils/api"

const GET_QUESTIONNAIRE = 'GET_QUESTIONNAIRE'
const GET_DETAIL_QUESTIONNAIRE = 'GET_DETAIL_QUESTIONNAIRE'
const GET_EDIT_QUESTIONNAIRE = 'GET_EDIT_QUESTIONNAIRE'
const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE'
const SEND_QUESTIONNAIRE = 'SEND_QUESTIONNAIRE'
const SEND_UPDATE_QUESTIONNAIRE = 'SEND_UPDATE_QUESTIONNAIRE'
export const ACTION_GET_QUESTIONNAIRE = `questionnaire/${GET_QUESTIONNAIRE}`
export const ACTION_GET_DETAIL_QUESTIONNAIRE = `questionnaire/${GET_DETAIL_QUESTIONNAIRE}`
export const ACTION_GET_EDIT_QUESTIONNAIRE = `questionnaire/${GET_EDIT_QUESTIONNAIRE}`
export const ACTION_DELETE_QUESTIOINNAIRE = `questionnaire/${DELETE_QUESTIONNAIRE}`
export const ACTION_SEND_QUESTIONNAIRE = `questionnaire/${SEND_QUESTIONNAIRE}`
export const ACTION_SEND_UPDATE_QUESTIONNAIRE = `questionnaire/${SEND_UPDATE_QUESTIONNAIRE}`

const ADD_QUESTIONNAIRE = "ADD_QUESTIONNAIRE"
export const MUTATION_ADD_QUESTIONNAIRE = `questionnaire/${ADD_QUESTIONNAIRE}`
const SET_DETAIL_QUESTIONNAIRE = "SET_DETAIL_QUESTIONNAIRE"
export const MUTATION_SET_DETAIL_QUESTIONNAIRE = `questionnaire/${SET_DETAIL_QUESTIONNAIRE}`
const REMOVE_QUESTIONNAIRE = 'REMOVE_QUESTIONNAIRE'
export const MUTATION_REMOVE_QUESTIONNAIRE = `questionnaire/${REMOVE_QUESTIONNAIRE}`

const state = {
    items: [],
    detailQuestionnaire: {

    }
};
const getters = {};
const actions = {
    [GET_QUESTIONNAIRE]({ commit }) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { code, data, success } = await api.getListQuestionnaire()
            if (success) {
                if (code <= 209 && code >= 200) {
                    data.forEach(q => {
                        commit(ADD_QUESTIONNAIRE, q)
                    });
                }
            }
            resolve(success)

        })
    },
    [GET_DETAIL_QUESTIONNAIRE]({ commit }, slug) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { code, data, success } = await api.getDetailQuestionnaire(slug)
            if (success) {
                if (code <= 209 && code >= 200) {
                    commit(SET_DETAIL_QUESTIONNAIRE, data)
                    resolve(true)
                }
            }
            resolve(success)
        })
    },
    [GET_EDIT_QUESTIONNAIRE](context, slug) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { code, data, success } = await api.getDetailQuestionnaire(slug)
            if (success) {
                if (code <= 209 && code >= 200) {
                    
                    resolve(data)
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        })
    },
    [SEND_QUESTIONNAIRE]({ commit }, body) {
        return new Promise(async (resolve) => {
            if(!body.name || body.name == ""){
                showError("Gagal menyimpan,Judul tidak boleh kosong!")
                resolve(false)
                return
            }
            if(!body.questionnaire || body.questionnaire.length < 1){
                showError("Gagal menyimpan,Kusioner belum memiliki pertanyaan!")
                resolve(false)
                return
            }
            const api = useApi()
            const { code, data, success } = await api.postQuestionnaire(body)
            
            if (success) {
                if (code <= 209 && code >= 200) {
                    showSuccess("Berhasil menyimpan!")
                    resolve(true)
                } else {
                    showError("Gagal menyimpan!")
                    resolve(false)
                }
            } else {
                showError("Gagal menyimpan!")
                resolve(false)
            }
        })
    },
    [SEND_UPDATE_QUESTIONNAIRE](context, { body, slug }) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { code, success } = await api.putQuestionnaire(slug, body)
            if (success) {
                if (code <= 209 && code >= 200) {
                    showSuccess("Berhasil menyimpan!")
                    resolve(true)
                } else {
                    showError("Gagal menyimpan!")
                    resolve(false)
                }
            } else {
                showError("Gagal menyimpan!")
                resolve(false)
            }
        })
    },
    [DELETE_QUESTIONNAIRE]({ commit }, body) {
        return new Promise(async (resolve) => {
            try {
                
                const api = useApi()
                const { code, data, success } = await api.deleteQuestionnaire(body.slug)
                if (success) {
                    if (code <= 209 && code >= 200) {
                        showSuccess("Berhasil menyimpan!")
                        commit(REMOVE_QUESTIONNAIRE, body.slug)
                        resolve(true)
                    }
                }
            } catch (e) {
                showError(e.message)
            }


        })
    }
};
const mutations = {
    [ADD_QUESTIONNAIRE](state, data) {
        const exist = state.items.some(q => q.id == data.id)
        if (exist) {
            const index = state.items.map(q => q.id).indexOf(data.id)
            Object.assign(state.items[index], data)
        } else {
            state.items.push(data)
        }
    },
    [SET_DETAIL_QUESTIONNAIRE](state, data) {
        state.detailQuestionnaire = data
    },
    [REMOVE_QUESTIONNAIRE](state, slug) {
        const exist = state.items.some(q => q.slug == slug)

        if (exist) {
            const index = state.items.map(q => q.slug).indexOf(slug)
            state.items.splice(index, 1)
        }
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

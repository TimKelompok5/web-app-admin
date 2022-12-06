import { showError, showSuccess } from "@/plugins/notification"
import { useApi } from "@/utils/api"

const GET_HOSPITAL = 'GET_HOSPITAL'
const POST_HOSPITAL = 'POST_HOSPITAL'
const PUT_HOSPITAL = 'PUT_HOSPITAL'
const DELETE_HOSPITAL = 'DELETE_HOSPITAL'


export const ACTION_GET_HOSPITAL = `hospital/${GET_HOSPITAL}`

export const MUTATION_GET_HOSPITAL = `hospital/${GET_HOSPITAL}`

export const ACTION_POST_HOSPITAL = `hospital/${POST_HOSPITAL}`

export const ACTION_PUT_HOSPITAL = `hospital/${PUT_HOSPITAL}`

export const ACTION_DELETE_HOSPITAL = `hospital/${DELETE_HOSPITAL}`

const state = {
    dataHospital: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },

}

const actions = {
    [GET_HOSPITAL]({ commit }, body) {
        return new Promise(async (resolve) => {

            const api = useApi()

            const { success, message, data } = await api.get(`api/admin/hospitals?page=0&size=100`)

            if (success) {
                commit(GET_HOSPITAL, data)
            }
            resolve(success)
        })
    },
    [POST_HOSPITAL]({ commit }, body) {
        return new Promise(async (resolve) => {


            const api = useApi()
            const { success, message, data } = await api.post(`api/admin/hospital`, body)

            if (success) {
                showSuccess(message)
                commit(POST_HOSPITAL, data)
            } else {
                showError(message)
            }

            resolve(success)
        })
    },
    [PUT_HOSPITAL]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { success, message, data } = await api.update(`api/admin/hospital/${body.id}`, body)

            if (success) {
                showSuccess(message)
                commit(POST_HOSPITAL, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [DELETE_HOSPITAL]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { message, data, success } = await api.del(`api/admin/hospital/${body.id}`)

            if (success) {
                showSuccess(message)
                commit(DELETE_HOSPITAL, body)
            } else {
                showError(message)
            }

            resolve(success)
        })
    }
}

const mutations = {
    [GET_HOSPITAL](state, { items, page, totalPages }) {
        state.dataHospital = {
            items: items,
            loading: false,
            error: null,
            currentPage: page,
            totalPages: totalPages
        }

    },
    [POST_HOSPITAL](state, data) {
        const dataExist = state.dataHospital.items
            .some(hospital => hospital.id == data.id)

        if (!dataExist) {
            state.dataHospital.items.push(data)
        } else {
            const index = state.dataHospital.items
                .map(v => v.id)
                .indexOf(data.id)

            Object.assign(
                state.dataHospital.items[index],
                data
            )
        }
    },
    [DELETE_HOSPITAL](state, data) {
        const index = state.dataHospital.items
            .map(v => v.id)
            .indexOf(data.id)


        state.dataHospital.items.splice(index, 1)

    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
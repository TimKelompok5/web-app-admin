import { showError, showSuccess } from "@/plugins/notification"
import { useApi } from "@/utils/api"

const GET_USER_HOSPITAL = 'GET_USER_HOSPITAL'

const POST_USER_HOSPITAL = 'POST_USER_HOSPITAL'

const PUT_USER_HOSPITAL = 'PUT_USER_HOSPITAL'

const DELETE_USER_HOSPITAL = 'DELETE_USER_HOSPITAL'



export const ACTION_GET_USER_HOSPITAL = `userhospital/${GET_USER_HOSPITAL}`

export const MUTATION_GET_USER_HOSPITAL = `userhospital/${GET_USER_HOSPITAL}`

export const ACTION_POST_USER_HOSPITAL = `userhospital/${POST_USER_HOSPITAL}`

export const ACTION_PUT_USER_HOSPITAL = `userhospital/${PUT_USER_HOSPITAL}`

export const ACTION_DELETE_USER_HOSPITAL = `userhospital/${DELETE_USER_HOSPITAL}`

const state = {
    dataUserHospital: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },

}

const actions = {
    [GET_USER_HOSPITAL]({ commit }, id) {
        return new Promise(async (resolve) => {

            const api = useApi()

            const { success, message, data } = await api.get(`api/admin/users/hospital/${id}?page=0&size=100`)

            if (success) {
                commit(GET_USER_HOSPITAL, data)
            }
            resolve(success)
        })
    },
    [POST_USER_HOSPITAL]({ commit }, { id: hospitalId, body }) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { success, message, data } = await api
                .post(`api/admin/user/hospital/${hospitalId}`, body)
            if (success) {
                showSuccess(message)
                commit(POST_USER_HOSPITAL, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [PUT_USER_HOSPITAL]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { message, data, success } = await api.update(`api/admin/user/${body.id}`, body)

            if (success) {
                showSuccess(message)
                commit(POST_USER_HOSPITAL, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [DELETE_USER_HOSPITAL]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { message, data, success } = await api.del(`api/admin/user/${body.id}`)
            if (success) {
                showSuccess(message)
                commit(DELETE_USER_HOSPITAL, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    }
}

const mutations = {
    [GET_USER_HOSPITAL](state, { items, page, totalPages }) {
        state.dataUserHospital = {
            items: items,
            loading: false,
            error: null,
            currentPage: page,
            totalPages: totalPages
        }

    },
    [POST_USER_HOSPITAL](state, data) {
        const exist = state.dataUserHospital.items
            .some(user => user.id == data.id)

        if (!exist) {
            state.dataUserHospital.items.push(data)
        } else {
            const index = state.dataUserHospital.items
                .map(v => v.id)
                .indexOf(data.id)
            Object.assign(state.dataUserHospital.items[index], data)
        }
    },
    [DELETE_USER_HOSPITAL](state, data) {

        const index = state.dataUserHospital.items
            .map(v => v.id)
            .indexOf(data.id)

        state.dataUserHospital.items.splice(index, 1)

    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
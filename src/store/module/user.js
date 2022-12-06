import { showError, showSuccess } from "@/plugins/notification"
import { useApi } from "@/utils/api"


const GET_USER = 'GET_USER'

const POST_USER = 'POST_USER'

const PUT_USER = 'PUT_USER'

const DELETE_USER = 'DELETE_USER'

const RESET_PASSWORD = 'RESET_PASSWORD'



export const ACTION_GET_USER = `user/${GET_USER}`

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

}

const actions = {
    [GET_USER]({ commit }, id) {
        return new Promise(async (resolve) => {

            const api = useApi()

            const { success, message, data } = await api.get(`api/admin/users?page=0&size=100`)

            if (success) {
                commit(GET_USER, data)
            }
            resolve(success)
        })
    },
    [POST_USER]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { success, message, data } = await api
                .post(`api/admin/user`, body)
            if (success) {
                showSuccess(message)
                commit(POST_USER, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [PUT_USER]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { message, data, success } = await api.update(`api/admin/user/${body.id}`, body)

            if (success) {
                showSuccess(message)
                commit(POST_USER, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [DELETE_USER]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { message, data, success } = await api.del(`api/admin/user/${body.id}`)
            if (success) {
                showSuccess(message)
                commit(DELETE_USER, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [RESET_PASSWORD]({},body){
       return new Promise(async(resolve)=>{
        const api = useApi()

        const {success,message} = await api.update(`api/admin/user/reset-password`,body)

        if (success) {
            showSuccess(message)
        } else {
            showError(message)
        }
        resolve(success)
       })
    }
}

const mutations = {
    [GET_USER](state, { items, page, totalPages }) {
        state.dataUser = {
            items: items,
            loading: false,
            error: null,
            currentPage: page,
            totalPages: totalPages
        }

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
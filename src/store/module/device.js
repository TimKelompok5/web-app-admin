import { showError, showSuccess } from "@/plugins/notification"
import { useApi } from "@/utils/api"

const GET_DEVICE = 'GET_DEVICE'

const POST_DEVICE = 'POST_DEVICE'

const PUT_DEVICE = 'PUT_DEVICE'

const DELETE_DEVICE = 'DELETE_DEVICE'

export const ACTION_GET_DEVICE = `device/${GET_DEVICE}`

export const MUTATION_GET_DEVICE = `device/${GET_DEVICE}`

export const ACTION_POST_DEVICE = `device/${POST_DEVICE}`

export const ACTION_PUT_DEVICE = `device/${PUT_DEVICE}`

export const ACTION_DELETE_DEVICE = `device/${DELETE_DEVICE}`


const state = {
    dataDevice: {
        items: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPages: 1
    },

}

const actions = {
    [GET_DEVICE]({ commit }, body) {
        return new Promise(async (resolve) => {

            const api = useApi()

            const { success, message, data } = await api.get(`api/admin/devices?page=0&size=200`)

            if (success) {
                commit(GET_DEVICE, data)
            }
            resolve(success)
        })
    },
    [POST_DEVICE]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { message, success, data } = await api.post(`api/admin/device`, body)

            if (success) {
                showSuccess(message)
                data.forEach(device => {
                    commit(POST_DEVICE, device)
                });
                
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [PUT_DEVICE]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()
            const { message, data, success } = await api.update(`api/admin/device/${body.id}`, body)

            if (success) {
                showSuccess(message)
                commit(POST_DEVICE, data)
            } else {
                showError(message)
            }
            resolve(success)
        })
    },
    [DELETE_DEVICE]({ commit }, body) {
        return new Promise(async (resolve) => {
            const api = useApi()

            const { success, message } = await api.del(`api/admin/device/${body.id}`)
            if (success) {
                showSuccess(message)
                commit(DELETE_DEVICE, body)
            } else {
                showError(message)
            }
            resolve(success)
        })
    }
}

const mutations = {
    [GET_DEVICE](state, { items, page, totalPages }) {
        state.dataDevice = {
            items: items,
            loading: false,
            error: null,
            currentPage: page,
            totalPages: totalPages
        }

    },
    [POST_DEVICE](state, data) {
        const exist = state.dataDevice.items
            .some(device => device.id == data.id)

        if (!exist) {
            state.dataDevice.items.push(data)
        } else {
            const index = state.dataDevice.items
                .map(v => v.id)
                .indexOf(data.id)
            Object.assign(state.dataDevice.items[index], data)
        }
    },
    [DELETE_DEVICE](state, data) {
        const index = state.dataDevice.items
            .map(v => v.id)
            .indexOf(data.id)


        state.dataDevice.items.splice(index, 1)

    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
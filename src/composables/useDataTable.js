import { mdiDelete, mdiPencil } from '@mdi/js'
export const useTableProps = () => {
    return {
        totalPage: {
            type: Number,
            default: 0
        },
        items: {
            type: Array,
            default: (() => [])
        },
        loading: {
            type: Boolean,
            default: true
        },
        error: {
            type: String,
            default: null
        }
    }
}

export const useDataTable = (ctx) => {
    function import_excel() {
        ctx.emit('import', true)
    }
    function add() {
        ctx.emit('add', true)
    }
    function edit(data) {
        ctx.emit("update", data)
    }
    function remove(data) {
        ctx.emit('remove', data)
    }
    return {

        icons: {
            mdiDelete,
            mdiPencil,
        },
        add,
        remove,
        edit,
        import_excel
    }
}
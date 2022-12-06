import { useSession } from "./index"
import axios from "axios"
import Vue from "vue"
import VueAxios from "vue-axios"


const useApi = () => {
    let BASE_URL = "https://medical-record.cexup.com"
    // let BASE_URL = "http://localhost:8000"
    const session = useSession()
    function setup() {
        Vue.use(VueAxios, axios)
        Vue.axios.interceptors.response.use(
            (res) => {
                const { status, data } = res
                if (status <= 209 || status >= 200) {
                    const { code, token, message, data: result } = data

                    if (token || token != "") {
                        session.setToken(token)
                    }
                    if (code <= 209 || code >= 200) {
                        return {
                            success: true,
                            data: result,
                            message: message
                        }
                    }
                    return {
                        success: false,
                        data: {},
                        message: data.message
                    }
                }
                return {
                    success: false,
                    data: {},
                    message: data.message
                }
            },
            (err) => {
                return Promise.resolve({
                    success: false,
                    message: err.message,
                    data: {}
                })
            }
        )
        Vue.axios.defaults.baseURL = BASE_URL
    }
    function iniHeader() {
        const token = session.getToken()
        if (token || token == "undefined") {
            Vue.axios.defaults.headers.common['Authorization'] = `${session.getToken()}`
        }
    }


    function get(url) {
        let q = `${BASE_URL}/${url}`
        iniHeader()
        return Vue.axios.get(q)

    }
    function post(url, body) {
        let q = `${BASE_URL}/${url}`
        iniHeader()
        return Vue.axios.post(q, body,)
    }

    function update(url, body) {
        let q = `${BASE_URL}/${url}`
        iniHeader()
        return Vue.axios.put(q, body)

    }
    function del(url) {
        let q = `${BASE_URL}/${url}`
        return Vue.axios.delete(q)
    }

    function getListQuestionnaire() {
        return fetch('https://kuisioner.cexup.com/api/questionnaire/admin').then(res => res.json())
    }
    function getDetailQuestionnaire(slug) {
        return fetch(`https://kuisioner.cexup.com/api/questionnaire/admin/${slug}`).then(res => res.json())
    }
    function postQuestionnaire(body) {
        return fetch('https://kuisioner.cexup.com/api/questionnaire/admin', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }, method: 'POST', body: JSON.stringify(body)
        }).then(res => res.json())
    }
    function putQuestionnaire(slug, body) {
        return fetch(`https://kuisioner.cexup.com/api/questionnaire/admin/${slug}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }, method: 'PUT', body: JSON.stringify(body)
        }).then(res => res.json())
    }
    function deleteQuestionnaire(slug) {
        return fetch(`https://kuisioner.cexup.com/api/questionnaire/admin/${slug}`, { method: 'DELETE' }).then(res => res.json())
    }

    return {
        setup,
        get,
        post,
        update,
        del,
        getDetailQuestionnaire,
        getListQuestionnaire,
        postQuestionnaire,
        putQuestionnaire,
        deleteQuestionnaire
    }

}

const  getDB=()=>{
    return new Promise((resolve,reject)=>{
        let req = window.indexedDB.open("db",1)

        req.onerror=e=>{
            reject(e.message)
        }

        req.onsuccess = ({target})=>{
            resolve(target.result)
        }

        req.onupgradeneeded = e=>{
            let db = req.result
            if(!db.objectStoreNames.contains("q")){
                db.createObjectStore('q',{keyPath:'id'})
            }
        }
    })
}

export {
    useApi,
    getDB
}
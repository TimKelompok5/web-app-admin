import { showError, showSuccess } from "@/plugins/notification"
import { useFirebase } from "@/composables/useFirebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signInWithCredential, GoogleAuthProvider } from "firebase/auth"
import { parseMessageAuthError } from "@/utils"
import { setDoc, doc, getDoc } from "firebase/firestore"


const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOGIN_GOOGLE = 'LOGIN_GOOGLE'
const REGISTER = 'REGISTER'


export const ACTION_LOGIN = `auth/${LOGIN}`
export const ACTION_LOGIN_GOOGLE = `auth/${LOGIN_GOOGLE}`
export const ACTION_LOGOUT = `auth/${LOGOUT}`
export const ACTION_REGISTER = `auth/${REGISTER}`


export const MUTATION_LOGIN = `auth/${LOGIN}`
export const MUTATION_LOGOUT = `auth/${LOGOUT}`


const state = {

}

const actions = {
    [LOGIN]({ commit }, body) {
        return new Promise(async (resolve) => {

            const { auth, db } = useFirebase()

            const { error, user } = await signInWithEmailAndPassword(auth, body.email, body.password)
                .then((user) => { return { user: user.user } })
                .catch((e) => { return { error: e.code } })

            if (error) {
                const msg = parseMessageAuthError(error)
                showSuccess(msg)
                resolve({
                    success: false,
                    message: msg
                })
                return
            }

            const userRef = doc(db, "USER", user.uid)
            const result = await getDoc(userRef)
            if (result.exists()) {
                sessionStorage.setItem('level', result.data().level)
            }
            resolve({
                success: true,
                message: ""
            })
        })
    },
    [REGISTER]({ commit }, body) {
        return new Promise(async (resolve) => {
            const { auth, db } = useFirebase()

            const { error, user } = await createUserWithEmailAndPassword(auth, body.email, body.password)
                .then((user) => { return { user: user.user } })
                .catch((e) => { return { error: e.code } })

            if (error) {
                const msg = parseMessageAuthError(error)
                showSuccess(msg)
                resolve({
                    success: false,
                    message: msg
                })
                return
            }

            //
            const userRef = doc(db, "USER", user.uid)
            await setDoc(userRef, {
                name: body.name,
                email: body.email,
                level: "USER",
                isActive:true,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
            })

            sessionStorage.setItem('level', "USER")
            showSuccess("Berhasil mendaftar")
            resolve({
                success: true,
                message: "Berhasil mendaftar"
            })

        })
    },
    [LOGIN_GOOGLE]({ }, isRegister) {
        return new Promise(async (resolve) => {
            const { auth,db } = useFirebase()
            const provider = new GoogleAuthProvider()

            await auth.signOut()

            signInWithPopup(auth, provider)
                .then(async (result) => {
                    
                    const userRef = doc(db, "USER", result.user.uid)
                    if (isRegister) {

                        await setDoc(userRef, {
                            name: result.user.displayName,
                            email: result.user.email,
                            level: "USER",
                            isActive:true,
                            photoUrl:result.user.photoURL,
                            createdAt: new Date().getTime(),
                            updatedAt: new Date().getTime(),
                        })

                        sessionStorage.setItem('level', "USER")
                        showSuccess("Berhasil Masuk")
                        resolve({
                            success: true,
                            message: "Berhasil Masuk"
                        })
                    } else {
                        const data = await getDoc(userRef)
                        if (data.exists()) {
                            sessionStorage.setItem('level', data.data().level)
                            showSuccess("Berhasil Masuk")
                            resolve({
                                success: true,
                                message: "Berhasil Masuk"
                            })
                        } else {
                            await auth.signOut()
                            showError("Silahkan mendaftar terlebih dahulu")
                            resolve({
                                success: false,
                                message: "Silahkan mendaftar terlebih dahulu"
                            })
                        }
                    }

                }).catch((err) => {
                    showError(err.message)
                    resolve({
                        success: false,
                        message: "Gagal Masuk"
                    })
                })
        })
    },
    [LOGOUT]({ commit }, body) {
        return new Promise(async (resolve) => {
            const { auth } = useFirebase()
            await auth.signOut()
            resolve(true)
        })
    }
}

const mutations = {
    [LOGIN]() { }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
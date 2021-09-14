import { RootState } from './../../types';
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { UserState, UserType } from './types';
import { auth, db } from '@/firebase'
import router from '@/router';

const state: UserState = {
    user: null,
    loading: false,
    error: null
}
const getters: GetterTree<UserState, RootState> = {
    user: (state) => state.user,
    userLoading: (state) => state.loading,
    userError: (state) => state.error
}
const mutations: MutationTree<UserState> = {
    SET_USER: (state, payload: UserType) => state.user = payload,
    SET_USER_LOADING: (state, payload: boolean) => state.loading = payload,
    SET_USER_ERROR: (state, payload: string) => state.error = payload
}

const actions: ActionTree<UserState, RootState> = {
    registerUser: async ({ commit }, register: { email: string, password: string, name: string }) => {
        commit('SET_USER_LOADING', true)
        await auth.createUserWithEmailAndPassword(register.email, register.password).then(
            data => db.collection('users').doc(data.user?.uid).set({
                uid: data.user?.uid,
                name: register.name,
                email: register.email,
                role: 'client',
            }).then(
                () => {
                    commit('SET_USER_LOADING', false)
                    commit('SET_USER', { name: register.name, email: register.email, uid: data.user?.uid, role: 'client' })
                    commit('SET_USER_ERROR', null)
                    router.push('/')
                }
            )
        )
            .catch(err => {
                commit('SET_USER_LOADING', false)
                commit('SET_USER_ERROR', err)
            })
    },
    loginUser: async ({ commit }, login: { email: string, password: string }) => {
        commit('SET_USER_LOADING', true)
        await auth.signInWithEmailAndPassword(login.email, login.password).then(
            data => db.collection('users').doc(data.user?.uid).get().then(
                (query) => {
                    commit('SET_USER_LOADING', false)
                    commit('SET_USER', query.data())
                    commit('SET_USER_ERROR', null)
                    router.push('/')

                }
            )
        )
            .catch(err => {
                commit('SET_USER_LOADING', false)
                commit('SET_USER_ERROR', err)
            })
    },
    logoutUser: async ({ commit }) => {
        commit('SET_USER_LOADING', true)
        await auth.signOut().then(() => {
            commit('SET_USER', null)
            commit('SET_USER_LOADING', false)
            router.push('/login')
        })
            .catch((err) => {
                commit('SET_USER_LOADING', false)
                commit('SET_USER_ERROR', err)
            })
    }
}
export const Auth: Module<any, RootState> = {
    state,
    getters,
    mutations,
    actions,
}


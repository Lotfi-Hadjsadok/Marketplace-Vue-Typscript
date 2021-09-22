import { db } from './../../../firebase';
import { RootState } from './../../types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { productsState, productType } from "./types";
import router from '@/router';

const state = <productsState>{
    products: [],
    productById: null,
    productsError: '',
    productsLoader: false,
    productsCount: 0,
    lastProduct: null,
    page: 0
}

const getters = <GetterTree<productsState, RootState>>{
    products: state => state.products,
    productById: state => state.productById,
    productsError: state => state.productsError,
    productsLoader: state => state.productsLoader,
    productsCount: state => state.productsCount
}

const mutations = <MutationTree<productsState>>{
    SET_PRODUCTS: (state, payload: Array<productType>) => state.products.push(...payload),
    SET_PRODUCT_BY_ID: (state, payload: productType) => state.productById = payload,
    SET_PRODUCTS_ERROR: (state, payload: string) => state.productsError = payload,
    SET_PRODUCTS_LOADER: (state, payload: boolean) => state.productsLoader = payload,
    SET_LAST_PRODUCT: (state, payload) => state.lastProduct = payload,
    SET_PRODUCTS_COUNT: (state, payload) => state.productsCount = payload
}

const actions = <ActionTree<productsState, RootState>>{
    fetchProducts: async ({ commit, state }) => {
        if (state.products?.length <= state.productsCount) { /// test before start
            commit('SET_PRODUCTS_LOADER', true)
            await db.collection('products').orderBy('createdAt').startAfter(state.lastProduct).limit(12).get().then(docs => {
                const data = <any>[]
                docs.forEach(doc => {
                    data.push(doc.data())
                    commit('SET_LAST_PRODUCT', doc)
                })
                commit('SET_PRODUCTS', data)
                commit('SET_PRODUCTS_LOADER', false)
                commit('SET_PRODUCTS_ERROR', null)
            })
                .catch((err) => {
                    commit('SET_PRODUCTS_LOADER', false)
                    commit('SET_PRODUCTS_ERROR', err)
                })
        }

    },
    getProductById: async ({ commit }, payload: { id: string, title: string }) => {
        commit('SET_PRODUCTS_LOADER', true)
        await db.collection('products').where('title', '==', payload.title).where('id', '==', payload.id).get().then(
            docs => {
                if (docs.empty) return router.replace('/404')
                docs.forEach(doc => {
                    commit('SET_PRODUCT_BY_ID', doc.data())
                    commit('SET_PRODUCTS_LOADER', false)
                })

            }
        )
            .catch((err) => {
                commit('SET_PRODUCTS_LOADER', false)
                commit('SET_PRODUCTS_ERROR', err)
            })
    },
    productsStateInit: async ({ commit, dispatch }) => {
        await db.collection('stats').doc('--products--').get().then(query => {
            commit('SET_PRODUCTS_COUNT', query.data()?.count)
            dispatch('fetchProducts')
        })
    }
}

export const Products = <Module<productsState, RootState>>{
    state,
    getters,
    mutations,
    actions
}
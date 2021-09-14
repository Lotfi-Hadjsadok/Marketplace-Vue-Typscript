import { productType } from './../products/types';
import { RootState } from './../../types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { cartState } from './types';

const state = <cartState>{
    cart: []
}
const getters = <GetterTree<cartState, RootState>>{
    cart: state => state.cart
}

const mutations = <MutationTree<cartState>>{
    SET_CART_ITEMS: (state, payload) => {
        state.cart = payload
    },

}
const actions = <ActionTree<cartState, RootState>>{
    addCartItem: ({ commit, state }, payload: { product: productType, quantity: number, uid: string }) => {
        const newCart = [...state.cart]
        const index = newCart.findIndex(item => item.product.id === payload.product.id && item.uid === payload.uid)
        if (index != -1) {
            newCart[index].quantity = newCart[index].quantity + payload.quantity
        } else {
            newCart.push({ product: payload.product, quantity: payload.quantity, uid: payload.uid })
        }
        commit('SET_CART_ITEMS', newCart)
    },
    removeCartItem: ({ commit, state }, payload: { product: productType, quantity: number, uid: string }) => {
        let newCart = [...state.cart]
        const index = newCart.findIndex(item => item.product.id === payload.product.id && item.uid === payload.uid)

        if (newCart[index]?.quantity == 1) {
            newCart = newCart.filter(item => item.product.id != payload.product.id || item.uid != payload.uid)
            commit('SET_CART_ITEMS', newCart)
            return
        }
        if (newCart[index]?.quantity > 1) {
            newCart[index]!.quantity--
            commit('SET_CART_ITEMS', newCart)
            return
        }

    }
}

export const Cart = <Module<cartState, RootState>>{
    state,
    getters,
    mutations,
    actions
}
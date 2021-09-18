import { productType } from './../products/types';
import { RootState } from './../../types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { cartState, cartType } from './types';

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
    addCartItem: ({ commit, state }, payload: cartType) => {
        const newCart = [...state.cart]
        const index = newCart.findIndex(item => item.id === payload.id && item.uid === payload.uid)
        if (index != -1) {
            newCart[index].quantity = newCart[index].quantity + payload.quantity
        } else {
            newCart.push(payload)
        }
        commit('SET_CART_ITEMS', newCart)
    },
    removeCartItem: ({ commit, state }, payload: cartType) => {
        let newCart = [...state.cart]
        const index = newCart.findIndex(item => item.id === payload.id && item.uid === payload.uid)

        if (newCart[index]?.quantity == 1) {
            newCart = newCart.filter(item => item.id != payload.id || item.uid != payload.uid)
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
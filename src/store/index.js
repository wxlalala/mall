import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state =  {
  cartList: []
}
const store = new Vuex.Store({
  // state: {
  //   cartList: []
  // },
  state,
  mutations,
  actions,
  // mutations: {
  //   // 跟踪数量
  //   addCounter(state, payload) {
  //     payload.count++
  //   },
  //   // 添加到购物车
  //   addToCart(state, payload) {
  //     state.cartList.push(payload)
  //   }
  // },
  // actions: {
  //   addCart(context, payload) {
  //     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

  //     if (oldProduct) {
  //       // let oldProduct = state.cartList[index]
  //       // oldProduct.count += 1
  //       context.commit('addCounter', oldProduct)
  //     } else {
  //       payload.count = 1
  //       // state.cartList.push(payload)
  //       context.commit('addToCart', payload)
  //     }
  //   }
  // }
})

export default store

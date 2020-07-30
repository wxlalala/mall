export default {
  // 跟踪数量
  addCounter(state, payload) {
    payload.count++
  },
  // 添加到购物车
  addToCart(state, payload) {
    //注意：修改购物车这种是否选中的问题，要在模型里修改，不要在组件里直接修改
    payload.checked = true
    state.cartList.push(payload)
  }
}
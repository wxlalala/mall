<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar>
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import cartList from './childComps/cartList'
import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name:'Cart',
    components: {
      NavBar,
      cartList,
      CartBottomBar
    },
    computed: {
      cartLength() {
        return this.$store.state.cartList.length
      }
    }

  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>>


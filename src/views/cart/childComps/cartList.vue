<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="item in cartList" :key="item.index">{{item}}</li> -->
      <cart-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'

import CartListItem from './CartListItem'
  export default {
    name:'cartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      cartList() {
        return this.$store.state.cartList
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart-list {
    height: 100vh;
    /* height: calc(100% - 44px -49px); */

  }
  .content {
    height: calc(100% - 44px);
    /* height: calc(100% - 44px -49px); */
    /* height: 100%; */
    overflow: hidden;
  }
</style>>


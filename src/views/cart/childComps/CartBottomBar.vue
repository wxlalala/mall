<template>
   <div class="bottom-menu">
    <Check-button class="select-all" 
                 :is-checked="isSelectAll"
                 @click.native="checkClick"></Check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/chekButton/ChekButton'
  export default {
    name:'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        // 计算总价格
        const cartList = this.$store.state.cartList;
        return  cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
        //保留两位小数
      },
      checkLength() {
        // 去计算的个数
        const cartList = this.$store.state.cartList;
        return cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 全选

        // 高阶函数find方法
        const cartList = this.$store.state.cartList;
        // 默认购物车为空时，全选不勾选
        if (cartList.length === 0) return false
        // 当有一个不选中的商品时不勾选
        return !cartList.find(item => !item.checked)

        // 普通遍历方法
        // const cartList = this.$store.state.cartList;
        // // 默认购物车为空时，全选不勾选
        // if (cartList.length === 0) return false
        // for (let item of cartList) {
        //   // 如果找到了为空的返回false，没有找到任何一个为空的就为true
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      },
    },
    methods: {
      // 全选按钮的点击
      checkClick() {
        const cartList = this.$store.state.cartList;

        if(this.isSelectAll) { //如商品全部被选中的情况下，点击全选会全部取消选中
          cartList.forEach(item => item.checked = false)
        } else {  //若商品有一个没有被选中，点击全选会全部选中
          cartList.forEach(item => item.checked = true)
        }

        // // 代码简化（但是此处不可以简化，会导致isSelectAll和checkClick相互影响的）
        // // this.isSelectAll为true时item => item.checked为false
        //  cartList.forEach(item => item.checked = !this.isSelectAll)
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>>


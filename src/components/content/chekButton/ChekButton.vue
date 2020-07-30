<template>
  <div class="chek-button" :class="{check: isChecked}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name:'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }

  }
</script>

<style scoped>
  .chek-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check {
    border-color: red;
    background-color: red;
  }
</style>>


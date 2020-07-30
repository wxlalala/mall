<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
 import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
      return {
        scroll: null
      }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建BScroll对象
     this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
    })
    // 监听滚动位置（用于隐藏与显示返回顶部按钮）
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      // 将scroll事件发出去，并且在home中使用
      this.$emit('scroll', position)
    })
    //监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      })
    }
    // this.scroll.on('pullingUp', () => {
    //   this.$emit('pullingUp')
    // })

  },
  methods: {
    // 对scrollTo的封装
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 对finishPullUp的封装，为了可以多次上拉加载更多
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    // 刷新数据
    refresh() {
      // (查看防抖操作是否生效，打印小于30次即可)
      // console.log('---');
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      //判断y的值，用于保持返回后的浏览位置
      return this.scroll ? this.scroll.y : 0
    }
  }
}

</script>

<style scoped>
</style>



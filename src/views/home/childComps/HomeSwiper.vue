<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="ImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

	export default {
		name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        // default: []
        default() {
          return []
        }
      }
    },
    methods: {
      stopTimer() {
        this.$refs.swiper.stopTimer()
      },
      startTimer() {
        if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      },
      //监听轮播图是否加载完成
      ImageLoad() {
        // console.log('111');
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
          //isload是为了只让此事件发送一次，有四张轮播图会发送四次
          // console.log('111');
        }
        // this.$emit('swiperImageLoad')
      }
    }
	}
</script>

<style scoped>

</style>

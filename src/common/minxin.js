import {debounce} from './utils'
import BackTop from '../components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
  data() {
    return {
      itemImagListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImagListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImagListener)
    // console.log('111');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
  }
}
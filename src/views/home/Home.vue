<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isTabFixed">
    </tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import HomeSwiper from '../home/childComps/HomeSwiper'
import RecommendView from '../home/childComps/RecommendView'
import FeatureView from '../home/childComps/FeatureView'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
// import BackTop from '../../components/content/backTop/BackTop'
// import {debounce} from '../../common/utils'
import {itemListenerMixin, backTopMixin} from '../../common/minxin'

import {getHomeMultidata, getHomeGoods} from '../../network/home'
  export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop',
        tabOffsetOff: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // // 防抖操作
      // const refresh = debounce(this.$refs.scroll.refresh, 200)
      // this.itemImagListener = () => {
      //   // console.log('----');
      //   // 每次图片加载完都重新加载数据（高度），解决滑动时划不动的bug
      //   // this.$refs.scroll.refresh()
      //   refresh()
      // }
      // 直接用混入
      // this.$bus.$on('itemImageLoad',this.itemImagListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);

      // 取消全局监听
      this.$bus.$off('itemImageLoad', this.itemImagListener)
    },
    methods: {
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 监听点击，currentIndex是用于记录当前点击位置
        // 用于吸顶效果的点击同步
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        // 判断BackTop返回顶部按钮是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 判断tabControl是否吸顶（是否有positiong：fixed属性）
        this.isTabFixed = (-position.y) > this.tabOffsetOff
      },
      loadMore() {
        // console.log('11');
        //获取当前商品类型的数据，前面有对currentype的判断
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //$el拿到组件的元素  offsetTop是获取元素距离顶部高度的属性
        this.tabOffsetOff = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl2.$el.offsetTop);
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 为了可以多次上拉加载更多
          this.$refs.scroll.finishPullUp()
       })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    padding-bottom: 1000px;
    /* position: relative; */
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 做吸顶效果时删减，在使用浏览器原生滚动时使用 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>>


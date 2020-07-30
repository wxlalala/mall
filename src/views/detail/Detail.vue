<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">

      <!-- <ul>
        <li v-for="item in $store.state.cartList" :key="item.index">{{item}}</li>
      </ul>
       -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottem-bar @addToCart="addToCart"></detail-bottem-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from '../../components/content/goods/GoodsList'
import {debounce} from '../../common/utils'
import {itemListenerMixin, backTopMixin} from '../../common/minxin'
import DetailBottemBar from './childComps/DetailBottemBar'

import Scroll from '../../components/common/scroll/Scroll'
// import Toast from '../../components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themetopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottemBar,
    // Toast
  },
  created() {
    this.iid = this.$route.params.iid

    //请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 获取详情轮播图信息
      this.topImages = res.result.itemInfo.topImages
      // 获取商品价格等信息
      const data = res.result;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取商家店铺信息
      this.shop = new Shop(data.shopInfo)

      // 直接拿到商品图片详情，不通过类
      this.detailInfo = data.detailInfo

      //  获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 评论信息的获取
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
        // this.commentInfo = data.rate.list[0];

      // if (data.rate.cRate !== 0) {
      //       this.commentInfo = data.rate.list[0];
      // }

      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来的
      //   // 但是图片依旧是没有加载完的（目前获取到的offsettop不包含图片的高度
      //   // offsettop值不对一般都是图片问题
      //   this.themetopYs = []
      //   this.themetopYs.push(0);
      //   this.themetopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themetopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themetopYs.push(this.$refs.recommends.$el.offsetTop)

      //   console.log(this.themetopYs);
      // })

      this.getThemeTopY = debounce(() => {
        //   console.log('---')
        this.themetopYs = []
        this.themetopYs.push(0);
        //要减去导航栏的高度44
        this.themetopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themetopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themetopYs.push(this.$refs.recommends.$el.offsetTop-44)

        // 获取js数字的最大值
        this.themetopYs.push(Number.MAX_VALUE)

        // 一个小bug，当不打印时位置会差44px？？（等一会儿就准了）
          // console.log(this.themetopYs);
      },100)

    //    _getOffsetTops() {
    // this.themetopYs = []
    // this.themetopYs.push(0);
    // this.themetopYs.push(this.$refs.params.$el.offsetTop)
    // this.themetopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themetopYs.push(this.$refs.recommends.$el.offsetTop)
    // // this.themetopYs.push(Number.MAX_VALUE)
    //   },
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  // updated() {
  //   // 获取需要的四个offsetTop
  //     this._getOffsetTops()
  //   },
  mounted() {
  },
  // updated() {
  //   this.themetopYs = []
  //   this.themetopYs.push(0);
  //   this.themetopYs.push(this.$refs.params.$el.offsetTop)
  //   this.themetopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themetopYs.push(this.$refs.recommends.$el.offsetTop)
  //   console.log(this.themetopYs);
  // },
  destroyed() {
    // 取消全局监听
    this.$bus.$off('itemImageLoad', this.itemImagListener)
  },
  methods: {
    imageLoad() {
      // this.$refs.scroll.refresh()
      //  console.log('111');

        // this.refresh()

        this.getThemeTopY()

        // this.themetopYs = []
        // this.themetopYs.push(0);
        // this.themetopYs.push(this.$refs.params.$el.offsetTop)
        // this.themetopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themetopYs.push(this.$refs.recommends.$el.offsetTop)

        // console.log(this.themetopYs);

      //  this.getThemeTopY()

      // this._getOffsetTops()

    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themetopYs[index], 100)
    },
    // 联动效果，滑动时对应的导航到对应位置
    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y

      // for(let i in this.themetopYs) {
      //   console.log(i);
      //   // 此处的i为字符串类型，要转换一下
      // }
      let length =  this.themetopYs.length
      for(let i = 0; i < length-1; i++) {
        // console.log(i);
        // 此处为数字类型


        // 普通做法(此方法length不用-1)
        // 条件成立：this.currentIndex = i;
        // 判断条件对否成立：this.currentIndex !== i
        //条件： positiony在0到themetopys[1]时，index=0;
        //条件： positiony在themetopys[1]到themetopys[2]时，index=1;
        //条件： positiony在themetopys[2]到themetopys[3]时，index=2
        //条件： positiony大于等于themetopys[3]时，index=3;
        // if (this.currentIndex !== i &&((i < length - 1 && positionY >= this.themetopYs[i] && positionY < this.themetopYs[i+1]) || (i === length - 1 && positionY >= this.themetopYs[i]))) {
        //   // console.log(i);
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   // 让导航组件中的currentindex与此处的相等，联动效果
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        // hack做法
        //条件： positiony大于等于themetopys[3]时，index=3 变成在themetopys[3]和一个很大的值之间时，index=3
        // 获取js数字最大值得方法：Number.MAX_VALUE
        if(this.currentIndex !== i && (positionY >= this.themetopYs[i] && positionY < this.themetopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 判断是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      // console.log(111);
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.iid = this.iid
      // console.log(product);

      // 将商品加入购物车（用vuex）
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 1500)
        console.log(res);
      })
    }
}
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    /* 注意减号两边都要有空格 */
    height: calc(100% - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
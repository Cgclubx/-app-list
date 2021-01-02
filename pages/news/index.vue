<template>
  <view class=""v style="height: 100%;">
    <view :style="{height : `${statusBarHeight}px`}"></view>
    <view style="height: 100%;">
	  <view class="flex bg-hover-dark  text-center bg-white " style="height:80rpx;justify-content: space-around; ">
	  	<block v-for="(item,index) in tabArr" :key="index">
	  		<view class="flex flex-column align-center justify-between" @tap="selected(index)">
	  			<view class="text-light-black pt-1 animated faster" :class="tabIndex === index ? 'font-weight-bold pulse':''"> {{item}} </view>
	  			<view class="rounded animated zoomIn faster" style="width: 80rpx; height: 8rpx; background-color: #f60; " v-if="tabIndex == index"></view>
	  		</view>
	  	</block>
	  </view>
	  <swiper style="height: 100%;" :current="tabIndex" @change="swiperIndex">
	  	<swiper-item>
			<scroll-view scroll-x  style="height : 900rpx;">
			  <view class="" style="display: flex; justify-content: center;align-items: center;">
			    <view>
			      <image src="/static/common/nothing.png" mode="" style="width: 500rpx; height: 600rpx; margin-top: 120rpx;"></image>
			    </view>
			  </view>
			</scroll-view>
	  	</swiper-item>
	  	<swiper-item>
			<scroll-view scroll-y style="height: 100%;">
			  <view class="flex align-center justify-between px-2 mt-3">
			    <view class="" style="width:68px; height:30px;">热门分类</view>
			    <navigator url="../topic/topic" open-type="navigate">
			      <view class="flex align-center font text-secondary animated" style="float: right;">更多></view>
			    </navigator>
			  </view>
			  <view class="flex align-center py-3 px-2 border-bottom">
			    <block v-for="(item,index) in topicData" :key="index">
			      <navigator url="../topic/topic">
			        <view style="width:50rpx; height:52px;" class="border text-center rounded bg-light mx-1 px-2 animated">
			          {{item}}
			        </view>
			      </navigator>
			    </block>
			  </view>
			  <view class="w-100" style="height:68px;">
			    <view class="bg-light rounded flex align-center justify-center py-2 text-secondary">
			      <view class=" iconfont icon-tubiao11" style="width:20px; height:20px;"></view>
			      <text class="iconfont icon-sousuo mr-2">搜索话题</text>
			    </view>
			  </view>
			  <swiperimg :imgArr="swiperList"></swiperimg>
			  <view style="height:7px;" class="height:7px; background-color: rgb(245, 245, 244);"></view>
			  <view class="p-2 font-md" style="font-size: 14px;">
			    最新更新
			  </view>
			  <view class="" style="padding-bottom:70rpx;box-sizing: border-box;" >
			    <block v-for="(item,index) in hotData" :key="index">
			      <view class="flex align-center p-2">
			        <view class="rounded mr-2" style="width: 75px; height: 75px;">
			          <image :src="item.titlepic" mode="aspectFill" style="width:75px; height:75px;"></image>
			        </view>
			        <view class="flex flex-column flex-1">
			          <view class="font-md text-dark mt-1">#{{item.title}}#</view>
			          <view class="font text-secondary mt-1">{{item.desc}}</view>
			          <view class="flex align-center font text-secondary mt-1">
			            <text class="" style="width:71px; height:27px;">动态:{{item.post_count}}</text>
			            <text class="" style="width:53px; height:27px;">今日:{{item.todaypost_count}}</text>
			          </view>
			        </view>
			      </view>
			    </block>
			  </view>
			</scroll-view>
			
	  	</swiper-item>
	  </swiper>
    </view>
  </view>
</template>

<script>
  import swiperimg from "@/components/swiperimg/swiperimg.vue"
  import 
    news
   from "@/api/news.js"
  export default {
    data() {
      return {
		  tabIndex : 0,
        statusBarHeight: this.$statusBarHeight,
        tabArr: [
          "关注",
          "话题"
        ],
        hotData: [],
        topicData: [
          "关注",
          "推荐",
          "体育",
          "热点",
          "财经",
          "娱乐",
        ],
        selectedIndex: 0,
        swiperList: [{
            src: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/banner1.jpg"
          },
          {
            src: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/banner3.jpg"
          },
          {
            src: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/banner2.jpg"
          }
        ],

      }
    },
    components: {
   swiperimg
   
    },
	onLoad(){
		this.HotList()
	},
    methods: {
		swiperIndex(index){
			this.tabIndex = index.detail.current
		},
		selected(index){
			this.tabIndex = index;
		},
      async HotList() {
        let res = await news.getHotList();
        if (res.status === 200) {
          this.hotData = res.data.data.list
        }
      },
    },
    onShow() {
    }
  }
</script>

<style>
	page{
		height: 100%;
	}
	
</style>
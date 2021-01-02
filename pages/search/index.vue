<template>
	<view class="">
		<view class="" :style="{height:`${$statusBarHeight}px`}"></view>
		<uni-search-bar @confirm="search" @cancel="cancel"></uni-search-bar>
		 <cent :centData="centData"></cent>
		 <view class="searchHistoryBox" v-if="centData.length<1">
			 <view class="flex justify-between align-center" style="height: 80rpx;padding:0 20rpx;box-sizing: border-box;">
			 	<text>搜索历史</text>
				<my-icon iconName="icon-shanchu" @click.native="clearStore" ></my-icon>
			 </view>
		   <view class="searchHistoryBoxItem" v-for="(item,index) in searched" :key='index'>
		     {{item}}
		   </view>
		   <view class="text-center" style="padding: 0 20rpx;box-sizing: border-box;" v-if="!searched.length">
		   	搜索历史为空
		   </view>
		 </view>
	</view>
</template>

<script>
	import cent from "@/components/cent/index.vue"
	import login from '@/api/login.js'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				searched:uni.getStorageSync('searched')||[],
				list:[],
				keyword: "",
				centData:[]
			}
		},
		onLoad() {

		},
		methods: {
			clearStore(){
					this.searched = []
				uni.setStorageSync('searched',this.searched)
			},
			cancel() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			async getSearchData(){
				let res = await login.searchData(this.keyword,1);
				console.log(res);
				if(res.status=="200"){
					this.centData = res.data.data.list;
					this.searched.unshift(this.keyword)
					uni.setStorageSync('searched',this.searched)
				}
			},
			search(e) {
				this.keyword = e.value
				this.getSearchData()
			}
		},
		components: {
			uniSearchBar,
			cent
		},
		watch:{
		  searched:{
		    handler(val){
		      uni.setStorageSync('searched',val)
		    },
		    deep:true,
		  },
		},
		watch:{
			keyword(val){
				if(val==''){
					this.centData = []
				}
			}
		}
	}
</script>

<style>
	.searchHistoryBox {
	  width: 100%;
	  box-sizing: border-box;
	  overflow: hidden;
	  margin-top: 10upx;
	}
	.searchHistoryBoxItem {
	  float: left;
	  font-size: 26upx;
	  color: #666;
	  line-height: 46upx;
	  height: 46upx;
	  padding: 0 20upx;
	  border-radius: 23upx;
	  margin-left: 15upx;
	  margin-bottom: 20upx;
	  border: 1px solid #ccc;
	}
</style>




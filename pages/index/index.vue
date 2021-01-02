<template>
	<view class="content" >
		<view class="" :style="{height:`${$statusBarHeight}px`}">
			
		</view>
		<!-- 头部搜索框 -->
		<view class="uni-flex" style="position: fixed;left:0;right: 0;z-index: 99;" :style="{top:`${$statusBarHeight}px`}" >
			<inputs style="flex:1;"></inputs>
			<my-icon style="padding-left:10upx;" iconName='icon-bianji' iconSize="50" iconColor=""></my-icon>
		</view>

		<!-- 滚动导航 -->
		<view class="" style="position: fixed;left:0;right: 0;z-index:99;" :style="{top:`${$statusBarHeight+43}px`}">
			<navs :navList="navlist" :tabIndex="tabIndex"></navs>
		</view>

		<!-- 内容页面 -->
		<view class="post"  :style="{top:`${$statusBarHeight}px`}">
			 <swiper style="width: 100%;height: 100%;" circular @change="getSwiperIndex" :current="tabIndex">
				 <swiper-item v-for="(item,index) in navlist" :key="index" style="height: 100%;">
					 <scroll-view style="width: 100%;height: 100%;" scroll-y @scrolltolower="loadmore(index)">
						<cent :centData="centData"></cent>
						<uni-load-more :status="more"></uni-load-more>
					 </scroll-view>
				 </swiper-item>
			 </swiper>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import bus from '@/utils/eventbus.js'
	import index from '@/api/index.js'
	import navs from '@/components/nav/index.vue'
	import cent from '@/components/cent/index.vue'
	import inputs from '@/components/search-input/index.vue'
	export default {
		data() {
			return {
				navlist: [],
				centData:[],
				tabIndex:0,	
				more:"more",
				id:1,
				arr:[]
			}
		},
		onLoad() {
			this.getNavLists()
		},

		mounted(){
			this.getCentList(1)
			// 导航栏传来的下标
			bus.$on('border',(val)=>{
				this.tabIndex = val
				this.getCentList(this.tabIndex+1)
			})
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.getCentList(1)
				 uni.stopPullDownRefresh()
			},2000)
			},
		methods: {
			// 上拉加载
			loadmore(indexs){
				console.log(indexs);
				++this.id;
				this.more = 'loading'
				index.getCentList(indexs+1,this.id).then(res=>{
					this.arr = res.data.data.list;
					console.log(this.arr.length);
					if(this.arr.length<1){
						this.more = "noMore"
						return false
					}
				})
				setTimeout(()=>{
					this.centData = [...this.centData,...this.arr];
			
					this.more = 'more'
				},3000)
			},
			getSwiperIndex(e){
				this.tabIndex = e.detail.current
				this.getCentList(this.tabIndex+1)
			},
			async getNavLists() {
				let res = await index.getNavList();
				if (res.status == "200") {
					this.navlist = res.data.data.list
				}
			},
			async getCentList(val){
				let res = await index.getCentList(val,1);
				this.centData = res.data.data.list
			}
		},
		components: {
			inputs,
			navs,
			cent,
			uniLoadMore
		}
	}
</script>

<style lang="scss">
	.actStyle{
		color: #FF4B6B;
	}
	
	.post{
		z-index: 0;
		position: absolute;
        bottom: 0;
		left: 0;
		right: 0;
		padding-top: 190rpx;
	}
	page{
		height: 100%;
	}
	.left-icon-color {
		color: #FFB761;
	}


	.content {
		.uni-flex {
			align-items: center;
			justify-content: space-between;
			padding: 0 10upx;
			box-sizing: border-box;
		}
	}
</style>

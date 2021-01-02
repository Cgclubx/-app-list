<template>
	<view>
		<view class="" :style="{height:`${$statusBarHeight}px`}"></view>
		<!-- 头部 -->
		<view class="header">
			<view class="">
				我的
			</view>
			<my-icon iconName="icon-gengduo1" iconSize="40" @click.native="userSet"></my-icon>
		</view>
		<view class="" v-if="flag">
			<view class="dl">登录社区，体验更多功能</view>
		<view class="zh" @click="login">账号/邮箱/手机登录></view>
		</view>
		<view class="" v-if="!flag">
			 <view class="flex justify-between " style="padding: 0 20rpx;box-sizing: border-box;"> 
				<!-- 头像 -->
					<image style="width: 100rpx;height:100rpx;border-radius: 100%;" :src="userdata.userpic" mode=""></image>
				<!-- 账号 -->
				 <view class="flex-1" style="margin-left:10rpx;">
					 <view class="" style="font-size: 35rpx;font-weight: bold;">
					 	{{userdata.username}}
					 </view>
					 <view class="" style="color: #6C757D;">
					 	<text style="margin-right: 10rpx;">总帖子{{counts.post_count ? counts.post_count : 0 }}</text>
					 	<text>今日发帖{{counts.today_posts_count ? counts.today_posts_count :0}}</text>
					 </view>
				</view>
				<my-icon iconName="icon-jinru"></my-icon>
		</view>
		</view>
		
		<view class="flex justify-between px-4 pt-3">
			<view class="flex flex-column align-center">
				<text class="font-weight-bold">{{counts.post_count ? counts.post_count : 0}}</text>
				<text>帖子</text>
			</view>
			<view class="flex flex-column align-center">
				<text class="font-weight-bold">{{counts.friend_count ? counts.friend_count : 0}}</text>
				<text>动态</text>
			</view>
			<view class="flex flex-column align-center">
				<text class="font-weight-bold">{{counts.comments_count ? counts.comments_count  : 0}}</text>
				<text>评论</text>
			</view>
			<view class="flex flex-column align-center">
				<text class="font-weight-bold">{{counts.withfen_count ? counts.withfen_count : 0}}</text>
				<text>粉丝</text>
			</view>
		</view>
		<view class="flex justify-center align-center p-2">
			<image class="" style="border-radius: 5px;width:710rpx;height:200rpx;" mode="aspectFill" src="/static/demo/banner1.jpg"></image>
		</view>
		<view class="" style="padding:0 10rpx;box-sizing: border-box;">
			
		<view class="flex justify-between align-center" style="width:100%;height:100rpx;line-height: 100rpx;">
			<view>
				<myIcon class="p-2" iconName="icon-liulan"></myIcon>
				<text>浏览历史</text>
			</view>
			<view>
				<myIcon iconName="icon-jinru"></myIcon>
			</view>
		</view>
		<view class="flex justify-between align-center" style="width:100%;height:100rpx;line-height: 100rpx;">
			<view>
				<myIcon class="p-2" iconName="icon-huiyuanvip"></myIcon>
			<text>社区认证</text>
			</view>
			<view>
				<myIcon iconName="icon-jinru"></myIcon>
			</view>

		</view>
		<view class="flex justify-between align-center" style="width:100%;height:100rpx;line-height: 100rpx;">
			<view>
				<myIcon class="p-2" iconName="icon-keyboard"></myIcon>
				<text>审核帖子</text>
			</view>
			<view>
				<myIcon iconName="icon-jinru"></myIcon>
			</view>

		</view>
		</view>
	</view>
</template>

<script>
	import login from '@/api/login.js'
	export default {
		data(){
			return {
				flag: false,
				userdata:{},
				counts:{},
			}
		},
		onShow(){
			// 判断页面登陆状态
			let token = uni.getStorageSync('token');
			this.userdata = uni.getStorageSync('userData')
			if(token){
				this.flag = false
			}else{
				this.flag = true	
				}
		},
		created(){
			
		},
		methods:{
			userSet(){
				uni.navigateTo({
					url:"/pages/user-set/user-set"
				})
			},
			// 登陆跳转
			login(){
				uni.navigateTo({
					url:"/pages/login/passdl"
				})
			},
			getCount(){
		// 获取counts数据
		 login.getCounts(this.userdata.id).then(res=>{
			 if(res.status=="200"){
				 this.counts = res.data.data
			 }
		 })
			}
		},
		mounted(){
		let userdata = uni.getStorageSync('userData');
		if(userdata){
			this.getCount()
		}
		}
	}
</script>

<style lang="scss">
	.header {
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			flex: 1;
			text-align: center;
		}
	}

	.title {
		width: 100%;
		height: 90rpx;
		display: flex;

		.my {
			width: 100%;
			height: 90rpx;
			text-align: center;
		}

		.dian {
			float: right;
			padding-right: 20rpx;
		}
	}

	.dl {
		width: 100%;
		height: 90rpx;
		text-align: center;
	}

	.zh {
		width: 100%;
		height: 90rpx;
		text-align: center;
		color: #999;
	}

	.image {
		width: 100%;
	}
</style>

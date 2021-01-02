<template>
	<view class="body">
		<view class="" :style="{height:`${$statusBarHeight}px`}"></view>
		<view class="header">
			<my-icon iconName="icon-fanhui" @click.native="houtui" iconSize="40"></my-icon>
			<view class="">
				设置
			</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
			<view class="home-list-item u-f-ac u-f-jsb flex justify-between" hover-class="home-list-hover" @tap="clickevent">
				<view class="u-f-ac">
					<view v-if="item.icon" class="icon iconfont" :class="['icon-'+item.icon]"></view>
					{{item.name}}
				</view>


				<view class="icon iconfont icon-jinru"></view>
			</view>
		</block>
		<button class="user-set-btn" type="primary" @click="logouts">退出登陆</button>
	</view>
</template>

<script>
	import login from '@/api/login.js'
	export default {
		data() {
			return {
				list: [{
						icon: "",
						name: "账号与安全",
						clicktype: "navigateTo",
						url: "../../pages/user-set-repassword/user-set-repassword"
					},
					{
						icon: "",
						name: "资料编辑",
						clicktype: "",
						url: "../../pages/user-set-userinfo/user-set-userinfo"
					},
					{
						icon: "",
						name: "清除缓存",
						clicktype: "clear",
						url: ""
					},
					{
						icon: "",
						name: "意见反馈",
						clicktype: "",
						url: "../../pages/user-set-help/user-set-help"
					},
					{
						icon: "",
						name: "关于社区",
						clicktype: "",
						url: "../../pages/user-set-about/user-set-about"
					},
				]
			}
		},
		methods: {
			// 退出登陆
			logouts() {
				// 获取token
				let token = uni.getStorageSync('token')
				// 弹框提示
				uni.showModal({
					title: '提示',
					content: '是否退出登陆',
					confirmText: '确定',
					success: res => {
						// 点击确定
						if (res.confirm) {
							// 退出接口
							login.logout(token).then(res => {
								if (res.status) {
									// 清空本地数据
									uni.clearStorage();
									uni.showToast({
										title: '退出成功！',
									});
									uni.switchTab({
										url: "/pages/home/index"
									})
								}
							})
						}
						// 点击取消
						if (res.cancel) {
							uni.switchTab({
								url: "/pages/home/index"
							})
						}

					},
				});
			},
			houtui() {
				console.log('ss');
				uni.navigateBack({
					delta: 1
				})
			},
			clickevent() {
				switch (this.item.clicktype) {
					case "navigateTo":
						if (this.item.url) {
							uni.navigateTo({
								url: this.item.url
							});
						}
						break;
					case "switchTab":
						if (this.item.url) {
							uni.switchTab({
								url: this.item.url
							})
						}
						break;
					case "clear":
						uni.showModal({
							title: '提示',
							content: '是否要清除缓存？',
							confirmText: '立刻清除',
							success: res => {
								if (res.confirm) {
									uni.clearStorage();
									uni.showToast({
										title: '清除缓存成功！',
									});
								}
							},
						});
						break;
				}
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

	.body {
		padding: 0 20upx;
	}

	.user-set-btn {
		width: 100%;
		margin: 20upx 0;
		background: #FF4A6A !important;
		border: 0 !important;
		color: #FFFFFF !important;
		border-radius: 40rpx 40rpx 40rpx 40rpx;
	}

	.home-list-item {
		padding: 20upx;
		border-top: 1upx solid #F4F4F4;
		border-bottom: 1upx solid #F4F4F4;
	}

	.home-list-item>view:first-child {
		color: #333333;
	}

	.home-list-item>view:first-child>view {
		margin-right: 10upx;
	}

	.home-list-item>view:last-child {
		color: #CCCCCC;
	}

	.home-list-hover {
		background: #f4f4f4;
	}
</style>

<template>
	<view class="">
		<view class="input-style" @click="searchTo">
			<view class="input-style">
					<my-icon iconName="icon-sousuo" iconSize="30" iconColor="iconstyle"></my-icon>
			<view class="">
				搜索糗事
			</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			searchTo() {
				uni.navigateTo({
					url: "/pages/search/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-style {
		width: 100%;
		display: flex;
		height: 70rpx;
		background-color: #F5F4F2;
		align-items: center;
		justify-content: center;

		view {
			margin-left: 20upx;
			color: #63625D;
			font-size: 30rpx;
		}
	}

	.iconstyle {
		color: #63625D;
		font-weight: bold;
	}
</style>

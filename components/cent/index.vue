<template>
	<view class="">
		<view class="" v-for="(items,indexs) in centData" :key="indexs" style="padding: 20rpx;border-bottom:15rpx solid #F5F5F4;" >
			<!-- 头 -->
			<view class="" style="box-sizing:border-box;display: flex;justify-content: space-between;align-items: center;" >
				<!-- 左 -->
				<view class="" style="display: flex;">
					<view class="imgs" style="margin-right: 10rpx;">
						<image :src="items.user.userpic" mode=""></image>
					</view>
					<view class="">
						<view class="">
							{{items.user.username}}
						</view>
						<view class="" style="font-size: 20rpx;color:silver">
							{{items.create_time | formatTime}}
						</view>
					</view>
				</view>
				<!-- 右 -->
				<view class="gz-style">
					关注
				</view>
			</view>
			<!-- 尾 -->
			<view class="">
				<view class="" style="font-size: 30rpx;padding: 10rpx 0; box-sizing: border-box;" @click="details(items.id)">
					{{items.title}}
				</view>
				<view class="" v-if="items.titlepic!==''" style="height: 400rpx;" @click="details(items.id)">
					<image style="width: 100%;height: 100%;" :src="items.titlepic"></image>
				</view>
				<view class="icon-style" style="display: flex; justify-content: space-evenly;align-items: center;height: 70rpx;padding-top:20rpx;box-sizing: border-box;">
					<view>
						<!-- :class="items.ding_count>0 ? 'actStyle' : '' " -->
						<my-icon iconName="icon-ccdbaa" iconSize="30" iconColor="i_c_gray"></my-icon>
						<text class="i_c_gray pl-2 pr-3 font">{{items.ding_count?items.ding_count:'支持'}}</text>
					</view>
					<view style="display: flex;">
						<view class="d-inline-block" style="transform: rotate(180deg);">
							<my-icon iconName="icon-ccdbaa" iconSize="30" iconColor="i_c_gray"></my-icon>
						</view>
						<text class="i_c_gray pl-2 pr-3 font">{{items.cai_count?items.cai_count:'反对'}}</text>
					</view>

					<view>
						<my-icon iconName="icon-pinglun" iconSize="30" iconColor="i_c_gray"></my-icon>
						<text class="i_c_gray pl-2 pr-3 font">{{items.comment_count?items.comment_count:'评论'}}</text>
					</view>
					<view>
						<my-icon iconName="icon-fenxiang" iconSize="30" iconColor="i_c_gray"></my-icon>
						<text class="i_c_gray pl-2 pr-3 font">{{items.sharenum?items.sharenum:'分享'}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	
	import bus from '@/utils/eventbus.js'
	export default {
		props:{
			centData:Array
		},
		data() {
			return {

			}
		},
		filters: {
		      formatTime(value) {
		        var time = new Date(value * 1000);
		        var year = time.getFullYear();
		        var month = time.getMonth() + 1;
		        var date = time.getDate();
		        var hour = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
		        var AMOrPM = time.getHours() > 12 ? "下午" : "上午";
		        var mis = time.getMinutes();
		        return `${year}-${month
		        .toString().padStart(2,"0")}-${date
		        .toString().padStart(2,"0")}  ${AMOrPM} ${hour
		        .toString().padStart(2,"0")}:${mis
		        .toString().padStart(2,"0")}`;
		      }
		    },
		methods: {
			// 详情
           details(index){
			   uni.navigateTo({
			   	url:`/pages/detail/index?id=${index}`
			   })
			   }
		},
		mounted() {
			bus.$on('border', (val) => {
				console.log(val)
			})
		}
	}
</script>

<style lang="scss">
	.icon-style{
		view{
			text{
				margin-left: 10rpx;
			}
		}
	}
	.imgs{
	width: 80rpx;
	height:80rpx;
	border-radius: 100%;
	background-color: silver;
		image{
			width: 80rpx;
			height:80rpx;
			border-radius: 100%;
			background-color: silver;
		}
	}
	.gz-style{
		padding: 5rpx 15rpx;
		display: inline-block;
	    box-sizing: border-box;
		background-color:#FF4B6B;
		border-radius:5px;
		color: white;
	}
</style>

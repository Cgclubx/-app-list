<template>
	<view class="" style="height: 100%;">
		<uni-popup ref="popup" type="bottom" style="z-index:9999;height: 80rpx;">
			<view class="text-center bg-white" style="height: 100rpx;line-height: 100rpx;border-bottom: 2px solid #EFEFED;font-size: 35rpx;">
				分享到
			</view>
			<view class="text-center bg-white" style="height: 100rpx;line-height: 100rpx;font-size: 35rpx;" @click="close">
				取消
			</view>
		</uni-popup>
		<view class="fixed-top"  :style="{height:`${$statusBarHeight}px`}" style="background-color: white;"></view>
		<!-- 头部 -->
		<view class="header"  :style="{top:`${$statusBarHeight}px`}">
			<my-icon iconName="icon-fanhui" @click.native="houtui"  iconSize="40" iconColor="black"></my-icon>
			<view class="" style="font-weight: bold;">
					{{centData.title}}
			</view>
			<my-icon iconName="icon-gengduo1" iconSize="40" @click.native="userSet" ></my-icon>
		</view>
		<!-- 内容区域 -->
		<scroll-view class="fixed-top" style="box-sizing:border-box;width: 100%;height: 100%;"  :style="{top:`${$statusBarHeight+43}px`}" scroll-y>
			<!-- 头 -->
			<view class="" style="box-sizing:border-box;display: flex;justify-content: space-between;align-centData: center;padding: 0 20rpx;" >
				<!-- 左 -->
				<view class="" style="display: flex;">
					<view class="imgs" style="margin-right: 10rpx;">
						<image :src="userimg" mode=""></image>
					</view>
					<view class="">
						<view class="">
							{{username}}
						</view>
						<view class="" style="font-size: 20rpx;color:silver">
							{{centData.create_time | formatTime}}
						</view>
					</view>
				</view>
				<!-- 右 -->
				<view class="gz-style">
					关注
				</view>
			</view>
			<!-- 尾 -->
			<view class="" style="padding: 0 20rpx;box-sizing: border-box;">
				<view class="" style="font-size: 35rpx;font-weigh:bold;box-sizing: border-box;" @click="details(centData.id)">
					{{centData.title}}
				</view>
				<view class="" style="font-size: 30rpx;padding: 10rpx 0; box-sizing: border-box;" @click="details(centData.id)">
					{{centData.title}}
				</view>
				<view class="" v-if="centData.titlepic!==''" style="height: 800rpx;" @click="details(centData.id)">
					<image style="width: 100%;height: 100%;" :src="centData.titlepic"></image>
				</view>
				<view class="icon-style" style="display: flex; justify-content: space-evenly;align-centData: center;height: 70rpx;padding-top:20rpx;box-sizing: border-box;">
					<view>
						<!-- :class="centData.ding_count>0 ? 'actStyle' : '' " -->
						<my-icon iconName="icon-ccdbaa" iconSize="30" iconColor="i_c_gray"></my-icon>
						<text class="i_c_gray pl-2 pr-3 font">{{centData.ding_count?centData.ding_count:'支持'}}</text>
					</view>
					<view style="display: flex;">
						<view class="d-inline-block" style="transform: rotate(180deg);">
							<my-icon iconName="icon-ccdbaa" iconSize="30" iconColor="i_c_gray"></my-icon>
						</view>
						<text class="i_c_gray pl-2 pr-3 font">{{centData.cai_count?centData.cai_count:'反对'}}</text>
					</view>
		
					<view>
						<my-icon iconName="icon-pinglun" iconSize="30" iconColor="i_c_gray"></my-icon>
						<text class="i_c_gray pl-2 pr-3 font">{{centData.comments_count?centData.comment_count:'评论'}}</text>
					</view>
					<view>
						<my-icon iconName="icon-fenxiang" iconSize="30" iconColor="i_c_gray"></my-icon>
						<text class="i_c_gray pl-2 pr-3 font">{{centData.sharenum?centData.sharenum:'分享'}}</text>
					</view>
				</view>
			</view>
		<view class="" style="background-color: #F5F5F4;width: 100%;height: 10rpx;margin: 10rpx 0;">
			
		</view>
				
		<!-- 评论区域内容 -->
		<view class="" style="padding: 0 20rpx;box-sizing:border-box;">
			<view class="" style="padding: 10rpx 0;font-weight: bold;font-size:35rpx;">
				最新评论  {{list.length}}
			</view>
			<!-- 头 -->
			<view class="" style="box-sizing:border-box;display: flex;justify-content: space-between;align-items: center;padding: 10rpx 0;" v-for="(item,index) in list" :key="index">
				<!-- 左 -->
				<view class="" style="display: flex;">
					<view class="imgs" style="margin-right: 10rpx;">
						<image :src="item.user.userpic" mode=""></image>
					</view>
					<view class="">
						<view class="" style="color: #0A98D5;">
							{{item.user.username}}
						</view>
						<view class="">
							{{item.data}}
						</view>
						<view class="" style="font-size: 20rpx;color:silver">
							{{item.create_time | formatTime}}
						</view>
					</view>
				</view>
			</view>
		</view>
		</scroll-view>
			
			
		<!-- 评论区域 -->
		<view class="bottom-pl fixed-bottom">
			<input type="text" value="" placeholder="文明发言" v-model="pldata" />
			<view class="animated" hover-class="swing"  @click.native="commend">
				<my-icon iconName="icon-fabu"> </my-icon>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import detail from '@/api/detail.js'
	export default {
		data(){
			return {
				id:null,
				centData:{},
				list:[],
				pldata:"",
				fid:0,
				username:"",
				userimg:""
			}
		},
		onLoad(options){
			this.id = options.id;
		},
		mounted() {
			this.getCentList()
			this.getCommentList()
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
			// 关闭分享弹出层
			close(){
			 this.$refs.popup.close()	
			},
			// 打开分享弹出层
			userSet(){
				 this.$refs.popup.open()
			},
			commend(){
				this.pldata = ""
				let token = uni.getStorageSync('token');
				if(token){
					detail.setComment(this.pldata,this.fid,this.id).then(res=>{
					if(res.status){
						this.getCommentList(this.id)
					}
				})
				}else{
					uni.showToast({
						title:"未登陆"
					})
				}
				},
			// 后退
			houtui() {
				uni.switchTab({
					url:"/pages/index/index"
				})
				},
			async getCentList(){
				let res = await detail.getCentList(this.id)
				this.centData = res.data.data.detail;
				this.userimg = res.data.data.detail.user.userpic
				this.username = res.data.data.detail.user.username
			},
			async getCommentList(){
				let res = await detail.getCommentList(this.id)
				this.list = res.data.data.list
			},
			
		}
	}
</script>

<style lang="scss">
	.black{
		color: black;
	}
	.bottom-pl{
		 background-color: white;
		 border-top: 1px solid silver;
		 position: fixed;
		 height: 80rpx;
		 display: flex;
			box-sizing: border-box;
		 align-items: center;
		 padding: 0 20rpx;
		 input{
			 flex:1;
			 background-color: #F8F9FA;
			 margin-right: 20rpx;
		 }
	}
	.header {
		position: fixed;
		left:0;
		right: 0;
		background-color: white;
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 9;

		view {
			flex: 1;
			text-align: center;
		}
	}
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
		height: 60rpx;
		display: inline-block;
	    box-sizing: border-box;
		background-color:#FF4B6B;
		border-radius:5px;
		color: white;
	}
	
</style>

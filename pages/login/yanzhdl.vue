<template>
	<view class="container">
		<view class="" :style="{height:`${$statusBarHeight}px`}"></view>
		<my-icon iconName="icon-guanbi" iconSize="60" class="choose" @click.native="choose" style="font-weight: blod;">
		</my-icon>
		
		<!-- 验证码登陆 -->
		<view class="" style="font-size: 60rpx;color: #7A7975;">
			手机验证码登陆
		</view>

		<view class="input-style" style="width: 100%;">
			<view class="input-user">
				<input type="text" :value="phone" @input="phones" placeholder-style="font-size:30rpx" placeholder="手机号" />
			</view>

			<view class="input-pass">
				<input type="text" :value="code" @input="codes" placeholder-style="font-size:30rpx" placeholder="请输入验证码" />
				<text @click="getNumDl" :class="actIndex==1 ? 'act' : ''">获取验证码{{times}}</text>
			</view>
		</view>

		<view class="button-style">
		<button type="default" @click="logins"  v-if="shows" :loading="loadings">登陆</button>
		<button type="default" v-if="!shows"  class="desic" >登陆</button>
		</view>

		<view class="type-dl">
			<text @click="passDl">账号密码登陆</text>
			<text class="zx-style">|</text>
			<text>登陆遇到问题</text>
		</view>
		<!-- 验证码登陆结束 -->

		<view class="sj-dl">
			————
			<text>社交账号登陆</text>
			————
		</view>

		<view class="type-dl-img">
			<view class="">
				<my-icon iconName="icon-weixin" iconSize="60" iconColor="text-white" ></my-icon>
			</view>
			<view class="">
				<my-icon iconName="icon-QQ" iconSize="60"  iconColor=""></my-icon>
			</view>
			<view class="">
				<my-icon iconName="icon-xinlangweibo" iconSize="60"  iconColor=""></my-icon>
			</view>

		</view>

		<view class="js-style">
			<text>注册即代表您同意</text>
			<text>《糗事社区协议》</text>
		</view>

	</view>
</template>

<script>
	let timer ;
	import login from '@/api/login.js'
	import { throttle } from "@/utils/throttle.js";  //引入节流函数
	export default {
		data() {
			return {
				loadings:false,
				actIndex:0,
             times:'',
			 phone:"",
			 code:"",
			 shows:false,
			 toggle:true
			}
		},
		methods: {
			phones(e){
				this.phone = e.detail.value;
				if(this.phone==''||this.code==''){
					this.shows= false
				}else{
					this.shows = true
				}
			},
			codes(e){
				this.code = e.detail.value;
				if(this.phone==''||this.code==''){
					this.shows= false
				}else{
					this.shows = true
				}
			},
			// 登陆
			logins:throttle(function(){
				this.loadings = true
			    login.phonelogin(this.phone,this.code).then(res=>{
					if(res.status=="200"){
						this.loadings = false
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
						uni.setStorageSync('token',res.data.data.token)
						uni.setStorageSync('userData',res.data.data)
						uni.switchTab({
							url:"/pages/home/index"
						})
					}else{
						this.loadings = false
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
					}
				})
			}),
			// 获取验证码
			getNumDl:throttle(function(){
				login.getCodeList(this.phone).then(res=>{
					if(res.status=="200"){
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
					}
				})
				this.times = 60
				clearInterval(timer)
				this.actIndex = 1
				timer = setInterval(()=>{
					this.times--
					if(this.times==0){
						this.times = ''
						this.actIndex = 0
						clearInterval(timer)
					}
				},1000)
			}),
			// 密码登陆
			passDl() {
				uni.navigateTo({
					url: "/pages/login/passdl"
				})
			},
			// 关闭当前窗口
			choose() {
			uni.switchTab({
				url:"/pages/home/index"
			})
			}
		}
	}
</script>

<style lang="scss">
   .button-style .desic{
		background-color: #ff8e8e;
		color: #F2F2F2;
	}
	.choose {
		position: absolute;
		top: 60rpx;
		left: 20rpx;
	}

	.js-style {
		text:nth-child(1) {
			color: #BBBBBB;
		}

		text:nth-child(2) {
			color: #0579F8;
		}
	}

	.sj-dl {
		color: #C1C1C1;

		text {
			padding: 0 10rpx;
		}
	}

	.type-dl {
		color: #3C6979;

		.zx-style {
			padding: 0 10rpx;
			cursor: pointer;
		}
	}

	.button-style {
		width: 100%;
		height: 100rpx;

		button {
			width: 100%;
			height: 100%;
			background-color: #FF7B78;
			border-radius: 30px;
			line-height: 100rpx;
			color: white;
		}
	}

	.type-dl-img {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			width: 116rpx;
			height: 116rpx;
			border-radius: 100%;
		}

		view:nth-child(1) {
			background-color: #2AD19B;
		}

		view:nth-child(2) {
			background-color: #2CAEFC;
		}

		view:nth-child(3) {
			background-color: #FC772A;
		}
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 20% 20rpx;
		box-sizing: border-box;
	}

	page {
		height: 100%;
	}

	.input-style {
		view {
			padding: 0 20rpx;
			box-sizing: border-box;
			height: 100rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #F4F4F4;
		}

		.input-pass {
			display: flex;
			justify-content: space-between;
            .act{
            	background-color: silver;
            }
			text {
				color: #BBBBBB;
				background-color: #FD7729 ;
				color: white;
				padding: 5rpx;
				display: inline-block;
				font-size: 20rpx;
			}
		}
	}
</style>

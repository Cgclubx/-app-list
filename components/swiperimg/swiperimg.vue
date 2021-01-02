<template>
	<view class="m-2" style="height:160px; margin-top:-20px;">
		<swiper indicator-dots autoplay circular indicator-active-color="#ffffff"
		style="height:160px;">
			
				<swiper-item v-for="(item,index) in imgArr" :key="index">
					<image :src="item.src" mode="aspectFill" class="w-100" style="height:160px;"></image>
				</swiper-item>
			</swiper>
	</view>
	
</template>

<script>
	export default{
		props:{
			imgArr:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style>
</style>


<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab">
			<block v-for="(item,index) in navList" :key="item.id" > 
			<view class="swiper-tab-list" style="font-weight:bold;" @click="changeStyle(index)" :class=" index==tabIndex ? 'active' : '' ">
					{{item.classname}}
			</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import bus from '@/utils/eventbus.js'
	export default {
		data(){
			return {
			}
		},
		props: ['navList','tabIndex'],
		onLoad() {
		},
		beforeMount(){
			// this.indexact = this.tabIndex
		},
		methods: {
			onLoadMore() {
			},
			changeStyle(index){
				bus.$emit('border',index)
			}
		}
	}
</script>

<style>
	.active{
	 transform: scale(1.3);
	 color: #FD587C;	
	 font-weight: 800;
	}

</style>

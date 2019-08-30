<template>
	<view>
		<textarea :value="value" placeholder="" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			}
		},
		methods: {
			
		},
		onLoad(){
			this.value = this.$Route.query.name
			console.log(this.$Route.query.name)
		}		
	}
</script>

<style>

</style>

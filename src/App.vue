<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<keep-alive v-if="$route.meta.keepAlive">
			    <router-view></router-view>
			</keep-alive>
			<router-view v-else-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
@import "./assets/css/base.less";
@import "./assets/css/layout.less";
@import "./assets/css/sprite.less";
</style>

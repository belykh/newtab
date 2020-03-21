<template>
	<div class="content">
		<bookmarks />
		<top-sites />
	</div>
</template>
<script>
import topSites from './components/top-sites/top-sites.vue';
import bookmarks from './components/bookmarks.vue';

export default {
	components: {
		'top-sites': topSites,
		bookmarks,
	}
}
</script>
<style lang="less">
html {
	height: 100%;
}
body {
	min-height: 100%;
	margin: 0;
	padding: 0;
	background-color: #333;
}
.content {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
}
</style>
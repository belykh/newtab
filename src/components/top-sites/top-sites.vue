<template>
	<div class="top-sites">
		<top-site
			v-for="(site, index) in sites" :key="index"
			:site="site"
		/>
	</div>
</template>
<script>
import topSitesItem from './top-sites-item.vue';

export default {
	components: {
		'top-site': topSitesItem,
	},
	data() {
		return {
			sites: []
		};
	},
	created() {
		chrome.topSites.get(sites => {
			this.sites = sites;
		});
	},
}
</script>
<style lang="less">
.top-sites {
	display: flex;
	flex-direction: row;
	margin: 20px 0;
}
</style>
<template>
	<div class="top-sites">
		<top-site
			v-for="(site, index) in sites" :key="index"
			:site="site"
		/>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import topSitesItem, { Site } from './top-sites-item.vue';

@Component({
	components: {
		'top-site': topSitesItem,
	}
})
export default class extends Vue {
	sites: Site[] = [];

	created() {
		chrome.topSites.get(sites => {
			this.sites = sites;
			console.log('sites', sites);
		});
	}
}
</script>
<style lang="less">
.top-sites {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin: 20px 0;
}
</style>
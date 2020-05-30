<template>
	<a
		class="topsite-tile"
		:href="site.url"
	>
		<div class="topsite-tile__icon">
			<img :src="'chrome://favicon/' + site.url"/>
		</div>
		<div class="topsite-tile__title">{{ title }}</div>
	</a>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

export type Site = {
	title: string;
	url: string;
};

const TopSitesMenuItemProps = Vue.extend({
	props: {
		site: Object
	}
});

@Component
export default class TopSitesMenuItem extends TopSitesMenuItemProps {
	// @Prop() site: Site = {
	// 	title: '',
	// 	url: '',
	// };

	get title() {
		let title = this.site.title || '';
		let pos = title.search(/ [-–] /);
		if (~pos) {
			title = title.slice(0, pos)
		}
		return title;
	}
}

</script>
<style lang="less">
.topsite-tile {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	padding: 8px;
	border-radius: 5px;
	transition: .3s;
	text-decoration: none;
	&:hover {
		background-color: #555;
	}
	&__title {
		overflow: hidden;
		text-align: center;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		box-sizing: border-box;
		color: #333;
		background-color: white;
		border-radius: 16px;
		width: 80px;
		line-height: 24px;
		padding: 0 8px;
	}
	&__icon {
		height: 48px;
		width: 48px;
		border-radius: 50%;
		margin: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #aaa;
		img {
			height: 16px;
			width: 16px;
		}
	}
}
</style>
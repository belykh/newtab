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
<script>
export default {
	props: {
		site: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
		};
	},
	computed: {
		title() {
			return this.site.title;
		}
	},
	/*methods: {
		onClick(url) {
			chrome.tabs.update({ url });
		}
	}*/
}
</script>
<style lang="less">
.topsite-tile {
	display: flex;
	flex-direction: column;
	height: 80px;
	width: 64px;
	overflow: hidden;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	padding: 8px;
	border-radius: 5px;
	transition: .3s;
	text-decoration: none;
	&:hover {
		background-color: #ccc;
	}
	&__title {
		overflow: hidden;
		text-align: center;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #333;
	}
	&__icon {
		height: 32px;
		width: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #aaa;
		margin: 16px;
		img {
			height: 16px;
			width: 16px;
		}
	}
}
</style>
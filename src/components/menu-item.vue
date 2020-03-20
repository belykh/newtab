<template>
	<div class="bookmark-dropdown">
		<div
			v-for="(item) in items"
			:key="item.id"
			class="bookmark-dropdown-item"
			@click="onClick(item)"
		>

			<img v-if="item.url" :src="'chrome://favicon/' + item.url" class="menu-image"/>
			<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 16 16" class="menu-image">
				<path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/>
				<path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
			</svg>
			<div v-if="item.title" class="bookmark-dropdown-item__title">{{ item.title }}</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	props: {
		items: {
			type: Array,
			default: {},
		}
	},
	methods: {
		onClick(item) {
			if (item.url) {
				chrome.tabs.update({ url: item.url });
			} else {
				item.menuDropDown = !item.menuDropDown;
			}
		}
	}
}
</script>
<style lang="less">
.bookmark-dropdown {
	position: absolute;
	top: 30px;
	border: 1px solid #9f9f9f;
	box-shadow: 2px 2px 2px 0 #ccc;
	z-index: 3;
	background: white;

}
.bookmark-dropdown-item {
	cursor: default;
	transition: .2s;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin: 4px 2px;
	&:hover {
		background-color: #888;
	}
	&__title {
		margin: 4px;
		max-width: 300px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>
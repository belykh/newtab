<template>
	<div class="bookmarks-bar">
		<div
			v-for="(item) in bookmarkBar"
			:key="item.id"
			class="bookmark"
			@click="onClick(item)"
			@mouseenter="onMouseOver(item)"
		>

			<img v-if="item.url" :src="'chrome://favicon/' + item.url" class="menu-image"/>
			<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 16 16" class="menu-image">
				<path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/>
				<path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
			</svg>
			<div v-if="item.title" class="bookmark__title">{{ item.title }}</div>
			<menu-item v-if="item.menuDropDown" :items="item.children" />
		</div>
	</div>
</template>
<script>
import Vue from 'vue';

import menuItem from './menu-item.vue'

export default {
	data() {
		return {
			bookmarkBar: [],
			otherBookmarks: [],
			menuDropDown: false,
		};
	},
	components: {
		'menu-item': menuItem,
	},
	/*watch: {
		menuDropDown(value) {
			if (!value) {
				this.bookmarkBar[0].menuDropDown = false;
			}
		}
	},*/
	created() {
		//document.addEventListener('click', () => {
		//	this.menuDropDown = false;
		//}, false);
		chrome.bookmarks.getTree(list => {
			let childrenLoop = (items) => {
				let res = []
				items.forEach(i => {
					let newItem = {};
					newItem.title = i.title;
					newItem.url = i.url;
					newItem.menuDropDown = false;

					
					if (i.children) {
						newItem.children = childrenLoop(i.children)
					}
					res.push(newItem);
				});
				return res;
			}
			this.bookmarkBar = childrenLoop(list[0].children[0].children);
			this.otherBookmarks = list[0].children[1].children;

			//Vue.set(this.bookmarkBar[0], 'menuDropDown', false);

			console.log(this.bookmarkBar)

		});
	},
	methods: {
		onClick(item) {
			if (item.url) {
				chrome.tabs.update({ url: item.url });
			} else {
				this.menuDropDown = true;
				item.menuDropDown = !item.menuDropDown;
			}
		},
		onMouseOver(item) {
			if (this.menuDropDown && item.children) {
				this.bookmarkBar.forEach(i => {
					i.menuDropDown = false;
				});
				item.menuDropDown = true;
				console.log('mouseOver', item.title);
			}
		}
	}
}
</script>
<style lang="less">
.bookmarks-bar {
	display: flex;
	flex-direction: row;
	width: 100%;
	background-color: #aaa;
	box-sizing: border-box;
}
.bookmark {
	cursor: default;
	transition: .2s;
	border-radius: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin: 4px 2px;
	padding: 0 4px;
	&:hover {
		background-color: #888;
	}
	&__title {
		margin: 4px;
		max-width: 150px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.menu-image {
		height: 16px;
		width: 16px;
		margin: 4px;
	}
}
</style>
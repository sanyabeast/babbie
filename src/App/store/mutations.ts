import Vue from "vue"

export default {
	setRoot: function(state: any, root: Vue): void{
		state.$root = root;
	},
}
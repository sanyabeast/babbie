import Vue from "vue"
import Vuex from "vuex"
import StoreCreator from "StoreCreator.ts"
import App from "components/App.vue"
import axios from "axios";

interface BabbieParams {
	element: string|HTMLElement;
	package_info: object;
}

/** 
 * Basic class
 */
class Babbie {
	protected $root: Vue|null;
	protected $store: Vuex.Store|null;
	protected params: BabbieParams;

	constructor(params: BabbieParams){
		this.params = params; 
		let element: HTMLElement|null;

		if (typeof params.element == "string"){
			element = document.querySelector(params.element);
		} else {
			element = params.element;
		}

		if (element === null){
			console.log("invalid element")
			this.$store = null;
			this.$root = null;
		} else {
			let dom: HTMLElement = document.createElement("div");
			element.appendChild(dom);

			let $store = new StoreCreator(params).store;

			$store.commit("setRoot", new Vue({
		      	el:  dom,
		      	render: createElement => {
				  	return createElement(App, {});
				},
		      	store : $store,
		      	components: { App },
		      	template: '<App/>'
		    }));

		    this.$store = window.$store = $store;
			this.$root = window.$root = $store.state.$root;
		}
	}
}

export default Babbie;
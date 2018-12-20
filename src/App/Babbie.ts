import Vue from "vue"
import Vuex from "vuex"
import StoreCreator from "./StoreCreator"
import App from "components/App.vue"
import axios from "axios";

namespace Babbie {
	export interface Params {
		element: string|HTMLElement;
		package_info: object;
	}
	/** 
	 * Basic class
	 */
	export class Babbie {
		protected $root: Vue|null;
		protected $store: Vuex.Store|null;
		protected params: Params;

		constructor(params: Params){
			this.params = params; 
			let element: HTMLElement|null;

			if (typeof params.element == "string"){
				element = document.querySelector(params.element);
			} else {
				element = params.element;
			}

			if (element === null){
				this.$store = null;
				this.$root = null;
			} else {
				let dom: HTMLElement = document.createElement("div");
				element.appendChild(dom);

				let $store = new StoreCreator(params).store;

				$store.commit("setRoot", new Vue({
			      	el:  dom,
			      	store : $store,
			      	components: { App },
			      	template: '<App/>'
			    }));


			    this.$store = window.$store = $store;
				this.$root = window.$root = $store.state.$root;
			}
		}
	}
}

export default Babbie;
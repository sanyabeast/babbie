import Vue from "vue"
import { Store } from "vuex"
import StoreCreator from "./StoreCreator"
import App from "components/App.vue"
import axios from "axios";

const yaml: object = require("test.yaml")
const xml: object = require("test.xml")
console.log(yaml, xml)

namespace Babbie {
	export interface Params {
		element: string|HTMLElement;
		package_info: object;
	}

	/** 
	 * Babbie class
	 */
	export class Babbie {
		protected $root?: Vue;
		protected $store?: Store<any>;
		protected params?: Params;

		constructor(params: Params){
			this.params = params; 
			let element: HTMLElement|null;

			if (typeof params.element == "string"){
				element = document.querySelector(params.element);
			} else {
				element = params.element;
			}

			if (element === null){
				this.$store = undefined;
				this.$root = undefined;
			} else {
				let dom: HTMLElement = document.createElement("div");
				element.appendChild(dom);

				this.$store = new StoreCreator(params).store;

				this.$store.commit("setRoot", new Vue({
			      	el:  dom,
			      	store: this.$store,
			      	components: { App },
			      	template: '<App/>'
			    }));

				this.$root = window.$root = this.$store.state.$root;
			}
		}
	}
}

export default Babbie;
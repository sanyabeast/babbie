import Vue from "vue"
import Vuex from "vuex"
import StoreCreator from "StoreCreator.ts"
import App from "components/App.vue"

class Babbie {
	constructor(params: any){
		var element = null;

		if (typeof params !== "object"){
			throw new Error("Babbie: Params Please provide params object with at least one prop: element (HTMLElement or CSS-selector).")
			return;
		}

		element = params.element;
		if (typeof params.element == "string") element = document.querySelector(params.element);

		if (!(element instanceof window.HTMLElement)){
			throw new Error("Babbie: Please provide params object with at least one prop: element (HTMLElement or CSS-selector).")
			return;
		}

		var dom = document.createElement("div");
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
		
		window.$store = $store;
		window.$root = $store.state.$root;
	}
}

export default Babbie;
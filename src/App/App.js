import Vue from "vue"
import StoreCreator from "./StoreCreator"
import App from "./Components/App.vue"

window.$tpl = function(tpl, tokens){
	var result = tpl;
	_.forEach(tokens, (v, k)=>{
		var regexp = new RegExp("[$]{"+k+"}", "gm");
		regexp.test(result) && (result = result.replace(regexp, v));
	});
	return result;
}

class Babbie {
	constructor(params){
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

		var $store = new StoreCreator(params);

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
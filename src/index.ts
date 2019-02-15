import Babbie from "./App/Babbie"
import packageInfo from "../package.json"
import Coffee from "./Coffee.js"
import wasmTest from "./Assembly/index.js"

console.log(wasmTest)

const Tea = require("./Tea.coffee")

console.log(new Tea("green"))
console.log(new Coffee("latthe"))

const pizzicato = require("pizzicato");
console.log(pizzicato)

const hotkeys = require("hotkeys");
console.log(hotkeys)

const store = require("store");
console.log(store)

declare global {
    interface Window { 
    	app: Babbie.Babbie; 
    	clog: any,
    	$store: any,
    	$root: any,
		HTMLElement: any,
		require: any
    }

    namespace Vuex {
    	export interface Store<>{}
	}
	
	interface Vue {}
}

let app: Babbie.Babbie = new Babbie.Babbie({
	element: document.body,
	package_info : {...packageInfo}
})

window.app = app;

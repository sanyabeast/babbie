import Babbie from "./App/Babbie"
import packageInfo from "../package.json"

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

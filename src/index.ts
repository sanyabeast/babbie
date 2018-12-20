import Babbie from "./App/Babbie"
import packageInfo from "../package.json"

declare global {
    interface Window { 
    	app: Babbie.Babbie; 
    	clog: any,
    	$store: any,
    	$root: any,
    	HTMLElement: any
    }

    namespace Vuex {
    	export interface Store {}
    }
}

window.app = new Babbie.Babbie({
	element: document.body,
	package_info : {...packageInfo}
})

import App from "App"
import packageInfo from "../package.json"

declare global {
    interface Window { 
    	app: App; 
    	clog: any,
    	$store: any,
    	$root: any,
    	HTMLElement: any
    }

    namespace Vuex {
    	export interface Store {}
    }
}

window.app = new App({
	element: document.body,
	package_info : {...packageInfo}
})

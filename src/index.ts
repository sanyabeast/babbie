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
}

window.app = new App({
	element: "body",
	package_info : packageInfo
})

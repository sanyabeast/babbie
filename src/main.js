import App from "./App/App"
import packageInfo from "../package.json"

clog(packageInfo)

window.app = new App({
	element: "body",
	package_info : packageInfo
})

import Vue from "vue"
import Vuex from "vuex"

import state from "Store/state.ts"
import getters from "Store/getters.ts"
import mutations from "Store/mutations.ts"
import modules from "Store/modules.ts"
import actions from "Store/actions.ts"

Vue.use(Vuex);

class StoreCreator {
	store: any;
	constructor(params: any){
		window.clog(params)

		this.store = new Vuex.Store({
		  	state : {...state, ...params},
		  	actions,
		  	mutations,
		  	getters,
		  	modules
		})
	}
}


export default StoreCreator
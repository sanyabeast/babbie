<template>
  	<div 
	  	ref="app" 
	  	class="app flex-justify-center flex-align-center fit-width fit-height" 
	  	:data-version="$store.state.package_info.version"
  	>
  		<div 
  			class="test flex-justify-center flex-align-center"
  		>
  			<p>{{ Math.floor($store.getters.randomNumber * 10000) }}</p>
  		</div>
  	</div>
</template>

<script lang="ts">

let isDone: boolean = false;

export default {
    name: "App",
    components: { },
    methods: { }
};
   
</script>

<style lang="scss">
  @import "../../../res/scss/presets.scss";
  @import "../../../res/scss/app.scss";
  @import "../../../res/scss/animations.scss";
</style>
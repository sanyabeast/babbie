<template>
  	<div 
	  	ref="app" 
	  	class="app flex-justify-center flex-align-center fit-width fit-height" 
	  	:data-version="$store.state.package_info.version"
  	>
  		<div 
  			class="test flex-justify-center flex-align-center"
  		>
  			<p>{{ $store.getters.randomNumber.toFixed(5) }}</p>
  		</div>
  	</div>
</template>

<script>

export default {
    name: "App",
    components: { },
    methods: { }
};
   
</script>

<style lang="sass">
  import "../../../res/sass/presets.scss";
  import "../../../res/sass/app.scss";
  import "../../../res/sass/animations.scss";
</style>
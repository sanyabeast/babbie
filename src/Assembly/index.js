fetch('src/Assembly/build/optimized.wasm').then(response => {
	console.log(response)
  	return response.arrayBuffer()
}).then(bytes => {
	console.log(bytes)
  	return WebAssembly.instantiate(bytes, {})
}).then(results => {
	// export default results.instance.exports;
});
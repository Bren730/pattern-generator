
class App {
	
	constructor() {



	}

	initialize() {

		console.log("App initializing...")

		// Populate placing algorithm
		var select = document.getElementById('input-placer')

		for(let placer in placers) {

			var option = document.createElement("option")
			option.text = placer
			option.value = placers[placer]
			select.add(option)

		}

		this.generator = new Generator()

	}
}

window.App = new App()
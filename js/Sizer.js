class Sizer {
	
	constructor() {



	}

	getSizeFactor(t) {

		if (t >= 0 && t <= 1) {

			var result = Math.sin(Math.PI * 2 * t)

			return (result >= 0) ? result : 0
		}

	}

}
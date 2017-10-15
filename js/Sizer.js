class Sizer {
	
	constructor() {



	}

	getSizeFactor(x, y) {

		var r = Math.sqrt( (Math.pow(x, 2)  + Math.pow(y, 2)) )

		var perc = r / this.getMaximumRadius()

		if (perc >= 0 && perc <= 1) {

			var result = Math.sin(Math.PI * perc)

			return (result >= 0) ? result : 0
		}

	}

	getMinimumRadius() {

		return this.minRadius

	}

	setMinimumRadius(radius) {

		this.minRadius = radius

	}

	getMaximumRadius() {

		return this.maxRadius

	}

	setMaximumRadius(radius) {

		this.maxRadius = radius
		
	}

}
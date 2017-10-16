class Sizer {
	
	constructor(minParticleSize, maxParticleSize, minPatternRadius, maxPatternRadius) {

		this.minParticleSize = minParticleSize
		this.maxParticleSize = maxParticleSize
		this.minPatternRadius = minPatternRadius
		this.maxPatternRadius = maxPatternRadius

	}

	getMinParticleSize() {

		return this.minParticleSize

	}

	setMinParticleSize(Size) {

		this.minParticleSize = Size

	}

	getMaxParticleSize() {

		return this.maxParticleSize

	}

	setMaxParticleSize(Size) {

		this.maxParticleSize = Size

	}

	getMinPatternRadius() {

		return this.minPatternRadius

	}

	setMinPatternRadius(radius) {

		this.minPatternRadius = radius

	}

	getMaxPatternRadius() {

		return this.maxPatternRadius

	}

	setMaxPatternRadius(radius) {

		this.maxPatternRadius = radius
		
	}

	getParticleSize(x, y) {

		var addition = this.getSizeFactor(x, y) * (this.getMaxParticleSize() - this.getMinParticleSize())

		var result = (addition >= 0) ? this.getMinParticleSize() + addition : this.getMinParticleSize()

		return result

	}

	getSizeFactor(x, y) {

		var r = Math.sqrt( (Math.pow(x, 2)  + Math.pow(y, 2)) )

		var perc = r / this.getMaxPatternRadius()

		// console.log(r, perc)

		if (perc >= 0 && perc <= 1) {

			var result = Math.sin(Math.PI * perc)

			// console.log(result)

			return (result >= 0) ? result : 0
		}

	}

}
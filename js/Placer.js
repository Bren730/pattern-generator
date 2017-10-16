class Placer {
	
	constructor(minPatternRadius, maxPatternRadius) {

		this.minPatternRadius = minPatternRadius
		this.maxPatternRadius = maxPatternRadius
		this.placingScaleFactor = 1.0

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

	getPosition(i, particleCount) {

		var r = new SVG.Number(i * this.getMaxPatternRadius())

		return [this.getX(i), this.getY(i)]
	}

	getX(i, particleCount) {

		var x = this.maxPatternRadius * (.2 * i * Math.cos(3.05 * i))

		return x

	}

	getY(i, particleCount) {

		var y = new SVG.Number((this.maxPatternRadius * (.2 * i * Math.sin(3.05 * i))).toString() + 'mm' )

		return y

	}

	getNormalizedDistanceFromCenter(i, particleCount) {

		return this.getDistanceFromCenter(i, particleCount) / this.maxPatternRadius

	}
	
	getNormalizedDistanceInRange(i) {


	}

	getDistanceFromCenter(i, particleCount) {

		return Math.sqrt( ( Math.pow(this.getX(i, particleCount), 2) + Math.pow(this.getY(i, particleCount), 2) ) )

	}

}
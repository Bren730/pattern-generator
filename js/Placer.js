class Placer {
	
	constructor(minRadius, maxRadius) {

		this.minRadius = minRadius
		this.maxRadius = maxRadius
		this.placingScaleFactor = 1.0

	}

	getMaximumRadius() {

		return this.maxRadius
		
	}

	setMaximumRadius(radius) {

		this.maxRadius = radius

	}

	getPosition(i, particleCount) {

		var r = new SVG.Number(i * this.getMaximumRadius())

		return [this.getX(i), this.getY(i)]
	}

	getX(i, particleCount) {

		var x = this.maxRadius * (.2 * i * Math.cos(3.05 * i))

		return x

	}

	getY(i, particleCount) {

		var y = new SVG.Number((this.maxRadius * (.2 * i * Math.sin(3.05 * i))).toString() + 'mm' )

		return y

	}

	getNormalizedDistanceFromCenter(i, particleCount) {

		return this.getDistanceFromCenter(i, particleCount) / this.maxRadius

	}
	
	getNormalizedDistanceInRange(i) {


	}

	getDistanceFromCenter(i, particleCount) {

		return Math.sqrt( ( Math.pow(this.getX(i, particleCount), 2) + Math.pow(this.getY(i, particleCount), 2) ) )

	}

	getMinimumRadius() {

		return this.minRadius

	}

	setMinimumRadius(radius) {

		this.minRadius = radius

	}

}
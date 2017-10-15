class SpiralPlacer extends Placer {
	
	constructor(minRadius, maxRadius) {

		super(minRadius, maxRadius)

		this.minRadius = minRadius
		this.maxRadius = maxRadius

	}

	getPosition(i) {

		return [this.getX(i), this.getY(i)]
	}

	getX(i) {

		return (.2 * i * Math.cos(3.05 * i))

	}

	getY(i) {

		return (.2 * i * Math.sin(3.05 * i))

	}
}
class Placer {
	
	constructor(particleCount) {

		this.particleCount = particleCount

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
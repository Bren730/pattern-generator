
class FibonacciPlacer extends Placer {

	constructor(particleCount) {

		super(particleCount)

		this.particleCount = particleCount
		this.phi = (1 + Math.sqrt(5)) / 2.0
		this.angle = 2 * Math.PI * (1 - (1 / this.phi))

	}

	getPosition(i) {

		return [this.getX(i), this.getY(i)]
	}

	getX(i) {

		var angle = this.angle * i
		var r = Math.sqrt(i) * 5
		var x = Math.cos(angle) * r

		return x

	}

	getY(i) {

		var angle = this.angle * i
		var r = Math.sqrt(i) * 5

		var x = Math.sin(angle) * r

		return x

	}

}
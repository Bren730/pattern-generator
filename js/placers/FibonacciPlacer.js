
class FibonacciPlacer extends Placer {

	constructor(minRadius, maxRadius) {

		super(minRadius, maxRadius)

		this.minRadius = minRadius
		this.maxRadius = maxRadius

		this.phi = (1 + Math.sqrt(5)) / 2.0
		this.angle = 2 * Math.PI * (1 - (1 / this.phi))

	}

	getPosition(i, particleCount) {

		var perc = i / particleCount
		
		var r = perc * this.getMaximumRadius()
		var angle = this.angle * i

		var x = Math.cos(angle) * r
		var y = Math.sin(angle) * r

		return [x, y]
	}

	getR(i, particleCount) {

		return ( this.getMaximumRadius() * (i / particleCount))

	}

	getAngle(i) {

		return (this.angle * i)

	}

	getX(i, particleCount) {

		var x = Math.cos(this.getAngle(i)) * this.getR(i, particleCount)

		return x

	}

	getY(i, particleCount) {

		var y = Math.sin(this.getAngle(i)) * this.getR(i, particleCount)

		return y

	}

}
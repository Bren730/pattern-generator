
class FibonacciPlacer extends Placer {

	constructor(minPatternRadius, maxPatternRadius) {

		super(minPatternRadius, maxPatternRadius)

		console.log('FibonacciPlacer', minPatternRadius, maxPatternRadius)

		this.minPatternRadius = minPatternRadius
		this.maxPatternRadius = maxPatternRadius

		this.phi = (1 + Math.sqrt(5)) / 2.0
		this.angle = 2 * Math.PI * (1 - (1 / this.phi))

	}

	getPosition(i, particleCount) {

		var perc = i / particleCount
		var sqrtPerc = Math.sqrt(perc)
		
		var r = sqrtPerc * this.getMaxPatternRadius()
		var angle = this.angle * i

		var x = Math.cos(angle) * r
		var y = Math.sin(angle) * r

		return [x, y]
	}

	getR(i, particleCount) {

		return ( this.getMaxPatternRadius() * (i / particleCount))

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
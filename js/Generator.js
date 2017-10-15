class Generator {
	
	constructor() {

		this.particles = []

		this.graphId = 'graph'
		this.graphElement = document.getElementById(this.graphId)
		this.graph = SVG(this.graphId).size("100vw", "100vh")

		this.graphWidth = this.graphElement.offsetWidth;
		this.graphHeight = this.graphElement.offsetHeight;
		console.log("graphWidth", this.graphWidth)

		this.graph.viewbox((-0.5 * this.graphWidth), -0.5 * this.graphHeight, this.graphWidth, this.graphHeight)

		this.particleCount = 0
		this.prevParticleCount = this.particleCount
		this.particleSize = new SVG.Number('1mm')

		this.sizeEquation = document.getElementById('input-partic-esize-equation')

		// Modifiers
		this.placer = new Placer(this.minRadius, this.maxRadius)
		this.sizer = new Sizer()

		this.bindEventListeners()

		this.onParticleCountChange(this.particleCountInputElement.value)

	}

	getMinimumRadius() {

		return this.minRadius

	}

	setMinimumRadius(radius) {

		this.minRadius = radius
		this.placer.setMinimumRadius(this.minRadius)
		this.sizer.setMinimumRadius(this.minRadius)

	}

	getMaximumRadius() {

		return this.maxRadius

	}

	setMaximummRadius(radius) {

		this.maxRadius = radius
		this.placer.setMaximumRadius(this.maxRadius)
		this.sizer.setMaximumRadius(this.maxRadius)

	}

	getParticleCount() {

		return this.particleCount

	}

	setParticleCount(particleCount) {

		this.particleCount = particleCount

	}

	bindEventListeners() {

		// Radii inputs
		this.minRadiusInputElement = document.getElementById('input-radius-min')
		this.maxRadiusInputElement = document.getElementById('input-radius-max')

		this.setMinimumRadius(parseInt(this.minRadiusInputElement.value))
		this.setMaximummRadius(parseInt(this.maxRadiusInputElement.value))

		// Particle count input 
		this.particleCountInputElement = document.getElementById('input-particle-count')
		this.setParticleCount(parseInt(this.particleCountInputElement.value))

		this.particleCountInputElement.oninput = (e) => {

			return this.onParticleCountChange(e.target.value)

		}

		// Placer algorithm
		this.placerInputElement = document.getElementById('input-placer')
		this.placer = new window[this.placerInputElement.value.toString()](this.getMinimumRadius(), this.getMaximumRadius())

		this.placerInputElement.onchange = (e) => {

			console.log("placer changed to", this.placerInputElement.value)
			var placer = new window[this.placerInputElement.value.toString()]
			return this.onPlacerChange(placer)

		}

		// Size input
		this.sizeInputElement = document.getElementById('input-particle-size')
		this.particleSize = parseInt(this.sizeInputElement.value)

		this.sizeInputElement.oninput = (e) => {

			return this.onParticleSizeChange(e.target.value)

		}

	}

	onParticleCountChange(particleCount) {

		this.setParticleCount(particleCount)

		for(var i = 0; i < this.getParticleCount(); i++) {

			var circle 
			var pos = this.placer.getPosition(i, this.particleCount)
			var size = this.sizer.getSizeFactor(pos[0], pos[1]) * this.particleSize

			if (this.particles[i] == null) {

				// console.log("no particle present, creating one")
				circle = this.graph.circle(size)
				this.particles.push(circle)

			} else {

				circle = this.particles[i]
				circle.radius(size)

			}

			circle.attr({cx: pos[0], cy: pos[1]})

		}

		console.log('particleCount', this.particleCount, 'particles len', this.particles.length)

		if (this.getParticleCount() < this.particles.length) {

			for(var i = this.particles.length - 1; i >= this.getParticleCount(); i--) {

				console.log("deleting particle", i)

				this.particles[i].remove()
				this.particles.splice(i, 1)
			}

		}

		

		// // console.log("particle count changed to:", this.particleCount, "was", this.prevParticleCount)

		// // Dataset has grown
		// if (this.particleCount > this.particles.length) {

		// 	// console.log("particle counts (is, was):", this.particleCount, this.prevParticleCount)

		// 	for(var i = this.particles.length; i < this.particleCount; i++) {

		// 		// console.log("generating particle with id", i)
		// 		var circle = this.graph.circle(5)
		// 		.attr({ 
		// 			fill: '#f06',
		// 			id: i})


		// 		circle
		// 		.attr('cx', pos[0])
		// 		.attr('cy', pos[1])

		// 		this.particles.push(circle)
		// 	}

		// } else if (this.particleCount < this.particles.length) {

		// 	for(var i = this.particles.length - 1; i > this.particleCount - 1; i--) {

		// 		try {
		// 			// console.log("removing particle with id", i)
		// 			// this.graph.get(i).remove()
		// 			this.particles[i].remove()
		// 			this.particles.splice(i, 1)
		// 		} catch (err) {

		// 			// console.error(err)

		// 		}

		// 	}

		// }

		this.prevParticleCount = this.particleCount
		// this.onParticleSizeChange(this.particleSize)

	}

	onPlacerChange(placer) {

		this.placer = placer
		this.invalidateGraph()

	}

	onParticleSizeChange(particleSize) {

		this.particleSize = particleSize
		for(var i = 0; i < this.particles.length; i++) {

			var factor = this.sizer.getSizeFactor(this.particles[i].attr('cx'), this.particles[i].attr('cy'))
			this.particles[i].radius(this.particleSize * factor)

		}
	}

	invalidateGraph() {

		this.particles = []
		this.graph.clear()

		this.onParticleCountChange(this.particleCount)


	}
}
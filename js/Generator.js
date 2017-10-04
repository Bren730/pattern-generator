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
		this.size = 1

		this.bindEventListeners()

		// Modifiers
		this.placer = new Placer(this.particleCount)
		this.sizer = new Sizer()

		this.onParticleCountChange(this.particleCountInputElement.value)

	}

	bindEventListeners() {

		// Particle count input 
		this.particleCountInputElement = document.getElementById('input-particle-count')
		this.particleCount = parseInt(this.particleCountInputElement.value)

		document.getElementById('input-particle-count').oninput = (e) => {

			return this.onParticleCountChange(e.target.value)

		}

		// Size input
		this.sizeInputElement = document.getElementById('input-size')
		this.size = parseInt(this.sizeInputElement.value)

		document.getElementById('input-size').oninput = (e) => {

			return this.onSizeChange(e.target.value)

		}

	}

	onParticleCountChange(particleCount) {

		this.particleCount = particleCount
		// console.log("particle count changed to:", this.particleCount, "was", this.prevParticleCount)

		// Dataset has grown
		if (this.particleCount > this.particles.length) {

			// console.log("particle counts (is, was):", this.particleCount, this.prevParticleCount)

			for(var i = this.particles.length; i < this.particleCount; i++) {

				// console.log("generating particle with id", i)
				var circle = this.graph.circle(5)
				.attr({ 
					fill: '#f06',
					id: i})

				var pos = this.placer.getPosition(i)
				circle
				.attr('cx', pos[0])
				.attr('cy', pos[1])

				this.particles.push(circle)
			}

		} else if (this.particleCount < this.particles.length) {

			for(var i = this.particles.length - 1; i > this.particleCount - 1; i--) {

				try {
					// console.log("removing particle with id", i)
					// this.graph.get(i).remove()
					this.particles[i].remove()
					this.particles.splice(i, 1)
				} catch (err) {

					// console.error(err)

				}
			}

		}

		this.prevParticleCount = this.particleCount
		this.onSizeChange(this.size)

	}

	onSizeChange(size) {

		this.size = size
		for(var i = 0; i < this.particles.length; i++) {

			var factor = this.sizer.getSizeFactor(i / this.particles.length)
			this.particles[i].radius(this.size * factor)

		}
	}
}
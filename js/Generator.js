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
		this.minParticleSize = 0
		this.maxParticleSize = 1
		this.minPatternRadius = 0
		this.maxPatternRadius = 10

		// Modifiers
		this.placer = new Placer(this.minPatternRadius, this.maxPatternRadius)
		this.sizer = new Sizer(this.minParticleSize, this.maxParticleSize)

		this.bindEventListeners()

		this.invalidateGraph()

	}

	getMaxParticleSize() {

		return this.maxParticleSize

	}

	setMaxParticleSize(radius) {

		this.maxParticleSize = radius
		this.sizer.setMaxParticleSize(radius)
		this.maxParticleSizeOutputElement.textContent = radius

		console.log('Max particle size set to:', this.maxParticleSize)

	}

	getMinParticleSize() {

		return this.minParticleSize

	}

	setMinParticleSize(radius) {

		this.minParticleSize = radius
		this.sizer.setMinParticleSize(radius)
		this.minParticleSizeOutputElement.textContent = radius

		console.log('Min particle size set to:', this.minParticleSize)

	}

	getParticleCount() {

		return this.particleCount

	}

	setParticleCount(particleCount) {

		this.particleCount = particleCount
		this.particleCountOutputElement.textContent = particleCount
		console.log('Particle count set to:', this.particleCount)

	}

	getPlacer() {

		return this.placer
	}

	setPlacer(placer) {

		this.placer = placer
		console.log('Placer algorithm set to:', this.placer)

	}

	getMaxPatternRadius() {

		return this.maxPatternRadius

	}

	setMaxPatternRadius(maxPatternRadius) {

		this.maxPatternRadius = maxPatternRadius
		this.placer.setMaxPatternRadius(this.maxPatternRadius)
		this.sizer.setMaxPatternRadius(this.maxPatternRadius)

		this.maxPatternRadiusOutputElement.textContent = maxPatternRadius

		console.log('Max pattern radius set to:', this.maxPatternRadius)

	}

	getMinPatternRadius() {

		return this.minPatternRadius

	}

	setMinPatternRadius(minPatternRadius) {

		this.minPatternRadius = minPatternRadius
		this.placer.setMinPatternRadius(this.minPatternRadius)
		this.sizer.setMinPatternRadius(this.minParticleSize)

		this.minPatternRadiusOutputElement.textContent = minPatternRadius

		console.log('Min pattern radius set to:', this.minPatternRadius)

	}

	getSizer() {

		return this.sizer

	}

	setSizer(sizer) {

		this.sizer = sizer
		console.log('Sizer set to:', this.sizer)

	}

	bindEventListeners() {

		// Radii inputs
		this.maxParticleSizeInputElement = document.getElementById('input-particle-size-max')
		this.maxParticleSizeOutputElement = document.getElementById('output-particle-size-max')

		this.minParticleSizeInputElement = document.getElementById('input-particle-size-min')
		this.minParticleSizeOutputElement = document.getElementById('output-particle-size-min')

		this.particleCountInputElement = document.getElementById('input-particle-count')
		this.particleCountOutputElement = document.getElementById('output-particle-count')

		this.minPatternRadiusInputElement = document.getElementById('input-pattern-radius-min')
		this.minPatternRadiusOutputElement = document.getElementById('output-pattern-radius-min')

		this.maxPatternRadiusInputElement = document.getElementById('input-pattern-radius-max')
		this.maxPatternRadiusOutputElement = document.getElementById('output-pattern-radius-max')

		this.placerInputElement = document.getElementById('input-placer')

		this.exportGraphButtonElement = document.getElementById('export-graph')

		this.setMinParticleSize(parseFloat(this.minParticleSizeInputElement.value))
		this.setMaxParticleSize(parseFloat(this.maxParticleSizeInputElement.value))
		this.setParticleCount(parseInt(this.particleCountInputElement.value))
		this.setMinPatternRadius(parseFloat(this.minPatternRadiusInputElement.value))
		this.setMaxPatternRadius(parseFloat(this.maxPatternRadiusInputElement.value))

		this.setPlacer(new window[this.placerInputElement.value.toString()](this.getMinPatternRadius(), this.getMaxPatternRadius()))
		this.setSizer(new Sizer(
			this.getMinParticleSize(), 
			this.getMaxParticleSize(),
			this.getMinPatternRadius(),
			this.getMaxPatternRadius()))

		// Particle count input 
		this.particleCountInputElement.oninput = (e) => {

			this.setParticleCount(parseInt(e.target.value))
			return this.invalidateGraph()

		}

		// Placer algorithm
		this.placerInputElement.onchange = (e) => {

			var placer = new window[this.placerInputElement.value.toString()](this.getMinPatternRadius(), this.getMaxPatternRadius())
			this.setPlacer(placer)
			return this.onPlacerChange()

		}

		// Size input
		this.maxParticleSizeInputElement.oninput = (e) => {

			this.setMaxParticleSize(parseFloat(e.target.value))
			return this.invalidateGraph()

		}

		this.minParticleSizeInputElement.oninput = (e) => {

			this.setMinParticleSize(parseFloat(e.target.value))
			return this.invalidateGraph()

		}

		this.minPatternRadiusInputElement.oninput = (e) => {

			this.setMinPatternRadius(parseFloat(e.target.value))
			return this.invalidateGraph()

		}

		this.maxPatternRadiusInputElement.oninput = (e) => {

			this.setMaxPatternRadius(parseFloat(e.target.value))
			return this.invalidateGraph()

		}

		this.exportGraphButtonElement.onclick = (e) => {

			return this.exportGraph()

		}

	}

	invalidateGraph(particleCount) {

		for(var i = 0; i < this.getParticleCount(); i++) {

			var circle 
			var pos = this.placer.getPosition(i, this.particleCount)
			var size = this.sizer.getParticleSize(pos[0], pos[1])

			pos = [new SVG.Number(pos[0].toString() + 'mm'), new SVG.Number(pos[1].toString() + 'mm')]
			size = new SVG.Number(size.toString() + 'mm')

			if (this.particles[i] == null) {

				// Instantiating a circle uses diameter instead of radius, therefore we multiply by 2
				circle = this.graph.circle(size * 2)
				this.particles.push(circle)

			} else {

				circle = this.particles[i]
				circle.radius(size)

			}

			circle.attr({cx: pos[0], cy: pos[1]})

		}

		// console.log('particleCount', this.particleCount, 'particles len', this.particles.length)

		if (this.getParticleCount() < this.particles.length) {

			for(var i = this.particles.length - 1; i >= this.getParticleCount(); i--) {

				console.log("deleting particle", i)

				this.particles[i].remove()
				this.particles.splice(i, 1)
			}

		}

		this.prevParticleCount = this.particleCount

	}

	onPlacerChange(placer) {

		this.placer = placer
		this.invalidateGraph()

	}

	onMaxParticleSizeChange(particleSize) {

		for(var i = 0; i < this.particles.length; i++) {

			var size = this.sizer.getParticleSize(this.particles[i].attr('cx'), this.particles[i].attr('cy'))
			this.particles[i].radius(size)

		}
	}

	onMinParticleSizeChange(particleSize) {

		for(var i = 0; i < this.particles.length; i++) {

			var size = this.sizer.getParticleSize(this.particles[i].attr('cx'), this.particles[i].attr('cy'))
			this.particles[i].radius(size)

		}
	}

	clearGraph() {

		this.particles = []
		this.graph.clear()

		this.onParticleCountChange(this.particleCount)


	}

	exportGraph() {

		console.log('exporting graph')

		var svg = this.graph.svg()
		var fileName = 'Pattern.svg'
		var blob = new Blob([svg], {type: "text/plain;charset=utf-8"})
		saveAs(blob, fileName)
	}

	openInNewTab(url) {

		var win = window.open(url, '_blank')
		win.focus()

	}
}
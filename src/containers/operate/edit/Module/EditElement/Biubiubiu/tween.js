class Tween {
	constructor(opts = {}) {
		this.opts = opts
		this._progress = 0
		this.init(opts)
	}
	init({ start = 0, end = 100, time = 1000, update, complete }) {
		this.animation(start, end, time, update, complete)
	}
	animation(start, end, time, update, complete) {
		let self = this,
			diff = end - start,
			et   = Date.now() + time
		function animate() {
			self.Animation = requestAnimationFrame(() => {
				var now    = Date.now()
				var scale  = (et - now) / time,
					newVal = end - diff * scale
				self._progress = 1 - scale
				if (now >= et) {
					if (update) update(0)
					complete()
					self.stop()
				}
				else {
					if (update) update(newVal)
					animate()
				}
			})
		}
		animate()
	}
	pause() {
		this.stop()
	}
	continue() {
		let { _progress, opts } = this,
			{ start = 0, end = 100, time = 1000, update, complete } = opts,
			newStart = start + (end - start) * _progress,
			newTime  = time * (1 - _progress)
		this.animation(newStart, end, newTime, update, complete)
	}
	stop() {
		this.Animation && cancelAnimationFrame(this.Animation)
	}
}

export default Tween
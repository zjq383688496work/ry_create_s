// import tween from './tween'

var { random } = Math
var defaultOptions = {
	template: '',
	interval: 1000,
	maxSurplus: 3,
}
var bh = 34
var oneTime = 7e3

class Barrage {
	constructor(opts = {}) {
		this._opts = Object.assign(defaultOptions, opts)
		this.init(this._opts)
	}
	init({ interval, loaded }) {
		let { $parent } = this._opts
		this._list = []
		this._queueIndex = {}
		this._width  = $parent.offsetWidth
		this._height = $parent.offsetHeight
		this._traActive  = {}		// 可用弹道索引
		this._traTop     = {}		// 弹道top索引
		this._traTimer   = {}		// 弹道定时器
		this._trajectory = ~~(this._height / bh)
		this.trajectoryInit()
		this.polling(interval)
		this.task(interval)
		loaded && loaded(this)
	}
	// 创建弹道
	trajectoryInit() {
		let { _height, _trajectory, _traActive, _traTop, _traTimer } = this
		let rem = _height % bh
		let spa = ~~(rem / (_trajectory - 1))
		new Array(_trajectory).fill().forEach((_, i) => {
			_traTop[i]    = (bh + spa) * i
			_traActive[i] = true
		})
	}
	// 获取弹道
	getTrajectory() {
		let { _traActive, _traTop } = this,
			keys = Object.keys(_traActive),
			len  = keys.length
		if (!len) return
		let key = keys[random() * len >> 0]
		delete _traActive[key]		// 弹道占用
		return key
	}
	// 激活弹道
	activeTrajectory(idx, timeout) {
		let { _traActive, _traTimer } = this
		_traTimer[idx] = setTimeout(() => {
			clearTimeout(_traTimer[idx])
			_traActive[idx] = true
		}, ~~timeout + 100)
	}
	// 创建弹幕
	create() {
		let { _queueIndex, _list, _opts } = this,
			{ maxSurplus, updateed } = _opts,
			len = _list.length
		if (!len) return
		if (len === maxSurplus && updateed) updateed(this)
		let idx  = this.getTrajectory()
		if (!idx) return console.log('当前无可用弹道!')
		let item = _list.shift(0)
		let dom  = this.createDom(item, idx)
		let _dom = _queueIndex[dom.id] = {
			dom,
			item,
			// tween: tw,
		}
		/*let tw   = */this.createTween(dom, idx, _dom)
		this.createEvent(dom, item)
	}
	getElement(id) {
		return this._queueIndex[id]
	}
	// 创建dom
	createDom(item, idx) {
		let { $parent, template, max } = this._opts,
			domStr  = substitute(template, item),
			virtual = document.createElement('div')
		if (!$parent) this.destroy()	// parent不存在则销毁组件
		virtual.innerHTML = domStr
		let dom = virtual.firstElementChild,
			top = random() * max >> 0
		dom.id  = `bar_${random() * 9e8 >> 0}`
		dom.style.top = this._traTop[idx] + 'px'
		$parent.appendChild(dom)
		return dom
	}
	// 创建补间动画
	createTween(dom, idx, _dom) {
		let self = this,
			{ _width } = this,
			{ offsetWidth } = dom,
			scale = offsetWidth / _width,
			timeout = oneTime * scale,
			time    = oneTime + timeout
			// timeout = offsetWidth / (_width + offsetWidth) * time
		this.activeTrajectory(idx, timeout)
		dom.style.left = '0%'
		dom.style.transform = 'translateX(-100%)'
		dom.style.transitionDuration = `${time}ms`
		_dom.timer = setTimeout(() => {
			if (!dom) return
			self.removeItem(dom.id)
		}, time + 100)
		// let tw = new tween({
		// 	start: 0,
		// 	end:   100,
		// 	time,
		// 	update(val) {
		// 		if (!dom) return tw.stop()
		// 		dom.style.left = `${100 - val}%`
		// 		dom.style.transform = `translateX(-${val}%)`
		// 	},
		// 	complete() {
		// 		tw.stop()
		// 		if (!dom) return
		// 		self.removeItem(dom.id)
		// 	}
		// })
		// return tw
	}
	createEvent(dom, item) {
		let { clicked } = this._opts
		dom.addEventListener('click', function(e) {
			clicked && clicked(e, dom.id)
		}, false)
	}
	removeItem(id) {
		let { dom, item, timer } = this._queueIndex[id]
		clearTimeout(timer)
		dom.parentElement.removeChild(dom)
		delete this._queueIndex[id]
	}
	// 插入数据
	append(newlist = []) {
		let { _list } = this
		_list.push.apply(_list, newlist)
	}
	// 轮询
	polling(interval) {
		// this.timer = setTimeout(() => {
		this.timer = setInterval(() => {
			this.create()
		}, interval)
	}
	// 定时任务
	task(interval) {
		this.timerTask = setInterval(() => {
			this.create()
		}, interval * 5)
	}
	// 销毁
	destroy() {
		let { _traTimer, _queueIndex } = this
		if (_traTimer) {
			Object.keys(_traTimer).forEach(key => {
				clearTimeout(_traTimer[key])
			})
		}
		if (_queueIndex) {
			Object.values(({ timer }) => {
				timer && clearTimeout(timer)
			})
		}
		// this.timer && clearTimeout(this.timer)
		this.timer && clearInterval(this.timer)
	}
}

function substitute(template, data) {
	return data && typeof(data) == 'object'? template.replace(/\{\{([^{}]+)\}\}/g, function(match, key) {
		var key = key.split('.'),
			value = data,
			len = key.length
		for (var i = 0; i < len; i++) {
			value = value[key[i]]
			if (!value) break
		}
		return void 0 !== value ? '' + value : ''
	}): template.toString()
}

export default Barrage
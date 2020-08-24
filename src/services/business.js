const formatMap          = require('./formatMap')
const { statusRemoveAuth, compVersionMap } = require('var')
const formatPxMap        = formatMap.px
const formatComplexMap   = formatMap.complex
const formatComplexOrder = formatMap.complexOrder
const formatColorMap     = formatMap.color
const formatImage        = formatMap.image
const formatPxMap2       = formatMap.px2
const NT = formatMap.numberTemplate

const lang = require('var/languages')

const cdnUrl = 'http://rongyi.b0.rongyi.com/commodity/text'
const pics = [
	'201808271739138841',
	'201808271739139870',
	'201808271739140771',
	'201808271739141416',
	'201808271739142502'
]

/* window 扩展方法 */
const Fetch  = require('public/Fetch')
const extend = require('util')._extend


function colorVaild(v, obj, key, change) {
	if (typeof v === 'string') return v
	if (!v || change) return change
	let type   = v.type
	if (!window.curThemeColor[type] && type !== 'custom') {
		v.type = type = 'custom'
	}
	obj[key] = type === 'custom'? v.color: window.curThemeColor[type].color
	return change
}

module.exports = extend(window, {
	dataFormat: require('./dataFormat'),
	Ajax:       Fetch.default,
	storeState: {
		saveHistory: false		// 是否允许保存历史记录状态 true: 允许 false: 不允许
	},
	storeData: {},
	// 组件样式格式化
	cssColorFormat(props, key) {
		// let st  = Date.now()
		let { data, actions } = props
		let { style, layout } = data.data
		let sk = key === 'layout'? layout: style[key]
		if (!sk) {
			// console.log(`名为 ${key} 的样式未定义!`)
			return {}
		}
		let obj = deepCopy(sk)
		let colorChange = 0
		for (let p in obj) {
			let v = obj[p]
			if (formatComplexMap[p]) {
				colorChange = colorVaild(v.color, v, 'color', colorChange)
				obj[p] = Object.keys(v).map(_ => {
					let w  = v[_], nt = NT[_]
					return nt? nt.substitute({ val: w }): getAttr(w) === 'Number'? w += 'px': w
				}).join(' ')
			}
			else if (formatColorMap[p]) {
				colorChange = colorVaild(v, obj, p, colorChange)
			}
			else if (formatPxMap2[p]) {
				obj[p] += 'px'
			}
			else if (formatImage[p]) {
				obj[p] = `url('${getImg(v)}')`
			}
		}
		var newO = {}
		var newObj = Object.keys(obj).sort()
		newObj.map(_ => {
			newO[_] = obj[_]
		})
		// console.log(`耗时${Date.now() - st}ms`)
		return newO
	},
	cssFormatByTerm(obj) {
		Object.keys(obj).map(p => {
			let v = obj[p]
			if (formatComplexMap[p]) {
				 Object.keys(v).map(_ => {
					let w  = v[_], nt = NT[_]
					const nowData =  nt? nt.substitute({ val: w }): getAttr(w) === 'Number'? (w *2 + 'px'): w
					obj[p][_] = nowData
				})
			}
			else if (formatPxMap[p]) {
				obj[p] = v * 2 + 'px'
			}
		})
		var newO = {}
		var newObj = Object.keys(obj).sort()
		newObj.map(_ => {
			newO[_] = obj[_]
		})
		return newO
	},
	// 获取图片
	// 组件图片格式化
	getImg(content) {
		let type = content.type,
			fc   = window.curThemeColor[type]
		return fc? fc.img: content.img
	},
	// 组件图片格式化
	compImgFormat(props, content) {
		let { data, actions } = props
		let imgChange = 0
		let type = content.type
		if (!window.curThemeColor[type] && type !== 'custom') {
			content.type = type = 'custom'
		}
		content = type === 'custom'? content.img: window.curThemeColor[type].img
		return content
	},
	// 组件ID生成
	compIdCreate(comp, globalData, globalUpdate = true) {
		var { max } = globalData.data
		if (!max) return comp
		compIdCreateNode(comp, max)
		if (globalUpdate) {
			let t = setTimeout(() => {
				clearTimeout(t)
				Actions.updateGlobal(globalData)
			})
		}
		return comp
	},
	// 文本
	textByLanguage(data, language = {}) {
		let { default: defaultValue, list } = language
		if (!list) return console.log('缺少多语言信息!')
		let { indexs, values } = lang
		let { text, text2 } = data.data.content
		let idx = 0
		list.forEach(({ key }, i) => {
			if (defaultValue === key) idx = i
		})
		return idx? text2: text
	},

	// 删除状态组件 根据IDX
	removeCompByIdx(data, list) {
		let { data: _data, feature, name } = data,
			{ components }   = _data,
			{ status } = feature,
			cs = list.map(idx => components[idx])
		if (statusRemoveAuth[name]) {
			let { idx, list } = status,
				curStatus = list[idx]
			cs.forEach(comp => {
				let { name: _name, _id } = comp
				if (_name === 'tabByTabs') {
					feature.tabs = feature.tabs.filter(tb => tb._id != _id)
				} else {
					_data.components = curStatus.components = curStatus.components.filter(cp => _id != cp._id)
				}
			})
		} else {
			_data.components = components.removeByIdx(list)
		}
	},

	// 获取数据源 根据ID
	getTableById(id, { data }) {
		if (!id) return []
		return data[id] || []
	},
	// 获取数据源 根据ID
	getFieldById(id, { field }) {
		if (!id) return
		let fields = field.filter(_ => _.id === id)[0]
		if (!fields) return
		let { data } = fields,
			obj = {}
		data.forEach(_ => obj[_.key] = _.name)
		return obj
	},
	// 获取模板支持的最低版本
	getLowVersion(pages) {
		let version = { value: '30000000' }
		Object.values(pages).forEach(page => {
			page.elements.forEach(element => {
				getCompVersion(element, version)
			})
		})
		return version.value
	}
})

// 组件ID生成
function compIdCreateNode(comp, max) {
	let { data, feature } = comp,
		{ components, componentLayout } = data,
		{ status, tabs } = feature
	comp._id = ++max.id
	if (components && !status) {
		components.forEach(_ => {
			compIdCreateNode(_, max)
		})
	}
	if (componentLayout) {
		componentLayout.forEach(_ => {
			compIdCreateNode(_, max)
		})
	}
	if (status) {
		let list = Object.values(status.list)
		list.forEach(({ components = [] }) => {
			components.forEach(comp => {
				compIdCreateNode(comp, max)
			})
		})
	}
	if (tabs) {
		tabs.forEach(tab => {
			compIdCreateNode(tab, max)
		})
	}
}

// 获取组件版本
function getCompVersion(comp, version) {
	let { name, data, feature } = comp,
		{ components, componentLayout } = data,
		{ status, tabs } = feature

	let curVersion = compVersionMap[name]
	if (curVersion > version.value) version.value = curVersion
	if (components && !status) {
		components.forEach(_ => {
			getCompVersion(_, version)
		})
	}
	if (componentLayout) {
		componentLayout.forEach(_ => {
			getCompVersion(_, version)
		})
	}
	if (status) {
		let list = Object.values(status.list)
		list.forEach(({ components = [] }) => {
			components.forEach(comp => {
				getCompVersion(comp, version)
			})
		})
	}
	if (tabs) {
		tabs.forEach(tab => {
			getCompVersion(tab, version)
		})
	}
}
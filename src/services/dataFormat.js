import * as variable from 'var'
const comp  = require('state/comp')
const page  = require('state/page')
const { typeDefMap } = require('components/DbTable/config')
let compMap = variable.compMap.name
let typeMap  = {
	base:     1,
	advanced: 1
}
let pageMap = {
	feature:   1,
	animation: 1
}
let eleMap = {
	type:       1,
	data:       1,
	styleList:  1,
	feature:    1,
	layout:     1,
	auth:       1
}
let featureMap = {
	floors: 1,
	catgs:  1,
	list:   1,
	comp:   1,
	time:   1,
	active: 1
}

const dataFormat = {
	get: {
		// comp数据处理
		comp: {
			// 更新
			plus: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org)
				if (da === undefined || dType !== oType) {
					daParent[key] = org; return
				}
				
				switch(oType) {
					case 'Object':
						switch(key) {
							case 'router':
								break
							case 'feature':
								Object.keys(org).map(_ => {
									if (!featureMap[_]) {
										this.plus(da[_], org[_], _, da)
									}
								})
								break
							case 'styleList':
								let { idx } = da
								if (idx === undefined || !org.list[idx]) da.idx = org.idx || 0
								if (da.list) delete da.list
								break
							default:
								Object.keys(org).map(_ => {
									this.plus(da[_], org[_], _, da)
								})
						}
						break
					case 'Array':
						switch(key) {
							case 'components':
							case 'componentLayout':
								da.map((_, i) => {
									var dn = _.name,
										cd = deepCopy(comp[dn]),
										s1 = _.styleList
									s1.idx = s1.idx || 0 
									var i1 = s1.idx,
										l1 = s1.list,
										s2 = cd.styleList,
										i2 = s2.idx,
										l2 = s2.list
									s2.idx  = i1 || 0
									if (l2[i1]) cd.data = l2[i1].data
									this.plus(_, cd, i, da)
								})
								break
							case 'tabs':
							case 'media':
							case 'content': break
							default:
								//if(org.length == 0) return //如果默认数据没有的话返回
								da.map((_, i) => {
									this.plus(_, org[i] || org[0], i, da)
								})
						}
						break
					default:
				}
			},
			// 去旧
			slim: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org),
					kType = getAttr(key)
				if (org === undefined) {
					if (key === '_id') return
					delete daParent[key]; return
				}
				switch(dType) {
					case 'Object':
						switch(key) {
							case 'router':
								break
							case 'feature':
								Object.keys(da).map(_ => {
									if (!featureMap[_]) {
										this.slim(da[_], org[_], _, da)
									}
								})
								break
							case 'list':
								break
							default:
								Object.keys(da).map(_ => {
									this.slim(da[_], org[_], _, da)
								})
						}
						break
					case 'Array':
						switch(key) { 
							case 'components':
							case 'componentLayout':
								da.map((_, i) => {
									var dn = _.name,
										cd = deepCopy(comp[dn]),
										s1 = _.styleList
									s1.idx = s1.idx || 0
									var i1 = s1.idx,
										l1 = s1.list,
										s2 = cd.styleList,
										i2 = s2.idx,
										l2 = s2.list
									s2.idx  = i1 || 0
									if (l2[i1]) cd.data = l2[i1].data
									this.slim(_, cd, i, da)
								})
								break
							case 'media':
							case 'content': break
							default:
								//if(org.length == 0) return  //如果默认数据没有的话返回
								da.map((_, i) => {
									this.slim(_, org[i] || org[0], i, da)
								})
						}
						break
					default: 
				}
			}
		},
		// page数据处理
		page: {
			// 更新
			plus: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org)
				if (da === undefined || dType !== oType) {
					daParent[key] = org; return
				}
				switch(oType) {
					case 'Object':
						Object.keys(org).map(_ => {
							this.plus(da[_], org[_], _, da)
						})
						break
					default:
				}
			},
			// 去旧
			slim: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org)
				if (org === undefined) {
					delete daParent[key]; return
				}
				switch(dType) {
					case 'Object':
						Object.keys(org).map(_ => {
							this.slim(da[_], org[_], _, da)
						})
						break
					default:
				}
			}
		},
		// 组件数据对比
		compComp: function(da, org) {
			Object.keys(org).map(_ => {
				if (!eleMap[_]) return
				this.comp.plus(da[_], org[_], _, da)
			})
			Object.keys(da).map(_ => {
				if (!eleMap[_]) return
				this.comp.slim(da[_], org[_], _, da)
			})
		},
		// page数据比对
		pageComp: function(da, org) {
			Object.keys(org).map(_ => {
				if (!pageMap[_]) return// console.log(_)
				this.page.plus(da[_], org[_], _, da)
			})
			Object.keys(da).map(_ => {
				if (!pageMap[_]) return
				this.page.slim(da[_], org[_], _, da)
			})
		},
		pageEach: function(da) {
			// console.log(deepCopy(da['p_1003']))
			Object.keys(da).map(_ => {
				// if (_ !== 'p_1002') return
				var pa  = da[_],
					pae = pa.elements
				this.pageComp(pa, deepCopy(page))
				pae.map((p, i) => {
					if (!comp[p.name]) return
					var psi = p.styleList.idx || 0,
						c   = deepCopy(comp[p.name]),
						cs  = c.styleList,
						csl = cs.list,
						csi = cs.idx
					if (psi) {
						if (csl[psi]) {
							c.data = csl[psi].data
							cs.idx = psi
						} else {
							c.data = csl[0].data
							cs.idx = 0
						}
					}
					this.compComp(p, c)
				})
			})
			// console.log(da['p_1003'])
		}
	},
	save: {
	},
	sync: {
		// comp数据处理
		comp: {

		},
		// page数据处理
		page: {
			// 更新
			plus: function(nowData, orgData, key, parent, filterMap) {
				delete orgData.bottomNav
				delete orgData.topNav
				delete orgData.animation
				if (nowData !== undefined) return
				// console.log(`add ${key}.`)
				filterMap[key] = true
				parent[key] = orgData
			},
			// 去旧
			slim: function(nowData, orgData, key, parent) {
				if (orgData !== undefined) {
					delete nowData.bottomNav
					delete nowData.topNav
					delete nowData.animation
					return
				}
				// console.log(`delete ${key}.`)
				delete parent[key]
			}
		},
		elements: {
			// 更新
			plus: function() {
				
			},
			// 去旧
			slim: function() {

			}
		},
		pageFilter: function(nowData, orgData) {
			var filterMap = {}
			Object.keys(nowData).forEach(_ => {
				this.page.slim(nowData[_], orgData[_], _, nowData)
			})
			Object.keys(orgData).forEach(_ => {
				this.page.plus(nowData[_], orgData[_], _, nowData, filterMap)
			})
			return filterMap
		},
		elementsFilter: function(nowEles, orgEles) {
			var nowIds    = {},
				orgIds    = {},
				filterMap = {},
				addEles   = []
			nowEles.forEach(({ _id }) => {if (_id) nowIds[_id] = true})
			orgEles.forEach(({ _id }) => {if (_id) orgIds[_id] = true})

			nowEles.forEach(({ _id }) => {
				if (!_id || orgIds[_id]) return
				// console.log(`delete ${_id}.`)
				delete nowIds[_id]
			})

			nowEles = nowEles.filter(_ => {if (_._id) return nowIds[_._id]})
			orgEles.forEach(({ _id }) => {
				if (!_id || nowIds[_id]) return
				// console.log(`add ${_id}.`)
				filterMap[_id] = true
				nowIds[_id] = true
			})
			if (Object.keys(filterMap).length) {
				addEles = orgEles.filter(_ => filterMap[_._id])
				nowEles.push.apply(nowEles, addEles)
			}
			
			nowEles.forEach(_ => {if (_._id) nowIds[_._id] = _})
			orgEles.forEach(_ => {if (_._id) orgIds[_._id] = _})
			return {
				nowElementsMap: nowIds,
				orgElementsMap: orgIds,
				filterMap
			}
		},
		reduceAttr: function(now, org, key, nowParent, auth) {
			var type = getAttr(auth)
			if (now === undefined || org === undefined) return
			// console.log('key: ', key)
			switch(type) {
				case 'Object':
					var ntype = getAttr(now)
					if (key === 'content' && ntype == 'Array') break
					Object.keys(auth).forEach(k => {
						this.reduceAttr(now[k], org[k], k, now, auth[k])
					})
					break
				case 'Boolean':
					if (auth) break
					nowParent[key] = org
				default: break
			}
		},
		compComp: function(now, org) {
			if (now === undefined || org === undefined) return
			now.auth = org.auth
			var { auth, data, feature } = now,
				{ status, tabs } = feature,
				orgData = org.data
			Object.keys(auth).forEach(key => {
				var nowDa  = data[key],
					orgDa  = orgData[key],
					authDa = auth[key]
				this.reduceAttr(data, orgData, key, now, auth)
				data.layout = orgData.layout
			})
			var { components, componentLayout } = data,
				name
			if (components)      name = 'components'
			if (componentLayout) name = 'componentLayout'
			// Object.keys(now).forEach(key2 => {
			// 	if (key2 === 'name' && now[key2] === 'picture') {
			// 		debugger
			// 	}
			// })
			if (name) this.pageComp(data, orgData, name)
			if (status) now.feature.status = org.feature.status
			if (tabs)   now.feature.tabs = org.feature.tabs
			// console.log('now: ', now)
		},
		// 元素排序
		compSort: function(source, index) {
			let sequence = source.map(_ => _._id),
				newData  = []
			sequence.map(_id => {
				newData.push(index[_id])
			})
			return newData
		},
		pageComp: function(now, org, key) {
			var nowElements  = now[key],
				orgElements  = org[key],
				_nowElements

			// console.log(deepCopy(nowElements), deepCopy(orgElements))
			var filter = this.elementsFilter(nowElements, orgElements)
			var { nowElementsMap, orgElementsMap, filterMap } = filter
			// console.log('filter: ', filter)
			Object.keys(nowElementsMap).forEach(_id => {
				if (filterMap[_id]) {
					// console.log(nowElementsMap[_id].name, orgElementsMap[_id].name)
					return console.log(`忽略ID: ${_id}`)
				}
				this.compComp(nowElementsMap[_id], orgElementsMap[_id])
			})
			_nowElements = this.compSort(orgElements, nowElementsMap)
			now[key]     = _nowElements
		},
		pageEach: function(nowData, orgData) {
			var filterMap = this.pageFilter(nowData, orgData)
			Object.keys(nowData).forEach(name => {
				if (filterMap[name]) return console.log(`忽略PAGE_ID: ${name}`)
				var now = nowData[name],
					org = orgData[name]
				// console.log(name)
				now.title = org.title
				now.feature = org.feature
				this.pageComp(now, org, 'elements')
			})
			// console.log(nowData, orgData)
		},
		global: function(nowData, orgData) {
			var nowBanner  = nowData.banner,
				orgBanner  = orgData.banner,
				orgVoice   = orgData.voice,
				orgFeature = orgData.feature,
				nowDb      = nowData.data.db,
				orgDb      = orgData.data.db
			if (orgBanner) {
				if (!nowBanner) nowData.banner = orgData
				nowBanner.auth = orgBanner.auth
			}
			nowData.voice   = orgVoice
			nowData.feature = orgFeature
			if (orgDb && !nowDb) nowData.db = orgDb
			else this.dbComp(nowDb, orgDb)
		},
		dbComp: function(now, org) {
			let { data, field } = now
			let { data: orgData, field: orgField } = org,
				mergeData     = { ...deepCopy(orgData), ...deepCopy(data) },
				removeID      = {},		// 删除id
				compID        = [],		// 比较id
				orgFieldIndex = {},		// 原始字段数据索引
				nowFieldIndex = {}		// 当前字段数据索引
			
			// 查找删除的db
			Object.keys(mergeData).forEach(id => {
				if (!orgData[id]) removeID[id] = true
			})
			// 清除失效DB
			field = now.field = field.filter(({ id, title, key }) => {
				if (removeID[id]) {
					console.log('清除DB: ', id, title, key)
					delete data[id]
					return false
				}
				return true
			})

			// 查找新增的db
			orgField.forEach(_field => {
				let { id } = _field
				if (data[id]) {
					orgFieldIndex[id] = _field
					return compID.push(id)
				}
				data[id] = deepCopy(orgData[id])
				field.push(deepCopy(_field))
			})

			now.maxId = org.maxId

			if (!compID.length) return

			// 建立当前字段索引
			field.forEach(_field => {
				let { id } = _field
				nowFieldIndex[id] = _field
			})

			// DB内容比对
			compID.forEach(id => {
				let orgField = orgFieldIndex[id],
					orgFieldIdx = {}
				orgField.data.forEach(_ => orgFieldIdx[_.key] = _)
				this.dbCompCon(nowFieldIndex[id], data[id], orgField, orgData[id], orgFieldIdx)
			})
		},
		dbCompCon: function(nowField, nowData, orgField, orgData, orgFieldIndex) {
			let nowFieldList = nowField.data,
				orgFieldList = orgField.data,
				nowKeyIndex  = {},
				orgKeyIndex  = {},
				removeKey    = [],	// 需要删除的key
				typeKey      = [],	// 类型改变的key
				addKey       = [],	// 新增的key
				orgDataIndex = {},	// 来源数据索引
				mergeIndex
			nowField.maxId = orgField.maxId

			nowFieldList.forEach(_ => nowKeyIndex[_.key] = _)
			orgFieldList.forEach(_ => orgKeyIndex[_.key] = _)
			orgData.forEach(_ => orgDataIndex[_.id] = _)

			mergeIndex = { ...nowKeyIndex, ...orgKeyIndex }

			// 查找删除的key
			Object.keys(mergeIndex).forEach(key => {
				let nowItem = nowKeyIndex[key],
					orgItem = orgKeyIndex[key]

				// 相同的
				if (nowItem && orgItem) {
					let nowType = nowItem.type,
						orgType = orgItem.type
					if (nowType === orgType) return
					// 类型改变
					nowItem.type = orgType
					typeKey.push(key)
					return
				}
				// 需要删除
				if (nowItem) removeKey.push(key)
				// 需要新增
				if (orgItem) {
					nowKeyIndex[key] = orgItem
					addKey.push(key)
				}
			})

			// 删除 & 新增数据
			nowData.forEach(_ => {
				let { id } = _

				// 删除key
				removeKey.forEach(key => delete _[key])
				// 添加key
				addKey.forEach(key => {
					let field = orgFieldIndex[key]
					let org   = orgDataIndex[id]
					_[key] = org? org[key]: typeDefMap[field.type].def()
				})
				// 改变类型key
				typeKey.forEach(key => {
					let field = orgFieldIndex[key]
					let org   = orgDataIndex[id]
					_[key] = org? org[key]: typeDefMap[field.type].def()
				})
			})

			nowField.data = orgFieldList
		}
	}
}
module.exports = dataFormat
/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as actions from 'actions'
import { message }  from 'antd'
import curData from 'state/cur/curData'
import { Spin } from 'antd'
import './index.less'


class BusinessComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = { load: false }
	}

	timeInit() {
		let { actions } = this.props
		actions.updateTime()
	}
	getFloor() {
		return (resolve, reject) => {
			 let { mallMid } = window.uif.userInfo
			 Ajax.get(`/mcp-gateway/mall/getFloorList?mallId=${mallMid}`).then(res => {
			 	storeData.floorList = res.data.list
			 	return resolve('楼层数据')
			 }, err => {
				storeData.floorList = []
				return resolve('楼层数据')
			 })
		}
	}
	getCatg() {
		return (resolve, reject) => {
			 let { mallMid } = window.uif.userInfo
			 Ajax.get(`/mcp-gateway/mall/getShopCustomCategoryList?mallId=${mallMid}`).then(res => {
			 	storeData.catgList = res.data.list
			 	return resolve('业态数据')
			 }, err => {
				storeData.catgList = []
				return resolve('业态数据')
			 })
		} 
	}
	getWeather() {
		return resolve => {
			window.weather = {
				temp: '33℃',
				type: '晴',
				iconName: '07.png',
				humidity: null,
				direct: '西南风',
				power: '<3级',
				aqi: '108',
				aqiInfo: '轻度污染'
			}
			resolve('天气数据')
		}
	}
	checkUpdate(pageContent) {
		var isOld = false
		Object.values(pageContent).forEach(({ elements }) => {
			elements.forEach(({ _id }) => {
				if (isOld) return
				if (!_id) isOld = true
			})
		})
		if (isOld) tempCfg.updateStatus = 0
	}
	getConfig() {
		var { location, actions, editConfig } = this.props,
			{ globalData } = editConfig,
			{ query } = location,
			{ /*name,*/ templateId, /*templateThemeId,*/ caseType, composeType } = query,
			tid  = templateId,
			cid  = query.id,
			type = cid? 'case': 'template',
			id   = cid? cid: tid
		if (!cid && !tid) {
			message.error(`未选择模板!`)
			return resolve => resolve('未选择模板')
		}
        var api = `/mcp-gateway/${type}/get?${type}Id=${id}`
		if (type === 'template') api += '&phase=RELEASE'

		return (resolve, reject) => {
			Ajax.get(api).then(res => {
				var cfg = JSON.parse(res.data.config).configPC
				delete res.data.config
				var group  = cfg.pageList.group[0]
				if (group.name === '默认') group.name = '页面跳转'
				var cur    = group.pages[0]

				dataFormat.get.pageEach(cfg.pageContent)

				cfg.globalData.data = { ...globalData.data, ...cfg.globalData.data }
				cfg.globalData = { ...globalData, ...cfg.globalData }
				var newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router]
				}
				window.tempCfg = res.data
				if (type === 'template') {
					delete tempCfg.id
					tempCfg.caseType    = caseType    || ''
					tempCfg.templateId  = templateId  || ''
					tempCfg.composeType = composeType || ''
				}
				if (tempCfg.updateStatus) this.checkUpdate(cfg.pageContent)
				var CFG = { ...newCfg, ...cfg }
				return new Promise(res => res(CFG))
			}).then(config => {
				actions.updateConfig(config)
				resolve('模板数据')
			})
			.catch(e => reject(e))
		}
	}
	initData(cb) {
		var { actions } = this.props,
			stores = {},
			promise = new Promise((resolve, reject) => {
			let _res1 = ''
			Ajax.postLogin('/easy-roa/v1/user/getBsTop', {
				ryst: getCookie('RYST') || '123456',
				bsst: getCookie('BSST') || '123456',
				channel: '002'
			}).then(res1 => {
				_res1 = res1
				return Ajax.postLogin('/easy-roa/v1/user/getBsUser', {
					bsst: getCookie('BSST') || '123456',
					channel: '002'
				})
			}).then((res2) => {
				resolve([_res1.data, res2.data])
			}).catch(e => {
				reject(e)
			})
		})
		promise.then(res => {
			var da0 = res[0],
				da1 = res[1]
			stores.userInfo = da0.userInfo
			stores.list     = da0.systemList
			stores.auths    = da1.authorities
			stores.userInfo.mallMid = da1.userInfo.mallMid
			stores.userInfo.mallId  = da1.userInfo.mallId
			stores.userInfo.id      = da1.userInfo.id
			actions.updateUser(stores)
			window.uif = stores
			cb && cb()
		})
	}
	getUserInfo(cb) {
		this.initData(cb)
	}
	componentWillMount() {
		this.getUserInfo(() => {
			var { editConfig } = this.props
			var { globalData } = editConfig
			var arr = ['getConfig', 'getWeather', 'getFloor', 'getCatg']
			var promises = arr.map(key => new Promise(this[key](globalData)))
			Promise.all(promises).then(() => {
				this.setState({ load: true })
			})//.catch(e => {
			// 	console.log(e)
			// })
		})
		// window.onbeforeunload = e => {
		// 	e.returnValue = '确定离开当前页面吗, 离开的话会丢失未保存的数据哦?'
		// }
	}

	componentDidMount() {
		this.timeInit()
	}

	render() {
		window.envType = 'business'
		document.title = '作品编辑器'
		return this.state.load
		?
		<div className="pg-edit pg-edit-business">
			{ this.props.children }
		</div>
		:
		<Spin />
	}
}

BusinessComponent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BusinessComponent)

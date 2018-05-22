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
import curData from 'state/cur/curData'
import './index.less'


class OperateComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			load: false
		}
	}

	timeInit() {
		let { actions } = this.props
		actions.updateTime()
	}
	getWeather() {
		return (resolve, reject) => {
			// Ajax.post(`/easy-smart-service/member/pm25`, { area: '021' }).then(res => {
				window.weather = {
					temp: '33℃',
					type: '小雨',
					iconName: '07.png',
					humidity: null,
					direct: '西南风',
					power: '<3级',
					aqi: '108',
					aqiInfo: '轻度污染'
				}
				resolve('天气数据')
			// }).catch(e => reject(e))
		}
	}
	getConfig() {
		let { location, actions, editConfig } = this.props
		let { globalData } = editConfig
		let { query } = location
		let { templateType, composeType, adsFlag, name } = query
		let id = query.id
		return (resolve, reject) => {
			if (!id) {
				window.tempCfg = {
					name: name || '',
					templateType: templateType || 'MALL',
					composeType:  composeType  || 'PORTRAIT',
					adsFlag:      adsFlag      || 0,
				}
				return resolve('模板数据')
			}
			Ajax.get(`/mcp-gateway/template/get?templateId=${id}&phase=DEV`).then(res => {
				let cfg = JSON.parse(res.data.config).configPC
				delete res.data.config
				let cur = cfg.pageList.group[0].pages[0]
				let newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router]
				}
				window.tempCfg = res.data
				cfg.globalData = { ...cfg.globalData, ...{
					storeList:    globalData.storeList,
					catgs:        globalData.catgs,
					floors:       globalData.floors,
					storeDetails: globalData.storeDetails
				} }
				actions.updateConfig({ ...newCfg, ...cfg })
				resolve('模板数据')
			}).catch(e => reject(e))
		}
	}
	/* Mock 数据 */
	getFloor(globalData) {
		return (resolve, reject) => {
			globalData.floors = [
				{
					id:      '5a532b82130b38000b1884a7',
					name:    'B1',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    'L1',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    'L2',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    'L3',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    'L4',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				}
			]
			actions.updateGlobal(globalData)
			resolve('楼层')
		}
	}
	getCatg(globalData) {
		return (resolve, reject) => {
			globalData.catgs = [
				{
					id:      '5a532b82130b38000b1884a7',
					name:    '餐 饮',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    '服 饰',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    '亲 子',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    '娱 乐',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				},
				{
					id:      '5a532b82130b38000b1884a7',
					name:    '其他',
					picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
					sort:    1
				}
			]
			actions.updateGlobal(globalData)
			resolve('分类')
		}
	}
	getStoreList(globalData) {
		return (resolve, reject) => {
			globalData.storeList = {
				data: new Array(12).fill().map((_, i) => {
					return {
						id: i + 1,
						name:  '康帅傅',
						price: '698.99',
						floor: `L1=1${('00' + (i+1)).substr(-2)}`,
						no:    `1${('00' + (i+1)).substr(-2)}`,
						mall_id: '54f403eae4b002000cf63762',
						pic: 'http://rongyi.b0.upaiyun.com/commodity/text/201805191209037272.png'
					}
				}),
				page: 1,
				page_size: 12,
				total: 64,
				total_page: 1
			}
			actions.updateGlobal(globalData)
			resolve('店铺列表')
		}
	}
	getStoreDetails(globalData) {
		return (resolve, reject) => {
			globalData.storeDetails = {
				images: [
					{
						title: '促销图文',
						url:   'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png'
					},
					{
						title: '促销图文',
						url:   'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png'
					},
					{
						title: '促销图文',
						url:   'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png'
					},
					{
						title: '促销图文',
						url:   'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png'
					}
				],
				text: '优衣库/UNIQLO'
			}
			actions.updateGlobal(globalData)
			resolve('店铺详情')
		}
	}
	initData(cb) {
		let { actions } = this.props
		let stores = {}
		
		Ajax.postLogin('/easy-roa/v1/user/getRyUser', {
			ryst: getCookie('RYST') || '123456',
			bsst: getCookie('BSST') || '123456',
			channel: '002'
		}).then(res=>{
			var da0 = res.data;
			stores.userInfo = da0.userInfo;
			stores.auths    = da0.authorities
			actions.updateUser(stores);
			window.uif = stores;
			cb && cb()
		})
	}
	getUserInfo(cb) {
		if (ENV === 'dev'){
			Ajax.postLogin('/bsoms/user/ajaxLogin', {
				password: 'RYxyz123',
				userName: 'xcyh001',
				verifyCode: ''
			}).then(res => {
				this.initData(cb)
			})
		} else {
			this.initData(cb)
		}
	}
	componentWillMount() {
		//this.getUserInfo(() => {
			let { actions, editConfig } = this.props
			let { globalData } = editConfig
			let arr = ['getConfig', 'getWeather', 'getFloor', 'getCatg', 'getStoreList', 'getStoreDetails']
			let promises = arr.map(key => new Promise(this[key](globalData)))
			Promise.all(promises).then((o) => {
				this.setState({ load: true })
			})
		//})
	}

	componentDidMount() {
		this.timeInit()
	}

	render() {
		window.envType = 'operate'
		document.title = '模板编辑器'
		return this.state.load
		?
		(
			<div className="pg-edit">
				{ this.props.children }
			</div>
		)
		:
		(
			<div>loading</div>
		)
	}
}

OperateComponent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OperateComponent)

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
import * as actions from 'actions'
import curData from 'state/cur/curData'
import RouterRY from './router'
import { Spin } from 'antd'
import './index.less'

class ReviewTem extends React.Component {
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
		return (resolve) => {
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
	getConfig() {
		let { location, actions, editConfig } = this.props
		let { globalData } = editConfig
		let { query } = location
		let { id,type } = query,url
		if (type == 'template') url = `/mcp-gateway/template/get?templateId=${id}&phase=DEV`
		else url = `/mcp-gateway/case/get?caseId=${id}`
		return (resolve, reject) => {
			Ajax.get(url).then(res => {
				let cfg = JSON.parse(res.data.config).configPC
				delete res.data.config
				let cur = cfg.pageList.group[0].pages[0]
				dataFormat.get.pageEach(cfg.pageContent)
				// debugger
				let newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router]
				}
				window.tempCfg = res.data
				cfg.globalData = { ...globalData, ...cfg.globalData }
				actions.updateConfig({ ...newCfg, ...cfg })
				resolve('模板数据')
			}).catch(e => reject(e))
		}
	}
	componentWillMount() {
		let { editConfig } = this.props
		let { globalData } = editConfig
		let arr = ['getConfig', 'getWeather']
		let promises = arr.map(key => new Promise(this[key](globalData)))
		Promise.all(promises).then(() => {
			this.setState({ load: true })
		})
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
			<RouterRY editConfig={this.props.editConfig} actions={this.props.actions} />
		)
		:
		(
			<Spin />
		)
	}
}

ReviewTem.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReviewTem)

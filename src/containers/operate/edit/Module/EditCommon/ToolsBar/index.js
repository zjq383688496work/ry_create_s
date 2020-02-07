/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { message, Tooltip } from 'antd'
import Iconf from 'compEdit/EditCommon/Iconf'

import './index.less'

class ToolsBar extends React.Component {
	constructor(props) {
		super(props)
		var { editConfig } = this.props,
			{ curData, curPage } = editConfig,
			router = curData.router
		this.state = {
			max: 30,
			router,
			idx: 0,
			history: [deepCopy(curPage)]
		}
	}

	componentDidMount() {}

	componentDidUpdate() {
		var { editConfig } = this.props,
			{ curData, curPage } = editConfig,
			router = curData.router
		if (this.state.router !== router) {
			// 切换页面 初始化
			this.setState({
				router,
				idx: 0,
				history: [deepCopy(curPage)]
			})
		} else if (window.storeState.saveHistory) {
			// 允许保存历史
			// console.clear()
			// console.log('保存记录!')
			let { max, idx, history } = this.state
			if (idx) history.splice(0, idx)
			history.unshift(deepCopy(curPage))
			// 超出存储长度后删除最初项
			if (history.length > max) history.pop()
			this.setState({ idx: 0, history: history })
			// console.log(this.state.idx)
			// console.log(this.state.history)
			window.storeState.saveHistory = false
		}
	}
	componentWillUnmount() {}

	// 撤销
	handleRevoke = () => {
		let { idx, history } = this.state
		let len = history.length - 1
		if (idx >= len) return message.info(`无法撤销, 已经是最早的状态了!`)
		this.setState({ idx: ++idx })
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, deepCopy(history[idx]))
		message.success(`撤销成功!`)
	}
	// 恢复
	handleRecovery = () => {
		let { idx, history } = this.state
		if (!idx) return message.info(`无法恢复, 已经是最新的状态了!`)
		this.setState({ idx: --idx })
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, deepCopy(history[idx]))
		message.success(`恢复成功!`)
	}
	// 清空
	handleClear = () => {
		var { curData, curPage } = this.props.editConfig,
			{ router } = curData
		this.setState({
			router,
			idx: 0,
			history: [deepCopy(curPage)]
		})
	}
	// 选择语音助手
	selectVoice = e => {
		e.stopPropagation()
		let { actions, editConfig: { curData, globalData } } = this.props,
			{ voice }   = globalData,
			{ visible } = voice.feature
		voice.feature.visible = !visible
		actions.updateGlobal(globalData)
		if (visible) {
			actions.selectPage(curData.router)
		} else {
			// var dom = document.getElementById('voice-box')
			// dom && dom.click()
			actions.selectComp(voice)
		}
	}

	render() {
		let { data, voice } = this.props.editConfig.globalData
		let { idx, history } = this.state
		let len = history.length - 1
		// return ENV === 'dev'
			// ?
		return	(
			<div className={`tools-bar ${tempCfg.composeType == 'PORTRAIT' ? 'portrait' : 'landscape'}`}>
				<Tooltip placement="right" title={'撤销'}>
					<div id="btnRevoke" className={idx >= len? 's-disabled': ''} onClick={this.handleRevoke}><Iconf type="undo"/></div>
				</Tooltip>
				<Tooltip placement="right" title={'恢复'}>
					<div id="btnRecovery" className={!idx? 's-disabled': ''} onClick={this.handleRecovery}><Iconf type="redo"/></div>
				</Tooltip>
				{
					voice
					?
					<Tooltip placement="right" title={'语音助手'}>
						<div className={!voice.feature.visible? 's-gray': ''} onClick={this.selectVoice}><Iconf type="sound"/></div>
					</Tooltip>
					: null
				}
				<a id="btnClearHistory" onClick={this.handleClear} style={{ display: 'none' }}></a>
			</div>
			)
			// :
			// false
	}
}

ToolsBar.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToolsBar)
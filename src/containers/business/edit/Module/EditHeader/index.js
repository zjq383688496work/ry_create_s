/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import ReviewTemplate from 'compEdit/EditCommon/ReviewTemplate' 
const comp     = require('state/comp')
const compC    = require('state/compChild')
const compP    = require('state/compParent')
const compList = require('state/compList')

import * as actions from 'actions'

import { Icon, Input, message, Modal, Spin } from 'antd'
const { confirm } = Modal
 
class Header extends React.Component {
	constructor(props) {
		super(props)
		var { name, updateStatus } = tempCfg
		this.state = {
			name: name.substr(0,16) || '',
			loading: false,
			isInput:this.props.isClick,
			checkUpdate: updateStatus === 1,
			isUpdata: false,
		}
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillReceiveProps(props){
		if (props.isClick != this.props.isClick) this.setState({isInput:props.isClick})
	}
	selectTheme() {
		var { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}

	formatStyle(data) {
		var { style, layout } = data
		Object.keys(data.style).map(_ => style[_] = cssFormatByTerm(style[_]))
		data.layout = cssFormatByTerm(layout)
	}
	formatEle(obj) {
		var { type, data } = obj
		delete obj.auth
		if (type === 'base') {
			this.formatStyle(data)
		} else if (type === 'advanced') {
			data.layout = cssFormatByTerm(data.layout)
			data.components && data.components.map(_ => this.formatEle(_))
		} else if (type === 'layout') {
			this.formatStyle(data)
			data.componentLayout && data.componentLayout.map(_ => this.formatEle(_))
		}
	}
	formatPage(obj) {
		obj.elements.map(_ => this.formatEle(_))
	}
	bannerSlim(banner) {
		var b = deepCopy(banner),
			{ data } = b
		data.layout = cssFormatByTerm(data.layout)
		delete b.auth
		delete data.layout.position
		return b
	}
	// 预览模板
	review() {
		this.reviewModal.show()
	}
	// 数据更新
	checkDataConfig = () => {
		confirm({
			title:   '确认更新模板?',
			content: '检测到该作品引用的模板有样式更新, 是否同步已更新的数据到您的作品中?',
			onOk: () => this.dataUpdate(),
			onCancel()  {},
			okText:     '确认',
			cancelText: '取消'
		})
	}
	dataUpdate = () => {
		var { actions, location, editConfig }    = this.props,
			{ curData, pageContent, globalData } = editConfig,
			{ templateId } = location.query,
			{ homepage } = globalData.data,
			{ router } = curData
		this.getConfigByTemplateId(templateId, CFG => {
			editConfig.pageList = CFG.pageList
			dataFormat.sync.global(globalData, CFG.globalData)
			dataFormat.sync.pageEach(pageContent, CFG.pageContent)
			actions.updateConfig(editConfig)
			_timeout(() => {
				actions.selectPage(pageContent[router]? router: homepage)
				message.success('更新模板成功!')
				this.setState({ checkUpdate: false, isUpdata: true })
				this.clearHistory()
			})
		})
	}
	clearHistory() {
		var doc = document.querySelector('#btnClearHistory')
		doc.click()
	}
	getConfigByTemplateId(templateId, cb) {
		var api = `/mcp-gateway/template/get?templateId=${templateId}&phase=RELEASE`
		Ajax.get(api).then(({ data }) => {
			var { config } = data,
				cfg = JSON.parse(config).configPC
			cb && cb(cfg)
		})
	}
	saveData() {
		if(!this.state.name){
			return message.warning(`请输入作品名称！`,1)
		}
		let { editConfig, location } = this.props
		let { query } = location
		let { caseType, id, composeType, templateId, updateStatus } = tempCfg
		let cfg = deepCopy(editConfig)
		let newCon = deepCopy(cfg.pageContent)
		Object.keys(newCon).map(_ => this.formatPage(newCon[_]))
		let gd = cfg.globalData,cropWidth,cropHeight
		// 作品数据加入composeType
		if(composeType === 'LANDSCAPE'){
			gd.data.composeType = 'landscape'
			cropWidth = 960
			cropHeight = 540
		}else{
			gd.data.composeType = 'portrait'
			cropWidth = 540
			cropHeight = 960
		}
		cfg.globalData = {
			data:    gd.data,
			theme:   gd.theme,
			feature: gd.feature,
			// banner:  gd.banner
		}
		var terminalGlobalData = deepCopy(cfg.globalData)
		cfg.globalData.banner  = gd.banner
		terminalGlobalData.data.banner = this.bannerSlim(gd.banner)
		let config = {
			configPC: {
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			},
			configTerminal: {
				pageContent: newCon,
				pageList:    cfg.pageList,
				globalData:  terminalGlobalData
			}
		}
		let da = {
			config: JSON.stringify(config),
			coverImgUrl:  '',
			caseType: caseType,
			composeType:  composeType,
			name:         this.state.name,
			templateId:   templateId,
			templateThemeId:  0,
			mallId: uif.userInfo.mallMid
		}
		if (id) {
			da.id = id
			this.post_save(query,da,cropWidth,cropHeight)
		}else{
			Ajax.post(`/mcp-gateway/case/nameCheck`, {caseName:this.state.name,userId:uif.userInfo.id}).then(res => {
				if(res.data){
					this.post_save(query,da,cropWidth,cropHeight)
				}else{
					return message.warning(`作品名称已存在，请重新输入！`,1)
				}
			})	
		}
	}
	post_save(query, da, cropWidth, cropHeight) {
		this.setState({ loading: true })
		if (this.state.isUpdata) {
			Ajax.postJSON('/mcp-gateway/case/updateCaseSynTemplateChangeStatus', { caseId: tempCfg.id, synStatus: 1 })
		}
		Ajax.post(`/mcp-gateway/case/${query.id? 'update': 'save'}`, da).then(res => {
			if (!query.id) {
				tempCfg.id = res.data
				hashHistory.push(`/business/edit?id=${res.data}`)
			}
			Ajax.createCrop({
				url: `${window.location.origin}${window.location.pathname}#/view?id=${tempCfg.id}`,
				w: cropWidth,
				h: cropHeight,
				t: 1000
			}).then(cover => {
				Ajax.post(`/mcp-gateway/case/updateCoverImgUrl`, {
					caseId: tempCfg.id,
					coverImgUrl: cover.data
				}).then(() => {
					this.setState({ loading: false })
					message.success(`${query.id? '更新': '保存'}成功!`,1)
				}).catch(e => { this.setState({ loading: false }) })
			}).catch(e => { this.setState({ loading: false }) })
		}).catch(e => { this.setState({ loading: false }) })
	}
	closeWin() {
		window.location.href = 'about:blank'
		window.close()
	}
	saveCaseName(e){
		let name = e.target.value
		if(name.length > 16){
			name = name.substr(0,16)
		}
		this.setState({name:name})
	}
	changeInput(e){
		e.stopPropagation()
		this.props.clickFun(!this.state.isInput)
		this.setState({isInput:!this.state.isInput})
	}
	stopChange(e){
		e.stopPropagation()
	}
	render() {
		var { location } = this.props,
			{ query } = location,
			loading = this.state.loading? (<div className="spin-mask"><Spin /></div>): false
		return (
			<div className="pe-header pe-header-business e-flex">
				{ loading }
				<div className="peh-left">
					<div className="logo"></div>
				</div>

				<div className="peh-center"></div>

				<div className="peh-right">
					<section className="comp-list comp-list-b">
						{
							!query.id
							?
							<div className="cl-item cl-item-business" onClick={this.stopChange.bind(this)} >
								{
									this.state.isInput ? <Input placeholder="请输入作品名称" onChange={this.saveCaseName.bind(this)} defaultValue={this.state.name} value={this.state.name} /> : 
									<div>{this.state.name}</div>
								}
								<Icon type="edit" style={{fontSize:'30px'}} onClick={this.changeInput.bind(this)} />
							</div>
							: null
						}
						{
							this.state.checkUpdate
							?
							<div className="cl-item" onClick={this.checkDataConfig}>
								<div className="cl-item-icon">
									<img src={require(`images/icon/reload.png`)}/>
								</div>
								数据更新
							</div>
							: null
						}
						<div className="cl-item" onClick={this.review.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/reviewTem.png`)}/>
							</div>
							预览
						</div>
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/theme.png`)}/>
							</div>
							全局配置
						</div>
						<div className="cl-item" onClick={this.saveData.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/save.png`)}/>
							</div>
							保存
						</div>
						<div className="cl-item" onClick={this.closeWin}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/exit.png`)}/>
							</div>
							离开
						</div>
					</section>
				</div>
				<ReviewTemplate 
					ref={com => { this.reviewModal = com }} 
					editConfig={this.props.editConfig}
					actions={this.props.actions} />
			</div>
		)
	}
}


Header.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)

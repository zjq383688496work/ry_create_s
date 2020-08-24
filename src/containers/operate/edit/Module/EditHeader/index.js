import React from 'react'
import CommonQuestion from 'compEdit/EditCommon/CommonQuestion'
import ReviewTemplate from 'compEdit/EditCommon/ReviewTemplate'
import DbModel from 'components/DbModel'
import './index.less'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

const pageC    = require('state/page')
const comp     = require('state/comp')
const compC    = require('state/compChild')
const compP    = require('state/compParent')
const compList = require('state/compList')

import * as actions from 'actions'

import { Input, message, Spin } from 'antd'
import * as variable from 'var'
let compMap       = variable.compMap.name
let statusAddAuth = variable.statusAddAuth
 
class Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name:    tempCfg.name || '',
			loading: false
		}
	}
	componentWillMount()   {}
	componentDidMount()    {
		// this.db()
	}
	componentWillUnmount() {}

	addComp(item) {
		var { actions, editConfig } = this.props,
			{ curComp, curData, curPage, globalData } = editConfig,
			{ parentComp } = curData,
			{ key } = item
		if (!key) return
		if (curComp.type === 'advanced' || parentComp) {
			let compData = deepCopy(comp[key]),
				Comp     = parentComp || curComp,
				{ data, feature, name } = Comp,
				{ max, tabs, status } = feature,
				auth          = compC[name]
			if (compData.type != 'advanced' && auth[key]) {
				if (max != undefined) compData.feature.id = ++max
				delete compData.styleList.list

				compIdCreate(compData, globalData)

				if (statusAddAuth[curComp.name]) {				// 状态组件
					let { idx, list } = status,
						curStatus = list[idx]
					if (compData.name === 'tabByTabs') {
						if (name !== 'tabs') return message.info('该高级组件内不能添加该基础组件!', 1)
						tabs.push(compData)
					} else {
						curStatus.components.push(compData)
					}
				} else {									// 非状态组件
					Comp.data.components.push(compData)
					this.selectMulti(Comp.data.components.length - 1)
				}
				return actions.updateComp(null, Comp)
			} else {
				message.info('该高级组件内不能添加该基础组件!', 1)
			}
		} else {
			if (compP[key]) {
				this.selectMulti(curPage.elements.length)
				return actions.addComp(curData.router, key)
			}
			message.info('该组件内只能添加在高级组件中!', 1)
		} 
	}
	selectMulti(idx) {
		let { actions, editConfig } = this.props
		let { globalData, curData } = editConfig
		let { parentComp } = curData
		let { multiComp }  = globalData
		let { index, list, type } = multiComp
		var s = {}
		s[idx] = true
		multiComp.index = s
		multiComp.list  = [idx]
		if (parentComp) {
			multiComp.type = 'child'
		} else {
			multiComp.type = 'parent'
			delete multiComp.parentIdx
		}
		actions.updateGlobal(globalData)
	}
	// 数据库
	db = () => {
		let { dbModal } = this.refs
		dbModal && dbModal.show()
	}
	// 预览模板
	review() {
		let { reviewModal } = this.refs
		reviewModal && reviewModal.show()
	}
	// 常见问题
	question() {
		this.questionModal.show()
	}
	voiceInit(voice) {
		if (!voice) return
		let { data, feature } = voice,
			{ status } = feature
		if (!feature.visible) feature.visible = true
		if (status.idx == 1) return
		status.idx = 1
		data.components = status.list[1].components
	}
	selectTheme() {
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}
	saveData = () => {
		this.setState({ loading: true })
		let { actions, editConfig, location } = this.props
		let { query } = location
		let { templateType, id, composeType, adsFlag, bannerAds } = tempCfg
		let cfg = deepCopy(editConfig), cropWidth, cropHeight

		let gd = cfg.globalData
		// 模板数据加入composeType
		if (composeType === 'LANDSCAPE') {
			gd.data.composeType = 'landscape'
			cropWidth  = 960
			cropHeight = 540
		} else {
			gd.data.composeType = 'portrait'
			cropWidth  = 540
			cropHeight = 960
		}

		if (gd.data.language) gd.data.language.default = 1

		this.voiceInit(gd.voice)

		cfg.globalData = {
			data:    gd.data,
			theme:   gd.theme,
			feature: gd.feature,
			banner:  gd.banner,
			voice:   gd.voice,
		}
		let config = {
			configPC: {
				// pageContent: dataFormat.save.pageEach(cfg.pageContent),
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			}
		}
		let da = {
			adsFlag: adsFlag || 0,
			config: JSON.stringify(config),
			coverImgUrl:  '',
			templateType: templateType,
			composeType:  composeType,
			name:         this.state.name,
			bannerAds:    bannerAds || 0,
			appVersion:   getLowVersion(cfg.pageContent),
		}
		this.setState({ loading: true })
		if (id) da.id = id
		Ajax.post(`/mcp-gateway/template/${query.id? 'update': 'save'}?`, da).then(res => {
			if (!query.id) {
				tempCfg.id = res.data
				hashHistory.push(`/operate/edit?id=${res.data}`)
			}
			Ajax.createCrop({
				url: `${window.location.origin}${window.location.pathname}#/view?id=${tempCfg.id}&s=template`,
				w: cropWidth,
				h: cropHeight,
				t: 1000
			}).then(cover => {
				Ajax.post(`/mcp-gateway/template/updateCoverImgUrl`, {
					templateId: tempCfg.id,
					coverImgUrl: cover.data
				}).then(() => {
					this.setState({ loading: false })
					message.success(`${query.id? '更新': '保存'}成功!`)
				}).catch(e => { this.setState({ loading: false }) })
			}).catch(e => { this.setState({ loading: false }) })
		}).catch(e => { this.setState({ loading: false }) })
		// console.log(JSON.stringify(config))
	}
	tNameChange(name) {
		this.setState({ name })
		tempCfg.name = name
	}
	closeWin() {
		window.location.href = 'about:blank'
		window.close()
	}
	render() {
		let { editConfig } = this.props,
			{ data } = editConfig.globalData
		let { loading } = this.state
		let loadingDom = loading? <div className="spin-mask"><Spin /></div>: false
		let compListNode = compList.map((_, i) => {
			let { icon, child, name } = _
			return (
				<dl key={i} className={`cl-item${child? ' cl-item-child': ''}`}>
					<dt onClick={this.addComp.bind(this, _)}>
						<div className="cl-item-icon">
							<img src={require(`images/icon/${icon}.png`)}/>
						</div>
						{name}
						{ /*child && (<s className="icon-arrow-down"></s>)*/ }
					</dt>
					{
						child && (
						<dd>
							{
								child && child.map((__, j) => {
									return (
										<div key={j} onClick={this.addComp.bind(this, __)}>
											{__.name}
										</div>
									)
								})
							}
						</dd>
						)
					}
				</dl>
			)
		})
		return (
			<div className="pe-header e-flex">
				{ loadingDom }
				<div className="peh-left">
					<div className="logo"></div>
				</div>

				<div className="peh-center">
					<section className="comp-list">
						{ compListNode }
					</section>
				</div>

				<div className="peh-right">
					<section className="comp-list comp-list-b">
						{/*<div className="cl-item" onClick={this.question.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/theme.png`)}/>
							</div>
							常见问题
						</div>*/}
						<div className="cl-item" onClick={this.db}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/config.png`)}/>
							</div>
							数据库
						</div>
						<div className="cl-item" onClick={this.review.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/preview.png`)}/>
							</div>
							预览
						</div>
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/config.png`)}/>
							</div>
							全局配置
						</div>
						<div className="cl-item" onClick={this.saveData}>
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
				<CommonQuestion ref={com => { this.questionModal = com }} />
				<ReviewTemplate 
					ref="reviewModal"
					editConfig={editConfig}
					actions={this.props.actions}
				/>
				<DbModel ref="dbModal" db={data.db} />
			</div>
		)
	}
}


Header.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)

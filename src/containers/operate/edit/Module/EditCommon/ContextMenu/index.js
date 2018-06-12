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

import { Icon, message } from 'antd'

import './index.less'
import * as variable from 'var'
var compMap  = variable.compMap.name

class ContextMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = { visible: false }
	}

	componentWillMount() {}

	componentDidMount() {
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.pg-center'}`)
		doc.addEventListener('contextmenu', this._handleContextMenu)
		doc.addEventListener('click', this._handleClick)
		doc.addEventListener('scroll', this._handleScroll)
	}
	componentWillUnmount() {
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.pg-center'}`)
		doc.removeEventListener('contextmenu', this._handleContextMenu)
		doc.removeEventListener('click', this._handleClick)
		doc.removeEventListener('scroll', this._handleScroll)
	}
	_handleContextMenu = (e) => {
		e.preventDefault()
		this.setState({ visible: true })

		const clickX  = e.clientX
		const clickY  = e.clientY
		const screenW = window.innerWidth
		const screenH = window.innerHeight
		const rootW   = this.root.offsetWidth
		const rootH   = this.root.offsetHeight

		const right  = (screenW - clickX) > rootW
		const left   = !right
		const top    = (screenH - clickY) > rootH
		const bottom = !top
		if (right)  this.root.style.left = `${clickX + 5}px`
		if (left)   this.root.style.left = `${clickX - rootW - 5}px`
		if (top)    this.root.style.top  = `${clickY + 5}px`
		if (bottom) this.root.style.top  = `${clickY - rootH - 5}px`
	}
	_handleClick = (e) => {
		setTimeout(() => {
			const { visible } = this.state
			const wasOutside  = !(e.target.contains === this.root)
			if (wasOutside && visible) this.setState({ visible: false })
		})
	}
	_handleScroll = () => {
		const { visible } = this.state
		if (visible) this.setState({ visible: false })
	}

	copyComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData, curComp, globalData } = editConfig
		let { parentComp } = curData
		let { copyComp } = globalData
		let par = parentComp? parentComp: curComp

		message.success(`复制组件: ${compMap[par.name]}!`)
		actions.updateCopyComp(deepCopy(par))
	}

	pasteComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curPage, globalData } = editConfig
		let { copyComp } = globalData
		curPage.elements.push(deepCopy(copyComp))
		message.success(`粘贴组件: ${compMap[copyComp.name]}!`)
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, curPage)
	}

	removeComp = (e) => {
		e.stopPropagation()
		// let { actions, editConfig }  = this.props
		// let { curData, curComp } = editConfig
		// message.success(`删除组件: ${compMap[curComp.name]}!`)
		// actions.deleteComp(curData.compIdx)
		let { actions, editConfig }  = this.props
		let { curData, curComp } = editConfig
		let { parentComp, compIdx, cusCompIdx } = curData
		let par = parentComp? parentComp: curComp
		if (!par.name) return message.success(`组件未选中!`)
		if (parentComp) {
			editConfig.curComp = {}
			curData.cusCompIdx = -1
			curData.parentComp = null
			let comp = parentComp.data.components
			comp.splice(cusCompIdx, 1)
			message.success(`删除组件: ${compMap[parentComp.name]} - ${compMap[curComp.name]}!`)
			actions.updateComp(compIdx, parentComp)
			actions.updateCur(curData)
			actions.selectComp(parentComp)
		} else {
			message.success(`删除组件: ${compMap[curComp.name]}!`)
			actions.deleteComp(curData.compIdx)
		}
	}

	render() {
		const { visible } = this.state

		let { actions, editConfig } = this.props
		let { curData, curComp, globalData } = editConfig
		let { parentComp } = curData
		let { copyComp } = globalData
		let par = parentComp? parentComp: curComp
		// console.log(par.name)
		// console.log(copyComp)

		return (visible || null) && 
			<div ref={ref => {this.root = ref}} className="context-menu">
				<div className={`cm-li${parentComp || par.name === undefined? ' s-disabled': ''}`} onClick={this.copyComp}>
					<Icon type="copy" /> 复制
				</div>
				<div className={`cm-li${!copyComp? ' s-disabled': ''}`} onClick={this.pasteComp}>
					<Icon type="file-text" /> 粘贴
				</div>
				<div className={`cm-li${par.name === undefined? ' s-disabled': ''}`} onClick={this.removeComp}>
					<Icon type="delete" /> 删除
				</div>
			</div>
	}
}

ContextMenu.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContextMenu)
/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import * as actions from 'actions'

import { Icon, message } from 'antd'
import * as variable from 'var'
var compMap  = variable.compMap.name,
	compNum  = variable.compMap.num
 
class EditChildCompLayout extends React.Component {
	state = {
		check: true
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	removeComp(e, idx) {
		e.stopPropagation()
		let { actions, data, editConfig } = this.props,
			{ curData } = editConfig,
			{ components } = data.data,
			curComp = components[idx]
		message.success(`删除组件: ${compMap[components[idx].name]}!`)
		if (curComp.name === 'tabByTabs') {
			let { feature } = data,
				{ tabs }    = feature
			feature.tabs = tabs.filter(({ _id }) => _id !== curComp._id)
		}
		components.splice(idx, 1)
		editConfig.curComp = {}
		curData.cusCompIdx = -1
		actions.updateComp(editConfig.curData.compIdx, data)
		actions.updateCur(curData)
		actions.selectComp(data)
	}

	selectComp(e, idx) {
		e.stopPropagation()
		let { data, actions, editConfig } = this.props,
			{ data: _data, type, name } = data,
			{ curData } = editConfig,
			{ cusCompIdx, contentType } = curData,
			{ components } = _data
		if (cusCompIdx === idx && contentType === 'comp') return
		if (type === 'advanced') curData.parentComp = data
		if (name === 'voice') curData.compIdx = undefined
		curData.cusCompIdx = idx
		actions.updateCur(curData)
		actions.selectComp(components[idx])
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
		multiComp.type = 'parent'
		delete multiComp.parentIdx
		actions.updateGlobal(globalData)
		// console.log(JSON.stringify(multiComp.list))
	}
	onSortEnd = (o, e) => {
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		let { components } = data.data
		let eles = deepCopy(components).reverse()
		let len  = eles.length - 1
		let old  = o.oldIndex
		let next = o.newIndex
		let item = eles[old]
		if (old === next) {
			this.selectComp(e, len - next)
			this.selectMulti(len - next)
			return
		}
		data.data.components = arrayMove(eles, old, next).reverse()
		this.selectComp(e, len - next)
	}
	barHide = e => {
		this.setState({ check: false })
	}
	barShow = e => {
		this.setState({ check: true })
	}
	render() {
		let { data, editConfig } = this.props,
			{ curData, globalData } = editConfig,
			{ voice } = globalData,
			{ parentComp } = curData,
			{ name, type, data: _data } = data
		if (!name || type !== 'advanced') return false
		let eles = _data.components
		if (!eles) return false
		let { check } = this.state
		let parentName = compMap[name]
		eles = deepCopy(eles)
		let len = eles.length - 1
		eles.reverse()
		let ctrlNode = eles.map((_, i) => (
			<li key={i} className={`pecc-li`}>
				<a onClick={e => this.removeComp(e, len - i)}><Icon type="delete"/></a>
			</li>
		))
		let SortableItem = SortableElement(({ _: { _id, name }, i, l }) => {
				return (
					<li className={`pecl-li${(l - i) === editConfig.curData.cusCompIdx? ' s-active': ''}`}>
						<div className="pl-name">{ compMap[name] }</div>
						<div className="pl-ctrl">
							<a><Icon type="delete"/></a>
						</div>
					</li>
				)
			}
		)
		const SortableList = SortableContainer(({ eles }) => {
			return (
				<ul>
					{ eles.map((_, i) => (<SortableItem key={i} index={i} l={len} i={i} _={_} />)) }
				</ul>
			)
		})
		return (
			<div className={`pe-comp-layout pe-comp-layout-fixed${check? ' pe-comp-layout-open': ''}`}>
				<div className="pecl-title">{parentName || name}</div>
				<a className="bar-open" onClick={this.barShow} title="展开图层列表"><Icon type="menu-unfold" /></a>
				<a className="bar-close" onClick={this.barHide} title="关闭图层列表"><Icon type="menu-fold" /></a>
				<div className="pecl-list">
					<SortableList
						eles={eles}
						onSortEnd={this.onSortEnd}
					/>
					<ul className="pecl-ctrl">{ ctrlNode }</ul>
				</div>
			</div>
		)
	}
}


EditChildCompLayout.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditChildCompLayout)

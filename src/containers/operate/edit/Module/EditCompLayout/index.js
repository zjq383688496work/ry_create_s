import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import * as actions from 'actions'

import { Icon, message } from 'antd'
import * as variable from 'var'
var compMap  = variable.compMap.name,
	compNum  = variable.compMap.num
 
class EditCompLayout extends React.Component {
	state = {
		check: true
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	removeComp(e, idx) {
		e.stopPropagation()
		let { actions, data } = this.props
		message.success(`删除组件: ${compMap[data.elements[idx].name]}!`)
		actions.deleteComp(idx)
	}

	copyComp(e, item) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData, curComp, curPage, globalData } = editConfig
		let { parentComp } = curData
		let { copyComp, multiComp } = globalData
		let { parentIdx, list, type } = multiComp
		let cComp = { list: [item] }
		if (parentComp) cComp.name = parentComp.name
		message.success(`复制组件!`)
		actions.updateCopyComp(deepCopy(cComp))
		// message.success(`复制组件: ${compMap[item.name]}!`)
	}

	selectComp(e, data, idx) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		let { compIdx, cusCompIdx, contentType } = curData
		if (compIdx === idx && cusCompIdx < 0 && contentType === 'comp') return
		curData.compIdx    = idx
		curData.parentComp = null
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}

	selectMulti(idx) {
		let { actions, editConfig } = this.props
		let { globalData, curData } = editConfig
		let { parentComp } = curData
		let { multiComp }  = globalData
		let { index, list, type } = multiComp
		
		var s  = {}
		s[idx] = true
		multiComp.index = s
		multiComp.list  = [idx]
		multiComp.type  = 'parent'
		delete multiComp.parentIdx
		actions.updateGlobal(globalData)
		console.log(JSON.stringify(multiComp.list))
	}
	onSortEnd = (o, e) => {
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		let eles = deepCopy(data.elements)
		let old  = o.oldIndex
		let next = o.newIndex
		let item = eles[old]
		if (old === next) {
			this.selectComp(e, item, next)
			this.selectMulti(next)
			return
		}
		data.elements = arrayMove(eles, old, next)

		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
		this.selectComp(e, item, next)
	}
	barHide = e => {
		this.setState({ check: false })
	}
	barShow = e => {
		this.setState({ check: true })
	}
	render() {
		let { data, editConfig } = this.props,
			{ curComp, curData, globalData } = editConfig,
			{ voice } = globalData,
			{ parentComp } = curData,
			{ name } = curComp
		let { check } = this.state
		let map  = deepCopy(compNum)
		let eles = data.elements
		if (!eles) return false
		eles = deepCopy(eles)
		let names = new Array(eles.length).fill().map((_, i) => {
			let name = eles[i].name,
				cn   = compMap[name]
			++map[name]
			return cn + map[name]
		})
		let ctrlNode = eles.map((_, i) => (
			<li key={i} className={`pecc-li`}>
				<a onClick={e => this.copyComp(e, _)}><Icon type="copy"/></a>
				<a onClick={e => this.removeComp(e, i)}><Icon type="delete"/></a>
			</li>
		))
		let SortableItem = SortableElement(({ _: { _id, name }, i }) => {
				return (
					<li className={`pecl-li${i === editConfig.curData.compIdx? ' s-active': ''}`}>
						<div className="pl-name">{ names[i] } - { _id || name }</div>
						<div className="pl-ctrl">
							<a><Icon type="copy"/></a>
							<a><Icon type="delete"/></a>
						</div>
					</li>
				)
			}
		)
		const SortableList = SortableContainer(({ eles }) => {
			return (
				<ul>
					{ eles.map((_, i) => <SortableItem key={i} index={i} i={i} _={_} />) }
				</ul>
			)
		})
		return (
			<div className={`pe-comp-layout${check? ' pe-comp-layout-open': ''}`}>
				<div className="pecl-title">图层列表</div>
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


EditCompLayout.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCompLayout)

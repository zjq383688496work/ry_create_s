import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'
import * as Server from 'server'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class StoreList2 extends React.Component {
	constructor(props) {
		super(props)
		let { feature } = props.data
		let ipt = deepCopy(feature)
		this.state = { ioInput: ipt }
	}
	componentWillMount() {
		this.getData()
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	componentWillReceiveProps() {
		this.getData()
	}

	ioOuter = ipt => {
		console.clear()
	}

	getData = e => {
		var ipt = this.state.ioInput,
			{ data } = this.props.data,
			{ content, components } = data,
			size = ipt.body.size = content.size

		let visible = this.getVisible(components)

		Server.store.getCategoryList(({ floor, catg, catgSec, build }) => {
			Server.store.getDetails(item => {
				Object.assign(ipt, { build, catg, catgSec, floor, item, visible })
				this.setState({ ioInput: ipt })
			})
		})
	}

	// 查找可见按钮
	getVisible(components) {
		let comps   = []
		let visible = {}
		let ids     = {}
		components.forEach(comp => {
			let { _id, name } = comp
			ids[_id] = true
			if (name != 'visibleByStore2') return
			comps.push(comp)
		})
		if (!comps.length) return visible
		comps.forEach(comp => {
			let { compChildBind } = comp.data.content
			Object.keys(compChildBind).forEach(id => {
				if (!ids[id]) delete compChildBind[id]
				let val = compChildBind[id]
				if (!visible[id]) visible[id] = []
				visible[id].push(comp)
			})
		})
		return visible
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

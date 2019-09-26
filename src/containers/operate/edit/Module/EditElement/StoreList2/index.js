/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

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
			{ content } = data,
			size = ipt.body.size = content.size

		Server.store.getCategoryList(({ floor, catg, build }) => {
			Server.store.getDetails(item => {
				Object.assign(ipt, { build, catg, floor, item })
				this.setState({ ioInput: ipt })
			})
		})
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

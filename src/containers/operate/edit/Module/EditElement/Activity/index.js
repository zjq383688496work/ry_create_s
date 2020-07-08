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

export default class WonderfulActivity2 extends React.Component {
	constructor(props) {
		super(props)
		// console.log("新精彩活动："+JSON.stringify(props));

		let ioInput = {
			list: [],
			idx:  0,
			item: null,
		}
		this.state = {
			ioInput
		}
	}
	componentWillMount() {
		this.getData()
	}
	componentDidMount() {}
	componentWillUnmount() {}
	// componentWillReceiveProps() {
	// 	this.getData()
	// }

	ioOuter = ipt => {
	}

	getData = e => {
		let { ioInput } = this.state
		Server.store.getActivityList(6, list => {
			ioInput.list = list
			ioInput.item = list[0]
			this.setState({ ioInput })
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

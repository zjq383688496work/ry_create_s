import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

class DateWeather extends React.Component {
	constructor(props) {
		super(props)
	}
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	ioOuter(ipt) {
		// let { data, actions, idx, csn } = this.props
	}

	init() {
		let { data } = this.props
		let { feature } = data
		this.state = {
			ioInput: feature
		}
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		this.init.bind(this)()
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

export default DateWeather

import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

class StoreDetails extends React.Component {
	constructor(props) {
		super(props)
	}
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	ioOuter(ipt) {
		
	}
	
	init() {
		this.state = {
			ioInput: this.props.data.feature
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
 
export default StoreDetails

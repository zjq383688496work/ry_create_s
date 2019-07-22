/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'

import Custom from '../Custom'

class StoreInstro extends React.Component {
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
		this.init.bind(this)();
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/> 
		)
	}
} 
 
export default StoreInstro

import React from 'react'
import './index.less'

export default class Area extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { show = true } = this.props
		return show
		?
		<div className="e-area" style={cssColorFormat(this.props, 'filterBox')}></div>
		: null
	}
}

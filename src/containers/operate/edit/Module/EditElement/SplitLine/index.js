import React from 'react'
import './index.less'

class SplitLine extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { data, type } = this.props
		return (
			<div className={`e-splitline ${type}`} style={cssColorFormat(this.props, 'line')}></div> 
		)
	}
}

export default SplitLine

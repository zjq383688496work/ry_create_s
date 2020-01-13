import React from 'react'
import './index.less'

export default class Button extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { type, data } = this.props
		let style = cssColorFormat(this.props, 'text')
		return (
			<div className='e_button' style={style}>
				{data.data.content.text}
			</div>
		)
	}
}
import React from 'react'
// import './index.less'

export default class ButtonAuto extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { type, data } = this.props
		let style = cssColorFormat(this.props, 'text')
		return (
			<div className='e_button e_button_auto' style={style}>
				{ data.data.content.text }
			</div>
		)
	}
}
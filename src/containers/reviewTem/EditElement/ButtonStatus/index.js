import React from 'react'
// import './index.less'

export default class ButtonStatus extends React.Component {
	toStatus() {
		let { data, ioOuter } = this.props,
			{ status } = data.data.content
		ioOuter({ status })
	}
	render() {
		let { data } = this.props,
			style = cssColorFormat(this.props, 'text')
		return (
			<div className='e_button e_button_status' style={style} onClick={this.toStatus.bind(this)}>
				{ data.data.content.text }
			</div>
		)
	}
}
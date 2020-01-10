import React from 'react'
import './index.less'

export default class Audio extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { data } = this.props
		let audio = data.data.content.audio
		return (
			<div className="e-audio" id="e-audio" style={cssColorFormat(this.props, 'audio')}>
				audio
			</div>
		)
	}
}

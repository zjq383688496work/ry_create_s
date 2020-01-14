import React from 'react'
import './index.less'

export default class Audio extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { props } = this
		return (
			<div className="e-audio" style={cssColorFormat(props, 'audio')}></div>
		)
	}
}

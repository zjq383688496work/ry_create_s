import React from 'react'
// import './index.less'

export default class EventTrigger extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { type, data, language } = this.props
		let style = cssColorFormat(this.props, 'text')
		let text  = textByLanguage(data, language)
		return (
			<div className='e_event' style={style}>
				{ text }
			</div>
		)
	}
}
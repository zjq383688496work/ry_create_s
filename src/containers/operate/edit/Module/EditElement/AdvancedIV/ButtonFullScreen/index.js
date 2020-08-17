import React from 'react'
// import './index.less'

export default class ButtonFullScreen extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { type, data, language } = this.props
		let style = cssColorFormat(this.props, 'text')
		let { event } = data.data.content
		let text  = textByLanguage(data, language)
		return (
			<div className='e_button e_button_fullscreen' style={style}>
				{ text }
			</div>
		)
	}
}
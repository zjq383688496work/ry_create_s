import React from 'react'
// import './index.less'

export default class ButtonAuto extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { type, data, language } = this.props
		let style = cssColorFormat(this.props, 'text')
		let { defer } = data.data.content
		let text  = textByLanguage(data, language)
		text = text.replace(/(\{\{(.*?)\}\})/g, (m, l, key) => {
			key = key.replace(/\s+/g, '')
			return ({ second: defer })[key] || ''
		})
		return (
			<div className='e_button e_button_auto' style={style}>
				{ text }
			</div>
		)
	}
}
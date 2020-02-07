import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

// import './index.less'
class ButtonLanguage extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	getIndex = () => {
		let { default: defaultValue, list } = this.props.editConfig.globalData.data.language, idx
		list.forEach(({ key }, i) => {
			if (key === defaultValue) idx = i
		})
		return idx
	}
	getStyle = idx => {
		if (idx === 0) return cssColorFormat(this.props, 'language')
		if (idx === 1) return cssColorFormat(this.props, 'language2')
	}
	getText = idx => {
		let { text, text2 } = this.props.data.data.content
		if (text  && idx === 0) return text
		if (text2 && idx === 1) return text2
		return ''
	}
	render() {
		let idx   = this.getIndex(),
			style = this.getStyle(idx),
			text  = this.getText(idx)
		return (
			<div className='e_button e_button_language' style={style}>
				{text}
			</div>
		)
	}
}

ButtonLanguage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ButtonLanguage)

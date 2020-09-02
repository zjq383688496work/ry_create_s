import React from 'react'
import './index.less'

const typeMap = {
	String: 1,
	Number: 1
}

export default class TextBind extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item = {} } = ipt,
			{ text, bind } = data.data.content,
			str  = bind? item[bind] || '文字': '',
			type = getAttr(str),
			dom

		if ((!bind && !text) || !item) return null
		if (bind) {
			if (bind === 'categories' && str && type === 'Array') {
				let text1 = str[0]
				str = text1 && getAttr(text1) === 'Object'? text1.name: ''
			} else if (!typeMap[type]) str = ''
		}

		if (text) str = text.substitute(item)

		if (!str) return null
		if (bind !== 'recommendReason') {
			dom = (
				<div
					style={cssColorFormat(this.props, 'text')}
					dangerouslySetInnerHTML={{__html: textBreak(str)}}
				></div>
			)
		} else {
			dom = (
				<span
					style={cssColorFormat(this.props, 'text')}
					dangerouslySetInnerHTML={{__html: textBreak(str)}}
				></span>
			)
		}
		return (
			<div className={`e-text`}>
				{ dom }
			</div>
		)
	}
}

import React from 'react'
import './index.less'

const imgRP = /https?\:\/\/.*?/

export default class QrcodeBind extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind, text = '' } = data.data.content,
			img = bind? item[bind] || '': ''
		img = getAttr(img) === 'String'? img: getAttr(img) === 'Array'? img[0] || '': compImgFormat(this.props, img)
		if (!imgRP.test(img)) img = ''
		return envType === 'business' && !img
			?
			false
			:
			(
				<div className="e-qrcode-bind">
					<img className="eq-img" src={img} style={cssColorFormat(this.props, 'image')} />
					<div className="eq-text" style={cssColorFormat(this.props, 'text')}>{text}</div>
				</div>
			)
	}
}

import React from 'react'
import './index.less'

const typeMap = {
	String: 1,
	Array: 1,
	Object: 1
}

export default class PictureBind extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind } = data.data.content,
			img = bind? item[bind] || '': '',
			t = getAttr(img)
		if (!typeMap[t]) img += ''
		else if (t === 'String') img = img
		else if (t === 'Array')  img = img[0] || []
		else img = compImgFormat(this.props, img)
		return envType === 'business' && !img
			?
			false
			:
			(
				<div className="e-picture-bind" style={cssColorFormat(this.props, 'image')}>
					<img src={img} />
				</div>
			)
	}
}

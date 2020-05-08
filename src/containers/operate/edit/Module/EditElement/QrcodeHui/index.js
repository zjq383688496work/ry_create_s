import React from 'react'
import './index.less'

export default class QrcodeHui extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		return (
			<div className="e-qrcode" style={cssColorFormat(this.props, 'image')}>
				<img src="http://rongyi.b0.rongyi.com/commodity/text/201808271756227480.png" />
			</div>
		)
	}
}

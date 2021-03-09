import React from 'react'
import './index.less'

import * as utils from '../utils'

class PictureByStore2 extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		if (!utils.isRander.bind(this)()) return false
		let { data } = this.props
		let img = data.data.content.img
		return envType === 'business' && !img.img
			?
			false
			:
			(
			<div className="e-picture-by-store2" style={cssColorFormat(this.props, 'image')}>
				<img src={compImgFormat(this.props, img)} />
			</div>
			)
	}
}

export default PictureByStore2

import React from 'react'
import './index.less'

class Picture extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { data } = this.props
		let img = data.data.content.img
		return envType === 'business' && !img.img
			?
			false
			:
			(
			<div className="e-picture" id="e-picture" style={cssColorFormat(this.props, 'image')}>
				<img src={compImgFormat(this.props, img)} />
			</div>
			)
	}
}

export default Picture

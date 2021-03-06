import React from 'react'
import './index.less'

export default class PictureListBind extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	renderImage = imgs => {
		let props = this.props,
			{ style } = props.data.data,
			css  = cssColorFormat(props, 'image')
		return (
			<div className="eplb-box" style={cssColorFormat(props, 'filterBox')}>
				{ imgs.map((_, i) => <div key={i} style={css}><img src={_} /></div>) }
			</div>
		)
	}

	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind } = data.data.content,
			imgs = bind? item[bind] || []: []
		if (getAttr(imgs) === 'String') imgs = []
		return envType === 'business' && !imgs
			?
			false
			:
			(
				<div className="e-picture-list-bind">
					{ this.renderImage(imgs) }
				</div>
			)
	}
}

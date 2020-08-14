import React from 'react'
import './index.less'

export default class MediaBind extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data }  = props,
			{ item }  = ipt,
			{ bind }  = data.data.content,
			{ media } = bind? item[bind] || {}: {}
		if (!media) return null
		let { originalSizePreview, preview, url } = media,
			src = originalSizePreview || preview || url
		if (!src) return null
		return (
			<div className="e-media-bind" style={cssColorFormat(this.props, 'image')}>
				<img src={src} />
			</div>
		)
	}
}

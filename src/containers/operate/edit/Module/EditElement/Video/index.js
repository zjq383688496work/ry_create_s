/**
 * @Author:Along
 * @Date:   2018-05-08
 
 */
 
import React from 'react'
import './index.less'

class Video extends React.Component {
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	render() {
		let { data } = this.props
		const content = data.data.content
		const originalSizePreview = content.video.originalSizePreview ? content.video.originalSizePreview : ''
		return (
			<div className="e-video">
				<video src={content.src || content.video.video} controls={false} autoPlay loop poster={originalSizePreview}>
					您的浏览器不支持 video 标签。
				</video>
			</div>
		)
	}
}

export default Video

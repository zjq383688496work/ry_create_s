/**
 * @Author:Along
 * @Date:   2018-05-08
 
 */
 
import React from 'react'
import './index.less'

class Video extends React.Component {
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) return newProps.drag
		else return true
	}
	render() {
		let { data } = this.props,
			{ src, video } = data.data.content,
			preview = video.originalSizePreview || video.preview || ''
		return (
			<div className="e-video">
				<video src={src || video.video} controls={false} autoPlay loop poster={preview}>
					您的浏览器不支持 video 标签。
				</video>
			</div>
		)
	}
}

export default Video

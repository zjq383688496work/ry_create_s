import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Row, Col, Icon, Select } from 'antd'
const { Option } = Select

import PictureList from '../PictureList'
import VideoList from '../VideoList' 
import { imageAdaptation } from '../../EditStyle/StyleFilter'
 
import './index.less'

class ImageUploadComp extends React.Component {
	constructor(props) {
		super(props)
		var { width = 0, height = 0 } = props.data.data.layout
		this.state = { width, height }
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillReceiveProps(props) {
		var { width = 0, height = 0 } = props.data.data.layout
		this.setState({ width, height })
	}

	componentWillUnmount() {}

	showList() {
		this.addImgModal.show()
	}

	enter(imgList, attribute, index) {
		if (!imgList.length) return
		let { data, img, name, action, actions, editConfig } = this.props
		if (envType === 'operate') data = imageAdaptation(data, attribute)
		let da = data.data
		let { content }    = da
		let { parentComp } = editConfig.curData
		const length = content.length
		img[name] = imgList[0].url
		name == "video" ? (img.preview = imgList[0].preview,img.originalSizePreview = imgList[0].originalSizePreview) : null
		actions[action](null, parentComp? parentComp: data)
	}

	cb(key) {
		// console.log(key)
	}

	changeImgType(val) {
		let { data, img, action, actions, editConfig }  = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		img.type  = val
		if (action === 'updateComp') return actions[action](null, parentComp? parentComp: data)
	}
	removeImg() {
		this.enter([{ url: '' }])
	}

	render() {
		let { img, name, actions, editConfig, index, data } = this.props
		let { width, height } = this.state
		let btnNode
		let imgVal   = img && img.img
		let videoVal = img && img.video
		let theme  = editConfig.globalData.theme
		let colors = JSON.parse(JSON.stringify(theme.list[theme.idx].colors))
		let selectNode
		let scaleNode
		colors.custom = {
			name:  '自定义',
			img: imgVal
		}
		if (name === 'video') {
			if (videoVal) {
				btnNode = (
					<div className="add_img add_video" style={{ backgroundImage: `url('${img.preview}')` }}>
						<div className="shadow">
							<div className="add_text_change" onClick={this.showList.bind(this)}><Icon type="reload" /></div>
							<div className="add_text_remove" onClick={this.removeImg.bind(this)}><Icon type="close" /></div>
						</div>
					</div>
				)
			} else {
				btnNode = (
					<div className="add_img" onClick={this.showList.bind(this)}>
						<div className="add_text"><Icon type="plus" /></div>
					</div>
				)
			}
			return (
				<div className="pg-img-upload">
					<Row type="flex" align="middle" style={{ width: '100%' }}>
						<Col span={9}>
							{ btnNode }
						</Col>
					</Row>
					<VideoList
						ref={com => { this.addImgModal = com }}
						props={this.props}
						data={this.props}
						actions={actions}
						index={index}
						type={data.name}
						enter={this.enter}
					/> 
				</div>
			)
		}
		let options = Object.keys(colors).map((_) => {
			let col = colors[_]
			if (col.img === undefined) return false
			return (
				<Option key={col.name} value={_}>
					{col.name}
				</Option>
			)
		})

		selectNode = (
			<Col span={15}>
				<Select
					value={img.type}
					onChange={this.changeImgType.bind(this)}
					style={{ width: '100%' }}
				>
					{ options }
				</Select>
			</Col>
		)
		if (img.type === 'custom') {
			if (imgVal) {
				btnNode = (
					<div className="add_img" style={{ backgroundImage: `url('${imgVal}')` }}>
						<div className="shadow">
							<div className="add_text_change" onClick={this.showList.bind(this)}><Icon type="reload" /></div>
							<div className="add_text_remove" onClick={this.removeImg.bind(this)}><Icon type="close" /></div>
						</div>
					</div>
				)
				scaleNode = <div className="img_scale">{ width * 2 } x { height * 2 }</div>
			} else {
				btnNode = (
					<div className="add_img" onClick={this.showList.bind(this)}>
						<div className="add_text"><Icon type="plus" /></div>
					</div>
				)
			}
		}
		return (
			<div className="pg-img-upload">
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					<Col span={9}>
						{ btnNode }
						{ scaleNode }
					</Col>
					{ /*selectNode*/ }
				</Row>
				<PictureList
					ref={com => { this.addImgModal = com }}
					props={this.props}
					data={this.props}
					actions={actions}
					enter={this.enter}
					index={index}
				/>
			</div>
		)
	}
}

ImageUploadComp.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageUploadComp)

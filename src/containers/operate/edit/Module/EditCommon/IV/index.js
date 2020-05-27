import React, { Fragment } from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Row, Col, Icon, Select } from 'antd'
const { Option } = Select

import PictureAndVideo from '../PictureAndVideo'
import './index.less'

let max = 20
let typeMap = {
	1: 'image',
	2: 'video'
}
let mediaMap = {
	1: {
		media:  { type: 'custom', url: '' },
		router: {},
		type:   'image'
	},
	2: {
		media: { type: 'custom', url: '', preview: '' },
		type:  'video'
	}
}

class IV extends React.Component {
	constructor(props) {
		super(props)
		var { width = 0, height = 0 } = props.data.data.layout
		this.state = {
			width,
			height,
			init: false,
			single: true,
			idx: -1
		}
	}
	componentWillReceiveProps(props) {
		var { width = 0, height = 0 } = props.data.data.layout
		this.setState({ width, height })
	}
	// changeImg = () => {
	// 	this.setState({ init: true, single: true }, () => this.refs.IVModal.show())
	// }
	enter = list => {
		this.refs.IVModal.hide()
		if (!list.length) return
		let { single, idx } = this.state
		let { data, media, con, action, actions, editConfig } = this.props
		// 单个文件
		if (single) {
			return
		} else {
			let newList = list.map(({ type, url, preview, originalSizePreview }) => createMedia(type, url, preview, originalSizePreview))
			media.push(...newList)
		}
		let { parentComp } = editConfig.curData
		actions[action](null, parentComp? parentComp: data)
	}
	removeImg = type => {
		type === 'image' ? this.enter([{ url: '', type:1 }],'remove') : this.enter([{ url: '',preview:'',originalSizePreview:'',type:2 }],'remove')
	}
	initFn = () =>{
		this.setState({ init: false })
	}

	// 添加媒体-操作
	addMedia = () => {
		this.setState({ init: true, single: false, idx: -1 }, () => this.refs.IVModal.show())
	}
	// 编辑媒体-操作
	editMedia = idx => {
		this.setState({ init: true, single: true, idx }, () => this.refs.IVModal.show())
	}
	// 删除媒体-操作
	removeMedia = idx => {
		let { data, media, action, actions, editConfig } = this.props
		removeMedia(media[idx])
		let { parentComp } = editConfig.curData
		actions[action](null, parentComp? parentComp: data)
	}
	// 添加媒体-渲染
	renderAdd = () => {
		let { media } = this.props
		return (
			<div className="pgs-row">
				<div className="pgsr-name" style={{ width: 52 }}>
					<a disabled={media.length >= max} onClick={this.addMedia}>添加</a>
				</div>
				<div className="pgsr-ctrl">
					{ media.length } / { max }
				</div>
			</div>
		)
	}
	// 媒体节点-渲染
	renderMedia = () => {
		let { media } = this.props
		return media.map((item, i) => {
			let { url, preview, originalSizePreview } = item.media
			return (
				<div key={i} className="pgs-row">
					<div className="pgsr-name" style={{ width: 52 }}>
						内容{i + 1}
					</div>
					<div className="pgsr-ctrl">
						{
							url
							?
							<div className="add_img" style={{ backgroundImage: `url('${originalSizePreview || preview || url}')` }}>
								<div className="shadow">
									<div className="add_text_change" onClick={() => this.editMedia(i)}><Icon type="reload" /></div>
									<div className="add_text_remove" onClick={() => this.removeMedia(i)}><Icon type="close" /></div>
								</div>
							</div>
							:
							<div className="add_img" onClick={this.changeImg}>
								<div className="add_text"><Icon type="plus" /></div>
							</div>
						}
					</div>
				</div>
			)
		})
	}
	render() {
		let { media, editConfig, con, index, data } = this.props
		let addNode   = this.renderAdd()
		let mediaNode = this.renderMedia()
		let { width, height, init, single } = this.state
		let btnNode
		let scaleNode
		// if (img.type === 'custom') {
		// 	if (imgVal) {
		// 		btnNode = (
		// 			<div className="add_img" style={{ backgroundImage: `url('${imgVal}')` }}>
		// 				<div className="shadow">
		// 					<div className="add_text_change" onClick={this.changeImg}><Icon type="reload" /></div>
		// 					<div className="add_text_remove" onClick={()=>{this.removeImg(con.type)}}><Icon type="close" /></div>
		// 				</div>
		// 			</div>
		// 		)
		// 		scaleNode = <div className="img_scale">{ width * 2 } x { height * 2 }</div>
		// 	} else {
		// 		btnNode = (
		// 			<div className="add_img" onClick={this.changeImg}>
		// 				<div className="add_text"><Icon type="plus" /></div>
		// 			</div>
		// 		)
		// 	}
		// }
		return (
			<div>
				{ addNode }
				{ mediaNode }
				{
					init
					?
					<PictureAndVideo
						ref="IVModal"
						enter={this.enter}
						init={this.state.init}
						initFn={this.initFn}
						index={single}
					/>
					: null
				}
			</div>
		)
	}
}

// 创建媒体
function createMedia(type, url, preview, originalSizePreview) {
	let item = deepCopy(mediaMap[type])
	let { media } = item
	if (url)     media.url = url
	if (preview) media.preview = preview
	if (originalSizePreview) media.originalSizePreview = originalSizePreview
	return item
}
// 清除媒体
function removeMedia(item) {
	let { media, type } = item,
		{ url } = media
	media.url = ''
	if (type === 'video') media.preview = media.originalSizePreview = ''
}

IV.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IV)

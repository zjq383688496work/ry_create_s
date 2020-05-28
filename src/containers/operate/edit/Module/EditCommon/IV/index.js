import React, { Fragment } from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Icon, Slider } from 'antd'

import RouterJump      from 'compEdit/EditCommon/RouterJump'
import DatePickerNew   from 'compEdit/EditContent/DatePickerNew'
import PictureAndVideo from '../PictureAndVideo'
import './index.less'

let max = 20
let typeMap = {
	image: '图片',
	video: '视频'
}
let mediaMap = {
	1: {
		media:  { type: 'custom', url: '' },
		router: {},
		date:   ['', ''],
		delay:  5,
		type:   'image'
	},
	2: {
		media: { type: 'custom', url: '', preview: '' },
		date:  ['', ''],
		delay:  5,
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
	enter = list => {
		this.refs.IVModal.hide()
		if (!list.length) return
		let { single, idx } = this.state
		let { data, media, con, action, actions, editConfig } = this.props
		// 单个文件
		if (single) {
			let { type, url, preview, originalSizePreview } = list[0]
			media[idx] = createMedia(type, url, preview, originalSizePreview)
		} else {
			let newList = list.map(({ type, url, preview, originalSizePreview }) => createMedia(type, url, preview, originalSizePreview))
			media.push(...newList)
		}
		let { parentComp } = editConfig.curData
		actions[action](null, parentComp? parentComp: data)
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
	// 清空媒体-操作
	clearMedia = idx => {
		let { data, media, action, actions, editConfig } = this.props
		removeMedia(media[idx])
		let { parentComp } = editConfig.curData
		actions[action](null, parentComp? parentComp: data)
	}
	// 删除媒体-操作
	removeMedia = idx => {
		let { data, media, action, actions, editConfig } = this.props
		media.splice(idx, 1)
		let { parentComp } = editConfig.curData
		actions[action](null, parentComp? parentComp: data)
	}
	changeMedia = (val, key, idx) => {
		let { data, media, action, actions, editConfig } = this.props,
			item = media[idx]
		item[key] = val
		let { parentComp } = editConfig.curData
		actions[action](null, parentComp? parentComp: data)
	}
	// 添加媒体-渲染
	renderAdd = () => {
		let { media } = this.props,
			{ width, height } = this.state
		return (
			<div className="pgs-row">
				<div className="pgsr-name" style={{ width: 52 }}>
					<a disabled={media.length >= max} onClick={this.addMedia}>添加</a>
				</div>
				<div className="pgsr-ctrl">
					{ media.length } / { max }
					<div className="img_scale">{ width * 2 } x { height * 2 }</div>
				</div>
			</div>
		)
	}
	// 媒体节点-渲染
	renderMedia = () => {
		let { actions, data, media } = this.props
		return media.map(({ date, delay, media, router, type }, i) => {
			let { url, preview, originalSizePreview } = media
			return (
				<div key={i} className="pgs-row">
					<div className="pgsr-name" style={{ width: 52 }}>
						{i + 1}-{typeMap[type]}
					</div>
					<div className="pgsr-ctrl">
						{
							url
							?
							<div className="add_img" style={{ backgroundImage: `url('${originalSizePreview || preview || url}')` }}>
								<div className="shadow">
									<div className="add_text_change" onClick={() => this.editMedia(i)}><Icon type="reload" /></div>
									<div className="add_text_remove" onClick={() => this.clearMedia(i)}><Icon type="close" /></div>
								</div>
							</div>
							:
							<div className="add_img" onClick={() => this.editMedia(i)}>
								<div className="add_text"><Icon type="plus" /></div>
							</div>
						}
						{
							router
							?
							[
								<hr key={0} className="hr-split"/>,
								<RouterJump key={1} data={data} content={router} actions={actions} />
							]
							: null
						}
						{
							envType === 'business'
							?
							[
								<Slider
									key={0} min={1} max={30} step={1}
									value={delay} onChange={v => this.changeMedia(v, 'delay', i)}
									style={{ width: '100%' }}
								/>,
								<DatePickerNew
									key={1} date={date} onChange={v => this.changeMedia(v, 'date', i)}
								/>
							]
							: null
						}
					</div>
					<div className="delete" onClick={() => this.removeMedia(i)}><Icon type="close-circle" style={{ fontSize: 18 }} /></div>
				</div>
			)
		})
	}
	render() {
		let { media, editConfig, con, index, data } = this.props
		let addNode   = this.renderAdd()
		let mediaNode = this.renderMedia()
		let { width, height, init, single } = this.state
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
						init={init}
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
	if (type === 3) type = 1
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

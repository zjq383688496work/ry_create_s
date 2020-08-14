import React, { Fragment } from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Icon, Slider } from 'antd'

import RouterJump      from 'compEdit/EditCommon/RouterJump'
import DatePickerNew   from 'compEdit/EditContent/DatePickerNew'
import PictureAndVideo from '../PictureAndVideo'
import './index.less'

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
		let { data, max = 20, single = false } = props,
			layout = data? props.data.data.layout: {}
		var { width = 0, height = 0 } = layout
		this.state = {
			width,
			height,
			init: false,
			single,
			idx: -1,
			max
		}
	}
	componentWillReceiveProps(props) {
		let { data } = props,
			layout = data? props.data.data.layout: {},
			{ width = 0, height = 0 } = layout
		this.setState({ width, height })
	}
	enter = list => {
		this.refs.IVModal.hide()
		if (!list.length) return
		let { single, idx } = this.state
		let { data, media, action, actions, editConfig, onChange } = this.props
		// 单个文件
		if (single) {
			let { id, type, url, preview, originalSizePreview } = list[0]
			media[idx] = createMedia(type, url, preview, originalSizePreview, id)
		} else {
			let newList = list.map(({ id, type, url, preview, originalSizePreview }) => createMedia(type, url, preview, originalSizePreview, id))
			media.push(...newList)
		}
		if (action) {
			let { parentComp } = editConfig.curData
			actions[action](null, parentComp? parentComp: data)
		}
		if (onChange) onChange(media[idx])
	}
	initFn = () => {
		this.setState({ init: false })
	}
	// 添加媒体-操作
	addMedia = () => {
		let { single } = this.props
		this.setState({ init: true, single, idx: -1 }, () => this.refs.IVModal.show())
	}
	// 编辑媒体-操作
	editMedia = idx => {
		this.setState({ init: true, single: true, idx }, () => this.refs.IVModal.show())
	}
	// 清空媒体-操作
	clearMedia = idx => {
		let { data, media, action, actions, editConfig, onChange } = this.props
		removeMedia(media[idx])
		if (action) {
			let { parentComp } = editConfig.curData
			actions[action](null, parentComp? parentComp: data)
		}
		if (onChange) onChange(null)
	}
	// 删除媒体-操作
	removeMedia = idx => {
		let { data, media, action, actions, editConfig, onChange } = this.props
		media.splice(idx, 1)
		if (action) {
			let { parentComp } = editConfig.curData
			actions[action](null, parentComp? parentComp: data)
		}
		if (onChange) onChange(null)
	}
	changeMedia = (val, key, idx) => {
		let { data, media, action, actions, editConfig, onChange } = this.props,
			item = media[idx]
		item[key] = val
		if (action) {
			let { parentComp } = editConfig.curData
			actions[action](null, parentComp? parentComp: data)
		}
		if (onChange) onChange(item)
	}
	// 添加媒体-渲染
	renderAdd = () => {
		let { media, single } = this.props,
			{ width, height, max } = this.state
		return (
			<div className="pgs-row">
				<div className="pgsr-name" style={{ width: 52 }}>
					<a disabled={!single && media.length >= max} onClick={this.addMedia}>
						{
							single && media[0]? '编辑': '添加'
						}
					</a>
				</div>
				{
					max > 1
					?
					<div className="pgsr-ctrl">
						{ media.length } / { max }
						<div className="img_scale">{ width * 2 } x { height * 2 }</div>
					</div>
					: null
				}
			</div>
		)
	}
	// 媒体节点-渲染
	renderMedia = () => {
		let { actions, data, media, single } = this.props
		if (single) return null
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
		let { media, editConfig, index, data, children } = this.props
		let addNode   = this.renderAdd()
		let mediaNode = this.renderMedia()
		let { width, height, init, single } = this.state
		return (
			<div>
				{ children }
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
function createMedia(type, url, preview, originalSizePreview, id) {
	if (type === 3) type = 1
	let item = deepCopy(mediaMap[type])
	let { media } = item
	if (id)      media.id  = id
	if (url)     media.url = url
	if (preview) media.preview = preview
	if (originalSizePreview) media.originalSizePreview = originalSizePreview
	return item
}
// 清除媒体
function removeMedia(item) {
	let { media, type } = item
	media.url = ''
	delete media.id
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

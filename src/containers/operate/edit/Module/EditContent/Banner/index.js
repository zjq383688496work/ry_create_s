import React from 'react'
// import './index.less'

import SwiperSame      from '../SwiperSame'
import PictureAndVideo from 'compEdit/EditCommon/PictureAndVideo'
import { Row, Col, Collapse, Icon, message } from 'antd'
const  { Panel } = Collapse

export default class Banner extends React.Component {
	state = { init: false }
	addImg = () => {
		this.setState({ init: true }, () => { this.addImgVideoModal.show() })
	}
	enter = list => {
		var props = this.props.data,
			isContinue = true
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		let { data, actions, editConfig } = props
		let { curData, globalData } = editConfig
		let { content, layout }     = data.data
		let { parentComp } = curData
		let newContent =  this.do_content(list,content)
		if (newContent.length > 20) return message.warning('最多只能添加20张素材！')
		if (envType === 'business') isContinue = this.checkImg(list,layout)
		if (!isContinue) return message.info("选择的图片不符合尺寸，请重新选择！")
		this.setState({ init: false })
		this.addImgVideoModal.hide()
		data.data.content = newContent
		globalData.banner = data
		return actions.updateGlobal(globalData)
	}
	// 检查素材大小
	checkImg = (list, layout) => {
		var { width, height } = layout,
			isOk = true
		if (tempCfg.resolutionType == 2) { width *= 4;height *= 4 }
		else { width *= 2; height *= 2 }
		if (!list || list.length === 0) return
		isOk = list.every(_ => {
			if (_.type == 2) return true
			var { attribute } = _
			attribute = attribute && attribute.split('*')
			return Math.abs(+attribute[0] - width) < 100 && Math.abs(+attribute[1] - height) < 100
		})
		return isOk
	}
	do_content = (list, content) => {
		list = list.map(({ attribute, originalSizePreview, preview, type, url }) => {
			let item = ''
			if (type == 2) {
				item = {
					attribute,
					img: { type: 'custom', video: url, preview, originalSizePreview },
					type: 'video'
				}
				if (envType === 'business') item.data = ''
			} else {
				item = {
					attribute,
					img: { type: 'custom', img: url },
					router: {},
					type: 'image'
				}
				if (envType === 'business') item = { ...item, delayOnly: 5, date: '' }
			}
			return item
		})
		let newList = deepCopy(list)
		content.map(_ => {
			list.map(v => {
				if (v.type == 'image' && _.type == 'image') {
					if(v.img.img == _.img.img){
						newList = newList.filter(s => s.img.img != v.img.img)
						return
					}
				} else if (v.type == 'video' && _.type == 'video') {
					if(v.img.video == _.img.video){
						newList = newList.filter(s => s.img.video != v.img.video)
						return
					}
				}
			})
		})
		var newContent = content.concat(newList)
		return newContent
	}
	initFn = () => {
		this.setState({ init: false })
	}
	render() {
		var props = this.props.data
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		var { data, actions, editConfig } = props,
			{ curData } = editConfig,
			{ content } = data.data
		return (
			<div>
				{ content.length? <SwiperSame data={props} />: null }
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header={`添加`} key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">添加</div>
							<div className="pgsr-ctrl">
								<div className="pg-img-upload">
									<Row type="flex" align="middle" style={{ width: '100%' }}>
										<Col span={9}>
											<div className="add_img" onClick={this.addImg}>
												<div className="add_text"><Icon type="plus" /></div>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</div>
					</Panel>
				</Collapse>
				{
					this.state.init
					?
					<PictureAndVideo
						ref={com => { this.addImgVideoModal = com }}
						enter={this.enter}
						init={this.state.init}
						initFn={this.initFn}
					/>: null
				}
			</div>
		)
	}
}
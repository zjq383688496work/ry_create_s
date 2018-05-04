/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Row, Col, Checkbox, Collapse, Icon, Input, Select } from 'antd'
const { Option, OptGroup } = Select
const Panel  = Collapse.Panel

import PictureList from '../PictureList'

import './index.less'

class ImageUploadComp extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	showList() {
		this.addImgModal.show()
	}

	enter(imgUrl,index) { 
		let { data, img, name, action, content, actions, editConfig } = this.props
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		let imgList = imgUrl;
		const length = content.length;
		if(data.name == 'swiperImage'){
			if(name == 'first') {
				imgList = imgList.map((item,index)=>{
					var obj = {img:{img:item.url,type:'custom'},title:`图片${index+1}`,router: {}};
					return obj;   
				})
				data.content = imgList;
			}else{     
				data.content[index][name].img = imgUrl[0].url;
			}    
		}else{ 
			data.content[name].img = imgUrl[0].url
		}
		actions[action](null, parentComp? parentComp: data)
	}

	cb(key) {
		console.log(key)
	}

	changeImgType(val) {
		let { data, img, action, actions, editConfig }  = this.props
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		img.type  = val
		if (action === 'updateComp') return actions[action](null, parentComp? parentComp: data)
	}

	render() {
		let { typeSelect = false, data, img, name, content, actions, editConfig,index } = this.props
		let btnNode
		let imgVal = img&&img.img
		let theme   = editConfig.globalData.theme
		let colors  = JSON.parse(JSON.stringify(theme.list[theme.idx].colors))
		let selectNode
		colors.custom = {
			name:  '自定义',
			img: imgVal,
		}  
		if(name == 'first'){
			return (
					<div className="pg-img-upload">
						<Row type="flex" align="middle" style={{ width: '100%' }}>
							<Col span={9}>
								<div className="add_img" onClick={this.showList.bind(this)}>
									<div className="add_text"><Icon type="plus" /></div>
								</div>
							</Col>
						</Row>
						<PictureList
							ref={com => { this.addImgModal = com }}
							props={this.props}
							data={this.props} 
							actions={actions} 
							index={0}
							firstAdd={true} 
							enter={this.enter}     
						/>
					</div>
				)
		}
		let options = Object.keys(colors).map((_, i) => {
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
					<Col span={9}>
						<div className="add_img" style={{ backgroundImage: `url('${imgVal}')` }} onClick={this.showList.bind(this)}>
							<div className="shadow">
								<div className="add_text_change"><Icon type="reload" /></div>
							</div>
						</div>
					</Col>
				)
			} else {
				btnNode = (
					<Col span={9}>
						<div className="add_img" onClick={this.showList.bind(this)}>
							<div className="add_text"><Icon type="plus" /></div>
						</div>
					</Col>
				)
			}
		}
		return (
			<div className="pg-img-upload">
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					{ btnNode }
					{ selectNode }
				</Row>
				<PictureList
					ref={com => { this.addImgModal = com }}
					props={this.props}
					data={this.props} 
					actions={actions} 
					index={0}
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
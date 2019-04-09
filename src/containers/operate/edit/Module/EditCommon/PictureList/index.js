/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
import { Button, Upload, message, Modal, Pagination, Icon, Input } from 'antd'
import Url from 'public/Url'
const commonCss = {
	dialogStyles: {
		height: 'auto',
		minHeight: '55px',
		width: '750px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-317.5px auto 0',
		background: '#F9F9F9',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		borderRadius: '6px'
	},
	titleStyle: {
		height: '45px',
		lineHeight: '45px',
		paddingLeft: '24px'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: '20px' 
	}
}


export default class PictureList extends React.Component {
	show() {
		this.addImgModal.show()
		var getData = {
			type: 1
		}
		var ty = 'ySourceGroupManage'
		if (envType === 'business') {
			getData.mallId = uif.userInfo.mallMid
			ty = 'sourceGroupManage'
		}
		Ajax.postJSON(`/easy-smart/${ty}/query`, getData).then(res => {
			this.setState({ 
				imgTypes: res.data
			})
			this.setState({ groupId: res.data[0].id })
			this.getImgList('groupId', res.data[0].id)
		})
		// this.getImgList()
	}
	state = {
		choosed_img: false,
		imgTypes: [],
		imgList:  [],
		page_img: {},
		attribute:'',
		currentPage: 1,
		page:1,
		page_size:14,
		pageSize:14,
		name:'', 
		groupId: 39
	}
	componentDidMount(){}

	getImgList = (str, id) => {
		let currentPage = this.state.currentPage
		if (str == 'page') {
			currentPage = id
			this.setState({ currentPage: id })
		} else if (str == 'groupId') {
			currentPage = 1
			this.setState({ groupId: id, currentPage: 1 })
		}else if(str == 'name'){
			currentPage = 1
			this.setState({ name: id, currentPage: 1 })
		}
		setTimeout(() => {
			let postData = {
				page:        this.state.page,
				name:        this.state.name,
				currentPage: currentPage,
				pageSize:    this.state.pageSize,
				page_size:   this.state.page_size,
				groupId:     this.state.groupId,
				type:        1
			}
			var ty = 'ySourceManage'
			if (envType === 'business') {
				postData.mallId = uif.userInfo.mallMid
				ty = 'sourceManage'
			}
			Ajax.postJSON(`/easy-smart/${ty}/query`, postData).then(res => {
				this.setState({
					imgList:res.data,
					page_img:res.page
				})
			})
		}, 10)
	}
	cancelClick = () => {
		this.addImgModal.hide()
	}
	save = () => {
		let { choosed_img,attribute } = this.state,
				{ index } = this.props
		if (choosed_img) {
			let { type,data } = this.props;
			data = data.data.data
			let { layout } = data,
				{ width,height } = layout
			if(tempCfg.resolutionType == 2) { width *= 4;height *= 4 }
			else { width *= 2;height *= 2 }
			let new_attribute = attribute&&attribute.split("*")
			if(type==="business"&&(Math.abs(+new_attribute[0] - width) >= 100 || Math.abs(+new_attribute[1] - height) >= 100)){
				return message.info(`选择的图片尺寸不符合,请重新选择!`)
			}	
			this.props.enter(choosed_img,attribute,index)
			this.addImgModal.hide()
		} else {
			return message.info(`你还未选择图片!`)
		}
	}
	close = () => {
		this.addImgModal.hide()
	}
	save_img = (url,attribute) => {
		this.setState({choosed_img:url,attribute:attribute});
	}
	searchName = e => {
		this.setState({name:e.target.value})
	}
	searchList = () => {
		this.getImgList('name',this.state.name)
	}
	render() {
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.addImgModal = com }}
					title={'图片素材'}
				>
				<div className="outer">
					<ImgModule save={this.save_img} groupId={this.state.groupId} page_img={this.state.page_img} getImgList={this.getImgList} imgTypes={this.state.imgTypes} imgList={this.state.imgList} />
					<div className="bottom">
						<Button type="primary" onClick={this.save}>确定</Button>
						<Button onClick={this.close}>取消</Button>
					</div>
					<div className="searchImg">
						<Input size="large" placeholder="请输入查询名称" onChange={e=>this.searchName(e)} /><Button type="primary" onClick={this.searchList}>搜索</Button>
					</div>
				</div>
				</SkyLight>
			</div>
		)
	}
}

class ImgModule extends React.Component {
	state = {
		imgTypes: [],
		imgList:  [],
		loading:  false,
		current:  1,
		groupId:  this.props.groupId
	}

	componentWillReceiveProps(props){
		let img_list = props.imgList;
		let imgTypes = props.imgTypes;
		this.setState({
			imgList:img_list,
			imgTypes:imgTypes
		})
	}
	chooseType(str, id) {
		let current = 1
		if (str === 'groupId') {
			this.setState({ current: 1, groupId: id })
		} else if (str === 'page') {
			this.setState({ current: id })
		}
		this.props.getImgList(str, id)
	}
	chooseImg(img,attribute) {
		let img_list = this.state.imgList
		img_list = img_list.map(item=>{
			item.id === img ? item.isClicked = !item.isClicked : item.isClicked = false
			return item
		})
		this.setState({
			imgList:img_list
		})
		let choosed_img = img_list.filter(item => item.isClicked == true);
		this.props.save(choosed_img,attribute)
	};
	customRequest = ({ file }) => {
		this.setState({loading:true})
		var paramsData = {
			userId: window.uif.userInfo.id || '1',
			mallId: '',
			imageSourceType: 'OPERATION',
			imageName: file.name.split('.')[0]
		}
		if (envType === 'business') {
			paramsData.imageSourceType = 'BUSINESS'
			paramsData.mallId = uif.userInfo.mallMid
		}
		var reader = new FileReader()
		reader.onload = ({ target }) => {
			Ajax.postJSONIMG('/mcp-gateway/utility/uploadImage', { ...paramsData, imageBase64: target.result }).then(() => {
				message.info('上传成功!')
				this.setState({ loading: false })
				this.props.getImgList()
			}).catch(e => {
				this.setState({ loading: false })
			})
		}
		reader.readAsDataURL(file)
	}
	beforeUpload = ({ size, type }) => {
		if (!/(png|jpeg|gif)/.test(type)) {
			message.info(`图片格式不正确!`)
			return false
		}
		if (size > 5e6) {
			message.info(`当前图片大小${(size / 1e6).toFixed(1)}mb, 请上传不超过5mb的图片!`)
			return false
		}
		return true
	}
	render() {
		let id = window.uif.userInfo.id || '1'
		const { page_img } = this.props
		return (
			<div className="content">
				<div className="left">
					{ this.state.imgTypes.map((item,index) => <Type groupId={this.state.groupId} key={index} item={item} choose_one={this.chooseType.bind(this)}></Type>) }
				</div>
				<div className="right">
					<div>
						<Upload
							name="avatar"
							className="avatar-uploader"
							listType="picture-card"
							showUploadList={false}
							beforeUpload={this.beforeUpload}
							customRequest={this.customRequest}
							accept="image/png, image/jpeg, image/gif"
						>
							<div>
								<Icon type={this.state.loading ? 'loading' : 'plus'} />
								<div className="ant-upload-text">上传图片<br/>JPG PNG GIF格式,5MB大小以内</div>
							</div>
						</Upload>
					</div>
					{
						this.state.imgList.map((item,index) => <List key={index} item={item} type={this.props.type} choose_one={this.chooseImg.bind(this)}></List> )
					}
					<Pagination
						className="Pagination"
						defaultCurrent={1}
						current={this.state.current}
						total={page_img.totalCount}
						pageSize={page_img.pageSize}
						onChange={page=>{this.chooseType('page',page)}}
						/>
				</div>
			</div>
		)
	}
}

function Type({item, choose_one, groupId}) {
	return (
		<div className={item.id === groupId? 's-active': ''} onClick={()=>{choose_one('groupId', item.id)}}>{item.name}</div>
	)
}
function List({ item, choose_one }) {
	if (!item) return null
	var { attribute, id, isClicked, name, preview, thumbnail } = item
	return  (
		<div onClick={() => choose_one(id, attribute)} className={ isClicked? 'choosed': '' }>
			<div className={ isClicked? 'icon_img': '' }>
				<div className="right-symbol"></div>
			</div>
			{ (preview || thumbnail)? <img src={preview || thumbnail} />: null }
			<div className="showName">{name}</div>
			<div className="showSize">{attribute}</div>
		</div>
	)
}

/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import VideoCrop from '../VideoCrop'
import InputFile from '../InputFile'
import { Button, message,Modal,Pagination,Input,Upload,Icon } from 'antd'
import './index.less'
const commonCss = {
	dialogStyles: {
		height: 'auto',
		minHeight: '535px',
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
 

export default class VideoList extends React.Component {
	show() {
		this.addImgModal.show()
	}
	state = {
		choosed_img:[],
		videoTypes:[],
		videoList:[],
		page_video:{},
		currentPage:1,
		page:1,
		page_size:14,
		pageSize:14, 
		name:'', 
		groupId:42,
		attribute:''
	} 
	componentWillMount(){
		var getData = {
			type: 2
		}
		var ty = 'ySourceGroupManage'
		if (envType === 'business') {
			getData.mallId = uif.userInfo.mallMid
			ty = 'sourceGroupManage'
		}
		Ajax.postJSON(`/easy-smart-basic/${ty}/query`, getData).then(res => {
			this.setState({
				videoTypes:res.data
			})
			this.getVideoList('groupId', res.data[0].id)
		})
	}
	
	getVideoList = (str, id) => {
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
				type:        2
			}
			var ty = 'ySourceManage'
			if (envType === 'business') {
				postData.mallId = uif.userInfo.mallMid
				ty = 'sourceManage'
			}
			Ajax.postJSON(`/easy-smart-basic/${ty}/query`, postData).then(res => {
				this.setState({ 
					videoList:res.data,
					page_video:res.page
				})
			})
		}, 10)
	}
	cancelClick = () => {
		this.addImgModal.hide()
	}
	save = () => {
		if (this.state.choosed_img) {
			this.props.enter(this.state.choosed_img,this.state.attribute,this.props.index)
			this.addImgModal.hide()
		} else {
			message.info(`你还未选择视频!`)
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
		this.getVideoList('name',this.state.name)
	}
	render() {
		let { firstAdd,type } = this.props
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.addImgModal = com }}
					title={'视频素材'}
				>
				<div className="outer">
					<VideoModule page_video={this.state.page_video} save={this.save_img} groupId={this.state.groupId} getVideoList={this.getVideoList} videoTypes={this.state.videoTypes} videoList={this.state.videoList} type={type} />
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

class VideoModule extends React.Component {
	state = {
		videoTypes: [],
		videoList:  [],
		current:    1,
		groupId:    this.props.groupId,
		loading:    false
	}
	
	componentWillReceiveProps(props){
		let videoList = props.videoList;
		let videoTypes = props.videoTypes;
		 this.setState({
			videoList:videoList,
			videoTypes:videoTypes
		})
	}
	chooseType(str, id) {
		let current = 1
		if (str === 'groupId') {
			this.setState({ current: 1, groupId: id })
		} else if (str === 'page') {
			this.setState({ current: id })
		}
		this.props.getVideoList(str, id)
	}
	chooseVideo = (id,attribute) => { 
		let videoList = this.state.videoList
		videoList = videoList.map(item => {
			item.id == id ? item.isClicked = !item.isClicked : item.isClicked = false;
			return item
		})
		this.setState({ videoList })
		let choosed_video = videoList.filter(item => item.isClicked == true);
		this.props.save(choosed_video,attribute)
	}
	customRequest = (state, file) => {
		if (!state) return message.info(file)
		this.setState({ loading: true })
		VideoCrop(file, this.postEndFn, envType === 'business'? uif.userInfo.mallMid: null)
	}
	// 上传视频成功后的回调
	postEndFn = success => {
		message.info(`上传${success? '成功': '失败'}!`)
		this.setState({ loading: false })
		if (success) this.props.getVideoList()
	}
	render() {
		var { page_video } = this.props,
			{ loading }    = this.state
		return (
			<div className="content">
				<div className="left">
					{ this.state.videoTypes.map((item, index) => <Type groupId={this.state.groupId} key={index} item={item} choose_one={this.chooseType.bind(this)}></Type>) }
				</div> 
				<div className="right">
					<div>
						<InputFile
							accept=".mp4"
							loading={loading}
							maxFileSize={200 * 1000 * 1000}
							handleCheck={this.customRequest}
						>
							<div className="if-box">
								<Icon type={loading? 'loading': 'plus'}/>
								上传视频<br/>
								<p className="if-text-m">mp4格式,200MB大小以内</p>
							</div>
						</InputFile>
					</div>
					{ 
						this.state.videoList.map((item,index) => <List key={index} item={item} choose_one={this.chooseVideo}></List> )
					}
					<Pagination 
						className="Pagination" 
						defaultCurrent={1}
						current={this.state.current} 
						total={page_video.totalCount} 
						pageSize={page_video.pageSize}
						onChange={page=>{this.chooseType('page', page)}}  
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

function List({item,choose_one}){
	!item.preview ? item.preview = 'http://rongyi.b0.rongyi.com/commodity/text/201811081000076071.png' : null
	return ( 
		<div onClick={()=>{choose_one(item.id,item.attribute)}} className={item.isClicked?'choosed':''}>
			<div className={item.isClicked?'icon_img':''}>
				<div className="right-symbol"></div>
			</div>
			<img src={item.preview} style={{height:'100%',width:'100%'}} />
			<div className="showName">{item.name}</div>
			<div className="showSize">{item.attribute}</div> 
		</div> 
	)
}
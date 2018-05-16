/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
import { Button, Upload, message,Modal,Pagination } from 'antd'
const commonCss = {
	dialogStyles: {
		height: 'auto',
		minHeight: '635px',
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
		page_size:10,
		pageSize:10,
		name:'',
		groupId:42
	} 
	componentDidMount(){ 
		Ajax.postJSON('/easy-smart/ySourceGroupManage/query',{type:2}).then(res => {
			this.setState({ 
				videoTypes:res.data
			})  
		})   
		this.getVideoList();
	};
	
	getVideoList = (str,id) => { 
		if(str == 'page'){
			this.setState({
				page:id
			}) 
		}else if(str == 'groupId'){
			this.setState({
				groupId:id
			}) 
		}  
		setTimeout(()=>{
			let postData = { 
				page:this.state.page,
				name:this.state.name,
				currentPage:this.state.currentPage,
				pageSize:this.state.pageSize,
				page_size:this.state.page_size,
				groupId:this.state.groupId,
				type:2
			}    
			Ajax.postJSON('/easy-smart/ySourceManage/query',postData).then(res => {
				this.setState({ 
					videoList:res.data,
					page_video:res.page  
				}) 
			})  
		},10) 
	}
	cancelClick = () => {
		this.addImgModal.hide()
	}
	save = () => {
		if (this.state.choosed_img) {
			this.props.enter(this.state.choosed_img,this.props.index)
			this.addImgModal.hide()
		} else {
			message.info(`你还未选择视频!`)
		}
	}
	close = () => {
		this.addImgModal.hide()
	}
	save_img = url => {
		this.setState({choosed_img:url});
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
					title={'选择素材'}
				>
				<div className="outer">
					<div className="add_title">
						<ul>
							<li className='active'>视频</li>
						</ul>
						<div className="input_search"><input placeholder="搜索" /></div>
						<div className="search" onClick={this.getList}>搜索</div>
					</div>
					<VideoModule page_video={this.state.page_video} save={this.save_img} getVideoList={this.getVideoList} videoTypes={this.state.videoTypes} videoList={this.state.videoList} type={type} />
					<div className="bottom">
						<Button type="primary" onClick={this.save}>确定</Button>
						<Button onClick={this.close}>取消</Button>
					</div>
				</div>
				</SkyLight>
			</div>
		) 
	}
}

class VideoModule extends React.Component {
	state = {
		videoTypes:[
			
		],
		videoList:[
			
		]
	}
	
	componentWillReceiveProps(props){
		let videoList = props.videoList;
		let videoTypes = props.videoTypes;
		 this.setState({
				videoList:videoList,
				videoTypes:videoTypes
			})
	}
	chooseType(str,id) {
		this.props.getVideoList(str,id);  
	}  
	chooseVideo = id => { 
		let videoList = this.state.videoList
		videoList = videoList.map(item=>{
			item.id == id ? item.isClicked = !item.isClicked : item.isClicked = false;
			return item
		});
		this.setState({
				videoList:videoList
			})
		let choosed_video = videoList.filter(item => item.isClicked == true);
		this.props.save(choosed_video)
	}
	
	render() {
		const { page_video } = this.props;
		return (
			<div className="content">
				<div className="left">
					{
						this.state.videoTypes.map((item,index) => <Type key={index} item={item} choose_one={this.chooseType.bind(this)}></Type>)
					} 
				</div> 
				<div className="right">
					{ 
						this.state.videoList.map((item,index) => <List key={index} item={item} choose_one={this.chooseVideo}></List> )
					}
					<Pagination className="Pagination" onChange={page=>{this.chooseType('page',page)}} defaultCurrent={page_video.currentPage} total={page_video.totalPage} pageSize={page_video.pageSize} />
				</div>
			</div>
		)
	}
}

function Type({item,choose_one}){
	return (
		<div onClick={()=>{choose_one('groupId',item.id)}}>{item.name}</div> 
	)
}

function List({item,choose_one}){
	return (
		<div onClick={()=>{choose_one(item.id)}} className={item.isClicked?'choosed':''}>
			<div className={item.isClicked?'icon':''}>
				<div className="right-symbol"></div>
			</div>
			<video src={item.url} controls="controls">
				您的浏览器不支持 video 标签。
			</video> 
		</div> 
	)
}
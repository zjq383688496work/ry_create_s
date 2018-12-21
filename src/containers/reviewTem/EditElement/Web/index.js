/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'
import './index.less' 
 
class WebShow extends React.Component {
	
	state = {
		id:`iframe_RY_${parseInt(Math.random()*1e5)}`
	} 
	componentDidMount() {
		window.addEventListener('message', this.messageGet,false); 
	}

	messageGet = messageEvent => {
		let { type, value } = messageEvent.data,haveRouter = false;
		let { pageList,animate,animateParams,action } = this.props
		for(let i = 0;i<pageList.length;i++){
			if(value.router === pageList[i].title){
				value.router = pageList[i].router
				haveRouter = true
				break
			}
		}
		if(!haveRouter){ value.router = '' }
		if (type === 'back' && value) { 
			//clearInterval(RYTimer);  
			//funcIn(); 
		}else if(type === 'toDetails'){
			const dataStr = checkToJump(value.details,value.router);
			JumpRouter(dataStr,animate,animateParams,action)
		}
	}     
	componentWillUnmount(){  
		window.removeEventListener('message', this.messageGet,false); 
	} 
	render() {
		let { data } = this.props
		return ( 
			<div className="e-web">
				<iframe id={this.state.id} className="ew-iframe-show" src={data.data.content.url} scrolling={'no'} />
			</div> 
		) 
	}
}

export default WebShow

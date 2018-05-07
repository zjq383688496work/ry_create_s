/**
 * @Author: Along
 * @Date:   2018-05-07

 */
  

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message } from 'antd'

const { Panel }    = Collapse
const Option = Select.Option;
  

import './index.less' 

class NavigationFoat extends React.Component {
	
	componentWillReceiveProps(props) {
		
	}; 
	componentDidMount() {
		
	};
	cb = key => {
		console.log(key)
	};
	handleChange = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		const num_add = value - data.content.length;
		let add_default = [];
		for(let i = 0;i<num_add;i++){
			let obj = {   
					img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon3_2.png' },			// 图片url
					title: `导航${data.content.length+i+1}`,		// 图片标题
					router: '',	 		// 路由 
				}
				add_default.push(obj);
		}
		add_default = data.content.concat(add_default);
		data.content = add_default;
		console.log(value);
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	handleChangeStyle = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		data.layout.type = value;
		switch (value) {
			case 1 : data.style.layout.width = 80;data.style.layout.height = 330;
			break;
			case 2 : data.style.layout.width = 120;data.style.layout.height = 330; 
			break;
			case 3 : data.style.layout.width = 300;data.style.layout.height = 300;
			break;
			default:;
			break
		}
		if(data.layout.position == 'right'){
			if(data.layout.type == 1){
				data.style.layout.left = 352;
			}else if(data.layout.type == 2){
				data.style.layout.left = 312; 
			} 
		} 
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	handleChangePosition = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		data.layout.position = value;
		switch (value) { 
			case 'left' : data.style.layout.left = 0;data.style.layout.top = 220;
			break;
			case 'right' : 
					if(data.layout.type == 1){
						data.style.layout.left = 352;
					}else if(data.layout.type == 2){
						data.style.layout.left = 312; 
					} 
					data.style.layout.top = 220;
			break;   
			default:;   
			break
		}
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};    
	render() {  
		let { data } = this.props.data      
		const options = [2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		const options_style = [{
				type:1,
				show:'布局样式一'
			},{
				type:2,
				show:'布局样式二'
			}];
		const options_position = [{type:'left',show:'左'},{type:'right',show:'右'}/*,{type:'top',show:'上'},{type:'bottom',show:'下'}*/];
		return ( 
			<div className="e-navigation-content">
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='导航设置' key={0}>
						<div key={0} className="pgs-row">
							<div className="pgsr-name">导航数量</div>  
							<Select defaultValue={data.content.length} value={data.content.length} style={{ width: 120 }} onChange={this.handleChange}>
     							{     
     								options.map((item,index)=><Option value={item} key={index} disabled={item<data.content.length?true:false}>{item}</Option>)
     							} 
   							 </Select>
						</div>
						<div key={1} className="pgs-row">
							<div className="pgsr-name">布局方式</div>  
							<Select defaultValue={data.layout.type} style={{ width: 120 }} onChange={this.handleChangeStyle}>
     							{       
     								options_style.map((item,index)=><Option value={item.type} key={index}>{item.show}</Option>)
     							} 
   							 </Select>
   						</div> 
   						<div key={2} className="pgs-row">
   							<div className="pgsr-name">位置选择</div>  
							<Select defaultValue={data.layout.position} style={{ width: 120 }} onChange={this.handleChangePosition}>
     							{      
     								options_position.map((item,index)=><Option value={item.type} key={index}>{item.show}</Option>)
     							} 
   							 </Select>
   						</div>
					</Panel>
				</Collapse>	
			</div>  
		) 
	}
}

export default NavigationFoat
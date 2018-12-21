/**
 * @Author: yawen
 * @Date:   2018-11-27
 */

import React from 'react'
import './index.less'
import Custom from '../Custom'

class WonderfulActivityNewShow extends React.Component {
	
	state = {
		paramsData:{mapParams:{catgId:'noCatgId'}},
		have_activitys:false
	}
	componentWillMount(){
		let ipt = this.state.paramsData,
			{ data } = this.props,
			comp = data.data.components,
			activitys = comp.filter(item=>item.name == 'listByActivity2');
		if(activitys.length > 0){ 
			this.setState({have_activitys:true});
		}else{ 
			let noActivitysShow = {mapParams:{catgId:'noShow'}};
			this.setState({paramsData:noActivitysShow});
		} 
		
	}
	ioOuter = id => {
		let ipt = this.state.paramsData,
			catgId = ipt.mapParams.catgId;
		if(catgId != id){
			ipt.mapParams.catgId = id;
			this.setState({mapParams:ipt})
		} 
	}

	render() {
		let { data,animate,animateParams,action } = this.props
		return (
			<div style={{height:"100%"}}>
				{
					<Custom 
						data={data}
						animate={animate}
						animateParams={animateParams}
						ioInput={this.state.paramsData}
						ioOuter={this.ioOuter}
						action={action}
						have_activitys={this.state.have_activitys}
					/>
				}
			</div>
		)
	} 
}

export default WonderfulActivityNewShow

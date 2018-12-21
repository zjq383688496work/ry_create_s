/**
 * @Author: yawen
 * @Date:   2018-11-27
 **/

import React from 'react'
import Layout from '../../Layout'
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import './index.less' 
import * as Server from 'server'

export default class CatgByActivity extends React.Component {
	constructor(props) {
		super(props)
	}
	state={
		catgs:[]
	}
	componentDidMount(){
		Server.store.getActivityCatg(({ catg }) => {
			this.setState({ catgs:catg})
		})
	}
	//筛选分类
	selectVal = categoryId => {
		const {ioInput,ioOuter,action,data,have_activitys,animate,animateParams } = this.props,
			router = data.data.content.router ? data.data.content.router.url : '',
			typeTo = have_activitys ? 'shopFilter' : {categoryId:categoryId};
		have_activitys ? ioOuter(categoryId) : null;
		let dataStr = checkToJump(typeTo,router,categoryId,203);
		JumpRouter(dataStr,animate,animateParams,action);
	}
		
	render() { 
		let { data,ioInput } = this.props,
			catgs = this.state.catgs,
			styleObj = cssColorFormat(this.props, 'filter'),
			filterBox = cssColorFormat(this.props, 'filterBox'),
			filterFlex = cssColorFormat(this.props, 'filterFlex');
		return ( 
			<section className={`e-catg-by-store2 scrollbar`} style={filterBox}>
				<div className="e-catg-by-store2-box" style={filterFlex}>
					{ 
						catgs.map((_, i) => {
							return <div key={i} onClick={() => this.selectVal(_.id)}><CatgOne styleObj={styleObj} ioInput={ioInput} data={data} item={_}/></div>
						})
					 }
				</div>
			</section>
		)
	}
}
//单个组件
class CatgOne extends React.Component {

	render(){

	let { ioInput,data,item,styleObj } = this.props,
		{ componentLayout } = data.data,
		{ mapParams } = ioInput,
		everyId = item.id,
		cl = [],
		catgId = mapParams.catgId,
		isAV = everyId == catgId;
	componentLayout.map(_ => {
		let { active } = _.feature
		if ((isAV && active) || (!isAV && !active)) {
			cl.push(_)
		}
	})
	let dataNew = JSON.parse(JSON.stringify(data))
	dataNew.data.componentLayout = cl
	return (
			<div className="oneClick" >
				<Layout itemList={item} data={dataNew} styleObj={styleObj} refresh={true} />
			</div>
		)
	}
}

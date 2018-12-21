/**
 * @Author: yawen
 * @Date:   2018-11-27

 **/

import React from 'react'
import Layout from '../../Layout'
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import './index.less'

export default class ResetByActivity extends React.Component {

	onChange = e => {
		e.stopPropagation()
		const {ioOuter,action,data,have_activitys,animate,animateParams } = this.props,
			router = data.data.content.router ? data.data.content.router.url : '',
			typeTo = have_activitys ? 'shopFilter' : {categoryId:'noCatgId'};
		have_activitys ? ioOuter('noCatgId') : null;
		let dataStr = checkToJump(typeTo,router,'',203);
		JumpRouter(dataStr,animate,animateParams,action);
	} 
	render(){
		let { ioInput,ioOuter,data } = this.props,
			{ componentLayout } = data.data,
			{ mapParams } = ioInput,
			filterBox = cssColorFormat(this.props, 'filterBox'),
			cl = [],
			catgId = mapParams.catgId;
		componentLayout.map(_ => {
			let { active } = _.feature 
			if ((catgId == 'noCatgId' && active) || (catgId !== 'noCatgId'&&catgId !== 'noShow' && !active) || (!active && catgId == 'noShow')) {
				cl.push(_)  
			}      
		})
		let dataNew = JSON.parse(JSON.stringify(data))
		dataNew.data.componentLayout = cl
		return (
				<div className="oneClick e-reset-by-activitys" onClick={e=>{this.onChange(e)}} style={filterBox}>
					<Layout data={dataNew} refresh={true} />
				</div>
			)
	}
}


import React from 'react'
import checkToJump from '../../../checkToJump'
import JumpRouter from '../../../JumpRouter'
import OneNewActive from '../OneNewActive'
import './index.less'


export default class BuildNew extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		builds:[],
		update:false
	} 
	
	//筛选店铺
	selectVal = (str, index) => {
		let { ioInput, ioOuter,action } = this.props
		if (ioInput.build === str) return
		const dataStr = checkToJump('storeFilter','storeList',str,200);
		JumpRouter(dataStr,'','',action)
		ioInput.build = str
		ioInput.changePage = false
		ioOuter(ioInput)
	}  
	
	render() {
		let { data,ioInput,builds = [],dataSource } = this.props,
			styleObj = cssColorFormat(this.props, 'filter'),
			filterBox = cssColorFormat(this.props, 'filterBox'),
			filterFlex = cssColorFormat(this.props, 'filterFlex');
		let useFloors = builds
		return (
			<section className={`e-build-by-store2 scrollbar`} style={filterBox}>
				<div className="e-build-by-store2-box" style={filterFlex}>
					{ 
						useFloors.map((_, i) => { 
							return <div key={i} onClick={() => this.selectVal(_.id,i)}><OneNewActive type="FloorNew" styleObj={styleObj} ioInput={ioInput} data={data} item={_} /></div>
						}) 
					 } 
				</div>
			</section>
		)
	}
}

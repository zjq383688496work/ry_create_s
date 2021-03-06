import React from 'react'
import './index.less'
import Custom from '../Custom'
import * as Server from 'server'
class StoreListNewShow extends React.Component {
 	state = {
		paramsData:{
			currentPage: 1,
			floor:  '',
			build:  '',
			letter: '', 
			catg:   '',
			loading:      false,
			changePage:   false,
			haveFloorMap: false,
			mapParams:    { floor: 0, shopNo: '' },
			clickStore:   false
		}, 
		internet: true,
		first:    true,
		Update:   false,
		shopsInfo: {
			data: [],
			page: { total: 36, currentPage: 1, totalPage: 6 }
		}
	}
	componentWillMount() {  
		let { data,query,floors, builds } = this.props,
			content = data.data.content,
			size = data.data.content.size || 12;
		this.state.paramsData.size = size 
		let paramsData = this.state.paramsData
		let comp  = data.data.components
		comp = comp.filter(({ name }) => name == 'floorMap' || name == 'mapByStore2')
		this.do_not_params(comp,floors,builds,paramsData,content.dataSource,size)
	}
	componentWillReceiveProps(props){
		let { data } = props
		const size = data.data.content.size
		this.do_data(size)
	}
 	// 无传楼层路由参数时
	do_not_params = (comp, floors, builds, paramsData, dataSource, size) => {
		if (!comp.length) return this.do_data(size)
		paramsData.floor = floors[0].recordId
		paramsData.build = builds[0].recordId
		this.setState({ paramsData }, () => this.do_data(size))
	}
	do_data = size => {
		let { paramsData, shopsInfo } = this.state
		Server.store.getList(size, o => {
			let { totalPage } = shopsInfo.page
			shopsInfo.data = new Array(totalPage).fill().map(_ => o)
			paramsData.loading = true
			this.setState({ 
				paramsData,
				shopsInfo,
				Update: true
			})
		})
	}
	// 筛选
	ioOuter = (ipt, params) => {
		let { $swiper, props } = this,
			{ type, value }    = ipt
		if (type) {
			if (type === 'list') {
				return this.$swiper = value
			} else if (type === 'turn' && $swiper) {
				return $swiper.slideTo(value)
			}
		}
		let { data } = props
		const size = data.data.content.size
		if(!ipt.changePage) {
			ipt.currentPage = 1
			ipt.loading = false
		}
		params? (ipt.mapParams[params.type] = params.value): null 
		if (params && params.type == 'shopNo') {
			ipt.clickStore = true
			ipt.loading = true
			this.setState({ paramsData: ipt })
		} else {
			ipt.clickStore = false
			this.setState({ paramsData: ipt, Update: false })
			// this.changeData(ipt, size)
		}
	} 
	//筛选店铺
	changeData = (ipt,size) => {
		this.setState({paramsData:ipt,Update:false},()=>{
 			this.do_data(size)
		});
	}
	render() {
		let { data, categories, floors, builds, animate, animateParams, action } = this.props
		let comp  = data.data.components,haveFloorMap = false
		comp = comp.filter(item => item.name == 'floorMap' || item.name == 'mapByStore2')
		if (comp.length > 0) haveFloorMap = true
		this.state.paramsData.haveFloorMap = haveFloorMap
		return (  
			<div style={{height:"100%"}}>
				<Custom 
					data={data}
					animate={animate}
					animateParams={animateParams}
					shopsInfo={this.state.shopsInfo}
					floors={floors}
					builds={builds}
					categories={categories}
					ioInput={this.state.paramsData}
					ioOuter={this.ioOuter}
					action={action}
					storeUpdate={this.state.Update}
				/>
				<div ref="$mask" className="s-mask"></div>
			</div>
		)
	} 
}


export default StoreListNewShow

/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'
import * as Server from 'server'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class GoodsList extends React.Component {
	constructor(props) {
		super(props)
		// this.state = { has: this.stateInit(props) }
		this.init()
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}
	componentWillReceiveProps() {
		let { feature } = this.props.data
		let { ioInput } = this.state
		let ipt  = deepCopy(feature)
		ipt.body = ioInput.body
		this.getList(ipt)
		this.state = {
			// has: this.stateInit(props),
			ioInput: ipt
		}
		// this.ioOuter(ipt)
	}

	// stateInit = props => {
	// 	var { components } = props.data.data,
	// 		has = {
	// 			list:   false,
	// 			relist: false,
	// 			catg:   false
	// 		}
	// 	components.map(_ => {
	// 		var { name } = _
	// 		switch (name) {
	// 			case 'catgByGoods':
	// 				has.catg = true
	// 			case 'listByGoods':
	// 				has.list = true
	// 			case 'swiperByGoods':
	// 				has.relist = true
	// 		}
	// 	})
	// 	return has
	// }
	// getData = (ipt, cb) => {
	// 	var { has } = this.state
	// 	Server.goods.getCategoryList(catg => {
	// 		ipt.catg = catg
	// 		if (has.list) {
	// 			Server.goods.getGoodsList(1, list => {
	// 				ipt.list = list
	// 			})
	// 		}
	// 		if (has.relist) {
	// 			Server.goods.getRecGoodsList(relist => {
	// 				ipt.relist = relist
	// 			})
	// 		}
	// 	})
	// }

	ioOuter = ipt => {
		let { data } = this.props
		this.getList(ipt)
		this.setState({ ioInput: ipt })
		console.clear()
	}

	getList = ipt => {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		delete feature.list
		delete feature.map
		let size = ipt.body.size = content.size
		// if (envType === 'business') {
		// 	this.getData(ipt, nipt => {

		// 	})
		// } else {
			ipt.list = mock.list.goods(size)
			ipt.relist = mock.list.reGoods(size)
			ipt.catg = mock.list.goodsCatg(10)
			// cb(ipt)
		// }
	}

	init = () => {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		this.getList(ipt)
		this.state = { ioInput: ipt }
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		// this.init()
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

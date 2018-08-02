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

let cusMap = {
	operate:  CustomO,
	business: CustomB
}
let featureMap = {
	price:     '价格',
	oldPrice:  '原价',
	brand:     '品牌',
	name:      '商品名称',
	pic:       '图片',
	pics:      '图片列表',
	QRPic:     '二维码',
	sTime:     '上架时间',
	catg:      '产品分类',
	pType:     '包装种类',
	artNo:     '货号',
	spec:      '颜色规格'
}

export default class GoodsDetails extends React.Component {
	constructor(props) {
		super(props)
		this.init()
	}
	componentWillMount() {}

	componentDidMount() {
		let csn = this.props.csn
		if (!csn) return false
		let doc = document.querySelector(`.${csn}`)
		doc.addEventListener('scroll', throttle(this._handleScroll, 500, 500))
	}

	componentWillUnmount() {
		let csn = this.props.csn
		if (!csn) return false
		let doc = document.querySelector(`.${csn}`)
		doc.removeEventListener('scroll', throttle(this._handleScroll, 500, 500))
	}

	componentWillReceiveProps() {
		let { data, csn } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		let doc = document.querySelector(`.${csn}`)
		ipt.scrollTop = doc? doc.scrollTop: 0
		this.getItem(ipt)
		this.state = { ioInput: ipt }
		this.ioOuter(ipt)
	}

	_handleScroll = e => {
		let { ioInput } = this.state
		let doc = document.querySelector(`.${this.props.csn}`),
			st = doc.scrollTop
		this.setState({
			ioInput: {
				...ioInput,
				scrollTop: st
			}
		})
	}

	ioOuter(ipt) {
		this.getItem(ipt)
		this.setState({ ioInput: ipt })
		console.clear()
	}

	getItem = (ipt) => {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		ipt.item = mock.item.goods()
		delete feature.item
		delete feature.map
	}

	init = () => {
		let { data, csn } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		let doc = document.querySelector(`.${csn}`)
		ipt.scrollTop = doc? doc.scrollTop: 0
		this.getItem(ipt)
		this.state = { ioInput: ipt }
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

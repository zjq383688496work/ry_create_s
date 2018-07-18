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

export default class GoodsList extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	ioOuter(ipt) {
		let { data, actions, idx, csn } = this.props
		let body = ipt.body
		let keys = []
		ipt.list = new Array(12).fill().map((_, i) => {
			var m  = Math.floor(Math.random() * 1e2),
				m2 = m + Math.floor(Math.random() * 50)
			return {
				id: i + 1,
				name:  '康帅傅',
				price: `${m}.99`,
				oldPrice: `${m2}.99`,
				pic: 'http://rongyi.b0.upaiyun.com/commodity/text/201805191209037272.png',
				QRCodePic: 'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png'
			}
		})
		this.setState({ ioInput: ipt })
		console.clear()
		console.log(body)
	}

	init() {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		feature.body.size = content.size
		this.state = {
			ioInput: feature
		}
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		this.init.bind(this)()

		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

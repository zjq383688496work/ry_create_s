/**
 * @Author: yawen
 * @Date:   2018-11-26
 */

import React from 'react'
import './index.less'

import Custom from 'compEdit/EditElement/Custom'
import * as Server from 'server'


export default class WonderfulActivity2 extends React.Component {
	constructor(props) {
		super(props)
		// console.log("新精彩活动："+JSON.stringify(props));

		let { feature } = props.data
		let ipt = deepCopy(feature)
		this.state = { ioInput: ipt }
	}
	componentWillMount() {
		this.getData()
	}
	componentDidMount() {}
	componentWillUnmount() {}
	componentWillReceiveProps() {
		this.getData()
	}

	ioOuter = ipt => {
		console.clear()
	}

	getData = e => {
		let ipt = this.state.ioInput

		Server.store.getActivityCatg(({ catg }) => {
			ipt.catg  = catg
			this.setState({ ioInput: ipt })
		})
	}

	render() {
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

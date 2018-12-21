import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class StoreBlock extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	render() {
		let props = this.props,
			{ data, ioInput } = props,
			{ componentLayout = {}, layout = {} } = data.data,
			{ item } = ioInput
		return (
			<section className={`e-goods-block`} style={cssColorFormat(props, 'filterBox')}>
				<Layout data={item} layout={layout} components={componentLayout} />
			</section>
		)
	}
}

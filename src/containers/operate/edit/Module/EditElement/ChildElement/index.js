import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class ChildElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let props = this.props,
			{ data, ioInput } = props,
			{ componentLayout = {}, layout = {}, content } = data.data,
			{ item, scrollTop } = ioInput,
			{ showTop } = content
		return (
			<section className={`e-goods-bar${scrollTop > showTop? ' s-show': ''}`} style={cssColorFormat(props, 'filterBox')}>
				<Layout data={item} layout={layout} components={componentLayout} styleObj={cssColorFormat(props, 'filter')} />
			</section>
		)
	}
}

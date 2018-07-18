/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class ListByStore extends React.Component {
	state = {

	}
	renderList = (item) => {
		let props = this.props
		return <Layout data={item} />
	}
	render() {
		let { type, ioInput } = this.props
		let dom = ioInput.list.map((_, i) => {
			return this.renderList(_)
		})
		return (
			<section className={`e-list-by-goods`} style={cssColorFormat(props, 'filterBox')}>
				{ dom }
			</section>
		)
	}
}

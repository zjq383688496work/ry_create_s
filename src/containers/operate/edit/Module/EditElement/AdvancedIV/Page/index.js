import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

const numArr = Array.from(new Array(10), (_, i) => `${i+1}`)

export default class PageByIV extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	renderItem = (item, page, idx) => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data,
			isAV = item == page,
			cl   = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((isAV && active) || (!isAV && !active)) {
				cl.push(_)
			}
		})
		return <Layout
			data={item}
			layout={layout}
			components={cl}
			styleObj={cssColorFormat(this.props, 'filter')}
		/>
	}
	renderList = e => {
		let list = numArr
		return list.map((_, i) => {
			return <div key={i}>{this.renderItem(_, 1, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-page-by-iv scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-page-by-iv-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}

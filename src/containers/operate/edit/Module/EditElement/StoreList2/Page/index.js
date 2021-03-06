import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

const numArr = Array.from(new Array(10), (_, i) => { return {name: `${i+1}`}})

export default class PageByStore2 extends React.Component {
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	renderItem = (item, page, idx) => {
		let { data } = this.props,
			{ name } = item,
			{ componentLayout, layout } = data.data,
			// isAV = name === page,
			isAV = !idx,
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
		let { body } = this.props.ioInput
		let list = numArr
		return list.map((_, i) => {
			return <div key={i}>{this.renderItem(_, body.page, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-page-by-store2 scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-page-by-store2-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}

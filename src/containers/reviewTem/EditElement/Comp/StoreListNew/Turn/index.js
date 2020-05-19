import React from 'react'
// import './index.less'

import Layout from '../../Layout'

export default class TurnByStore2 extends React.Component {
	shouldComponentUpdate(newProps, newState) {
		if (newProps.drag != undefined) return newProps.drag
		return true
	}
	next = () => {
		let { data, ioOuter, ioInput } = this.props,
			{ content }     = data.data,
			{ currentPage } = ioInput,
			{ turn } = content
		currentPage -= 1
		if (turn === 'prev') --currentPage
		else if (turn === 'next') ++currentPage
		ioOuter({ type: 'turn', value: currentPage })
	}
	renderItem = () => {
		let { data, shopsInfo, ioInput } = this.props,
			{ componentLayout, content } = data.data,
			{ currentPage } = ioInput,
			{ totalPage }   = shopsInfo.page,
			{ turn } = content,
			cl = componentLayout.filter(({ feature: { active } }) => {
				if (!(turn === 'prev' && currentPage === 1) && !(turn === 'next' && currentPage === totalPage) && active)  return true
				if (((turn === 'prev' && currentPage === 1) || (turn === 'next' && currentPage === totalPage)) && !active) return true
			})
		let dataNew = JSON.parse(JSON.stringify(data))
		dataNew.data.componentLayout = cl
		return <Layout data={dataNew} refresh={true} />
	}
	render() {
		return (
			<section className={`e-turn-by-store2 scrollbar`} onClick={this.next}>
				{ this.renderItem() }
			</section>
		)
	}
}

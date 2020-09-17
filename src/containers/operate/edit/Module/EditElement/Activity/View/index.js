import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class ViewByActivity extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {

	}
	componentWillReceiveProps(props) {}
	componentDidMount() {}
	componentWillUnmount() {}

	renderDom = ({ media }) => {
		if (!media) return null
		return <img src={media} />
	}
	render() {
		let { item } = this.props.ioInput
		if (!item) return null

		let dom   = this.renderDom(item)
		let style = cssColorFormat(this.props, 'image')

		return (
			<section className={`e-view-by-activity`} style={style}>
				{ dom }
			</section>
		)
	}
}

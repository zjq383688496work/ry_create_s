import React from 'react'
import './index.less'

class Html extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		let { data } = this.props
		return (
			<div className="e-html">
				<iframe className="eh-iframe" src={data.data.content.file} scrolling={'no'} />
			</div>
		)
	}
}

export default Html

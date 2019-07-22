/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

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

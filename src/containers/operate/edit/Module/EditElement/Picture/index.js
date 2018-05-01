/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Picture extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}
	to = event => {

		event.preventDefault();
	} 
	render() {
		let { data } = this.props
		console.log(1,this.props);
		return (
			<div className="e-picture">
				<img src={data.content.img} onClick={this.to} onDragStart={(event)=>{event.preventDefault();}}/>	
			</div> 
		)
	}
}

export default Picture